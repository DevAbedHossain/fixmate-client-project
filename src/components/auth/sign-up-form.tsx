
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Camera,
    Check,
    Eye,
    EyeOff,
    User,
    Wrench,
    X,
    Mail,
    LockKeyhole,
    ArrowRight,
    ShieldCheck,
    Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";

type FieldKey = "fullName" | "email" | "password";
type FormValues = Record<FieldKey, string>;
type Role = "customer" | "technician";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const ROLES = [
    {
        value: "customer" as const,
        title: "Customer",
        description: "Find services and book trusted technicians.",
        icon: User,
    },
    {
        value: "technician" as const,
        title: "Technician",
        description: "Offer repair services and grow your business.",
        icon: Wrench,
    },
];

const PASSWORD_RULES = [
    {
        id: "length",
        label: "At least 6 characters",
        test: (p: string) => p.length >= 6,
    },
    {
        id: "uppercase",
        label: "One uppercase letter",
        test: (p: string) => /[A-Z]/.test(p),
    },
    {
        id: "lowercase",
        label: "One lowercase letter",
        test: (p: string) => /[a-z]/.test(p),
    },
] as const;

function validate(values: FormValues) {
    const errors: Partial<Record<FieldKey, string>> = {};

    if (!values.fullName.trim()) {
        errors.fullName = "Full name is required.";
    }

    if (!values.email.trim()) {
        errors.email = "Email address is required.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
        errors.email = "Enter a valid email address.";
    }

    if (!values.password) {
        errors.password = "Password is required.";
    } else if (!PASSWORD_RULES.every((rule) => rule.test(values.password))) {
        errors.password =
            "Password must meet all the requirements below.";
    }

    return errors;
}

const SignUpForm = () => {
    const [values, setValues] = useState<FormValues>({
        fullName: "",
        email: "",
        password: "",
    });

    const [role, setRole] = useState<Role>("customer");
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState<
        Partial<Record<FieldKey, boolean>>
    >({});
    const [submitted, setSubmitted] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const errors = validate(values);

    const showError = (field: FieldKey) =>
        (submitted || touched[field]) && errors[field]
            ? errors[field]
            : undefined;

    const updateField = (field: FieldKey, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const markTouched = (field: FieldKey) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0] ?? null;

        if (!file) return;

        if (imagePreview) URL.revokeObjectURL(imagePreview);

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);

        setImagePreview(null);
        setImageFile(null);
    };

    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        const validationErrors = validate(values);

        if (Object.values(validationErrors).some(Boolean)) return;

        // Connect your Better Auth registration here.
        console.log("Sign up data:", {
            ...values,
            role,
            image: imageFile,
        });
    };

    const passwordTouched =
        submitted || Boolean(touched.password) || values.password.length > 0;

    const passwordError = showError("password");

    return (
        <div className="mx-auto w-full max-w-[460px]">

            {/* Heading */}
            <div className="mb-5">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Join FixMate to book reliable repair services or offer
                    your professional skills.
                </p>
            </div>

            <form onSubmit={handleSignUp} noValidate className="space-y-5">

                {/* Full Name */}
                <div className="space-y-2">
                    <Label
                        htmlFor="fullName"
                        className="text-sm font-semibold text-slate-700"
                    >
                        Full Name <span className="text-red-500">*</span>
                    </Label>

                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            className={cn(
                                "h-12 rounded-xl border-slate-200 bg-white pl-10 text-sm shadow-none",
                                "placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/15",
                            )}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-slate-700"
                    >
                        Email Address <span className="text-red-500">*</span>
                    </Label>

                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className={cn(
                                "h-12 rounded-xl border-slate-200 bg-white pl-10 text-sm shadow-none",
                                "placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/15",
                            )}
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label
                        htmlFor="password"
                        className="text-sm font-semibold text-slate-700"
                    >
                        Password <span className="text-red-500">*</span>
                    </Label>

                    <div className="relative">
                        <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Create a strong password"
                            aria-invalid={Boolean(passwordError)}
                            aria-describedby="password-rules"
                            className={cn(
                                "h-12 rounded-xl border-slate-200 bg-white pl-10 pr-12 text-sm shadow-none",
                                "placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/15",
                            )}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>

                    {/* Password Rules */}
                    <div
                        id="password-rules"
                        className="rounded-xl border border-slate-100 bg-slate-50/80 p-3"
                    >
                        <p className="mb-2 text-xs font-semibold text-slate-600">
                            Password must contain:
                        </p>

                        <div className="grid gap-2 sm:grid-cols-2">
                            {PASSWORD_RULES.map((rule) => {
                                const satisfied = rule.test(values.password);

                                return (
                                    <div
                                        key={rule.id}
                                        className={cn(
                                            "flex items-center gap-2 text-xs transition-colors",
                                            passwordTouched && satisfied
                                                ? "text-emerald-600"
                                                : passwordTouched
                                                    ? "text-slate-500"
                                                    : "text-slate-500",
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "flex size-4 shrink-0 items-center justify-center rounded-full",
                                                passwordTouched && satisfied
                                                    ? "bg-emerald-100 text-emerald-600"
                                                    : "bg-slate-200 text-slate-400",
                                            )}
                                        >
                                            {passwordTouched && satisfied ? (
                                                <Check className="size-3" />
                                            ) : (
                                                <X className="size-3" />
                                            )}
                                        </span>

                                        {rule.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {passwordError && (
                        <p role="alert" className="text-xs text-red-500">
                            {passwordError}
                        </p>
                    )}
                </div>

                {/* Account Type */}
                <div className="space-y-3">
                    <div>
                        <Label className="text-sm font-semibold text-slate-700">
                            Choose Account Type
                        </Label>
                        <p className="mt-1 text-xs text-slate-500">
                            How would you like to use FixMate?
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {ROLES.map((option) => {
                            const selected = role === option.value;
                            const Icon = option.icon;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={selected}
                                    onClick={() => setRole(option.value)}
                                    className={cn(
                                        "relative flex min-h-[116px] flex-col items-start rounded-xl border p-3.5 text-left transition-all duration-200",
                                        "hover:border-blue-300 hover:bg-blue-50/50",
                                        selected
                                            ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/15"
                                            : "border-slate-200 bg-white",
                                    )}
                                >
                                    <div className="flex w-full items-center justify-between">
                                        <span
                                            className={cn(
                                                "flex size-9 items-center justify-center rounded-lg",
                                                selected
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-slate-100 text-slate-500",
                                            )}
                                        >
                                            <Icon className="size-4" />
                                        </span>

                                        <span
                                            className={cn(
                                                "flex size-4 items-center justify-center rounded-full border",
                                                selected
                                                    ? "border-blue-600 bg-blue-600 text-white"
                                                    : "border-slate-300",
                                            )}
                                        >
                                            {selected && <Check className="size-3" />}
                                        </span>
                                    </div>

                                    <span className="mt-3 text-sm font-bold text-slate-800">
                                        {option.title}
                                    </span>

                                    <span className="mt-1 text-[11px] leading-4 text-slate-500">
                                        {option.description}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Profile Photo */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700">
                        Profile Photo{" "}
                        <span className="font-normal text-slate-400">(Optional)</span>
                    </Label>

                    <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-3.5 transition hover:border-blue-400">
                        <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-blue-600">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className="size-full object-cover"
                                />
                            ) : (
                                <Camera className="size-6" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <label
                                htmlFor="image"
                                className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                <Upload className="size-4" />
                                {imageFile ? "Change photo" : "Upload a photo"}
                            </label>

                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleImageChange}
                                className="sr-only"
                            />

                            <p className="mt-1 truncate text-xs text-slate-500">
                                {imageFile
                                    ? imageFile.name
                                    : "JPG, PNG or WebP. You can add it later."}
                            </p>
                        </div>

                        {imagePreview && (
                            <button
                                type="button"
                                onClick={removeImage}
                                aria-label="Remove profile photo"
                                className="flex size-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/15 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/25"
                >
                    Create My Account
                    <ArrowRight className="ml-2 size-4" />
                </Button>

                {/* Security Information */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="size-4 text-emerald-500" />
                    Your information is protected and secure.
                </div>
            </form>

            {/* Sign In Link */}
            <div className=" border-t border-slate-100 pt-5 text-center">
                <p className="text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;
