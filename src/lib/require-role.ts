import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import type { IRole } from "@/types/UserType";

import { auth } from "./auth";

/**
 * Server guard for role-based pages.
 * - Logged out  → /sign-in
 * - Wrong role  → the user's own dashboard
 * Returns the session when the role matches.
 */
export const requireRole = async (role: IRole) => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/sign-in");
    }

    if (session.user.role !== role) {
        redirect(`/dashboard/${session.user.role ?? "customer"}`);
    }

    return session;
};
