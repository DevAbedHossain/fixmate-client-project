"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompleteJobDialogProps {
    serviceTitle: string;
    basePrice: number;
    disabled?: boolean;
    onConfirm: (finalAmount: number) => Promise<boolean>;
}

export default function CompleteJobDialog({ serviceTitle, basePrice, disabled, onConfirm }: CompleteJobDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const finalAmount = Number(formData.get("finalAmount"));

        setIsSaving(true);
        const success = await onConfirm(finalAmount);
        setIsSaving(false);

        if (success) setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="w-full cursor-pointer" disabled={disabled} />}>
                <CheckCircle2 />
                Mark completed
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Complete this job</DialogTitle>
                        <DialogDescription>
                            Enter the final amount for &quot;{serviceTitle}&quot;. The customer will be asked to pay this amount.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2">
                        <Label htmlFor="finalAmount">Final amount ($)</Label>
                        <div className="relative">
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                            <Input
                                id="finalAmount"
                                name="finalAmount"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                autoFocus
                                defaultValue={basePrice}
                                className="pl-7"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Base price: ${basePrice}</p>
                    </div>

                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline" disabled={isSaving} />}>
                            Cancel
                        </DialogClose>
                        <Button type="submit" disabled={isSaving} className="cursor-pointer">
                            {isSaving && <Loader2 className="animate-spin" />}
                            {isSaving ? "Saving..." : "Confirm"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
