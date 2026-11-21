import Link from "next/link";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";

export interface OverviewListItem {
    id: string;
    title: string;
    subtitle: string;
    meta: string;
    /** Use a monospace style for references like ticket numbers */
    monoMeta?: boolean;
}

interface OverviewPanelProps {
    title: string;
    description?: string;
    action?: { label: string; href: string };
    items: OverviewListItem[];
    emptyMessage: string;
}

export default function OverviewPanel({ title, description, action, items, emptyMessage }: OverviewPanelProps) {
    return (
        <section className="flex flex-col rounded-xl border bg-card p-5 shadow-sm sm:p-6">
            <header className="mb-4 flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>

                {action && (
                    <Link href={action.href} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                        {action.label}
                    </Link>
                )}
            </header>

            {items.length > 0 ? (
                <ul className="divide-y">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                            <div className="min-w-0">
                                <p className="truncate font-medium">{item.title}</p>
                                <p className="truncate text-sm text-muted-foreground">{item.subtitle}</p>
                            </div>
                            <MetaText mono={item.monoMeta}>{item.meta}</MetaText>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="flex flex-1 items-center justify-center py-8 text-center text-sm text-muted-foreground">
                    {emptyMessage}
                </p>
            )}
        </section>
    );
}

function MetaText({ mono, children }: { mono?: boolean; children: ReactNode }) {
    return mono ? (
        <span className="shrink-0 font-mono text-xs text-muted-foreground">{children}</span>
    ) : (
        <span className="shrink-0 font-semibold">{children}</span>
    );
}
