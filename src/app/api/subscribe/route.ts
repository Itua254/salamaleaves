import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/emails/WelcomeEmail";

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        // Initialize Supabase Admin client
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

        // Attempt to send welcome email
        if (resend) {
            try {
                await resend.emails.send({
                    from: "Salam Tea <onboarding@resend.dev>", // Default Resend test domain
                    to: email,
                    subject: "Welcome to Salam Tea Leaves! 🌿",
                    react: WelcomeEmail({ email }),
                });
                console.log("Welcome email sent to:", email);
            } catch (emailError) {
                console.error("Failed to send welcome email:", emailError);
                // Do not fail the request if email sending fails, just log it.
            }
        } else {
            console.warn("RESEND_API_KEY is missing. Welcome email not sent.");
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Subscription error:", error);
        return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
    }
}
