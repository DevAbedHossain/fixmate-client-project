import "server-only";

import { redirect } from "next/navigation";

import type { IRole } from "@/types/UserType";

import { getSession } from "./session";

/**
 * Server guard for role-based pages.
 * - Logged out  → /sign-in
 * - Wrong role  → the user's own dashboard
 * Returns the session when the role matches.
 */
export const requireRole = async (role: IRole) => {
    const session = await getSession();

    if (!session) {
        redirect("/sign-in");
    }

    if (session.user.role !== role) {
        redirect(`/dashboard/${session.user.role ?? "customer"}`);
    }

    return session;
};
