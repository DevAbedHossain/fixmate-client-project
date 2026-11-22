import { IPayment } from "@/types/Payment";

import { baseURL } from "./config";

/** Starts Stripe Checkout for a completed + unpaid booking. Returns { url }. */
export const createCheckoutSession = async (bookingId: string, token: string) => {
    const res = await fetch(`${baseURL}/create-payment-intent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ bookingId }),
    })

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message ?? "Failed to start payment.");
    }

    return result;
}

/** Called by /payment/success — saves the payment once and returns it. */
export const verifyPayment = async (sessionId: string, token: string): Promise<IPayment> => {
    const res = await fetch(`${baseURL}/payment/verify?session_id=${encodeURIComponent(sessionId)}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message ?? "Failed to verify payment.");
    }

    return result;
}

/** Customer: own payment history */
export const getMyPayments = async (token: string): Promise<IPayment[]> => {
    const res = await fetch(`${baseURL}/payments/my`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to load payments.");
    }

    return res.json();
}
