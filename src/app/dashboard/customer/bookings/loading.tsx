import { DashboardPageSkeleton, DashboardTitleSkeleton, TableSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
    return (
        <DashboardPageSkeleton>
            <DashboardTitleSkeleton withAction />
            <TableSkeleton rows={5} cols={6} />
        </DashboardPageSkeleton>
    );
}
