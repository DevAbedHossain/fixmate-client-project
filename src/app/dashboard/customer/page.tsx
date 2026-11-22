import Link from "next/link";
import { CheckCircle2, ClipboardList, Hammer, Wallet } from "lucide-react";

import OverviewPanel from "@/components/dashboard/technician/overview/OverviewPanel";
import StatCard from "@/components/dashboard/technician/overview/StatCard";
import StatusBreakdown from "@/components/dashboard/shared/StatusBreakdown";
import { buttonVariants } from "@/components/ui/button";
import { getMyBookings } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";


const ACTIVE = ["requested", "accepted", "in-progress"];

export default async function CustomerDashboard() {
    const session = await requireRole("customer");
    const bookings = await getMyBookings(await getServerToken());

    const activeJobs = bookings.filter((booking) => ACTIVE.includes(booking.status));
    const completedJobs = bookings.filter((booking) => booking.status === "completed");
    const awaitingPayment = completedJobs.filter((booking) => booking.paymentStatus !== "paid");

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Welcome back, {session.user.name.split(" ")[0]}
                    </h1>
                    <p className="text-sm text-muted-foreground">Track your repair requests and payments.</p>
                </div>
                <Link href="/services" className={buttonVariants()}>
                    Book a repair
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total Requests" value={bookings.length} icon={ClipboardList} hint="All time" />
                <StatCard label="Active Jobs" value={activeJobs.length} icon={Hammer} hint="Requested, accepted or in progress" />
                <StatCard label="Completed Jobs" value={completedJobs.length} icon={CheckCircle2} hint="Finished by technicians" />
                <StatCard
                    label="Awaiting Payment"
                    value={awaitingPayment.length}
                    icon={Wallet}
                    hint="Completed jobs to pay"
                    highlight
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <StatusBreakdown bookings={bookings} title="Requests by status" />

                <OverviewPanel
                    title="Recent requests"
                    description="Your latest repair requests."
                    action={{ label: "View all", href: "/dashboard/customer/bookings" }}
                    emptyMessage="No requests yet. Find a service and send your first request."
                    items={bookings.slice(0, 5).map((booking) => ({
                        id: booking._id ?? booking.serviceId,
                        title: booking.serviceTitle,
                        subtitle: `${booking.technicianName} · ${formatDate(booking.preferredDate)}`,
                        meta: formatCurrency(booking.finalAmount ?? booking.basePrice),
                    }))}
                />
            </div>
        </div>
    );
}
