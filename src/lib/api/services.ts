import { IReview } from "@/types/Booking";
import { IService, PaginatedServices } from "@/types/Service";

import { baseURL } from "./config";

export interface ServiceQuery {
    search?: string;
    category?: string;
    mode?: string;
    sort?: string;
    page?: string;
}

export const createService = async (data: Partial<IService>, token: string) => {
    const res = await fetch(`${baseURL}/service`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

/** Public services (approved + available). Search, filter, sort and pagination run on the server. */
export const getServices = async (query: ServiceQuery = {}): Promise<PaginatedServices> => {
    const params = new URLSearchParams(
        Object.entries(query).filter(([, value]) => Boolean(value)) as [string, string][]
    );
    const res = await fetch(`${baseURL}/services?${params}`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to load services.");
    }

    return res.json();
}

/** Public reviews for a service, newest first. Empty list if they can't be loaded. */
export const getServiceReviews = async (id: string): Promise<IReview[]> => {
    try {
        const res = await fetch(`${baseURL}/service/${id}/reviews`, { cache: "no-store" });
        return res.ok ? res.json() : [];
    } catch {
        return [];
    }
}

/** Logged-in technician's own services, every approval status. */
export const getMyServices = async (token: string): Promise<IService[]> => {
    const res = await fetch(`${baseURL}/services/technician`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to load your services.");
    }

    return res.json();
}


/** Returns the service, or `null` when the id is invalid or nothing matches. */
export const getServiceById = async (id: string): Promise<IService | null> => {

    const res = await fetch(`${baseURL}/service/${id}`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to load service.");
    }

    // The API sends an empty body when no service matches
    const text = await res.text();
    return text ? (JSON.parse(text) as IService) : null;
}


export const updateService = async (id: string, data: Partial<IService>, token: string) => {
    const res = await fetch(`${baseURL}/service/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        throw new Error("Failed to update service.");
    }

    return res.json();
}

export const deleteService = async (id: string, token: string) => {
    const res = await fetch(`${baseURL}/service/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error("Failed to delete service.");
    }

    return res.json();
}

/** A few public services for the home page (approved + available only). */
export const limitServices = async () => {
    const res = await fetch(`${baseURL}/service-limit`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to load services.");
    }

    return res.json();
}
