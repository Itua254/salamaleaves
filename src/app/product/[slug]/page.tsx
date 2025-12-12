import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import ClientProductDetails from "./ClientProductDetails";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch product from Supabase
    const supabase = await createClient();
    const { data: productData, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !productData) {
        // console.error("Error fetching product:", error);
        notFound();
    }

    const product = productData as Product;

    return <ClientProductDetails product={product} />;
}
