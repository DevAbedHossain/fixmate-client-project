import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, TriangleAlert } from "lucide-react";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { verifyPayment } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";
import type { IPayment } from "@/types/Payment";

export const metadata: Metadata = {
    title: "Payment Successful | FixMate",
};

export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    await requireRole("customer");
    const { session_id } = await searchParams;

    // Verifying is idempotent on the server, so reloading this page never saves the payment twice
    let payment: IPayment | null = null;
    let errorMessage = "Missing payment session.";
    if (session_id) {
        try {
            payment = await verifyPayment(session_id, await getServerToken());
        } catch (error) {
            errorMessage = error instanceof Error ? error.message : "We could not verify this payment.";
        }
    }

    return (
        <>
            <Navbar />
            <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
                <div className="w-full max-w-md rounded-3xl border bg-card p-8 text-center shadow-sm">
                    {payment ? (
                        <>
                            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <CheckCircle2 className="size-8" aria-hidden="true" />
                            </span>
                            <h1 className="mt-5 text-2xl font-bold tracking-tight">Payment successful</h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Thanks! Your payment for &ldquo;{payment.serviceTitle}&rdquo; is complete.
                            </p>

                            <dl className="mt-6 space-y-3 rounded-2xl bg-muted/60 p-4 text-left text-sm">
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted-foreground">Amount paid</dt>
                                    <dd className="font-semibold">{formatCurrency(payment.amount)}</dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted-foreground">Technician</dt>
                                    <dd className="font-medium">{payment.technicianName}</dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted-foreground">Date</dt>
                                    <dd className="font-medium">{formatDate(payment.paidAt)}</dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="text-muted-foreground">Transaction ID</dt>
                                    <dd className="font-mono text-xs break-all">{payment.transactionId}</dd>
                                </div>
                            </dl>
                        </>
                    ) : (
                        <>
                            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                <TriangleAlert className="size-8" aria-hidden="true" />
                            </span>
                            <h1 className="mt-5 text-2xl font-bold tracking-tight">Payment not confirmed</h1>
                            <p className="mt-2 text-sm text-muted-foreground">{errorMessage}</p>
                        </>
                    )}

                    <Link href="/dashboard/customer/bookings" className={buttonVariants({ className: "mt-6 w-full" })}>
                        Back to My Bookings
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
