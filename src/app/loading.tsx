import { Skeleton } from "@/components/ui/skeleton";
import { PublicPageSkeleton, ServiceGridSkeleton } from "@/components/shared/Skeletons";

/** Default public skeleton (Home, About and any page without its own loading state). */
export default function Loading() {
    return (
        <PublicPageSkeleton>
            {/* Hero */}
            <section className="bg-linear-to-br from-sky-50 via-blue-50/80 to-white">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
                    <div className="space-y-5">
                        <Skeleton className="h-7 w-40 rounded-full bg-blue-100" />
                        <Skeleton className="h-12 w-full bg-blue-100" />
                        <Skeleton className="h-12 w-3/4 bg-blue-100" />
                        <Skeleton className="h-5 w-5/6 bg-blue-100" />
                        <div className="flex gap-3 pt-2">
                            <Skeleton className="h-11 w-36 rounded-xl bg-blue-100" />
                            <Skeleton className="h-11 w-36 rounded-xl bg-blue-100" />
                        </div>
                    </div>
                    <Skeleton className="aspect-4/3 w-full rounded-3xl bg-blue-100" />
                </div>
            </section>

            {/* Content */}
            <section className="mx-auto max-w-7xl space-y-8 px-4 py-14 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-xl space-y-3 text-center">
                    <Skeleton className="mx-auto h-8 w-64" />
                    <Skeleton className="mx-auto h-4 w-80 max-w-full" />
                </div>
                <ServiceGridSkeleton count={4} />
            </section>
        </PublicPageSkeleton>
    );
}
