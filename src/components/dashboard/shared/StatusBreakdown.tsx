import type { BookingStatus, IBooking } from "@/types/Booking";

/** Same colours as the status badges, used across every dashboard. */
const STATUS_BARS: { status: BookingStatus; label: string; color: string }[] = [
    { status: "requested", label: "Requested", color: "bg-blue-500" },
    { status: "accepted", label: "Accepted", color: "bg-indigo-500" },
    { status: "in-progress", label: "In Progress", color: "bg-amber-500" },
    { status: "completed", label: "Completed", color: "bg-emerald-500" },
    { status: "rejected", label: "Rejected", color: "bg-red-500" },
    { status: "cancelled", label: "Cancelled", color: "bg-slate-400" },
];

interface StatusBreakdownProps {
    bookings: Pick<IBooking, "status">[];
    title: string;
}

/** Horizontal bar chart of bookings per status (pure CSS, no chart library). */
export default function StatusBreakdown({ bookings, title }: StatusBreakdownProps) {
    const max = Math.max(1, ...STATUS_BARS.map(({ status }) => bookings.filter((b) => b.status === status).length));

    return (
        <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="mb-1 text-lg font-semibold">{title}</h2>
            <p className="mb-5 text-sm text-muted-foreground">{bookings.length} in total</p>

            <ul className="space-y-3.5">
                {STATUS_BARS.map(({ status, label, color }) => {
                    const count = bookings.filter((booking) => booking.status === status).length;

                    return (
                        <li key={status} className="grid grid-cols-[6.5rem_1fr_2rem] items-center gap-3 text-sm">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="h-2.5 overflow-hidden rounded-full bg-muted">
                                <span
                                    className={`block h-full rounded-full ${color} transition-all`}
                                    style={{ width: `${(count / max) * 100}%` }}
                                />
                            </span>
                            <span className="text-right font-semibold tabular-nums">{count}</span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
