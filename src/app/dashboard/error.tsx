"use client";

import ErrorState from "@/components/shared/ErrorState";

/** Error boundary inside the dashboard layout, so the sidebar stays visible. */
export default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorState reset={reset} homeHref="/dashboard" />;
}
