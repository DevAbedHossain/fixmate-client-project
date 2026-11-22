"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarCheck, CheckCircle2, Loader2, Wrench } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { createBooking } from "@/lib/api";
import { getClientToken, useSession } from "@/lib/auth-client";
import type { IService } from "@/types/Service";

const MIN_PROBLEM_LENGTH = 20;
const MY_BOOKINGS_URL = "/dashboard/customer/bookings";

type FieldErrors = Partial<Record<"customerPhone" | "address" | "preferredDate" | "problemDescription", string>>;

/** Today as YYYY-MM-DD in the user's local time (for the date input `min`) */
const todayString = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
};

const validate = (values: Record<string, string>): FieldErrors => {
    const errors: FieldErrors = {};
    if (!/^\+?[\d\s-]{7,15}$/.test(values.customerPhone)) errors.customerPhone = "Enter a valid phone number.";
    if (values.address.trim().length < 5) errors.address = "Enter the full service address.";
    if (!values.preferredDate) errors.preferredDate = "Pick a date.";
    else if (values.preferredDate < todayString()) errors.preferredDate = "Date must be today or later.";
    if (values.problemDescription.trim().length < MIN_PROBLEM_LENGTH) {
        errors.problemDescription = `Describe the problem in at least ${MIN_PROBLEM_LENGTH} characters.`;
    }
    return errors;
};

const BookingRequest = ({ service }: { service: IService }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const [open, setOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [problemLength, setProblemLength] = useState(0);
    const [isSent, setIsSent] = useState(false);

    // Only customers can request a repair (technicians/admins can't)
    const isNotCustomer = !!user && user.role !== "customer";

    const handleOpen = () => {
        // Not logged in → sign in first, then come back to this page
        if (!user) {
            router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
            return;
        }
        setIsSent(false);
        setErrors({});
        setProblemLength(0);
        setOpen(true);
    };

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const values = {
            customerPhone: String(formData.get("customerPhone") ?? "").trim(),
            address: String(formData.get("address") ?? "").trim(),
            preferredDate: String(formData.get("preferredDate") ?? ""),
            problemDescription: String(formData.get("problemDescription") ?? "").trim(),
        };

        const fieldErrors = validate(values);
        setErrors(fieldErrors);
        if (Object.keys(fieldErrors).length > 0) return;

        setIsSending(true);
        try {
            await createBooking({ serviceId: service._id ?? "", ...values }, await getClientToken());
            setIsSent(true);
            toast.add({
                type: "success",
                title: "Repair request sent",
                description: `${service.technicianName} will review your request soon.`,
            });
        } catch (error) {
            // e.g. "You already have an active request for this service"
            toast.add({
                type: "error",
                title: "Request failed",
                description: error instanceof Error ? error.message : "Please try again.",
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <Button
                size="lg"
                onClick={handleOpen}
                disabled={isPending || isNotCustomer}
                className="mt-6 h-12 w-full cursor-pointer gap-2 rounded-xl text-base disabled:cursor-not-allowed"
            >
                <Wrench className="size-5" aria-hidden="true" />
                Request Repair
            </Button>

            {isNotCustomer && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                    Only customers can request a repair.
                </p>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    {isSent ? (
                        // Success state with a link to My Bookings
                        <div className="flex flex-col items-center gap-4 py-4 text-center">
                            <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <CheckCircle2 className="size-7" aria-hidden="true" />
                            </span>
                            <DialogHeader className="items-center">
                                <DialogTitle>Request sent!</DialogTitle>
                                <DialogDescription>
                                    Track the status of &ldquo;{service.title}&rdquo; from My Bookings.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex w-full flex-col gap-2 sm:flex-row">
                                <DialogClose render={<Button variant="outline" className="flex-1" />}>Close</DialogClose>
                                <Link href={MY_BOOKINGS_URL} className={buttonVariants({ className: "flex-1" })}>
                                    Go to My Bookings
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Request a repair</DialogTitle>
                                <DialogDescription>
                                    {service.title} · by {service.technicianName}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="customerName">Name</Label>
                                    <Input id="customerName" value={user?.name ?? ""} readOnly disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customerEmail">Email</Label>
                                    <Input id="customerEmail" value={user?.email ?? ""} readOnly disabled />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="customerPhone">Phone</Label>
                                    <Input
                                        id="customerPhone"
                                        name="customerPhone"
                                        type="tel"
                                        placeholder="01XXXXXXXXX"
                                        defaultValue={user?.phone ?? ""}
                                        aria-invalid={!!errors.customerPhone}
                                    />
                                    {errors.customerPhone && <p className="text-xs text-destructive">{errors.customerPhone}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="preferredDate">Preferred date</Label>
                                    <Input
                                        id="preferredDate"
                                        name="preferredDate"
                                        type="date"
                                        min={todayString()}
                                        aria-invalid={!!errors.preferredDate}
                                    />
                                    {errors.preferredDate && <p className="text-xs text-destructive">{errors.preferredDate}</p>}
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="House, road, area, city"
                                        aria-invalid={!!errors.address}
                                    />
                                    {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="problemDescription">Problem description</Label>
                                        <span
                                            className={
                                                problemLength >= MIN_PROBLEM_LENGTH
                                                    ? "text-xs text-emerald-600"
                                                    : "text-xs text-muted-foreground"
                                            }
                                        >
                                            {problemLength}/{MIN_PROBLEM_LENGTH}+
                                        </span>
                                    </div>
                                    <Textarea
                                        id="problemDescription"
                                        name="problemDescription"
                                        rows={4}
                                        placeholder="e.g. The screen flickers and goes black after 10 minutes of use…"
                                        onChange={(event) => setProblemLength(event.target.value.trim().length)}
                                        aria-invalid={!!errors.problemDescription}
                                    />
                                    {errors.problemDescription && (
                                        <p className="text-xs text-destructive">{errors.problemDescription}</p>
                                    )}
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose render={<Button type="button" variant="outline" disabled={isSending} />}>
                                    Cancel
                                </DialogClose>
                                <Button type="submit" disabled={isSending} className="cursor-pointer gap-2">
                                    {isSending ? (
                                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                                    ) : (
                                        <CalendarCheck className="size-4" aria-hidden="true" />
                                    )}
                                    {isSending ? "Sending…" : "Send request"}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookingRequest;
