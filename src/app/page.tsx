import Link from "next/link";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*');

  // Use all products for carousel (or filter by is_featured if column exists)
  const featuredProducts = (products as Product[]) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-secondary/20 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Leaf className="absolute top-10 right-10 w-64 h-64 text-primary rotate-12" />
          <Leaf className="absolute bottom-10 left-10 w-48 h-48 text-primary -rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-foreground mb-6 leading-tight">
              Pure Nature in <br />
              <span className="text-primary">Every Sip</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8 leading-relaxed max-w-xl">
              Discover our collection of premium organic teas, ethically sourced and crafted for your wellness.
              Taste the difference of true quality.
              <br />
              <span className="block mt-4 font-serif italic font-bold text-primary">— (MR TEE)</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-transform hover:scale-105">
                Shop Collection <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 bg-white text-foreground border border-border px-8 py-4 rounded-full font-bold hover:bg-accent transition-colors">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-secondary/10 rounded-2xl">
              <div className="p-4 bg-white rounded-full mb-4 shadow-sm">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-serif">100% Organic</h3>
              <p className="text-foreground/70">Sourced from certified organic gardens with no artificial additives.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-secondary/10 rounded-2xl">
              <div className="p-4 bg-white rounded-full mb-4 shadow-sm">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-serif">Quality Assured</h3>
              <p className="text-foreground/70">Each batch is tested for purity and freshness before packaging.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-secondary/10 rounded-2xl">
              <div className="p-4 bg-white rounded-full mb-4 shadow-sm">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-serif">Fast Delivery</h3>
              <p className="text-foreground/70">Quick and reliable shipping right to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2">Featured Blends</h2>
              <p className="text-foreground/60">Curated selection of our best-selling teas.</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="w-full">
          <ProductCarousel products={featuredProducts} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 text-center md:hidden">
            <Link href="/shop" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Join Our Tea Club</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive offers, tea brewing tips, and new arrival announcements.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
