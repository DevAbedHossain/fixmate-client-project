"use client";

import ErrorState from "@/components/shared/ErrorState";

/** Error boundary for public pages. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorState reset={reset} />;
}
