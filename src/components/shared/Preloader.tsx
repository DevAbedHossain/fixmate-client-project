"use client";

import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";

/**
 * Full-screen brand preloader shown on the first load (or a hard refresh).
 * It lives in the root layout, so client-side navigation never shows it again —
 * route changes use the loading.tsx skeletons instead.
 */
export default function Preloader() {
    const [hiding, setHiding] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const MIN_VISIBLE_MS = 600; // avoid a flash on fast connections
        const start = performance.now();
        let fadeTimer: ReturnType<typeof setTimeout>;
        let removeTimer: ReturnType<typeof setTimeout>;

        const finish = () => {
            const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
            fadeTimer = setTimeout(() => {
                setHiding(true);
                removeTimer = setTimeout(() => setHidden(true), 400);
            }, wait);
        };

        if (document.readyState === "complete") finish();
        else window.addEventListener("load", finish, { once: true });

        return () => {
            window.removeEventListener("load", finish);
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (hidden) return null;

    return (
        <div
            role="status"
            aria-label="Loading FixMate"
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-400 ${
                hiding ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
        >
            <div className="flex flex-col items-center gap-5">
                <div className="relative flex size-20 items-center justify-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand/20" />
                    <span className="absolute inset-0 animate-spin rounded-full border-4 border-brand/15 border-t-brand" />
                    <span className="flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg">
                        <Wrench className="size-6" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold tracking-tight">FixMate</p>
                    <p className="mt-1 text-sm text-muted-foreground">Getting things ready…</p>
                </div>
            </div>
        </div>
    );
}
