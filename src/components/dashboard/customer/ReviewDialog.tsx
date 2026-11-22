"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { reviewBooking } from "@/lib/api";
import { getClientToken } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import type { IBooking } from "@/types/Booking";

const LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

/** "Rate job" button → 1–5 star picker + short review. Only for paid, not-yet-reviewed jobs. */
export default function ReviewDialog({ booking }: { booking: IBooking }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!rating) {
            toast.add({ type: "error", title: "Pick a rating", description: "Choose 1 to 5 stars." });
            return;
        }

        const review = String(new FormData(event.currentTarget).get("review") ?? "").trim();
        setSaving(true);
        try {
            await reviewBooking(booking._id ?? "", { rating, review }, await getClientToken());
            toast.add({ type: "success", title: "Thanks for your review!", description: `You rated ${booking.technicianName} ${rating}/5.` });
            setOpen(false);
            router.refresh();
        } catch (error) {
            toast.add({ type: "error", title: "Could not save review", description: error instanceof Error ? error.message : "Please try again." });
        } finally {
            setSaving(false);
        }
    };

    const shown = hover || rating;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button size="sm" variant="outline" className="cursor-pointer" />}>
                <Star className="text-amber-500" />
                Rate job
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Rate this repair</DialogTitle>
                        <DialogDescription>
                            How was &ldquo;{booking.serviceTitle}&rdquo; by {booking.technicianName}?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    role="radio"
                                    aria-checked={rating === star}
                                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="cursor-pointer rounded-md p-1 transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                                >
                                    <Star
                                        className={cn(
                                            "size-8",
                                            star <= shown ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/40"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="h-5 text-sm font-medium text-muted-foreground">{LABELS[shown]}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="review">Review (optional)</Label>
                        <Textarea
                            id="review"
                            name="review"
                            rows={3}
                            maxLength={500}
                            placeholder="What went well? Would you recommend this technician?"
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline" disabled={saving} />}>Cancel</DialogClose>
                        <Button type="submit" disabled={saving} className="cursor-pointer">
                            {saving && <Loader2 className="animate-spin" />}
                            Submit review
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
