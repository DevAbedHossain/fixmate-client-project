import Link from "next/link";

import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types/Booking";

export type RequestFilter = "all" | Extract<BookingStatus, "requested" | "accepted" | "in-progress" | "completed">;

export const REQUEST_FILTERS: { value: RequestFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "requested", label: "Requested" },
    { value: "accepted", label: "Accepted" },
    { value: "in-progress", label: "In progress" },
    { value: "completed", label: "Completed" },
];

interface RequestStatusFilterProps {
    active: RequestFilter;
    counts: Record<RequestFilter, number>;
}

export default function RequestStatusFilter({ active, counts }: RequestStatusFilterProps) {
    return (
        <nav aria-label="Filter requests by status" className="-mx-1 overflow-x-auto px-1 pb-1">
            <ul className="flex w-max gap-1 rounded-xl border bg-card p-1 shadow-sm">
                {REQUEST_FILTERS.map(({ value, label }) => {
                    const isActive = value === active;

                    return (
                        <li key={value}>
                            <Link
                                href={value === "all" ? "?" : `?status=${value}`}
                                scroll={false}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                {label}
                                <span className={cn("font-mono text-xs", isActive ? "opacity-80" : "opacity-60")}>
                                    {counts[value]}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
