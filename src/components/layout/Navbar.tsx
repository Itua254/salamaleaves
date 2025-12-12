"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-1.5 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                            <Leaf className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold text-foreground font-serif tracking-tight">Salam Tea</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-foreground/80 hover:text-primary transition-colors font-medium">Home</Link>
                        <Link href="/shop" className="text-foreground/80 hover:text-primary transition-colors font-medium">Shop</Link>
                        <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors font-medium">About</Link>
                        <Link href="/contact" className="text-foreground/80 hover:text-primary transition-colors font-medium">Contact</Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            className="relative p-2 hover:bg-accent rounded-full transition-colors group"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 hover:bg-accent rounded-full text-foreground/80"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border bg-background absolute w-full px-4 py-4 flex flex-col gap-4 shadow-lg">
                    <Link href="/" className="text-lg font-medium p-2 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/shop" className="text-lg font-medium p-2 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                    <Link href="/about" className="text-lg font-medium p-2 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link href="/contact" className="text-lg font-medium p-2 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                </div>
            )}
        </nav>
    );
}
