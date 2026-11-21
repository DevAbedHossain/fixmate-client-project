"use client";

import { Camera, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { toast } from "../ui/toast";
import React, { useRef, useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { updateUser } from "@/lib/api/GetAPI";
import { useRouter } from "next/navigation";


export default function ProfileUpdate() {

    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    useEffect(() => {
        if (!imageFile) return;

        const url = URL.createObjectURL(imageFile);
        setImagePreview(url);

        return () => URL.revokeObjectURL(url);
    }, [imageFile]);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

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
        console.log("image url", imageURL)

        setImagePreview(imageURL)
    };

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) return;

        const formData = new FormData(e.currentTarget);
        const updateProfile = Object.fromEntries(formData.entries());

        console.log("form data", updateProfile);

        const updateData = {
            name: String(updateProfile.name),
            phone: String(updateProfile.phone),
            location: String(updateProfile.location),
            bio: String(updateProfile.bioMessage),
            image: imagePreview || user.image || "",
            email: user.email,
            role: user.role,
        }

        const result = await updateUser(updateData);
        if (result.modifiedCount > 0) {
            toast.add({
                title: "Profile updated successfully",
                description: "Your profile has been updated successfully.",
            });

            router.push("/dashboard/technician")
        }
    }

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Page heading */}
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Profile Settings
                </h1>
                <p className="text-sm text-muted-foreground">
                    Manage your personal information and profile preferences.
                </p>
            </div>

            <form onSubmit={handleUpdateProfile}>
                <Card className="gap-0 shadow-sm">
                    <CardHeader className="pb-6">
                        <CardTitle className="flex items-center gap-2">
                            <UserRound className="size-5" />
                            Personal Profile
                        </CardTitle>

                        <CardDescription>
                            Update your photo and personal details.
                        </CardDescription>
                    </CardHeader>

                    <Separator />

                    <CardContent className="space-y-8 pt-6">
                        {/* Profile photo */}
                        <section className="space-y-4">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="relative w-fit">
                                    <Avatar className="size-24 border-4 border-background shadow-sm">
                                        <AvatarImage
                                            src={imagePreview || user?.image || undefined}
                                            alt={user?.name || "Profile photo"}
                                            className="object-cover"
                                        />

                                        <AvatarFallback>
                                            {user?.name?.charAt(0).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="image"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />

                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="outline"
                                        aria-label="Change profile photo"
                                        className="absolute -bottom-1 -right-1 size-8 rounded-full bg-background cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Camera className="size-4" />
                                    </Button>
                                </div>

                            </div>
                        </section>

                        <Separator />

                        {/* Personal information */}
                        <section className="space-y-5">
                            <div>
                                <h3 className="text-base font-semibold">
                                    Personal information
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Keep your personal details up to date.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="full Name">Full Name</Label>
                                    <Input
                                        id="fulltName"
                                        placeholder="Full name"
                                        name="name"
                                        required
                                        defaultValue={user?.name}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        disabled
                                        placeholder="you@example.com"
                                        defaultValue={user?.email}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="+1 (555) 000-0000"
                                    />

                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        required
                                        placeholder="City, Country"
                                    />

                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        name="bioMessage"
                                        required
                                        placeholder="Tell us a little about yourself..."
                                        className="min-h-28 resize-y"
                                        maxLength={300}
                                    />

                                    <div className="flex justify-between gap-3">
                                        <p className="text-xs text-muted-foreground">
                                            Write a short introduction about yourself.
                                        </p>
                                        <span className="text-xs text-muted-foreground">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </CardContent>

                    <Separator className="mt-6" />

                    {/* Form actions */}
                    <CardFooter className="flex flex-col gap-3 py-5 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="w-full gap-2 sm:w-auto"
                        >
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );

}