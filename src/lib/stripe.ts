import { loadStripe } from "@stripe/stripe-js";

export const getStripe = () => {
    // Make sure to populate NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder";
    return loadStripe(stripePublishableKey);
};
