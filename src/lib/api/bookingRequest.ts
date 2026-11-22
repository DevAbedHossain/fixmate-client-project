import { IBookingRequest } from "@/types/BookingRequest";
import { baseURL } from "./config";

export const createBookingRequest = async (data: IBookingRequest) => {
    const res = await fetch(`${baseURL}/booking-request`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export const getBookingRequests = async () => {
    const res = await fetch(`${baseURL}/booking-request`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to load booking requests.");
    }
    return res.json();
}