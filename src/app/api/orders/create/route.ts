import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase Admin Client (Service Role)
// We use Service Role to ensure we can write to 'orders' regardless of RLS (e.g. for guest users)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { order, items } = body;

        // Validation
        if (!order || !items || items.length === 0) {
            return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
        }

        // 1. Create Order
        const { data: orderData, error: orderError } = await supabaseAdmin
            .from("orders")
            .insert({
                user_id: order.user_id || null, // Guest checkout support
                email: order.email,
                total: order.total,
                status: "paid", // Assuming this is called after payment success
                payment_method: order.payment_method,
                shipping_address: order.shipping_address,
            })
            .select()
            .single();

        if (orderError) {
            console.error("Order Creation Error:", orderError);
            throw new Error("Failed to create order record");
        }

        // 2. Create Order Items
        const orderItems = items.map((item: any) => ({
            order_id: orderData.id,
            product_id: item.id,
            quantity: item.quantity,
            price_at_purchase: item.price,
        }));

        const { error: itemsError } = await supabaseAdmin
            .from("order_items")
            .insert(orderItems);

        if (itemsError) {
            console.error("Order Items Error:", itemsError);
            // Ideally we'd rollback order here, but for now we throw
            throw new Error("Failed to create order items");
        }

        return NextResponse.json({ success: true, orderId: orderData.id });

    } catch (error: any) {
        console.error("Create Order Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
