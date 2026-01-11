/**
 * NerdicForge Local - Express Backend Server
 * 
 * This server handles:
 * 1. Stripe Checkout Session creation
 * 2. Webhook processing for payment events
 * 3. Order management
 * 
 * WHY WE NEED THIS:
 * - Stripe Secret Key must NEVER be exposed to the frontend
 * - Webhook signature verification requires server-side processing
 * - Secure handling of payment flows
 */

import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import 'dotenv/config';

// ============================================
// CONFIGURATION
// ============================================

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Initialize Stripe with your secret key
// IMPORTANT: Never expose this key to the frontend!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Initialize Express
const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Allow frontend to call our API
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

// Parse JSON for most routes
// Note: Webhook route needs raw body, so we handle it separately
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

// ============================================
// TYPES
// ============================================

interface LineItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CreateCheckoutRequest {
    items: LineItem[];
    customerEmail?: string;
}

// Simple in-memory order store (use database in production)
const orders: Map<string, {
    sessionId: string;
    items: LineItem[];
    status: string;
    createdAt: Date;
    email?: string;
    amountTotal?: number;
}> = new Map();

// ============================================
// ROUTES
// ============================================

/**
 * Health check endpoint
 * GET /health
 */
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Create Stripe Checkout Session
 * POST /create-checkout-session
 * 
 * This is the main endpoint called by the frontend when user clicks "Checkout"
 * 
 * Flow:
 * 1. Frontend sends cart items
 * 2. We create line_items with price_data (dynamic pricing)
 * 3. We create a Checkout Session with Stripe
 * 4. Return the checkout URL to frontend
 * 5. Frontend redirects user to Stripe's hosted checkout page
 */
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { items, customerEmail }: CreateCheckoutRequest = req.body;

        // Validate input
        if (!items || items.length === 0) {
            res.status(400).json({ error: 'No items provided' });
            return;
        }

        console.log('Creating checkout session for items:', items);

        // Build Stripe line items
        // Using price_data for dynamic pricing (no pre-created Stripe Products needed)
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
            price_data: {
                currency: 'sek',  // Swedish Krona
                product_data: {
                    name: item.name,
                    // Only include images if they're valid absolute URLs
                    ...(item.image?.startsWith('http') ? { images: [item.image] } : {}),
                },
                unit_amount: Math.round(item.price * 100), // Convert to öre (cents)
            },
            quantity: item.quantity,
        }));

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            // Payment method types to accept
            payment_method_types: ['card'],

            // Line items (products)
            line_items: lineItems,

            // Mode: 'payment' for one-time, 'subscription' for recurring
            mode: 'payment',

            // Collect billing address
            billing_address_collection: 'required',

            // Optional: collect shipping address
            // shipping_address_collection: { allowed_countries: ['SE', 'NO', 'DK', 'FI'] },

            // Where to redirect after payment
            success_url: `${FRONTEND_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${FRONTEND_URL}/cart`,

            // Pre-fill customer email if provided
            ...(customerEmail && { customer_email: customerEmail }),

            // Attach metadata for webhook processing
            metadata: {
                orderId: `order_${Date.now()}`,
                itemCount: items.length.toString(),
            },
        });

        // Store order in memory (use database in production)
        orders.set(session.id, {
            sessionId: session.id,
            items,
            status: 'pending',
            createdAt: new Date(),
        });

        console.log('Checkout session created:', session.id);

        // Return the checkout URL
        res.json({
            url: session.url,
            sessionId: session.id,
        });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to create checkout session',
        });
    }
});

/**
 * Get session status
 * GET /session-status?session_id=xxx
 * 
 * Called by thank-you page to confirm payment was successful
 */
app.get('/session-status', async (req, res) => {
    try {
        const sessionId = req.query.session_id as string;

        if (!sessionId) {
            res.status(400).json({ error: 'session_id is required' });
            return;
        }

        // Retrieve session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.json({
            status: session.status,
            paymentStatus: session.payment_status,
            customerEmail: session.customer_details?.email,
            amountTotal: session.amount_total ? session.amount_total / 100 : null,
            currency: session.currency,
        });

    } catch (error) {
        console.error('Error retrieving session:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to retrieve session',
        });
    }
});

/**
 * Stripe Webhook Handler
 * POST /webhook
 * 
 * Stripe sends events here when things happen (payment succeeded, failed, etc.)
 * 
 * CRITICAL: Always verify webhook signature to ensure events are from Stripe
 * 
 * Common events to handle:
 * - checkout.session.completed: Payment successful, fulfill order
 * - payment_intent.succeeded: Payment confirmed
 * - payment_intent.payment_failed: Payment failed
 * - charge.refunded: Refund processed
 */
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.warn('STRIPE_WEBHOOK_SECRET not set, skipping signature verification');
        res.status(400).json({ error: 'Webhook secret not configured' });
        return;
    }

    let event: Stripe.Event;

    try {
        // Verify webhook signature
        // This ensures the request actually came from Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        res.status(400).json({ error: 'Invalid signature' });
        return;
    }

    console.log('Webhook received:', event.type);

    // Handle specific event types
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log('Payment successful for session:', session.id);

            // Update order status
            const order = orders.get(session.id);
            if (order) {
                order.status = 'paid';
                order.email = session.customer_details?.email || undefined;
                order.amountTotal = session.amount_total ? session.amount_total / 100 : undefined;
            }

            // TODO: In production:
            // - Send confirmation email
            // - Update inventory
            // - Create shipment
            // - Update database
            break;
        }

        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('PaymentIntent succeeded:', paymentIntent.id);
            break;
        }

        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('PaymentIntent failed:', paymentIntent.id);
            // TODO: Notify customer, log failure
            break;
        }

        case 'charge.refunded': {
            const charge = event.data.object as Stripe.Charge;
            console.log('Charge refunded:', charge.id);
            // TODO: Update order status, process refund logic
            break;
        }

        default:
            console.log('Unhandled event type:', event.type);
    }

    // Always acknowledge receipt of the event
    res.json({ received: true });
});

/**
 * Get all orders (for admin/debugging)
 * GET /orders
 */
app.get('/orders', (req, res) => {
    const orderList = Array.from(orders.entries()).map(([id, order]) => ({
        id,
        ...order,
    }));
    res.json(orderList);
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   NerdicForge Local Server                                ║
║                                                            ║
║   Server running on:  http://localhost:${PORT}              ║
║   Frontend URL:       ${FRONTEND_URL}             ║
║                                                            ║
║   Endpoints:                                               ║
║   - POST /create-checkout-session                          ║
║   - GET  /session-status?session_id=xxx                   ║
║   - POST /webhook (Stripe webhooks)                       ║
║   - GET  /orders (debug)                                  ║
║   - GET  /health                                          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
