import type { Metadata } from "next";
import { CircleDollarSign, Clock, UserCog, Users } from "lucide-react";

import StatusBreakdown from "@/components/dashboard/shared/StatusBreakdown";
import OverviewPanel from "@/components/dashboard/technician/overview/OverviewPanel";
import StatCard from "@/components/dashboard/technician/overview/StatCard";
import { getAllBookings, getAllPayments, getAllServices, getAllUsers } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";

export const metadata: Metadata = {
    title: "Admin Overview | FixMate",
};

const ROLE_BARS = [
    { role: "customer", label: "Customers", color: "bg-sky-500" },
    { role: "technician", label: "Technicians", color: "bg-violet-500" },
    { role: "admin", label: "Admins", color: "bg-slate-700" },
] as const;

export default async function AdminDashboard() {
    await requireRole("admin");
    const token = await getServerToken();

    const [users, services, bookings, payments] = await Promise.all([
        getAllUsers(token),
        getAllServices(token),
        getAllBookings(token),
        getAllPayments(token),
    ]);

    const technicians = users.filter((user) => user.role === "technician");
    const pendingServices = services.filter((service) => service.approvalStatus === "pending");
    const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const maxRole = Math.max(1, ...ROLE_BARS.map(({ role }) => users.filter((user) => user.role === role).length));

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Admin overview</h1>
                <p className="text-sm text-muted-foreground">Users, services, jobs and revenue across FixMate.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total Users" value={users.length} icon={Users} hint="All registered accounts" />
                <StatCard label="Total Technicians" value={technicians.length} icon={UserCog} hint="Offering repair services" />
                <StatCard label="Pending Services" value={pendingServices.length} icon={Clock} hint="Waiting for your approval" />
                <StatCard
                    label="Total Revenue"
                    value={formatCurrency(revenue)}
                    icon={CircleDollarSign}
                    hint={`${payments.length} Stripe ${payments.length === 1 ? "payment" : "payments"}`}
                    highlight
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <StatusBreakdown bookings={bookings} title="All jobs by status" />

                {/* Users by role */}
                <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                    <h2 className="mb-1 text-lg font-semibold">Users by role</h2>
                    <p className="mb-5 text-sm text-muted-foreground">{users.length} accounts</p>
                    <ul className="space-y-3.5">
                        {ROLE_BARS.map(({ role, label, color }) => {
                            const count = users.filter((user) => user.role === role).length;
                            return (
                                <li key={role} className="grid grid-cols-[6.5rem_1fr_2rem] items-center gap-3 text-sm">
                                    <span className="text-muted-foreground">{label}</span>
                                    <span className="h-2.5 overflow-hidden rounded-full bg-muted">
                                        <span className={`block h-full rounded-full ${color}`} style={{ width: `${(count / maxRole) * 100}%` }} />
                                    </span>
                                    <span className="text-right font-semibold tabular-nums">{count}</span>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <OverviewPanel
                    title="Services waiting for approval"
                    action={{ label: "Review", href: "/dashboard/admin/services" }}
                    emptyMessage="Nothing to review. All services are up to date."
                    items={pendingServices.slice(0, 5).map((service) => ({
                        id: service._id ?? service.title,
                        title: service.title,
                        subtitle: `${service.technicianName} · ${service.category}`,
                        meta: formatCurrency(Number(service.basePrice)),
                    }))}
                />
                <OverviewPanel
                    title="Latest transactions"
                    action={{ label: "View all", href: "/dashboard/admin/transactions" }}
                    emptyMessage="No payments yet."
                    items={payments.slice(0, 5).map((payment) => ({
                        id: payment._id,
                        title: payment.serviceTitle,
                        subtitle: `${payment.customerName} → ${payment.technicianName} · ${formatDate(payment.paidAt)}`,
                        meta: formatCurrency(payment.amount),
                    }))}
                />
            </div>
        </div>
    );
}
