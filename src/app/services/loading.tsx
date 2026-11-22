import { Skeleton } from "@/components/ui/skeleton";
import { PageHeaderSkeleton, PublicPageSkeleton, ServiceGridSkeleton } from "@/components/shared/Skeletons";

export default function ServicesLoading() {
    return (
        <PublicPageSkeleton>
            <PageHeaderSkeleton />
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
                {/* Filters */}
                <div className="mb-8 flex flex-col gap-3 rounded-2xl border bg-white p-4 md:flex-row">
                    <Skeleton className="h-10 flex-1 rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg md:w-44" />
                    <Skeleton className="h-10 w-full rounded-lg md:w-44" />
                    <Skeleton className="h-10 w-full rounded-lg md:w-44" />
                </div>
                <Skeleton className="mb-6 h-4 w-48" />
                <ServiceGridSkeleton count={8} />
            </section>
        </PublicPageSkeleton>
    );
}
