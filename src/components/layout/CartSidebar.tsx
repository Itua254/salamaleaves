"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function CartSidebar() {
    const { items, removeItem, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
        }
        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen, setIsCartOpen]);

    return (
        <div className={cn("fixed inset-0 z-[100] transition-all duration-300", isCartOpen ? "visible" : "invisible pointer-events-none")}>
            {/* Backdrop */}
            <div
                className={cn("absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300", isCartOpen ? "opacity-100" : "opacity-0")}
            />

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={cn(
                    "absolute top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300 flex flex-col",
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" /> Your Cart
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-accent rounded-full transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                            <ShoppingBag className="h-16 w-16 mb-4 opacity-20" />
                            <p className="text-lg">Your cart is empty</p>
                            <button onClick={() => setIsCartOpen(false)} className="mt-4 text-primary hover:underline">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="h-20 w-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                                    <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold line-clamp-1">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">Ksh {item.price.toLocaleString()}</p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center border border-border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 hover:bg-muted"
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 hover:bg-muted"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 border-t border-border mt-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-lg">Total</span>
                            <span className="text-xl font-bold">Ksh {cartTotal.toLocaleString()}</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg"
                        >
                            Checkout Now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
