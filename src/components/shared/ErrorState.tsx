"use client";

import Link from "next/link";
import { RotateCcw, TriangleAlert } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

/** Friendly error message with "Try again" (re-renders the segment) and a way home. */
export default function ErrorState({ reset, homeHref = "/" }: { reset: () => void; homeHref?: string }) {
    return (
        <div className="flex min-h-[60vh] flex-1 items-center justify-center px-4 py-16">
            <div className="flex max-w-md flex-col items-center gap-4 text-center">
                <span className="flex size-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <TriangleAlert className="size-8" aria-hidden="true" />
                </span>
                <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
                <p className="text-sm leading-6 text-muted-foreground">
                    We couldn&apos;t load this page. It may be a temporary problem with the connection or our server —
                    please try again.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                    <Button onClick={reset} className="cursor-pointer gap-2">
                        <RotateCcw className="size-4" aria-hidden="true" />
                        Try again
                    </Button>
                    <Link href={homeHref} className={buttonVariants({ variant: "outline" })}>
                        Go back
                    </Link>
                </div>
            </div>
        </div>
    );
}
