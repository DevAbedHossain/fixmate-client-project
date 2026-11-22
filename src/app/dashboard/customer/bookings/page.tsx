import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CalendarX2, Wrench } from "lucide-react";

import CustomerBookingActions from "@/components/dashboard/customer/CustomerBookingActions";
import JobTimeline from "@/components/dashboard/customer/JobTimeline";
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/dashboard/technician/requests/BookingStatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { getMyBookings } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";
import type { IBooking } from "@/types/Booking";

export const metadata: Metadata = {
    title: "My Bookings | FixMate",
};

function ServiceThumb({ booking, size = "size-12" }: { booking: IBooking; size?: string }) {
    return (
        <span className={`relative ${size} shrink-0 overflow-hidden rounded-lg bg-muted`}>
            {booking.serviceImage ? (
                <Image src={booking.serviceImage} alt="" fill sizes="56px" className="object-cover" />
            ) : (
                <Wrench className="absolute inset-0 m-auto size-5 text-muted-foreground" aria-hidden="true" />
            )}
        </span>
    );
}

/** Base price, plus the final amount once the technician has set it */
function Amount({ booking }: { booking: IBooking }) {
    const hasFinal = booking.status === "completed" && booking.finalAmount != null;
    return (
        <div>
            <p className="font-semibold">{formatCurrency(hasFinal ? booking.finalAmount! : booking.basePrice)}</p>
            <p className="text-xs text-muted-foreground">
                {hasFinal ? `Base ${formatCurrency(booking.basePrice)}` : "Base price"}
            </p>
        </div>
    );
}

export default async function MyBookingsPage() {
    await requireRole("customer");
    const bookings = await getMyBookings(await getServerToken());

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">My bookings</h1>
                <p className="text-sm text-muted-foreground">
                    Follow each repair step by step. Pay only after the job is completed.
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <CalendarX2 className="size-7" aria-hidden="true" />
                    </span>
                    <div className="space-y-1">
                        <h2 className="font-semibold">No bookings yet</h2>
                        <p className="text-sm text-muted-foreground">Find a verified technician and send your first repair request.</p>
                    </div>
                    <Link href="/services" className={buttonVariants()}>
                        Browse services
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {bookings.map((booking) => (
                        <article key={booking._id} className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                                {/* Service + technician */}
                                <div className="flex min-w-0 flex-1 gap-3">
                                    <ServiceThumb booking={booking} size="size-14" />
                                    <div className="min-w-0 space-y-1">
                                        <Link
                                            href={`/services/${booking.serviceId}`}
                                            className="line-clamp-1 font-semibold leading-snug hover:text-primary"
                                        >
                                            {booking.serviceTitle}
                                        </Link>
                                        <p className="text-sm text-muted-foreground">by {booking.technicianName}</p>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <BookingStatusBadge status={booking.status} />
                                            <PaymentStatusBadge status={booking.paymentStatus} />
                                        </div>
                                    </div>
                                </div>

                                {/* Date + amount */}
                                <div className="flex gap-6 text-sm lg:w-56 lg:justify-end">
                                    <div>
                                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <CalendarDays className="size-3.5" aria-hidden="true" />
                                            Preferred date
                                        </p>
                                        <p className="font-medium">{formatDate(booking.preferredDate)}</p>
                                    </div>
                                    <Amount booking={booking} />
                                </div>

                                {/* Action */}
                                <div className="flex lg:w-40 lg:justify-end">
                                    <CustomerBookingActions booking={booking} />
                                </div>
                            </div>

                            {/* Job timeline tracker */}
                            <div className="mt-4 border-t border-dashed pt-4">
                                <JobTimeline booking={booking} />
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
