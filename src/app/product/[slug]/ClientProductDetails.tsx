"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Check, Minus, Plus, ShoppingBag, Truck, ShieldCheck } from "lucide-react";

export default function ClientProductDetails({ product }: { product: Product }) {
    const { addItem, setIsCartOpen } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addItem(product, quantity);
        setIsCartOpen(true);
    };

    return (
        <div className="bg-background min-h-screen py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden shadow-sm">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="text-primary font-bold tracking-wide uppercase text-sm mb-2 block">{product.category}</span>
                            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-bold text-foreground">Ksh {product.price.toLocaleString()}</span>
                                {product.stock > 0 ? (
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                        <Check className="h-3 w-3" /> In Stock
                                    </span>
                                ) : (
                                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Out of Stock</span>
                                )}
                            </div>
                            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                                {product.description}
                            </p>

                            {product.tagline && (
                                <div className="p-4 bg-accent/20 rounded-lg border border-accent mb-6 italic text-primary font-medium">
                                    "{product.tagline}"
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
                                {product.ingredients && (
                                    <div>
                                        <h3 className="font-bold font-serif mb-2">Ingredients</h3>
                                        <p className="text-sm text-foreground/80">{product.ingredients}</p>
                                    </div>
                                )}
                                {product.brewing_instructions && (
                                    <div>
                                        <h3 className="font-bold font-serif mb-2">Brewing</h3>
                                        <p className="text-sm text-foreground/80">{product.brewing_instructions}</p>
                                    </div>
                                )}
                            </div>

                            {product.benefits && (
                                <div className="mb-6">
                                    <h3 className="font-bold font-serif mb-2">Benefits</h3>
                                    <p className="text-sm text-foreground/80">{product.benefits}</p>
                                </div>
                            )}

                            {product.warning && (
                                <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-100 text-sm">
                                    <span className="font-bold">Note:</span> {product.warning}
                                </div>
                            )}
                        </div>

                        <div className="bg-secondary/10 p-6 rounded-xl mb-8 border border-border">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-medium text-foreground">Quantity</span>
                                <div className="flex items-center bg-white rounded-lg border border-border shadow-sm">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-muted transition-colors rounded-l-lg"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-muted transition-colors rounded-r-lg"
                                        disabled={quantity >= product.stock}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-primary text-primary-foreground py-4 px-6 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingBag className="h-5 w-5" />
                                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-border">
                                <Truck className="h-6 w-6 text-primary" />
                                <span className="text-sm font-medium">Free Shipping over Ksh 5,000</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-border">
                                <ShieldCheck className="h-6 w-6 text-primary" />
                                <span className="text-sm font-medium">Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
