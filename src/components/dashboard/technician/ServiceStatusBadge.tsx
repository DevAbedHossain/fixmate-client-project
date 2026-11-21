import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { IService } from "@/types/Service";

type ApprovalStatus = IService["approvalStatus"];

const statusStyles: Record<ApprovalStatus, { label: string; className: string }> = {
    pending: {
        label: "Pending",
        className: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-400",
    },
    approved: {
        label: "Approved",
        className: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    rejected: {
        label: "Rejected",
        className: "border-red-300 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400",
    },
};

export default function ServiceStatusBadge({ status }: { status: ApprovalStatus }) {
    const { label, className } = statusStyles[status] ?? statusStyles.pending;

    return (
        <Badge variant="outline" className={cn("font-semibold", className)}>
            {label}
        </Badge>
    );
}
