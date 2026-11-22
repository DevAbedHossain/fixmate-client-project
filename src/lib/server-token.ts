import "server-only";

import { headers } from "next/headers";

import { auth, withDbRetry } from "./auth";

/** JWT for calling the Express API from server components. Empty string when logged out. */
export const getServerToken = async () => {
    try {
        const requestHeaders = await headers();
        const result = await withDbRetry(() => auth.api.getToken({ headers: requestHeaders }));
        return result?.token ?? "";
    } catch {
        return "";
    }
}
