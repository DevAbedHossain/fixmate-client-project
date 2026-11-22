"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { createBooking } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import type { IService } from "@/types/Service";

interface BookingActionProps {
    service: IService;
    user?: { email: string } | null;
    price: number;
}

const BookingAction = ({ service, user, price }: BookingActionProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmAndPay = async () => {
        if (!user?.email) {
            toast.add({ title: "Please sign in", description: "You need to be signed in to book a service." });
            return;
        }

        setIsLoading(true);
        try {
            const result = await createBooking({ serviceId: service._id || "", userEmail: user.email });

            if (result.success && result.url) {
                // Go to the Stripe Checkout page
                window.location.href = result.url;
                return;
            }

            throw new Error("Could not start payment.");
        } catch {
            toast.add({ title: "Payment failed", description: "Something went wrong. Please try again." });
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleConfirmAndPay}
            disabled={isLoading}
            size="lg"
            className="mt-3 h-12 w-full gap-2 rounded-xl text-base"
        >
            {isLoading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
                <Lock className="size-4" aria-hidden="true" />
            )}
            {isLoading ? "Redirecting…" : `Confirm & Pay ${formatCurrency(price)}`}
        </Button>
    );
};

export default BookingAction;
