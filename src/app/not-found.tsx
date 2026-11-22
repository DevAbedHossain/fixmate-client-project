import Link from "next/link";
import { Hammer, Home, Search, Wrench } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

/** 404 with a repair/tools illustration. */
export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] flex-1 items-center justify-center bg-linear-to-br from-sky-50 via-blue-50/60 to-white px-4 py-16">
            <div className="flex max-w-lg flex-col items-center text-center">
                {/* Tools illustration */}
                <div aria-hidden="true" className="relative mb-8 flex items-center justify-center">
                    <span className="text-[7rem] leading-none font-black tracking-tighter text-blue-100 sm:text-[9rem]">
                        4<span className="text-blue-200">0</span>4
                    </span>
                    <span className="absolute flex size-24 items-center justify-center rounded-full bg-white shadow-xl ring-8 ring-blue-50">
                        <Wrench className="size-11 -rotate-45 text-blue-600" />
                    </span>
                    <Hammer className="absolute -top-2 -right-4 size-9 rotate-12 text-amber-500" />
                    <span className="absolute -bottom-3 left-2 size-3 rounded-full bg-blue-300" />
                    <span className="absolute top-4 -left-3 size-2 rounded-full bg-amber-300" />
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">This page needs a repair</h1>
                <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
                    The page or service you&apos;re looking for doesn&apos;t exist, was removed, or isn&apos;t available right now.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link href="/" className={buttonVariants({ className: "h-11 gap-2 px-5" })}>
                        <Home className="size-4" aria-hidden="true" />
                        Back to Home
                    </Link>
                    <Link href="/services" className={buttonVariants({ variant: "outline", className: "h-11 gap-2 px-5" })}>
                        <Search className="size-4" aria-hidden="true" />
                        Browse services
                    </Link>
                </div>
            </div>
        </main>
    );
}
