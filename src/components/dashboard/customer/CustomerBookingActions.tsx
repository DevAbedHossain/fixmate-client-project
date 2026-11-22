"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2, X } from "lucide-react";

import { PaymentStatusBadge } from "@/components/dashboard/technician/requests/BookingStatusBadge";
import { RatingStars } from "@/components/shared/RatingStars";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cancelBooking, createCheckoutSession } from "@/lib/api";
import { getClientToken } from "@/lib/auth-client";
import { formatCurrency } from "@/lib/format";
import type { IBooking } from "@/types/Booking";

import ReviewDialog from "./ReviewDialog";

/** Cancel (only "requested"), Pay Now (only completed + unpaid), or a Paid badge. */
export default function CustomerBookingActions({ booking }: { booking: IBooking }) {
    const router = useRouter();
    const [cancelOpen, setCancelOpen] = useState(false);
    const [busy, setBusy] = useState<"cancel" | "pay" | null>(null);

    const handleCancel = async () => {
        setCancelOpen(false);
        setBusy("cancel");
        try {
            await cancelBooking(booking._id ?? "", await getClientToken());
            toast.add({ type: "success", title: "Request cancelled", description: `"${booking.serviceTitle}" was cancelled.` });
            router.refresh();
        } catch (error) {
            toast.add({ type: "error", title: "Could not cancel", description: error instanceof Error ? error.message : "Please try again." });
        } finally {
            setBusy(null);
        }
    };

    const handlePay = async () => {
        setBusy("pay");
        try {
            const { url } = await createCheckoutSession(booking._id ?? "", await getClientToken());
            window.location.href = url; // Stripe Checkout
        } catch (error) {
            toast.add({ type: "error", title: "Payment failed", description: error instanceof Error ? error.message : "Please try again." });
            setBusy(null);
        }
    };

    if (booking.status === "requested") {
        return (
            <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
                <AlertDialogTrigger
                    render={
                        <Button variant="outline" size="sm" className="cursor-pointer" disabled={busy !== null}>
                            {busy === "cancel" ? <Loader2 className="animate-spin" /> : <X />}
                            Cancel
                        </Button>
                    }
                />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel this request?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your request for &ldquo;{booking.serviceTitle}&rdquo; will be cancelled. This can&apos;t be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Keep request</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleCancel}>
                            Cancel request
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }

    if (booking.status === "completed" && booking.paymentStatus !== "paid") {
        return (
            <Button size="sm" className="cursor-pointer" onClick={handlePay} disabled={busy !== null}>
                {busy === "pay" ? <Loader2 className="animate-spin" /> : <CreditCard />}
                Pay {formatCurrency(booking.finalAmount ?? booking.basePrice)}
            </Button>
        );
    }

    // Paid: show the customer's rating, or let them rate the job
    if (booking.status === "completed") {
        return (
            <div className="flex flex-col items-end gap-1.5">
                <PaymentStatusBadge status="paid" />
                {booking.rating ? <RatingStars value={booking.rating} /> : <ReviewDialog booking={booking} />}
            </div>
        );
    }

    return <span className="text-sm text-muted-foreground">—</span>;
}
