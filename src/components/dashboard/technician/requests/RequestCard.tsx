import { formatDate, formatTicket } from "@/lib/format";
import type { IBooking } from "@/types/Booking";

import { BookingStatusBadge } from "./BookingStatusBadge";
import RequestActions from "./RequestActions";

function Detail({ label, value, className }: { label: string; value: string; className?: string }) {
    return (
        <p className={className}>
            <span className="text-muted-foreground">{label}: </span>
            <span className="font-medium break-words">{value}</span>
        </p>
    );
}

export default function RequestCard({ booking }: { booking: IBooking }) {
    // Completed jobs show the agreed final amount; everything else shows the base price
    const amount = booking.status === "completed" && booking.finalAmount != null ? booking.finalAmount : booking.basePrice;

    return (
        <article className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm md:flex-row">
            {/* Job details */}
            <div className="min-w-0 flex-1 space-y-4 p-5">
                <header className="space-y-1">
                    <h2 className="text-lg font-semibold leading-snug">{booking.serviceTitle}</h2>
                    <p className="text-sm text-muted-foreground">
                        Requested {formatDate(booking.createdAt)}, preferred {formatDate(booking.preferredDate)}
                    </p>
                </header>

                <div className="grid gap-2 text-sm sm:grid-cols-2">
                    <Detail label="Customer" value={booking.customerName} />
                    <Detail label="Phone" value={booking.customerPhone} />
                    <Detail label="Address" value={booking.address} className="sm:col-span-2" />
                </div>

                <p className="rounded-lg bg-muted/60 px-3 py-2.5 text-sm text-muted-foreground">
                    {booking.problemDescription}
                </p>
            </div>

            {/* Ticket stub */}
            <aside className="flex flex-col gap-3 border-t border-dashed bg-muted/30 p-5 md:w-60 md:shrink-0 md:border-t-0 md:border-l">
                <div className="flex items-center justify-between gap-2 md:flex-col md:items-start">
                    <span className="font-mono text-xs text-muted-foreground">Ticket {formatTicket(booking._id)}</span>
                    <BookingStatusBadge status={booking.status} />
                </div>

                <p className="text-2xl font-bold tracking-tight">${amount}</p>

                <RequestActions booking={booking} />
            </aside>
        </article>
    );
}
