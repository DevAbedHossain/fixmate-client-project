"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Play, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { updateBooking } from "@/lib/api/GetAPI";
import type { IBooking } from "@/types/Booking";

import { PaymentStatusBadge } from "./BookingStatusBadge";
import CompleteJobDialog from "./CompleteJobDialog";

type PendingAction = "accept" | "reject" | "start" | "complete" | null;

const successMessages: Record<Exclude<PendingAction, null>, string> = {
    accept: "Request accepted.",
    reject: "Request rejected.",
    start: "Work started. The job is now in progress.",
    complete: "Job marked as completed.",
};

export default function RequestActions({ booking }: { booking: IBooking }) {
    const router = useRouter();
    const [pending, setPending] = useState<PendingAction>(null);

    const runUpdate = async (action: Exclude<PendingAction, null>, data: Partial<IBooking>) => {
        setPending(action);
        try {
            await updateBooking(booking._id ?? "", data);
            toast.add({ title: "Request updated", description: successMessages[action] });
            router.refresh();
            return true;
        } catch {
            toast.add({ title: "Update failed", description: "Could not update the request. Please try again." });
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
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        disabled={isBusy}
                        onClick={() => runUpdate("reject", { status: "rejected" })}
                    >
                        {pending === "reject" ? spinner : <X />}
                        Reject
                    </Button>
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
                    onConfirm={(finalAmount) =>
                        runUpdate("complete", { status: "completed", finalAmount, paymentStatus: "unpaid" })
                    }
                />
            );

        case "completed":
            return <PaymentStatusBadge status={booking.paymentStatus} />;

        // rejected / cancelled: no actions available
        default:
            return null;
    }
}
