import { DashboardPageSkeleton, DashboardTitleSkeleton, TableSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
    return (
        <DashboardPageSkeleton>
            <DashboardTitleSkeleton withAction />
            <TableSkeleton rows={6} cols={5} />
        </DashboardPageSkeleton>
    );
}
