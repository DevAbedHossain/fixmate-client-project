import { IPayment } from "@/types/Payment";
import { IService } from "@/types/Service";
import { IAdminUser, IRole } from "@/types/UserType";

import { baseURL } from "./config";

export const getAllUsers = async (token: string): Promise<IAdminUser[]> => {
    const res = await fetch(`${baseURL}/admin/users`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to load users.");
    }

    return res.json();
}

export const updateUserRole = async (id: string, role: IRole, token: string) => {
    const res = await fetch(`${baseURL}/admin/users/${id}/role`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role }),
    })

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message ?? "Failed to update role.");
    }

    return result;
}

export const getAllServices = async (token: string): Promise<IService[]> => {
    const res = await fetch(`${baseURL}/admin/services`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to load services.");
    }

    return res.json();
}

export const updateServiceApproval = async (id: string, approvalStatus: "approved" | "rejected", token: string) => {
    const res = await fetch(`${baseURL}/admin/services/${id}/approval`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ approvalStatus }),
    })

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message ?? "Failed to update service.");
    }

    return result;
}

export const getAllPayments = async (token: string): Promise<IPayment[]> => {
    const res = await fetch(`${baseURL}/admin/payments`, {
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
