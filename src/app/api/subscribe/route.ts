import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        // Initialize Supabase Admin client (Service Role) to bypass RLS for insertion if needed, 
        // or just standard client if Policy allows public insert.
        // Using Service Role is safer for "backend" operations to ensure it always works regardless of user auth state.
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { error } = await supabaseAdmin
            .from("subscribers")
            .insert({ email });

        if (error) {
            if (error.code === "23505") { // Unique violation code
                return NextResponse.json({ error: "You are already subscribed!" }, { status: 409 });
            }
            throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Subscription error:", error);
        return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
    }
}
