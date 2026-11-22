import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface PaginationProps {
    page: number;
    totalPages: number;
    /** Current filters, kept on every page link */
    params: Record<string, string | undefined>;
}

const hrefFor = (params: PaginationProps["params"], page: number) => {
    const query = new URLSearchParams(
        Object.entries({ ...params, page: page > 1 ? String(page) : undefined }).filter(
            (entry): entry is [string, string] => Boolean(entry[1])
        )
    );
    return query.size ? `/services?${query}` : "/services";
};

/** Page numbers with "…" gaps, e.g. 1 … 4 5 6 … 10 */
const pageList = (page: number, totalPages: number) => {
    const pages = new Set([1, totalPages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= totalPages));
    const sorted = [...pages].sort((a, b) => a - b);
    return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? ["gap" as const, p] : [p]));
};

const itemClass =
    "flex h-10 min-w-10 items-center justify-center gap-1 rounded-xl border px-3 text-sm font-medium transition-colors";

/** Previous / page numbers / Next — all plain links, so it works with the server-side filters. */
export default function Pagination({ page, totalPages, params }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {page > 1 ? (
                <Link href={hrefFor(params, page - 1)} className={cn(itemClass, "bg-card hover:bg-muted")} scroll={false}>
                    <ChevronLeft className="size-4" aria-hidden="true" />
                    Previous
                </Link>
            ) : (
                <span className={cn(itemClass, "cursor-not-allowed bg-card opacity-50")} aria-disabled="true">
                    <ChevronLeft className="size-4" aria-hidden="true" />
                    Previous
                </span>
            )}

            {pageList(page, totalPages).map((item, i) =>
                item === "gap" ? (
                    <span key={`gap-${i}`} className="px-1 text-muted-foreground">…</span>
                ) : (
                    <Link
                        key={item}
                        href={hrefFor(params, item)}
                        scroll={false}
                        aria-current={item === page ? "page" : undefined}
                        className={cn(
                            itemClass,
                            item === page ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
                        )}
                    >
                        {item}
                    </Link>
                )
            )}

            {page < totalPages ? (
                <Link href={hrefFor(params, page + 1)} className={cn(itemClass, "bg-card hover:bg-muted")} scroll={false}>
                    Next
                    <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
            ) : (
                <span className={cn(itemClass, "cursor-not-allowed bg-card opacity-50")} aria-disabled="true">
                    Next
                    <ChevronRight className="size-4" aria-hidden="true" />
                </span>
            )}
        </nav>
    );
}
