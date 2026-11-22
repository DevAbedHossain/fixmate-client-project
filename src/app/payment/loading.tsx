import { Skeleton } from "@/components/ui/skeleton";
import { PublicPageSkeleton } from "@/components/shared/Skeletons";

export default function PaymentLoading() {
    return (
        <PublicPageSkeleton>
            <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg space-y-5 rounded-3xl border bg-white p-8 text-center shadow-sm">
                    <Skeleton className="mx-auto size-16 rounded-full" />
                    <Skeleton className="mx-auto h-8 w-56" />
                    <Skeleton className="mx-auto h-4 w-72 max-w-full" />
                    <div className="space-y-3 rounded-2xl border p-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ))}
                    </div>
                    <Skeleton className="mx-auto h-11 w-48 rounded-xl" />
                </div>
            </div>
        </PublicPageSkeleton>
    );
}
