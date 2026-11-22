import { IBooking } from "@/types/Booking";

import { baseURL } from "./config";

export interface RepairRequestData {
    serviceId: string;
    customerPhone: string;
    address: string;
    preferredDate: string;
    problemDescription: string;
}

/** Customer sends a repair request. Returns { insertedId } or { message } on error. */
export const createBooking = async (data: RepairRequestData, token: string) => {
    const res = await fetch(`${baseURL}/booking-request`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message ?? "Failed to send request.");
    }

    return result;
}

/** Customer: own bookings */
export const getMyBookings = async (token: string): Promise<IBooking[]> => {
    const res = await fetch(`${baseURL}/booking-request/my`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to load bookings.");
    }

    return res.json();
}

/** Technician: jobs for own services */
export const getTechnicianBookings = async (token: string): Promise<IBooking[]> => {
    const res = await fetch(`${baseURL}/booking-request/technician`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to load requests.");
    }

    return res.json();
}

/** Admin: every booking */
export const getAllBookings = async (token: string): Promise<IBooking[]> => {
    const res = await fetch(`${baseURL}/booking-request`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to load bookings.");
    }

    return res.json();
}

/** Customer cancels a booking that is still "requested" */
export const cancelBooking = async (id: string, token: string) => {
    const res = await fetch(`${baseURL}/booking-request/${id}/cancel`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`
        },
    })

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message ?? "Failed to cancel booking.");
    }

    return result;
}

/** Customer rates a paid job (1–5 stars + optional review) */
export const reviewBooking = async (id: string, data: { rating: number; review: string }, token: string) => {
    const res = await fetch(`${baseURL}/booking-request/${id}/review`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message ?? "Failed to save review.");
    }

    return result;
}

/** Technician moves a job to the next status */
export const updateBookingStatus = async (
    id: string,
    data: { status: IBooking["status"]; finalAmount?: number },
    token: string
) => {
    const res = await fetch(`${baseURL}/booking-request/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message ?? "Failed to update booking.");
    }

    return result;
}
