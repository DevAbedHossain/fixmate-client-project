"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Camera, Check, Eye, EyeOff, User, Wrench, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";
import { signUp } from "@/lib/auth-client";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

type FieldKey = "fullName" | "email" | "password";
type FormValues = Record<FieldKey, string>;
type Role = "customer" | "technician";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

// Admin is intentionally not listed: it must never be selectable from the sign-up UI.
// Server-side, anything other than "customer" | "technician" must be saved as "customer".
const ROLES = [
    {
        value: "customer" as const,
        title: "Customer",
        description: "Book repairs and hire technicians.",
        icon: User,
    },
    {
        value: "technician" as const,
        title: "Technician",
        description: "Offer your services and get hired.",
        icon: Wrench,
    },
];

const PASSWORD_RULES = [
    { id: "length", label: "At least 6 characters", test: (p: string) => p.length >= 6 },
    { id: "uppercase", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { id: "lowercase", label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
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
            "Password must be at least 6 characters with one uppercase and one lowercase letter.";
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
    const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();

    const errors = validate(values);
    const showError = (field: FieldKey) =>
        (submitted || touched[field]) && errors[field] ? errors[field] : undefined;

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        console.log("image url", imageURL)

        setImagePreview(imageURL)
    };

    const updateField = (field: FieldKey, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const markTouched = (field: FieldKey) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        if (Object.values(errors).some(Boolean)) return;

        const { data, error } = await signUp.email({
            name: values.fullName,
            email: values.email,
            password: values.password,
            image: imagePreview ?? undefined,
            role,
        });

        if (error || !data) {
            toast.add({
                type: "error",
                title: "Sign up failed",
                description: error?.code === "USER_ALREADY_EXISTS" || error?.status === 422
                    ? "An account with this email already exists."
                    : error?.message ?? "Please try again.",
            })
            return;
        }

        toast.add({
            type: "success",
            title: "Account created",
            description: `Welcome to FixMate, ${values.fullName.split(" ")[0]}!`,
        })
        // /dashboard sends the user to their role's dashboard
        router.push("/dashboard")
        router.refresh()
    };

    const nameError = showError("fullName");
    const emailError = showError("email");
    const passwordError = showError("password");
    const passwordTouched = submitted || Boolean(touched.password) || values.password.length > 0;

    return (
        <Card className="mx-auto w-full max-w-lg py-8 shadow-2xl shadow-brand/10 [--card-spacing:--spacing(6)]">
            <CardHeader className="gap-2">
                <CardTitle className="text-xl font-semibold sm:text-2xl">
                    Create your account
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                    Sign up as a customer to book services, or as a technician to start earning.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSignUp} noValidate className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder="John Doe"
                            value={values.fullName}
                            onChange={(event) => updateField("fullName", event.target.value)}
                            onBlur={() => markTouched("fullName")}
                            aria-invalid={Boolean(nameError) || undefined}
                            aria-describedby={nameError ? "fullName-error" : undefined}
                            className="h-11 rounded-xl"
                        />
                        {nameError && (
                            <p id="fullName-error" role="alert" className="text-sm text-destructive">
                                {nameError}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={values.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            onBlur={() => markTouched("email")}
                            aria-invalid={Boolean(emailError) || undefined}
                            aria-describedby={emailError ? "email-error" : undefined}
                            className="h-11 rounded-xl"
                        />
                        {emailError && (
                            <p id="email-error" role="alert" className="text-sm text-destructive">
                                {emailError}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Create a password"
                                value={values.password}
                                onChange={(event) => updateField("password", event.target.value)}
                                onBlur={() => markTouched("password")}
                                aria-invalid={Boolean(passwordError) || undefined}
                                aria-describedby={
                                    passwordError ? "password-error" : "password-rules"
                                }
                                className="h-11 rounded-xl pr-11"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setShowPassword((visible) => !visible)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute inset-y-0 right-1 my-auto size-8 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="size-4" aria-hidden="true" />
                                ) : (
                                    <Eye className="size-4" aria-hidden="true" />
                                )}
                            </Button>
                        </div>

                        <ul id="password-rules" className="grid gap-1.5 pt-1">
                            {PASSWORD_RULES.map((rule) => {
                                const satisfied = rule.test(values.password);

                                return (
                                    <li
                                        key={rule.id}
                                        className={cn(
                                            "flex items-center gap-1.5 text-xs",
                                            !passwordTouched
                                                ? "text-muted-foreground"
                                                : satisfied
                                                    ? "text-emerald-600"
                                                    : "text-destructive",
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "grid size-4 shrink-0 place-items-center rounded-full",
                                                passwordTouched && satisfied
                                                    ? "bg-emerald-600/10"
                                                    : passwordTouched
                                                        ? "bg-destructive/10"
                                                        : "bg-muted",
                                            )}
                                            aria-hidden="true"
                                        >
                                            {passwordTouched && satisfied ? (
                                                <Check className="size-3" />
                                            ) : passwordTouched ? (
                                                <X className="size-3" />
                                            ) : (
                                                <span className="size-1.5 rounded-full bg-muted-foreground/60" />
                                            )}
                                        </span>
                                        {rule.label}
                                    </li>
                                );
                            })}
                        </ul>

                        {passwordError && (
                            <p
                                id="password-error"
                                role="alert"
                                className="text-sm text-destructive"
                            >
                                {passwordError}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <span id="role-label" className="text-sm leading-none font-medium">
                            I am signing up as
                        </span>
                        <div
                            role="radiogroup"
                            aria-labelledby="role-label"
                            className="grid gap-3 sm:grid-cols-2"
                        >
                            {ROLES.map((option) => {
                                const selected = role === option.value;
                                const Icon = option.icon;

                                return (
                                    <label
                                        key={option.value}
                                        className={cn(
                                            "flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all",
                                            "hover:border-brand/40 hover:bg-brand/5",
                                            "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/50",
                                            selected &&
                                            "border-brand bg-brand/5 ring-2 ring-brand/25",
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={option.value}
                                            checked={selected}
                                            onChange={() => setRole(option.value)}
                                            className="sr-only"
                                        />
                                        <span className="flex items-center justify-between">
                                            <span
                                                className={cn(
                                                    "grid size-9 place-items-center rounded-full transition-colors",
                                                    selected
                                                        ? "bg-brand text-brand-foreground"
                                                        : "bg-muted text-muted-foreground",
                                                )}
                                            >
                                                <Icon className="size-4" aria-hidden="true" />
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className={cn(
                                                    "grid size-4 place-items-center rounded-full border-2 transition-colors",
                                                    selected ? "border-brand" : "border-border",
                                                )}
                                            >
                                                {selected && (
                                                    <span className="size-2 rounded-full bg-brand" />
                                                )}
                                            </span>
                                        </span>
                                        <span className="text-sm font-semibold">
                                            {option.title}
                                        </span>
                                        <span className="text-xs leading-relaxed text-muted-foreground">
                                            {option.description}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

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
                                onChange={handleImageChange}
                                className="h-11 rounded-xl"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            JPG, PNG or WebP — optional, you can add it later from your profile.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="h-12 w-full rounded-xl bg-brand text-base text-brand-foreground hover:bg-brand/90"
                    >
                        Create account
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="justify-center rounded-b-xl text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/sign-in"
                    className="font-medium text-brand transition-colors hover:text-brand/80 underline-offset-4 hover:underline"
                >
                    Sign in
                </Link>
            </CardFooter>
        </Card>
    );
};

export default SignUpForm;
