import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
    const { cat } = await searchParams;
    const supabase = await createClient();

    // Fetch products from Supabase
    let query = supabase.from('products').select('*');

    if (cat) {
        // Simple case-insensitive approximate match
        // Note: ILIKE is Postgres specific
        query = query.ilike('category', `%${cat}%`);
    }

    const { data: products, error } = await query;

    if (error) {
        console.error("Error fetching products:", error);
        // Fallback or error UI could go here
    }

    const displayedProducts = (products as Product[]) || [];

    return (
        <div className="bg-background min-h-screen pb-20">
            <div className="bg-secondary/20 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Shop All Teas</h1>
                    <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                        Explore our complete collection of organic teas. From energizing black teas to calming herbal blends.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Categories</h3>
                            <ul className="space-y-2">
                                <li><Link href="/shop" className={`font-medium hover:underline ${!cat ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>All Teas</Link></li>
                                <li><Link href="/shop?cat=green" className={`font-medium hover:underline ${cat === 'green' ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>Green Tea</Link></li>
                                <li><Link href="/shop?cat=black" className={`font-medium hover:underline ${cat === 'black' ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>Black Tea</Link></li>
                                <li><Link href="/shop?cat=herbal" className={`font-medium hover:underline ${cat === 'herbal' ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>Herbal</Link></li>
                            </ul>

                            <h3 className="font-bold text-lg mt-8 mb-4">Price Range</h3>
                            <div className="space-y-2 text-sm text-foreground/80">
                                <label className="flex items-center gap-2 cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-border" /> Under Ksh 1000</label>
                                <label className="flex items-center gap-2 cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-border" /> Ksh 1000 - Ksh 2000</label>
                                <label className="flex items-center gap-2 cursor-pointer hover:text-primary"><input type="checkbox" className="rounded border-border" /> Ksh 2000+</label>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex justify-between items-center">
                            <p className="text-foreground/60">{displayedProducts.length} products found</p>
                            <select className="bg-white border border-border px-3 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {displayedProducts.length === 0 && (
                            <div className="text-center py-20 bg-secondary/10 rounded-xl">
                                <p className="text-xl text-foreground/60">No products found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
