/**
 * API Client - Frontend utility to call backend endpoints
 * 
 * This module provides type-safe functions to interact with our backend server.
 * It abstracts the fetch API and handles errors consistently.
 */

// Backend API URL - configure this based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ============================================
// TYPES
// ============================================

export interface CheckoutItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface CreateCheckoutResponse {
    url: string;
    sessionId: string;
}

export interface SessionStatus {
    status: string;
    paymentStatus: string;
    customerEmail: string | null;
    amountTotal: number | null;
    currency: string;
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Create a Stripe Checkout Session
 * 
 * Sends cart items to backend, which creates a Stripe session
 * and returns the checkout URL.
 * 
 * @param items - Cart items to checkout
 * @param customerEmail - Optional customer email to pre-fill
 * @returns Checkout URL and session ID
 */
export async function createCheckoutSession(
    items: CheckoutItem[],
    customerEmail?: string
): Promise<CreateCheckoutResponse> {
    const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, customerEmail }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
    }

    return response.json();
}

/**
 * Get Checkout Session Status
 * 
 * Retrieves the status of a checkout session from Stripe.
 * Used on the thank-you page to confirm payment.
 * 
 * @param sessionId - Stripe session ID from URL params
 * @returns Session status details
 */
export async function getSessionStatus(sessionId: string): Promise<SessionStatus> {
    const response = await fetch(`${API_URL}/session-status?session_id=${sessionId}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get session status');
    }

    return response.json();
}

/**
 * Health check for the backend server
 * 
 * @returns Server status
 */
export async function checkHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_URL}/health`);

    if (!response.ok) {
        throw new Error('Server is not responding');
    }

    return response.json();
}
