import { Skeleton } from "@/components/ui/skeleton";
import { DashboardPageSkeleton, DashboardTitleSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
    return (
        <DashboardPageSkeleton>
            <DashboardTitleSkeleton withAction />
            <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-4 rounded-2xl border bg-card p-5">
                        <div className="flex items-start gap-3">
                            <Skeleton className="size-14 shrink-0 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-2 pt-2">
                            <Skeleton className="h-9 w-28 rounded-lg" />
                            <Skeleton className="h-9 w-28 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </DashboardPageSkeleton>
    );
}
