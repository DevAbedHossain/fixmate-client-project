import Link from "next/link";
import { SearchX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
            <div className="flex max-w-md flex-col items-center gap-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <SearchX className="size-8" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-blue-600">404</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Page not found</h1>
                <p className="text-sm leading-6 text-slate-500">
                    The page or service you&apos;re looking for doesn&apos;t exist or is no longer available.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                    <Link href="/services" className={buttonVariants()}>
                        Browse services
                    </Link>
                    <Link href="/" className={buttonVariants({ variant: "outline" })}>
                        Back to home
                    </Link>
                </div>
            </div>
        </main>
    );
}
