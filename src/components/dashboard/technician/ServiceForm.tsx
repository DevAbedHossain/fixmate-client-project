"use client";

import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import Link from "next/link";
import { BriefcaseBusiness, Camera, Clock3, Loader2, MapPin, Wrench } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { IService } from "@/types/Service";

export const SERVICE_CATEGORIES = [
    "Smartphone",
    "Laptop & PC",
    "AC",
    "Refrigerator",
    "TV",
    "Washing Machine",
    "Electrical",
] as const satisfies readonly IService["category"][];

export const SERVICE_MODES = ["Home Visit", "Shop Drop-off"] as const;

/** Fields the technician fills in; system fields (status, owner…) are added by the caller. */
export type ServiceFormValues = Pick<
    IService,
    | "title"
    | "category"
    | "serviceArea"
    | "description"
    | "image"
    | "basePrice"
    | "estimatedDuration"
    | "serviceMode"
>;

interface ServiceFormProps {
    initialData?: Partial<ServiceFormValues>;
    submitLabel: string;
    submittingLabel: string;
    submitIcon?: React.ReactNode;
    cancelHref: string;
    onSubmit: (values: ServiceFormValues) => Promise<void>;
}

const uploadToImgbb = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
    );
    const result = await res.json();

    if (!res.ok || !result?.data?.url) {
        throw new Error("Image upload failed.");
    }

    return result.data.url as string;
};

export default function ServiceForm({
    initialData,
    submitLabel,
    submittingLabel,
    submitIcon,
    cancelHref,
    onSubmit,
}: ServiceFormProps) {
    const [imageUrl, setImageUrl] = useState(initialData?.image ?? "");
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            setImageUrl(await uploadToImgbb(file));
        } catch {
            toast.add({ title: "Upload failed", description: "Could not upload the image. Please try again." });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const category = String(formData.get("category") ?? "");
        const serviceMode = String(formData.get("serviceMode") ?? "");

        if (!category || !serviceMode) {
            toast.add({ title: "Missing fields", description: "Please select a category and a service mode." });
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                title: String(formData.get("title") ?? "").trim(),
                category: category as IService["category"],
                serviceArea: String(formData.get("serviceArea") ?? "").trim(),
                description: String(formData.get("description") ?? "").trim(),
                image: imageUrl,
                basePrice: Number(formData.get("basePrice") ?? 0),
                estimatedDuration: Number(formData.get("estimatedDuration") ?? 0),
                serviceMode,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isBusy = isUploading || isSubmitting;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service information */}
            <Card className="border-border/70 shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Wrench className="size-5" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Service Information</CardTitle>
                            <CardDescription>Provide the basic details about your repair service.</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="space-y-5 pt-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Service Title <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            required
                            defaultValue={initialData?.title}
                            placeholder="e.g. Professional Laptop Repair Service"
                        />
                        <p className="text-xs text-muted-foreground">
                            Choose a clear and descriptive title for your service.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>
                                Category <span className="text-destructive">*</span>
                            </Label>
                            <Select name="category" defaultValue={initialData?.category}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a service category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SERVICE_CATEGORIES.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="serviceArea">
                                Service Area <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="serviceArea"
                                    name="serviceArea"
                                    required
                                    defaultValue={initialData?.serviceArea}
                                    placeholder="e.g. Dhaka, Bangladesh"
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Service Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            required
                            defaultValue={initialData?.description}
                            placeholder="Describe your repair service, what you offer, and what customers can expect..."
                            className="min-h-36 resize-y"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Service image</Label>
                        <div className="flex items-center gap-4">
                            <span className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-dashed border-border bg-muted text-muted-foreground">
                                {isUploading ? (
                                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                                ) : imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element -- preview of uploaded image
                                    <img src={imageUrl} alt="Service image preview" className="size-full object-cover" />
                                ) : (
                                    <Camera className="size-5" aria-hidden="true" />
                                )}
                            </span>
                            <Input
                                id="image"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleImageChange}
                                disabled={isBusy}
                                className="h-11 rounded-xl"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">JPG, PNG or WebP.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Pricing & availability */}
            <Card className="border-border/70 shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <BriefcaseBusiness className="size-5" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Pricing & Availability</CardTitle>
                            <CardDescription>Set your service price, estimated duration, and service mode.</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="grid gap-5 pt-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="basePrice">
                            Base Price ($) <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                            <Input
                                id="basePrice"
                                name="basePrice"
                                type="number"
                                min="0"
                                required
                                defaultValue={initialData?.basePrice}
                                placeholder="15"
                                className="pl-8"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="estimatedDuration">
                            Estimated Duration <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                            <Clock3 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="estimatedDuration"
                                name="estimatedDuration"
                                type="number"
                                min="1"
                                required
                                defaultValue={initialData?.estimatedDuration}
                                placeholder="1"
                                className="pr-20 pl-9"
                            />
                            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                                Hours
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <Label>
                            Service Mode <span className="text-destructive">*</span>
                        </Label>
                        <Select name="serviceMode" defaultValue={initialData?.serviceMode}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose how you provide the service" />
                            </SelectTrigger>
                            <SelectContent>
                                {SERVICE_MODES.map((mode) => (
                                    <SelectItem key={mode} value={mode}>
                                        {mode}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                <Link href={cancelHref} className={buttonVariants({ variant: "outline" })}>
                    Cancel
                </Link>
                <Button type="submit" className="cursor-pointer gap-2" disabled={isBusy}>
                    {isSubmitting ? <Loader2 className="animate-spin" /> : submitIcon}
                    {isSubmitting ? submittingLabel : submitLabel}
                </Button>
            </div>
        </form>
    );
}
