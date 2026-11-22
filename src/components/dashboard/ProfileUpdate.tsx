"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, Lock, Save, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { updateUser } from "@/lib/api";
import { getClientToken, useSession } from "@/lib/auth-client";

export interface ProfileUser {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string | null;
    phone?: string | null;
    area?: string | null;
    bio?: string | null;
}

const uploadToImgbb = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
    });
    const result = await res.json();
    if (!res.ok || !result?.data?.url) throw new Error("Image upload failed.");
    return result.data.url as string;
};

/** Shared profile form for every role. Email and role are read-only. */
export default function ProfileUpdate({ user }: { user: ProfileUser }) {
    const router = useRouter();
    const { refetch } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [imageUrl, setImageUrl] = useState(user.image ?? "");
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            setImageUrl(await uploadToImgbb(file));
        } catch {
            toast.add({ type: "error", title: "Upload failed", description: "Could not upload the photo. Please try again." });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const name = String(formData.get("name") ?? "").trim();
        if (name.length < 2) {
            toast.add({ type: "error", title: "Name required", description: "Please enter your full name." });
            return;
        }

        setIsSaving(true);
        try {
            const result = await updateUser(
                user.id,
                {
                    name,
                    phone: String(formData.get("phone") ?? "").trim(),
                    area: String(formData.get("area") ?? "").trim(),
                    bio: String(formData.get("bio") ?? "").trim(),
                    image: imageUrl,
                },
                await getClientToken()
            );

            if (result.acknowledged === false || result.message) throw new Error(result.message);

            // Reload the session so the navbar and dashboard top bar show the new name/photo right away
            await refetch();
            router.refresh();
            toast.add({ type: "success", title: "Profile updated", description: "Your changes have been saved." });
        } catch {
            toast.add({ type: "error", title: "Update failed", description: "Could not save your profile. Please try again." });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Profile settings</h1>
                <p className="text-sm text-muted-foreground">Manage your personal information and profile photo.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card className="gap-0 shadow-sm">
                    <CardHeader className="pb-6">
                        <CardTitle className="flex items-center gap-2">
                            <UserRound className="size-5" />
                            Personal profile
                        </CardTitle>
                        <CardDescription>Update your photo and personal details.</CardDescription>
                    </CardHeader>

                    <Separator />

                    <CardContent className="space-y-8 pt-6">
                        {/* Photo */}
                        <section className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="relative w-fit">
                                <Avatar className="size-24 border-4 border-background shadow-sm">
                                    {imageUrl && <AvatarImage src={imageUrl} alt={user.name} className="object-cover" />}
                                    <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="outline"
                                    aria-label="Change profile photo"
                                    disabled={isUploading}
                                    className="absolute -right-1 -bottom-1 size-8 cursor-pointer rounded-full bg-background"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {isUploading ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
                                </Button>
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-semibold">{user.name}</p>
                                <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                                <p className="text-xs text-muted-foreground">JPG, PNG or WebP. Uploaded with ImgBB.</p>
                            </div>
                        </section>

                        <Separator />

                        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full name</Label>
                                <Input id="name" name="name" required defaultValue={user.name} placeholder="Full name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone number</Label>
                                <Input id="phone" name="phone" type="tel" defaultValue={user.phone ?? ""} placeholder="01XXXXXXXXX" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative">
                                    <Input id="email" value={user.email} readOnly disabled className="pr-9" />
                                    <Lock className="absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <div className="relative">
                                    <Input id="role" value={user.role} readOnly disabled className="pr-9 capitalize" />
                                    <Lock className="absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                                </div>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="area">Area</Label>
                                <Input id="area" name="area" defaultValue={user.area ?? ""} placeholder="e.g. Mirpur, Dhaka" />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    defaultValue={user.bio ?? ""}
                                    placeholder={
                                        user.role === "technician"
                                            ? "Your skills, experience and the devices you repair…"
                                            : "Tell us a little about yourself…"
                                    }
                                    className="min-h-28 resize-y"
                                    maxLength={300}
                                />
                            </div>
                        </section>
                    </CardContent>

                    <Separator />

                    <CardFooter className="justify-end pt-6">
                        <Button type="submit" disabled={isSaving || isUploading} className="cursor-pointer gap-2">
                            {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                            {isSaving ? "Saving…" : "Save changes"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
