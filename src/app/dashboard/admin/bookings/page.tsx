import type { Metadata } from "next";
import { Inbox } from "lucide-react";

import FilterTabs from "@/components/dashboard/shared/FilterTabs";
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/dashboard/technician/requests/BookingStatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllBookings } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";

export const metadata: Metadata = {
    title: "All Bookings | FixMate",
};

const STATUS_FILTERS = [
    { value: "all", label: "All" },
    { value: "requested", label: "Requested" },
    { value: "accepted", label: "Accepted" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
    { value: "cancelled", label: "Cancelled" },
];

export default async function AllBookingsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
    await requireRole("admin");
    const bookings = await getAllBookings(await getServerToken());

    const { status } = await searchParams;
    const active = STATUS_FILTERS.some((filter) => filter.value === status) ? status! : "all";
    const visible = active === "all" ? bookings : bookings.filter((booking) => booking.status === active);
    const counts = Object.fromEntries(
        STATUS_FILTERS.map(({ value }) => [
            value,
            value === "all" ? bookings.length : bookings.filter((booking) => booking.status === value).length,
        ])
    );

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">
            <div className="flex flex-col gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">All bookings</h1>
                    <p className="text-sm text-muted-foreground">Every repair job on the platform (read-only).</p>
                </div>
                <FilterTabs options={STATUS_FILTERS} active={active} counts={counts} label="Filter bookings by status" />
            </div>

            {visible.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
                    <Inbox className="size-10 text-muted-foreground" aria-hidden="true" />
                    <p className="font-semibold">No bookings here</p>
                    <p className="text-sm text-muted-foreground">Try another status filter.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="pl-5">Service</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Technician</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead className="pr-5 text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visible.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell className="max-w-64 py-3 pl-5">
                                        <p className="truncate font-medium">{booking.serviceTitle}</p>
                                        <p className="text-xs text-muted-foreground">{booking.category}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{booking.customerName}</p>
                                        <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                                    </TableCell>
                                    <TableCell>{booking.technicianName}</TableCell>
                                    <TableCell className="text-muted-foreground">{formatDate(booking.preferredDate)}</TableCell>
                                    <TableCell><BookingStatusBadge status={booking.status} /></TableCell>
                                    <TableCell><PaymentStatusBadge status={booking.paymentStatus} /></TableCell>
                                    <TableCell className="pr-5 text-right font-semibold">
                                        {formatCurrency(booking.finalAmount ?? booking.basePrice)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
