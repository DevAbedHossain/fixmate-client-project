import "server-only";

import { headers } from "next/headers";

import { auth } from "./auth";

/** JWT for calling the Express API from server components. Empty string when logged out. */
export const getServerToken = async () => {
    try {
        const result = await auth.api.getToken({ headers: await headers() });
        return result?.token ?? "";
    } catch {
        return "";
    }
}
