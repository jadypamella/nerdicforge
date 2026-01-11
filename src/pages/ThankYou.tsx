/**
 * Thank You Page - Post-payment confirmation
 * 
 * Displayed after successful Stripe checkout.
 * Retrieves session details to show order confirmation.
 */

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSessionStatus, SessionStatus } from '@/lib/api';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';

const ThankYou = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState<SessionStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { clearCart } = useCart();

    useEffect(() => {
        if (!sessionId) {
            setError('No session ID provided');
            setLoading(false);
            return;
        }

        // Fetch session status from our backend
        getSessionStatus(sessionId)
            .then((data) => {
                setStatus(data);
                // Clear cart on successful payment
                if (data.paymentStatus === 'paid') {
                    clearCart();
                }
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [sessionId, clearCart]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Confirming your payment...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Error state
    if (error || !status) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <section className="container py-16">
                        <div className="max-w-md mx-auto text-center">
                            <XCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
                            <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
                            <p className="text-muted-foreground mb-8">
                                {error || 'Unable to confirm your payment. Please contact support.'}
                            </p>
                            <Button asChild>
                                <Link to="/">Return Home</Link>
                            </Button>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    // Success state
    const isPaid = status.paymentStatus === 'paid';

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <section className="container py-16">
                    <div className="max-w-lg mx-auto text-center">
                        {isPaid ? (
                            <>
                                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                                <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                                <p className="text-lg text-muted-foreground mb-2">
                                    Your order has been confirmed.
                                </p>
                                {status.customerEmail && (
                                    <p className="text-sm text-muted-foreground mb-6">
                                        A confirmation email will be sent to{' '}
                                        <span className="font-medium text-foreground">{status.customerEmail}</span>
                                    </p>
                                )}
                                {status.amountTotal && (
                                    <div className="bg-card border border-border rounded-lg p-6 mb-8">
                                        <p className="text-sm text-muted-foreground mb-2">Total Paid</p>
                                        <p className="text-3xl font-bold text-primary">
                                            {status.amountTotal.toLocaleString('sv-SE')} {status.currency?.toUpperCase()}
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <XCircle className="h-20 w-20 text-yellow-500 mx-auto mb-6" />
                                <h1 className="text-3xl font-bold mb-4">Payment Pending</h1>
                                <p className="text-muted-foreground mb-8">
                                    Your payment is still being processed. Please check back later.
                                </p>
                            </>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild>
                                <Link to="/shop">Continue Shopping</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link to="/">Return Home</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ThankYou;
