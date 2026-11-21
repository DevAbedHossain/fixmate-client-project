import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string | number;
    hint?: string;
    icon: LucideIcon;
    /** Filled, high-emphasis variant for the headline metric */
    highlight?: boolean;
}

export default function StatCard({ label, value, hint, icon: Icon, highlight = false }: StatCardProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-2 rounded-xl border p-5 shadow-sm",
                highlight ? "border-transparent bg-primary text-primary-foreground" : "bg-card"
            )}
        >
            <div className="flex items-center justify-between gap-3">
                <p className={cn("text-sm", highlight ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {label}
                </p>
                <Icon
                    className={cn("size-4", highlight ? "text-primary-foreground/70" : "text-muted-foreground")}
                    aria-hidden="true"
                />
            </div>

            <p className="text-3xl font-bold tracking-tight">{value}</p>

            {hint && (
                <p className={cn("text-xs", highlight ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {hint}
                </p>
            )}
        </div>
    );
}
