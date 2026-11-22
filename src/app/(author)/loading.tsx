import { Skeleton } from "@/components/ui/skeleton";
import { PublicPageSkeleton } from "@/components/shared/Skeletons";

export default function AuthLoading() {
    return (
        <PublicPageSkeleton>
            <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-5 rounded-3xl border bg-white p-8 shadow-sm">
                    <div className="space-y-2 text-center">
                        <Skeleton className="mx-auto h-8 w-48" />
                        <Skeleton className="mx-auto h-4 w-64" />
                    </div>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    ))}
                    <Skeleton className="h-11 w-full rounded-xl" />
                    <Skeleton className="h-11 w-full rounded-xl" />
                </div>
            </div>
        </PublicPageSkeleton>
    );
}
