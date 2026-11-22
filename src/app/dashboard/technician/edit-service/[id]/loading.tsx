import { DashboardPageSkeleton, DashboardTitleSkeleton, FormSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
    return (
        <DashboardPageSkeleton>
            <DashboardTitleSkeleton />
            <FormSkeleton fields={6} />
        </DashboardPageSkeleton>
    );
}
