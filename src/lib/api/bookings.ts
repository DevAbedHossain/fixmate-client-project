import { IBooking } from "@/types/Booking";

import { baseURL } from "./config";

export const getBookings = async (): Promise<IBooking[]> => {
    const res = await fetch(`${baseURL}/bookings`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to load bookings.");
    }

    return res.json();
}

export const updateBooking = async (id: string, data: Partial<IBooking>) => {
    const res = await fetch(`${baseURL}/booking/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new Error("Failed to update booking.");
    }

    return res.json();
}

export const createBooking = async (data: { serviceId: string; userEmail: string }) => {
    const res = await fetch(`${baseURL}/booking/create-payment-intent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new Error("Failed to create booking.");
    }

    return res.json();
}
