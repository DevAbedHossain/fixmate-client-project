import Link from "next/link";

import { cn } from "@/lib/utils";

export interface FilterOption {
    value: string;
    label: string;
}

interface FilterTabsProps {
    options: FilterOption[];
    active: string;
    counts: Record<string, number>;
    /** Query parameter name, e.g. "status" → ?status=pending */
    param?: string;
    /** Value that means "no filter" (link without the parameter) */
    allValue?: string;
    label: string;
}

/** Pill tabs that filter a list through the URL, so the filter survives a reload. */
export default function FilterTabs({ options, active, counts, param = "status", allValue = "all", label }: FilterTabsProps) {
    return (
        <nav aria-label={label} className="-mx-1 overflow-x-auto px-1 pb-1">
            <ul className="flex w-max gap-1 rounded-xl border bg-card p-1 shadow-sm">
                {options.map(({ value, label: optionLabel }) => {
                    const isActive = value === active;

                    return (
                        <li key={value}>
                            <Link
                                href={value === allValue ? "?" : `?${param}=${encodeURIComponent(value)}`}
                                scroll={false}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                {optionLabel}
                                <span className={cn("font-mono text-xs", isActive ? "opacity-80" : "opacity-60")}>
                                    {counts[value] ?? 0}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
