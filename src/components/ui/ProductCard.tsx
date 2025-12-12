"use client";

import Link from "next/link";
import { Product } from "@/types";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem, setIsCartOpen } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if inside a Link (though button is absolute, safety first)
        e.stopPropagation();
        addItem(product);
        setIsCartOpen(true);
    };

    return (
        <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-muted">
                {/* Placeholder image logic if no URL, but we assume mock data has URLs or placeholders */}
                <img
                    src={product.image_url || '/placeholder.png'}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 p-3 bg-white text-primary rounded-full shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer z-10"
                >
                    <ShoppingBag className="h-5 w-5" />
                </button>
            </div>
            <div className="p-4">
                <p className="text-sm text-primary font-medium mb-1">{product.category}</p>
                <Link href={`/product/${product.slug}`}>
                    <h3 className="font-bold text-lg text-foreground hover:text-primary transition-colors mb-2 line-clamp-1">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-foreground">Ksh {product.price.toLocaleString()}</span>
                    {product.stock > 0 ? (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                    ) : (
                        <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
                    )}
                </div>
            </div>
        </div>
    );
}
