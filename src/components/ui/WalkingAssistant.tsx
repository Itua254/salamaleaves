"use client";

import { useState, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

// Placeholder animation data - real data should be loaded from public/walking.json
// But lottie-react works best with importing the JSON if it's local, or fetching it.
// We'll fetch it to allow easy swapping by the user without rebuilding.
const WALKING_DURATION = 4000; // 4 seconds walking
const STOP_DURATION = 3500;    // 3.5 seconds stopped

export function WalkingAssistant() {
    const [animationData, setAnimationData] = useState<any>(null);
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left
    const SPEED = 2; // pixels per frame

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load animation data (keep existing logic for future use)
    useEffect(() => {
        fetch("/walking.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Failed to load walking animation:", err));
    }, []);

    // Control walking/stopping loop
    useEffect(() => {
        if (!animationData) return;

        const loop = () => {
            // Start Walking
            setIsWalking(true);
            setShowSpeech(false);
            lottieRef.current?.play();

            // Stop after WALKING_DURATION
            const walkTimer = setTimeout(() => {
                setIsWalking(false);
                lottieRef.current?.pause(); // Pause animation
                setShowSpeech(true); // Show text

                // Resume after STOP_DURATION
                const stopTimer = setTimeout(() => {
                    loop(); // Restart loop
                }, STOP_DURATION);

                return () => clearTimeout(stopTimer);
            }, WALKING_DURATION);

            return () => clearTimeout(walkTimer);
        };

        const cleanup = loop();
        return () => {
            if (typeof cleanup === "function") cleanup();
        };
    }, [animationData]);

    // Handle movement loop with ping-pong direction
    useEffect(() => {
        if (!isWalking) return;

        let animationFrameId: number;

        const animate = () => {
            setPosition((prev) => {
                let newPos = prev + (SPEED * direction);

                // Ping-pong Logic
                if (newPos > window.innerWidth - 100) { // Right edge (minus width)
                    setDirection(-1);
                    return window.innerWidth - 100;
                }
                if (newPos < 0) { // Left edge
                    setDirection(1);
                    return 0;
                }

                return newPos;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isWalking, direction]); // Dependent on direction to update the closure

    const handleClick = () => {
        window.location.href = "/contact";
    };

    if (!animationData) return null;

    return (
        <div
            ref={containerRef}
            onClick={handleClick}
            className={`fixed bottom-0 z-50 cursor-pointer transition-transform duration-100 will-change-transform ${isWalking ? "animate-bounce" : "hover:scale-105"}`}
            style={{
                left: 0,
                transform: `translateX(${position}px)`,
                width: "80px", // Smaller for the round shape
                height: "80px"
            }}
        >
            {/* Speech Bubble */}
            <div
                className={`absolute -top-32 left-1/2 -translate-x-1/2 bg-white text-primary px-4 py-3 rounded-2xl rounded-bl-none shadow-lg border border-primary/10 w-48 text-sm font-medium transition-opacity duration-300 ${showSpeech ? "opacity-100" : "opacity-0"}`}
            >
                Sema tu, unatafuta majani gani nikusaidie?
            </div>

            {/* Character Visual - Round shape, no fill */}
            <div className={`w-full h-full rounded-full border-4 border-primary bg-transparent shadow-lg flex items-center justify-center ${direction === -1 ? "scale-x-[-1]" : ""}`}>
                {/* Optional: Simple face or icon inside, or just empty as requested */}
                <span className="text-2xl">🌿</span>
            </div>

            {/* Keeping Lottie logic hidden/commented for now as user requested CSS shape */}
            {/* <Lottie ... /> */}
        </div>
    );
}
