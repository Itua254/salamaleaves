"use client";

import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            setEmail("");
        } catch (error: any) {
            console.error(error);
            setStatus("error");
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {status === "success" ? (
                <div className="bg-green-500/20 text-green-100 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <CheckCircle className="h-6 w-6 shrink-0" />
                    <p className="font-medium">Thanks for subscribing! Welcome to the club.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-2 relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={status === "loading"}
                            className="flex-1 px-4 py-3 rounded-full bg-white text-primary placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50 transition-all font-medium shadow-md"
                            required
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-secondary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2 shadow-md border-2 border-transparent hover:border-white/20"
                        >
                            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                        </button>
                    </div>
                    {status === "error" && (
                        <div className="bg-red-500/10 text-white p-2 rounded-lg text-sm flex items-center gap-2 px-3 animate-pulse border border-red-500/20">
                            <AlertCircle className="h-4 w-4" />
                            {errorMessage}
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
