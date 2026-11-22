import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BadgeCheck, BriefcaseBusiness, ClipboardList, Wallet } from "lucide-react";

import OverviewPanel from "@/components/dashboard/technician/overview/OverviewPanel";
import StatCard from "@/components/dashboard/technician/overview/StatCard";
import { getBookings, getServices } from "@/lib/api";
import { auth } from "@/lib/auth";
import { formatCurrency, formatDate, formatTicket } from "@/lib/format";

export const metadata: Metadata = {
    title: "Overview | FixMate",
};

const LIST_LIMIT = 5;

const byNewest = (a?: string, b?: string) => new Date(b ?? 0).getTime() - new Date(a ?? 0).getTime();

export default async function TechnicianDashboard() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/sign-in");
    }

    const { id, email } = session.user;

    const [allServices, allBookings] = await Promise.all([getServices(), getBookings()]);

    const services = allServices.filter((service) => service.technicianId === id);
    const bookings = allBookings.filter((booking) => booking.technicianEmail === email);

    // Stats
    const approvedCount = services.filter((service) => service.approvalStatus === "approved").length;
    const awaitingReviewCount = services.filter((service) => service.approvalStatus === "pending").length;

    const newRequests = bookings
        .filter((booking) => booking.status === "requested")
        .sort((a, b) => byNewest(a.createdAt, b.createdAt));

    const paidJobs = bookings
        .filter((booking) => booking.status === "completed" && booking.paymentStatus === "paid")
        .sort((a, b) => byNewest(a.paidAt ?? a.createdAt, b.paidAt ?? b.createdAt));

    const totalEarnings = paidJobs.reduce((sum, booking) => sum + (booking.finalAmount ?? booking.basePrice), 0);

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Overview</h1>
                <p className="text-sm text-muted-foreground">Your services, jobs and earnings.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total services" value={services.length} icon={BriefcaseBusiness} />
                <StatCard
                    label="Approved services"
                    value={approvedCount}
                    hint={awaitingReviewCount > 0 ? `${awaitingReviewCount} waiting for review` : undefined}
                    icon={BadgeCheck}
                />
                <StatCard
                    label="Pending requests"
                    value={newRequests.length}
                    hint={newRequests.length > 0 ? "Waiting for you to accept or decline" : undefined}
                    icon={ClipboardList}
                />
                <StatCard label="Total earnings" value={formatCurrency(totalEarnings)} icon={Wallet} highlight />
            </div>

            {/* Activity */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <OverviewPanel
                    title="New requests"
                    action={{ label: "Manage requests", href: "/dashboard/technician/manage-requests?status=requested" }}
                    emptyMessage="No new requests right now."
                    items={newRequests.slice(0, LIST_LIMIT).map((booking) => ({
                        id: booking._id ?? booking.createdAt,
                        title: booking.serviceTitle,
                        subtitle: `${booking.customerName}, preferred ${formatDate(booking.preferredDate)}`,
                        meta: formatTicket(booking._id),
                        monoMeta: true,
                    }))}
                />

                <OverviewPanel
                    title="Recent earnings"
                    description="Jobs customers have paid for"
                    emptyMessage="No paid jobs yet."
                    items={paidJobs.slice(0, LIST_LIMIT).map((booking) => ({
                        id: booking._id ?? booking.createdAt,
                        title: booking.serviceTitle,
                        subtitle: `${booking.customerName}, ${formatDate(booking.paidAt ?? booking.createdAt)}`,
                        meta: formatCurrency(booking.finalAmount ?? booking.basePrice),
                    }))}
                />
            </div>
        </div>
    );
}
