"use client";


import {
    Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/lib/api";

import { formatCurrency } from "@/lib/format";




const BookingAction = ({ service, user, price }: { service: any; user: any; price: number }) => {
    const handleConfirmAndPay = async () => {
        const result = await createBooking({ serviceId: service._id || "", userEmail: user?.email || "" }) as { success: boolean; message: string; data?: any };

        if (result.success) {
            console.log("Booking created successfully:", result);
        }
    };
    return (
        <Button onClick={handleConfirmAndPay} size="lg" className="mt-3 h-12 w-full gap-2 rounded-xl text-base">
            <Lock className="size-4" aria-hidden="true" />
            Confirm &amp; Pay {formatCurrency(price)}
        </Button>
    );
};

export default BookingAction;