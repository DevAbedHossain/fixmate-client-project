import { Skeleton } from "@/components/ui/skeleton";
import { PublicPageSkeleton } from "@/components/shared/Skeletons";

export default function ServiceDetailsLoading() {
    return (
        <PublicPageSkeleton>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
                <Skeleton className="mb-6 h-4 w-60" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
                    {/* Main column */}
                    <div className="space-y-6">
                        <Skeleton className="aspect-video w-full rounded-3xl" />
                        <div className="space-y-3 rounded-3xl border bg-white p-6">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-40" />
                            <div className="grid gap-3 pt-3 sm:grid-cols-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-16 rounded-2xl" />
                                ))}
                            </div>
                            <div className="space-y-2 pt-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                        <div className="space-y-4 rounded-3xl border bg-white p-6">
                            <Skeleton className="h-6 w-40" />
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="size-10 shrink-0 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking sidebar */}
                    <div className="space-y-6">
                        <div className="space-y-4 rounded-3xl border bg-white p-6">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-9 w-32" />
                            <Skeleton className="h-11 w-full rounded-xl" />
                        </div>
                        <div className="flex items-center gap-3 rounded-3xl border bg-white p-6">
                            <Skeleton className="size-14 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicPageSkeleton>
    );
}
