import { IBooking } from "@/types/Booking";
import { IService } from "@/types/Service";
import { IUser } from "@/types/UserType";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const createService = async (data: IService) => {
    const res = await fetch(`${baseURL}/service`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const getServices = async (): Promise<IService[]> => {
    const res = await fetch(`${baseURL}/services`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to load services.");
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


export const updateService = async (id: string, data: Partial<IService>) => {
    const res = await fetch(`${baseURL}/service/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        throw new Error("Failed to update service.");
    }

    return res.json();
}

export const deleteService = async (id: string) => {
    const res = await fetch(`${baseURL}/service/${id}`, {
        method: "DELETE",
    })

    if (!res.ok) {
        throw new Error("Failed to delete service.");
    }

    return res.json();
}

export const updateUser = async (data: IUser) => {
    const res = await fetch(`${baseURL}/user/${data._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    return res.json();
}

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

/** A few public services for the home page (approved + available only). */
export const limitServices = async () => {
    const res = await fetch(`${baseURL}/service-limit`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to load services.");
    }

    return res.json();
}
