"use client";


import { useState } from "react";
import {
    CalendarCheck,
    Loader2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IService } from "@/types/Service";
import { useSession } from "@/lib/auth-client";
import { createBookingRequest } from "@/lib/api/bookingRequest";
import { IBookingRequest } from "@/types/BookingRequest";
import { toast } from "../ui/toast";

const BookingRequest = ({ service }: { service: IService }) => {

    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const [isSending, setIsSending] = useState(false);

    // Only customers can request a booking (technicians/admins can't)
    const isNotCustomer = !!user && user.role !== "customer";

    const handleBookingRequest = async () => {
        // Not logged in → sign in first, then come back to this page
        if (!user) {
            router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
            return;
        }

        const bookingData = {
            serviceId: service._id,
            userEmail: user?.email,
            price: service.basePrice,
            duration: service.estimatedDuration,
            userId: user?.id,
            status: "requested"
        };

        // Block double clicks so the same request isn't saved twice
        setIsSending(true);
        try {
            const result = await createBookingRequest(bookingData as IBookingRequest);

            if (result.insertedId) {
                toast.add({
                    title: "Booking request sent",
                    description: "Your booking request has been sent successfully."
                });
                // TODO: change to /dashboard/customer/requests once that page exists (it 404s now)
                router.push(`/dashboard/customer`);
                return;
            }
            throw new Error("Booking request was not saved.");
        } catch {
            toast.add({
                title: "Request failed",
                description: "Could not send your booking request. Please try again."
            });
            setIsSending(false);
        }
    }
    return (
        <>
            <Button
                size="lg"
                onClick={handleBookingRequest}
                disabled={isPending || isNotCustomer || isSending}
                className="mt-6 h-12 w-full cursor-pointer gap-2 rounded-xl text-base disabled:cursor-not-allowed"
            >
                {isSending ? (
                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                ) : (
                    <CalendarCheck className="size-5" aria-hidden="true" />
                )}
                {isSending ? "Sending request…" : "Book this service"}
            </Button>

            {isNotCustomer && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                    Only customer accounts can book services.
                </p>
            )}
        </>
    );
};

export default BookingRequest;
