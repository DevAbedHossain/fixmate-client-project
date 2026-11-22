import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CalendarDays, Inbox, Mail, MapPin, Phone } from "lucide-react";

import { BookingStatusBadge } from "@/components/dashboard/technician/requests/BookingStatusBadge";
import RequestActions from "@/components/dashboard/technician/requests/RequestActions";
import RequestStatusFilter, {
    REQUEST_FILTERS,
    type RequestFilter,
} from "@/components/dashboard/technician/requests/RequestStatusFilter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTechnicianBookings } from "@/lib/api";
import { getSession } from "@/lib/session";
import { formatCurrency, formatDate, formatTicket } from "@/lib/format";
import { getServerToken } from "@/lib/server-token";

export const metadata: Metadata = {
    title: "Manage Requests | FixMate",
};

const isRequestFilter = (value: unknown): value is RequestFilter =>
    REQUEST_FILTERS.some((filter) => filter.value === value);

const dash = (value?: string) => value || "—";

export default async function ManageRequestPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const session = await getSession();
    if (!session) redirect("/sign-in");

    const { status } = await searchParams;
    const activeFilter: RequestFilter = isRequestFilter(status) ? status : "all";

    // Server returns only bookings where technicianEmail is this technician (newest first)
    const bookings = await getTechnicianBookings(await getServerToken());

    const counts = Object.fromEntries(
        REQUEST_FILTERS.map(({ value }) => [
            value,
            value === "all" ? bookings.length : bookings.filter((booking) => booking.status === value).length,
        ])
    ) as Record<RequestFilter, number>;

    const visibleBookings =
        activeFilter === "all" ? bookings : bookings.filter((booking) => booking.status === activeFilter);

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Manage requests</h1>
                    <p className="text-sm text-muted-foreground">
                        Review new bookings and move each job forward one step at a time.
                    </p>
                </div>
                <RequestStatusFilter active={activeFilter} counts={counts} />
            </div>

            {visibleBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Inbox className="size-7" aria-hidden="true" />
                    </span>
                    <div className="space-y-1">
                        <h2 className="font-semibold">No requests here</h2>
                        <p className="text-sm text-muted-foreground">
                            {activeFilter === "all"
                                ? "When customers book your services, their requests will appear here."
                                : "There are no requests with this status right now."}
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Desktop: table */}
                    <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-sm lg:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50">
                                    <TableHead className="pl-5">Customer</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Preferred date</TableHead>
                                    <TableHead>Problem</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-52 pr-5 text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {visibleBookings.map((booking) => (
                                    <TableRow key={booking._id} className="align-top">
                                        <TableCell className="py-4 pl-5">
                                            <p className="font-medium">{dash(booking.customerName)}</p>
                                            <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                                            <p className="text-xs text-muted-foreground">{dash(booking.customerPhone)}</p>
                                        </TableCell>
                                        <TableCell className="max-w-56 py-4">
                                            <p className="truncate font-medium">{booking.serviceTitle}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatTicket(booking._id)} · {formatCurrency(booking.finalAmount ?? booking.basePrice)}
                                            </p>
                                        </TableCell>
                                        <TableCell className="max-w-48 py-4 whitespace-normal text-muted-foreground">
                                            {dash(booking.address)}
                                        </TableCell>
                                        <TableCell className="py-4 text-muted-foreground">
                                            {dash(formatDate(booking.preferredDate))}
                                        </TableCell>
                                        <TableCell className="max-w-56 py-4">
                                            <p className="line-clamp-2 whitespace-normal text-muted-foreground">
                                                {dash(booking.problemDescription)}
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <BookingStatusBadge status={booking.status} />
                                        </TableCell>
                                        <TableCell className="py-4 pr-5">
                                            <div className="ml-auto w-48">
                                                <RequestActions booking={booking} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile / tablet: cards */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                        {visibleBookings.map((booking) => (
                            <article key={booking._id} className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="font-mono text-xs text-muted-foreground">
                                            {formatTicket(booking._id)}
                                        </p>
                                        <h2 className="mt-0.5 line-clamp-2 font-semibold leading-snug">
                                            {booking.serviceTitle}
                                        </h2>
                                    </div>
                                    <BookingStatusBadge status={booking.status} />
                                </div>

                                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <Mail className="size-4 shrink-0" aria-hidden="true" />
                                        <span className="truncate">
                                            {booking.customerName ? `${booking.customerName} · ` : ""}
                                            {booking.customerEmail}
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Phone className="size-4 shrink-0" aria-hidden="true" />
                                        {dash(booking.customerPhone)}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <MapPin className="size-4 shrink-0" aria-hidden="true" />
                                        <span className="truncate">{dash(booking.address)}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                                        {dash(formatDate(booking.preferredDate))}
                                    </li>
                                </ul>

                                <p className="mt-3 line-clamp-3 rounded-xl bg-muted/60 px-3 py-2.5 text-sm text-muted-foreground">
                                    {booking.problemDescription || "No problem description provided."}
                                </p>

                                <div className="mt-auto space-y-3 border-t border-dashed pt-4">
                                    <p className="mt-4 text-xl font-bold tracking-tight">
                                        {formatCurrency(booking.finalAmount ?? booking.basePrice)}
                                    </p>
                                    <RequestActions booking={booking} />
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
