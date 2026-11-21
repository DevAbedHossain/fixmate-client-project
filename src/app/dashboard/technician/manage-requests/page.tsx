import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Inbox } from "lucide-react";

import RequestCard from "@/components/dashboard/technician/requests/RequestCard";
import RequestStatusFilter, {
    REQUEST_FILTERS,
    type RequestFilter,
} from "@/components/dashboard/technician/requests/RequestStatusFilter";
import { getBookings } from "@/lib/api/GetAPI";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Manage Requests | FixMate",
};

const isRequestFilter = (value: unknown): value is RequestFilter =>
    REQUEST_FILTERS.some((filter) => filter.value === value);

export default async function ManageRequestsPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/sign-in");
    }

    const { status } = await searchParams;
    const activeFilter: RequestFilter = isRequestFilter(status) ? status : "all";

    const allBookings = await getBookings();

    // Only this technician's jobs, newest first
    const bookings = allBookings
        .filter((booking) => booking.technicianEmail === session.user.email)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const counts = Object.fromEntries(
        REQUEST_FILTERS.map(({ value }) => [
            value,
            value === "all" ? bookings.length : bookings.filter((booking) => booking.status === value).length,
        ])
    ) as Record<RequestFilter, number>;

    const visibleBookings =
        activeFilter === "all" ? bookings : bookings.filter((booking) => booking.status === activeFilter);

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Manage requests</h1>
                    <p className="text-sm text-muted-foreground">Move each job forward one step at a time.</p>
                </div>

                <RequestStatusFilter active={activeFilter} counts={counts} />
            </div>

            {visibleBookings.length > 0 ? (
                <div className="space-y-4">
                    {visibleBookings.map((booking) => (
                        <RequestCard key={booking._id} booking={booking} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card px-6 py-16 text-center">
                    <Inbox className="size-10 text-muted-foreground" aria-hidden="true" />
                    <div className="space-y-1">
                        <h2 className="font-semibold">No requests here</h2>
                        <p className="text-sm text-muted-foreground">
                            {activeFilter === "all"
                                ? "When customers book your services, their requests will appear here."
                                : "There are no requests with this status right now."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
