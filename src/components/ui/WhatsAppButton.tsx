"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/254769752124"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50 flex items-center justify-center animate-ping-pong"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="h-8 w-8" />
        </a>
    );
}
