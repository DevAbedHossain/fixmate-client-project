import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/** Read-only 5-star display (rounded to the nearest whole star). */
export function RatingStars({ value, className }: { value: number; className?: string }) {
    const filled = Math.round(value);
    return (
        <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    aria-hidden="true"
                    className={cn("size-3.5", star <= filled ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/40")}
                />
            ))}
        </span>
    );
}

/** Compact "★ 4.8 (12)" badge, or "New" when there are no reviews yet. */
export function RatingBadge({ avg, count, className }: { avg?: number; count?: number; className?: string }) {
    if (!count || !avg) {
        return <span className={cn("text-xs font-medium text-muted-foreground", className)}>New</span>;
    }
    return (
        <span className={cn("inline-flex items-center gap-1 text-xs font-semibold text-foreground", className)}>
            <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            {avg.toFixed(1)}
            <span className="font-normal text-muted-foreground">({count})</span>
        </span>
    );
}
