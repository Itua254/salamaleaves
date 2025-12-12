import { NextResponse } from "next/server";
import { initiateSTKPush } from "@/lib/mpesa";

export async function POST(req: Request) {
    try {
        const { phone, amount } = await req.json();

        if (!phone || !amount) {
            return NextResponse.json({ error: "Phone and Amount required" }, { status: 400 });
        }

        // Basic phone formatting (ensure 254...)
        let formattedPhone = phone.replace(/\D/g, ""); // Remove non-digits
        if (formattedPhone.startsWith("0")) {
            formattedPhone = "254" + formattedPhone.substring(1);
        } else if (formattedPhone.startsWith("7") || formattedPhone.startsWith("1")) {
            formattedPhone = "254" + formattedPhone;
        }

        const response = await initiateSTKPush(formattedPhone, amount);

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("STK Push API Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
