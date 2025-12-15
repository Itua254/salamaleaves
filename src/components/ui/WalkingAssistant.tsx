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
    const [isWalking, setIsWalking] = useState(true);
    const [showSpeech, setShowSpeech] = useState(false);
    const [position, setPosition] = useState(-100); // Start off-screen left

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load animation data
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

    // Handle movement via CSS transition
    // We actually need a continuous movement loop.
    // A simpler way: Use CSS keyframes for movement, and JS just to pause it?
    // Let's stick to a clean JS interval for position if we want precise control, 
    // or better, just toggle a class.
    // But to sync "stopping" in the middle of the screen, we need to handle position state.

    // Actually, simplified approach:
    // Use a simple animation loop for position.
    useEffect(() => {
        if (!isWalking) return;

        let start: number | null = null;
        const speed = 0.15; // pixels per ms
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            // const progress = timestamp - start;

            setPosition((prev) => {
                const newPos = prev + 2; // Move 2px per frame
                if (newPos > window.innerWidth) {
                    return -100; // Reset to start
                }
                return newPos;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isWalking]);

    const handleClick = () => {
        // Open chat action
        // For now, scroll to contact or open a dummy alert/link
        // Scrolling to contact section if getting in touch
        window.location.href = "/contact";
    };

    if (!animationData) return null;

    return (
        <div
            ref={containerRef}
            onClick={handleClick}
            className={`fixed bottom-0 z-50 cursor-pointer transition-transform duration-100 will-change-transform ${isWalking ? "" : "hover:scale-105"}`}
            style={{
                left: 0,
                transform: `translateX(${position}px)`,
                width: "150px", // Adjust based on Lottie size
                height: "150px"
            }}
        >
            {/* Speech Bubble */}
            <div
                className={`absolute -top-24 left-1/2 -translate-x-1/2 bg-white text-primary px-4 py-3 rounded-2xl rounded-bl-none shadow-lg border border-primary/10 w-48 text-sm font-medium transition-opacity duration-300 ${showSpeech ? "opacity-100" : "opacity-0"}`}
            >
                Sema tu, unatafuta majani gani nikusaidie?
            </div>

            {/* Character */}
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                autoplay={true} // Controlled by ref
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}
