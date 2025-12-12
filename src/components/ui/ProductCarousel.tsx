"use client";

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Product } from '@/types'
import { ProductCard } from '@/components/ui/ProductCard'

interface ProductCarouselProps {
    products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            dragFree: true,
            containScroll: false // key for smooth infinite loop without snapping to edges
        },
        [
            AutoScroll({
                playOnInit: true,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                speed: 0.8 // Slightly slower for elegance
            })
        ]
    )

    return (
        <div className="relative group">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y gap-6 py-4 pl-4">
                    {products.map((product) => (
                        <div className="flex-[0_0_80%] min-w-0 sm:flex-[0_0_40%] lg:flex-[0_0_25%]" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
