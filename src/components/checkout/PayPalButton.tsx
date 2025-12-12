"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
    amount: number;
    onSuccess: () => void;
    onError: (message: string) => void;
}

const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
    components: "buttons",
    currency: "USD",
};

const PayPalButton = ({ amount, onSuccess, onError }: PayPalButtonProps) => {
    // PayPal does not support KES. We must convert to USD.
    // Fixed rate for demo: 1 USD = 129 KES
    const EXCHANGE_RATE = 129;
    // Calculate USD amount
    const usdAmount = (amount / EXCHANGE_RATE).toFixed(2);

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className="w-full relative z-0">
                <div className="mb-4 text-center text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
                    <p className="font-semibold">Paying with PayPal</p>
                    <p>Total: Ksh {amount.toLocaleString()} ≈ ${usdAmount} USD</p>
                    <p className="italic text-[10px] opacity-70">(Processed in USD due to PayPal restrictions)</p>
                </div>
                <PayPalButtons
                    style={{ layout: "vertical", shape: "pill" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: usdAmount,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            const details = await actions.order?.capture();
                            // const name = details?.payer?.name?.given_name;
                            onSuccess();
                        } catch (err) {
                            console.error("PayPal Capture Error", err);
                            onError("Payment capture failed.");
                        }
                    }}
                    onError={(err) => {
                        console.error("PayPal Error", err);
                        onError("PayPal encountered an error.");
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
