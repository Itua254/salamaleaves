import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Product } from "@/types";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
    // 1. Fetch Products (Public Read is allowed)
    const supabase = await createClient();
    const { data: productsData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    const products = (productsData as Product[]) || [];

    // 2. Fetch Orders (Admin Only)
    // Try using Admin Client first (Service Role), fallback to standard client (which will likely fail/return empty if RLS is strict)
    const adminSupabase = createAdminClient();
    let orders: any[] = [];
    let isConnected = true;

    if (adminSupabase) {
        const { data: ordersData, error } = await adminSupabase.from('orders').select('*').order('created_at', { ascending: false });
        if (!error && ordersData) {
            orders = ordersData;
        }
    } else {
        // Fallback: standard client (may return empty if RLS policies block)
        // Check if we are checking "Standard" client behavior or just giving up?
        // Let's try standard just in case user changed RLS
        const { data: ordersData, error } = await supabase.from('orders').select('*');
        if (!error && ordersData) {
            orders = ordersData;
        }

        // If we didn't have the admin key, flag it
        isConnected = false;
    }

    return <AdminDashboard products={products} orders={orders} isConnected={isConnected || orders.length > 0} />;
}
