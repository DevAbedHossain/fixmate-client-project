import { Loader2 } from "lucide-react";

/** Shown instantly while any public page loads, so clicks feel responsive. */
export default function Loading() {
    return (
        <div className="flex min-h-[60vh] flex-1 items-center justify-center" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">Loading…</span>
            </div>
        </div>
    );
}
