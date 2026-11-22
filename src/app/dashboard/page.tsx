import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

/** /dashboard → the logged-in user's own dashboard (used after sign in / sign up). */
export default async function DashboardRedirect() {
    const session = await getSession();
    if (!session) redirect("/sign-in");
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
}
