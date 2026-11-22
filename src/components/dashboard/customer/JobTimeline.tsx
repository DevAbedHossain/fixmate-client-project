import { Check, X } from "lucide-react";

import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { IBooking } from "@/types/Booking";

const STEPS = [
    { key: "requested", label: "Requested" },
    { key: "accepted", label: "Accepted" },
    { key: "in-progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
    { key: "paid", label: "Paid" },
] as const;

/**
 * Visual step tracker: Requested → Accepted → In Progress → Completed → Paid.
 * Dates come from the booking's statusHistory. Rejected / cancelled jobs end with a red step.
 */
export default function JobTimeline({ booking }: { booking: IBooking }) {
    const history = booking.statusHistory ?? [];
    const dateOf = (status: string) => history.find((entry) => entry.status === status)?.changedAt;

    const stopped = booking.status === "rejected" || booking.status === "cancelled";
    const reached = booking.paymentStatus === "paid" ? 4 : STEPS.findIndex((step) => step.key === booking.status);
    const steps = stopped
        ? [STEPS[0], { key: booking.status, label: booking.status === "rejected" ? "Rejected" : "Cancelled" }]
        : STEPS;

    return (
        <ol className="flex w-full items-start" aria-label="Job progress">
            {steps.map((step, index) => {
                const isStopStep = stopped && index === 1;
                const done = stopped ? true : index <= reached;
                const date = dateOf(step.key);

                return (
                    <li key={step.key} className="relative flex flex-1 flex-col items-center text-center">
                        {/* Connector to the previous step */}
                        {index > 0 && (
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "absolute top-3 right-1/2 h-0.5 w-full",
                                    done ? (isStopStep ? "bg-red-300" : "bg-emerald-500") : "bg-border"
                                )}
                            />
                        )}
                        <span
                            className={cn(
                                "relative z-10 flex size-6 items-center justify-center rounded-full border-2 text-white",
                                isStopStep
                                    ? "border-red-500 bg-red-500"
                                    : done
                                        ? "border-emerald-500 bg-emerald-500"
                                        : "border-border bg-background"
                            )}
                        >
                            {isStopStep ? <X className="size-3.5" /> : done ? <Check className="size-3.5" /> : null}
                        </span>
                        <span className={cn("mt-1.5 text-[11px] leading-tight font-medium", done ? "text-foreground" : "text-muted-foreground")}>
                            {step.label}
                        </span>
                        {date && <span className="text-[10px] text-muted-foreground">{formatDate(date)}</span>}
                    </li>
                );
            })}
        </ol>
    );
}
