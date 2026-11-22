"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Play, X } from "lucide-react";

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
import { updateBookingStatus } from "@/lib/api";
import { getClientToken } from "@/lib/auth-client";
import type { IBooking } from "@/types/Booking";

import { PaymentStatusBadge } from "./BookingStatusBadge";
import CompleteJobDialog from "./CompleteJobDialog";

type ActionKey = "accept" | "reject" | "start" | "complete";

const successMessages: Record<ActionKey, string> = {
    accept: "Request accepted.",
    reject: "Request rejected.",
    start: "Work started. The job is now in progress.",
    complete: "Job marked as completed.",
};

export default function RequestActions({ booking }: { booking: IBooking }) {
    const router = useRouter();
    const [pending, setPending] = useState<ActionKey | null>(null);
    const [rejectOpen, setRejectOpen] = useState(false);

    const runUpdate = async (action: ActionKey, data: { status: IBooking["status"]; finalAmount?: number }) => {
        setPending(action);
        try {
            await updateBookingStatus(booking._id ?? "", data, await getClientToken());
            toast.add({ title: "Request updated", description: successMessages[action] });
            router.refresh();
            return true;
        } catch (error) {
            toast.add({
                title: "Update failed",
                description: error instanceof Error ? error.message : "Please try again.",
            });
            return false;
        } finally {
            setPending(null);
        }
    };

    const isBusy = pending !== null;
    const spinner = <Loader2 className="animate-spin" />;

    switch (booking.status) {
        case "requested":
            return (
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        className="cursor-pointer"
                        disabled={isBusy}
                        onClick={() => runUpdate("accept", { status: "accepted" })}
                    >
                        {pending === "accept" ? spinner : <Check />}
                        Accept
                    </Button>

                    {/* Rejecting is final, so ask first */}
                    <AlertDialog open={rejectOpen} onOpenChange={setRejectOpen}>
                        <AlertDialogTrigger
                            render={
                                <Button variant="outline" className="cursor-pointer" disabled={isBusy}>
                                    {pending === "reject" ? spinner : <X />}
                                    Reject
                                </Button>
                            }
                        />
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Reject this request?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {booking.customerName || "The customer"} will be told you can&apos;t take
                                    &ldquo;{booking.serviceTitle}&rdquo;. This can&apos;t be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Keep request</AlertDialogCancel>
                                <AlertDialogAction
                                    variant="destructive"
                                    onClick={() => {
                                        setRejectOpen(false);
                                        runUpdate("reject", { status: "rejected" });
                                    }}
                                >
                                    Reject request
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );

        case "accepted":
            return (
                <Button
                    className="w-full cursor-pointer"
                    disabled={isBusy}
                    onClick={() => runUpdate("start", { status: "in-progress" })}
                >
                    {pending === "start" ? spinner : <Play />}
                    Start work
                </Button>
            );

        case "in-progress":
            return (
                <CompleteJobDialog
                    serviceTitle={booking.serviceTitle}
                    basePrice={booking.basePrice}
                    disabled={isBusy}
                    onConfirm={(finalAmount) => runUpdate("complete", { status: "completed", finalAmount })}
                />
            );

        case "completed":
            return <PaymentStatusBadge status={booking.paymentStatus} />;

        // rejected / cancelled: no actions available
        default:
            return null;
    }
}
