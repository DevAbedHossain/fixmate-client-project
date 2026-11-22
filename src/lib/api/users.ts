import { IUser } from "@/types/UserType";

import { baseURL } from "./config";

/** Update the logged-in user's own profile (name, image, phone, area, bio). */
export const updateUser = async (id: string, data: Partial<IUser>, token: string) => {
    const res = await fetch(`${baseURL}/user/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    return res.json();
}

/** Public technician profile (name, image, area, bio). `null` if not found. */
export const getPublicProfile = async (id: string): Promise<Partial<IUser> | null> => {
    try {
        const res = await fetch(`${baseURL}/user/${id}`, { cache: "no-store" });
        return res.ok ? res.json() : null;
    } catch {
        return null;
    }
}
