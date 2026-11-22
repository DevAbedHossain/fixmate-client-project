import type { Metadata } from "next";
import Link from "next/link";
import { CircleX } from "lucide-react";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { requireRole } from "@/lib/require-role";

export const metadata: Metadata = {
    title: "Payment Cancelled | FixMate",
};

export default async function PaymentCancelPage() {
    await requireRole("customer");

    return (
        <>
            <Navbar />
            <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
                <div className="w-full max-w-md rounded-3xl border bg-card p-8 text-center shadow-sm">
                    <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <CircleX className="size-8" aria-hidden="true" />
                    </span>
                    <h1 className="mt-5 text-2xl font-bold tracking-tight">Payment cancelled</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        No worries — you weren&apos;t charged. You can pay for the job any time from My Bookings.
                    </p>
                    <Link href="/dashboard/customer/bookings" className={buttonVariants({ className: "mt-6 w-full" })}>
                        Try again
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
