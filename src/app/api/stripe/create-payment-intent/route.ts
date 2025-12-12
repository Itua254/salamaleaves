import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2025-10-12" as any, // Cast to any to avoid strict type mismatch if SDK updates
});

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        if (!amount) {
            return NextResponse.json({ error: "Amount required" }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects smallest unit (cents). For KES, check if it's zero-decimal. KES is usually * 100.
            currency: "kes",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error("Stripe Error:", error);

        // Handle missing key gracefully for demo
        if (error.type === 'StripeAuthenticationError') {
            return NextResponse.json(
                { error: "Stripe API Key missing or invalid." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
