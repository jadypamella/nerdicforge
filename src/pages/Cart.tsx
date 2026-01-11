/**
 * Cart Page - Full shopping cart with Stripe checkout
 * 
 * Features:
 * - Display cart items with images, quantities, prices
 * - Update quantities / remove items
 * - Calculate subtotal and total
 * - Checkout button that calls our backend API
 */

import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createCheckoutSession } from '@/lib/api';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handle checkout button click
     * 
     * Flow:
     * 1. Build line items from cart
     * 2. Call backend to create Stripe Checkout Session
     * 3. Redirect to Stripe's hosted checkout page
     */
    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            // Build line items for the API
            const lineItems = items.map(item => ({
                productId: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                image: item.product.image,
            }));

            // Call our backend API
            const { url } = await createCheckoutSession(lineItems);

            // Redirect to Stripe Checkout
            if (url) {
                window.location.href = url;
            } else {
                throw new Error('No checkout URL received');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Checkout Error', {
                description: error instanceof Error ? error.message : 'Failed to start checkout',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Empty cart state
    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <section className="container py-16">
                        <div className="max-w-md mx-auto text-center">
                            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                            <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
                            <p className="text-muted-foreground mb-8">
                                Looks like you haven't added any collectibles yet.
                            </p>
                            <Button asChild>
                                <Link to="/shop">Browse Collection</Link>
                            </Button>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <section className="container py-8 md:py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Shopping Cart</h1>
                            <Link
                                to="/shop"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Continue Shopping
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {items.map(item => (
                                    <div
                                        key={item.product.id}
                                        className="flex gap-4 p-4 bg-card border border-border rounded-lg shadow-sm"
                                    >
                                        {/* Image */}
                                        <Link
                                            to={`/product/${item.product.id}`}
                                            className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted"
                                        >
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/placeholder.svg';
                                                }}
                                            />
                                        </Link>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                to={`/product/${item.product.id}`}
                                                className="font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-1"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {item.product.franchise}
                                            </p>
                                            <p className="text-lg font-bold text-primary mt-2">
                                                {formatPrice(item.product.price)}
                                            </p>
                                        </div>

                                        {/* Quantity & Remove */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-1 rounded-md bg-muted text-muted-foreground hover:bg-border transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium text-card-foreground">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 rounded-md bg-muted text-muted-foreground hover:bg-border transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-card border border-border rounded-lg shadow-sm p-6 sticky top-24">
                                    <h2 className="text-lg font-semibold mb-4 text-card-foreground">Order Summary</h2>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="text-card-foreground">{formatPrice(totalPrice)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="text-muted-foreground">Calculated at checkout</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-border pt-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-card-foreground">Total</span>
                                            <span className="text-xl font-bold text-primary">
                                                {formatPrice(totalPrice)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            inc. VAT
                                        </p>
                                    </div>

                                    <Button
                                        className="w-full"
                                        size="lg"
                                        onClick={handleCheckout}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Proceed to Checkout'
                                        )}
                                    </Button>

                                    <p className="text-xs text-muted-foreground text-center mt-4">
                                        Secure payment with Stripe
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-8 p-4 rounded-lg bg-muted border border-border">
                            <p className="text-xs text-muted-foreground text-center">
                                Fan made collectible. Not officially licensed. For adult collectors. Not intended as a toy.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Cart;
