import { requireRole } from "@/lib/require-role";

/** Only admins can open /dashboard/admin/* — everyone else is sent to their own dashboard. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await requireRole("admin");
    return children;
}
