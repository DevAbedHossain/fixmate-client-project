"use client";

import {
    ArrowLeft,
    BriefcaseBusiness,
    Camera,
    Clock3,
    MapPin,
    Plus,
    ShieldCheck,
    Wrench,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { createService } from "@/lib/api/GetAPI";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const categories = [
    "Smartphone",
    "Laptop & PC",
    "AC",
    "Refrigerator",
    "TV",
    "Washing Machine",
    "Electrical",
] as const;

const serviceModes = ["Home Visit", "Shop Drop-off"];

export default function AddServicePage() {

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file)

        const imgbbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

        const res = await fetch(imgbbAPI, {
            method: "POST",
            body: formData
        })
        const result = await res.json();
        const imageURL = result.data.url;

        setImagePreview(imageURL)
    }

    const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const serviceData = {
            title: String(formData.get("title") ?? ""),
            category: String(formData.get("category") ?? ""),
            serviceArea: String(formData.get("serviceArea") ?? ""),
            description: String(formData.get("description") ?? ""),
            basePrice: Number(formData.get("basePrice") ?? 0),
            estimatedDuration: Number(formData.get("estimatedDuration") ?? 0),
            serviceMode: String(formData.get("serviceMode") ?? ""),
            image: imagePreview,
            isAvailable: true,
            approvalStatus: "pending",
            technicianEmail: user?.email,
            technicianName: user?.name,
            technicianId: user?.id,
        };

        const result = await createService(serviceData);

        if (result.insertedId) {
            toast.add({
                title: "success",
                description: "Successfully added new service."
            })
            router.push("/dashboard/technician/my-services")
        }
    }

    return (
        <div className="mx-auto max-w-5xl space-y-6 pb-10">

            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <Link
                        href="/dashboard/technician/my-services"
                        className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="size-4" />
                        Back to My Services
                    </Link>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Add New Service
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Create a repair service listing and make it available to customers.
                    </p>
                </div>

                <Badge
                    variant="outline"
                    className="w-fit gap-1.5 rounded-full px-3 py-1.5"
                >
                    <ShieldCheck className="size-4" />
                    Technician Panel
                </Badge>
            </div>

            {/* Form */}
            <form onSubmit={handleAddService} className="space-y-6">

                {/* Service Information */}
                <Card className="border-border/70 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Wrench className="size-5" />
                            </div>

                            <div>
                                <CardTitle className="text-lg">
                                    Service Information
                                </CardTitle>
                                <CardDescription>
                                    Provide the basic details about your repair service.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="space-y-5 pt-6">

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Service Title <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g. Professional Laptop Repair Service"
                            />
                            <p className="text-xs text-muted-foreground">
                                Choose a clear and descriptive title for your service.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            {/* Category */}
                            <div className="space-y-2">
                                <Label>
                                    Category <span className="text-destructive">*</span>
                                </Label>

                                <Select name="category">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a service category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Service Area */}
                            <div className="space-y-2">
                                <Label htmlFor="serviceArea">
                                    Service Area <span className="text-destructive">*</span>
                                </Label>

                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="serviceArea"
                                        name="serviceArea"
                                        placeholder="e.g. Dhaka, Bangladesh"
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">
                                Service Description <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe your repair service, what you offer, and what customers can expect..."
                                className="min-h-36 resize-y"
                            />
                            <p className="text-xs text-muted-foreground">
                                Explain your service in detail to help customers understand your
                                offering.
                            </p>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Profile photo</Label>
                            <div className="flex items-center gap-4">
                                <span className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border border-dashed border-border bg-muted text-muted-foreground">
                                    {imagePreview ? (
                                        // eslint-disable-next-line @next/next/no-img-element -- blob preview URL
                                        <img
                                            src={imagePreview}
                                            alt="Selected profile photo preview"
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        <Camera className="size-5" aria-hidden="true" />
                                    )}
                                </span>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImage}
                                    className="h-11 rounded-xl"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                JPG, PNG or WebP — optional, you can add it later from your profile.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing & Availability */}
                <Card className="border-border/70 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <BriefcaseBusiness className="size-5" />
                            </div>

                            <div>
                                <CardTitle className="text-lg">
                                    Pricing & Availability
                                </CardTitle>
                                <CardDescription>
                                    Set your service price, estimated duration, and availability.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="grid gap-5 pt-6 sm:grid-cols-2">

                        {/* Base Price */}
                        <div className="space-y-2">
                            <Label htmlFor="basePrice">
                                Base Price ($) <span className="text-destructive">*</span>
                            </Label>

                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                    $
                                </span>
                                <Input
                                    id="basePrice"
                                    name="basePrice"
                                    type="number"
                                    min="0"
                                    placeholder="15"
                                    className="pl-8"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Enter your starting service price.
                            </p>
                        </div>

                        {/* Estimated Duration */}
                        <div className="space-y-2">
                            <Label htmlFor="estimatedDuration">
                                Estimated Duration <span className="text-destructive">*</span>
                            </Label>

                            <div className="relative">
                                <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="estimatedDuration"
                                    name="estimatedDuration"
                                    type="number"
                                    min="1"
                                    placeholder="1"
                                    className="pl-9 pr-20"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                    Hours
                                </span>
                            </div>
                        </div>

                        {/* Service Mode */}
                        <div className="space-y-2 sm:col-span-2">
                            <Label>
                                Service Mode <span className="text-destructive">*</span>
                            </Label>

                            <Select name="serviceMode">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose how you provide the service" />
                                </SelectTrigger>

                                <SelectContent>
                                    {serviceModes.map((mode) => (
                                        <SelectItem key={mode} value={mode}>
                                            {mode}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                    <Button variant="outline" type="button" >
                        <Link href="/dashboard/technician/my-services">
                            Cancel
                        </Link>
                    </Button>

                    <Button type="submit" className="gap-2 cursor-pointer">
                        <Plus className="size-4" />
                        Create Service
                    </Button>
                </div>
            </form>
        </div>
    );
}
