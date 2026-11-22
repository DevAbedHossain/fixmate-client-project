import type { Metadata } from "next";
import { CircleDollarSign, Receipt } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllPayments } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";

export const metadata: Metadata = {
    title: "Transactions | FixMate",
};

export default async function TransactionsPage() {
    await requireRole("admin");
    const payments = await getAllPayments(await getServerToken());
    const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Transactions</h1>
                <p className="text-sm text-muted-foreground">Every Stripe payment saved on FixMate.</p>
            </div>

            {/* Total revenue above the table */}
            <div className="flex items-center gap-4 rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm">
                <span className="flex size-12 items-center justify-center rounded-xl bg-white/15">
                    <CircleDollarSign className="size-6" aria-hidden="true" />
                </span>
                <div>
                    <p className="text-sm text-primary-foreground/80">Total revenue</p>
                    <p className="text-3xl font-bold tracking-tight">{formatCurrency(revenue)}</p>
                </div>
                <p className="ml-auto hidden text-sm text-primary-foreground/80 sm:block">
                    {payments.length} {payments.length === 1 ? "payment" : "payments"}
                </p>
            </div>

            {payments.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
                    <Receipt className="size-10 text-muted-foreground" aria-hidden="true" />
                    <p className="font-semibold">No transactions yet</p>
                    <p className="text-sm text-muted-foreground">Payments appear here after customers pay for completed jobs.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="pl-5">Customer</TableHead>
                                <TableHead>Technician</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead className="pr-5">Payment date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment._id}>
                                    <TableCell className="py-3 pl-5">
                                        <p className="font-medium">{payment.customerName}</p>
                                        <p className="text-xs text-muted-foreground">{payment.customerEmail}</p>
                                    </TableCell>
                                    <TableCell>{payment.technicianName}</TableCell>
                                    <TableCell className="max-w-56 truncate">{payment.serviceTitle}</TableCell>
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
