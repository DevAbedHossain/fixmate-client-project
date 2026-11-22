import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, BriefcaseBusiness, ClipboardList, Plus, Wallet } from "lucide-react";

import StatusBreakdown from "@/components/dashboard/shared/StatusBreakdown";
import OverviewPanel from "@/components/dashboard/technician/overview/OverviewPanel";
import StatCard from "@/components/dashboard/technician/overview/StatCard";
import { buttonVariants } from "@/components/ui/button";
import { getMyServices, getTechnicianBookings } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";

export const metadata: Metadata = {
    title: "Overview | FixMate",
};

const LIST_LIMIT = 5;

export default async function TechnicianDashboard() {
    const session = await requireRole("technician");
    const token = await getServerToken();

    const [services, bookings] = await Promise.all([getMyServices(token), getTechnicianBookings(token)]);

    const approvedCount = services.filter((service) => service.approvalStatus === "approved").length;
    const awaitingReview = services.filter((service) => service.approvalStatus === "pending").length;
    const pendingRequests = bookings.filter((booking) => booking.status === "requested");
    const paidJobs = bookings.filter((booking) => booking.paymentStatus === "paid");
    const totalEarnings = paidJobs.reduce((sum, booking) => sum + (booking.finalAmount ?? booking.basePrice), 0);

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Welcome back, {session.user.name.split(" ")[0]}
                    </h1>
                    <p className="text-sm text-muted-foreground">Your services, jobs and earnings at a glance.</p>
                </div>
                <Link href="/dashboard/technician/add-service" className={buttonVariants({ className: "gap-2" })}>
                    <Plus className="size-4" aria-hidden="true" />
                    Add a service
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Services"
                    value={services.length}
                    icon={BriefcaseBusiness}
                    hint={`${awaitingReview} waiting for admin review`}
                />
                <StatCard label="Approved Services" value={approvedCount} icon={BadgeCheck} hint="Visible to customers" />
                <StatCard label="Pending Requests" value={pendingRequests.length} icon={ClipboardList} hint="Waiting for your answer" />
                <StatCard
                    label="Total Earnings"
                    value={formatCurrency(totalEarnings)}
                    icon={Wallet}
                    hint={`${paidJobs.length} paid ${paidJobs.length === 1 ? "job" : "jobs"}`}
                    highlight
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <StatusBreakdown bookings={bookings} title="Jobs by status" />

                <OverviewPanel
                    title="New requests"
                    description="Customers waiting for you to accept or reject."
                    action={{ label: "Manage", href: "/dashboard/technician/requests?status=requested" }}
                    emptyMessage="No new requests right now."
                    items={pendingRequests.slice(0, LIST_LIMIT).map((booking) => ({
                        id: booking._id ?? booking.serviceId,
                        title: booking.serviceTitle,
                        subtitle: `${booking.customerName} · ${formatDate(booking.preferredDate)}`,
                        meta: formatCurrency(booking.basePrice),
                    }))}
                />
            </div>

            <OverviewPanel
                title="Recent earnings"
                description="Jobs your customers have paid for."
                emptyMessage="No paid jobs yet. Completed jobs appear here once the customer pays."
                items={paidJobs.slice(0, LIST_LIMIT).map((booking) => ({
                    id: booking._id ?? booking.serviceId,
                    title: booking.serviceTitle,
                    subtitle: `${booking.customerName} · paid ${formatDate(booking.paidAt)}`,
                    meta: formatCurrency(booking.finalAmount ?? booking.basePrice),
                }))}
            />
        </div>
    );
}
