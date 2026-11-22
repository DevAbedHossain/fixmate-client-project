import Navbar from "@/components/shared/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

/** Same shape as ServiceCard, so the grid doesn't jump when data arrives. */
export function ServiceCardSkeleton() {
    return (
        <div className="flex h-full flex-col rounded-3xl border bg-card p-2 shadow-sm">
            <Skeleton className="aspect-4/3 w-full rounded-2xl" />
            <div className="flex flex-1 flex-col gap-3 px-3 pt-4 pb-3">
                <Skeleton className="h-5 w-4/5" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-24 rounded-lg" />
                    <Skeleton className="h-6 w-16 rounded-lg" />
                </div>
                <div className="flex items-center gap-2.5">
                    <Skeleton className="size-8 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
                <div className="mt-auto space-y-3 border-t border-dashed pt-3">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}

export function ServiceGridSkeleton({ count = 8, columns = 4 }: { count?: number; columns?: 3 | 4 }) {
    return (
        <div
            className={cn(
                "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                columns === 4 && "xl:grid-cols-4"
            )}
        >
            {Array.from({ length: count }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
            ))}
        </div>
    );
}

/** Title + subtitle used at the top of dashboard pages. */
export function DashboardTitleSkeleton({ withAction = false }: { withAction?: boolean }) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-4 w-80 max-w-full" />
            </div>
            {withAction && <Skeleton className="h-10 w-72 max-w-full rounded-xl" />}
        </div>
    );
}

export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="flex gap-4 border-b bg-muted/40 px-4 py-3">
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            {Array.from({ length: rows }).map((_, r) => (
                <div key={r} className="flex items-center gap-4 border-b px-4 py-4 last:border-b-0">
                    <Skeleton className="size-9 shrink-0 rounded-full" />
                    {Array.from({ length: cols - 1 }).map((_, c) => (
                        <Skeleton key={c} className="h-4 flex-1" />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function FormSkeleton({ fields = 6 }: { fields?: number }) {
    return (
        <div className="space-y-5 rounded-2xl border bg-card p-6">
            {Array.from({ length: fields }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            ))}
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
    );
}

/** Wrapper for dashboard loading states (renders inside the dashboard layout). */
export function DashboardPageSkeleton({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-6xl space-y-6" role="status" aria-label="Loading">
            {children}
            <span className="sr-only">Loading…</span>
        </div>
    );
}

/** Wrapper for public loading states: real navbar + skeleton content. */
export function PublicPageSkeleton({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="flex-1 bg-slate-50" role="status" aria-label="Loading">
                {children}
                <span className="sr-only">Loading…</span>
            </main>
        </>
    );
}

/** Coloured page header band used on Services / About. */
export function PageHeaderSkeleton() {
    return (
        <section className="border-b bg-linear-to-br from-sky-50 via-blue-50/80 to-white">
            <div className="mx-auto max-w-7xl space-y-4 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <Skeleton className="h-7 w-28 rounded-full bg-blue-100" />
                <Skeleton className="h-10 w-80 max-w-full bg-blue-100" />
                <Skeleton className="h-5 w-[32rem] max-w-full bg-blue-100" />
            </div>
        </section>
    );
}
