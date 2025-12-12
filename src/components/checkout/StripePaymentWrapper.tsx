"use client";

import { useEffect, useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";

function CheckoutForm({ amount, onSuccess }: { amount: number, onSuccess: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {
                // Fallback URL if redirect is forced (e.g. 3DSecure)
                return_url: `${window.location.origin}/checkout/success`,
            },
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message ?? "An unexpected error occurred.");
            } else {
                setMessage("An unexpected error occurred.");
            }
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // Payment successful without redirect
            onSuccess();
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-full font-bold hover:bg-primary/90 transition-all disabled:opacity-50 mt-4"
            >
                <span id="button-text">
                    {isLoading ? "Processing..." : `Pay Ksh ${amount.toLocaleString()}`}
                </span>
            </button>
            {message && <div id="payment-message" className="text-red-500 text-sm text-center">{message}</div>}
        </form>
    );
}

export default function StripePaymentWrapper({ amount, onSuccess }: { amount: number, onSuccess: () => void }) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#16a34a', // Match brand green
            },
        },
    };

    return (
        <div className="w-full">
            {clientSecret ? (
                <Elements options={options} stripe={getStripe()}>
                    <CheckoutForm amount={amount} onSuccess={onSuccess} />
                </Elements>
            ) : (
                <div className="flex justify-center p-4">
                    <span className="loading-spinner">Loading Payment...</span>
                </div>
            )}
        </div>
    );
}
