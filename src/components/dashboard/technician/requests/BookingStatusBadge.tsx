import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookingStatus, PaymentStatus } from "@/types/Booking";

const statusStyles: Record<BookingStatus, { label: string; className: string }> = {
    requested: {
        label: "Requested",
        className: "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-400",
    },
    accepted: {
        label: "Accepted",
        className: "border-teal-300 bg-teal-50 text-teal-700 dark:border-teal-500/40 dark:bg-teal-500/10 dark:text-teal-400",
    },
    "in-progress": {
        label: "In Progress",
        className: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-400",
    },
    completed: {
        label: "Completed",
        className: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    rejected: {
        label: "Rejected",
        className: "border-red-300 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400",
    },
    cancelled: {
        label: "Cancelled",
        className: "border-border bg-muted text-muted-foreground",
    },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
    const { label, className } = statusStyles[status] ?? statusStyles.requested;

    return (
        <Badge variant="outline" className={cn("gap-1.5 font-semibold", className)}>
            <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
            {label}
        </Badge>
    );
}

export function PaymentStatusBadge({ status = "unpaid" }: { status?: PaymentStatus }) {
    const isPaid = status === "paid";

    return (
        <Badge
            variant="outline"
            className={cn(
                "font-semibold",
                isPaid
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-400"
            )}
        >
            {isPaid ? "Paid" : "Payment due"}
        </Badge>
    );
}
