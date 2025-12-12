export async function getMpesaAccessToken() {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    if (!consumerKey || !consumerSecret) {
        throw new Error("M-Pesa credentials missing");
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.errorMessage || "Failed to get access token");
        return data.access_token;
    } catch (error) {
        console.error("M-Pesa Token Error:", error);
        throw error;
    }
}

export async function initiateSTKPush(phoneNumber: string, amount: number) {
    const token = await getMpesaAccessToken();
    const date = new Date();
    const timestamp = date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    const shortCode = process.env.MPESA_SHORTCODE || "174379"; // Default Sandbox
    const passkey = process.env.MPESA_PASSKEY;

    if (!passkey) throw new Error("M-Pesa Passkey missing");

    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");

    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const body = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.ceil(amount), // M-Pesa accepts integers only
        PartyA: phoneNumber, // Phone sending money
        PartyB: shortCode, // Till/Paybill receiving
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/api/mpesa/callback` : "https://example.com/callback",
        AccountReference: "Salam Tea",
        TransactionDesc: "Tea Purchase",
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return response.json();
}
