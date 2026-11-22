import { requireRole } from "@/lib/require-role";

/** Only customers can open /dashboard/customer/* — everyone else is sent to their own dashboard. */
export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
    await requireRole("customer");
    return children;
}
