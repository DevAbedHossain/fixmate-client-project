import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

/** /dashboard → the logged-in user's own dashboard (used after sign in / sign up). */
export default async function DashboardRedirect() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/sign-in");
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
}
