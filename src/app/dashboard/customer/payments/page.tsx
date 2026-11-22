import type { Metadata } from "next";
import Link from "next/link";
import { Receipt } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyPayments } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";


export default async function PaymentHistoryPage() {
    await requireRole("customer");
    const payments = await getMyPayments(await getServerToken());
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Payment history</h1>
                    <p className="text-sm text-muted-foreground">Every repair you have paid for.</p>
                </div>
                <div className="rounded-xl border bg-card px-5 py-3 shadow-sm">
                    <p className="text-xs text-muted-foreground">Total paid</p>
                    <p className="text-xl font-bold">{formatCurrency(totalPaid)}</p>
                </div>
            </div>

            {payments.length === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Receipt className="size-7" aria-hidden="true" />
                    </span>
                    <div className="space-y-1">
                        <h2 className="font-semibold">No payments yet</h2>
                        <p className="text-sm text-muted-foreground">Completed jobs you pay for will appear here.</p>
                    </div>
                    <Link href="/dashboard/customer/bookings" className={buttonVariants({ variant: "outline" })}>
                        Go to My Bookings
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="pl-5">Service</TableHead>
                                <TableHead>Technician</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead className="pr-5">Payment date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment._id}>
                                    <TableCell className="py-3 pl-5 font-medium">{payment.serviceTitle}</TableCell>
                                    <TableCell>{payment.technicianName}</TableCell>
                                    <TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">{payment.transactionId}</TableCell>
                                    <TableCell className="pr-5 text-muted-foreground">{formatDate(payment.paidAt)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
