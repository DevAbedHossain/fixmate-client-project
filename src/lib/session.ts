import "server-only";

import { headers } from "next/headers";

import { auth, withDbRetry } from "./auth";

/** Current session for server components (null when logged out). Survives a dropped DB connection. */
export const getSession = async () => {
    const requestHeaders = await headers();
    return withDbRetry(() => auth.api.getSession({ headers: requestHeaders }));
};
