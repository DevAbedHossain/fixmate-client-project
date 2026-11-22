import { requireRole } from "@/lib/require-role";

/** Only technicians can open /dashboard/technician/* — everyone else is sent to their own dashboard. */
export default async function TechnicianLayout({ children }: { children: React.ReactNode }) {
    await requireRole("technician");
    return children;
}
