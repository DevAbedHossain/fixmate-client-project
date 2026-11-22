import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    BadgeCheck,
    CalendarDays,
    Clock3,
    CreditCard,
    House,
    Lock,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Store,
    User,
    Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking, getServiceById } from "@/lib/api";
import { auth } from "@/lib/auth";
import { formatCurrency } from "@/lib/format";
import BookingAction from "@/components/booking/BookingAction";

const getInitials = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "U";

/** Small numbered heading used for each checkout step */
function StepHeading({ step, title, description }: { step: number; title: string; description: string }) {
    return (
        <div className="mb-6 flex items-start gap-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {step}
            </span>
            <div>
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}

/** Label + input with a leading icon */
function IconField({
    id,
    label,
    icon: Icon,
    ...props
}: { id: string; label: string; icon: LucideIcon } & React.ComponentProps<typeof Input>) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <Icon
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                />
                <Input id={id} name={id} className="h-11 rounded-xl pl-9" {...props} />
            </div>
        </div>
    );
}

const BookingSingleId = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;


    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    const service = await getServiceById(id);
    if (!service) notFound();

    const price = Number(service.basePrice);
    const hours = Number(service.estimatedDuration);
    const isHomeVisit = service.serviceMode === "Home Visit";




    return (
        <>
            <Navbar />

            <main className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
                    {/* Header */}
                    <Link
                        href={`/services/${service._id}`}
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Back to service
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                            Checkout
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground md:text-base">
                            Confirm your details and book your repair in a few steps.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
                        {/* ---------- Left: checkout steps ---------- */}
                        <div className="space-y-6">
                            {/* Step 1 — Customer */}
                            <section className="rounded-3xl border bg-card p-6 md:p-8">
                                <StepHeading
                                    step={1}
                                    title="Your details"
                                    description="We'll share these with your technician."
                                />

                                {/* Logged-in user summary */}
                                <div className="mb-6 flex items-center gap-4 rounded-2xl bg-muted/60 p-4">
                                    <Avatar className="size-12">
                                        {user?.image && <AvatarImage src={user.image} alt={user.name} />}
                                        <AvatarFallback className="bg-primary/10 font-bold text-primary">
                                            {getInitials(user?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-semibold text-foreground">{user?.name}</p>
                                        <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
                                    </div>
                                    <span className="hidden items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 sm:inline-flex">
                                        <BadgeCheck className="size-3.5" aria-hidden="true" />
                                        Signed in
                                    </span>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <IconField id="customerName" label="Full name" icon={User} defaultValue={user?.name} />
                                    <IconField
                                        id="customerEmail"
                                        label="Email"
                                        icon={Mail}
                                        type="email"
                                        defaultValue={user?.email}
                                        readOnly
                                    />
                                    <IconField
                                        id="customerPhone"
                                        label="Phone number"
                                        icon={Phone}
                                        type="tel"
                                        placeholder="01XXXXXXXXX"
                                    />
                                    <IconField id="preferredDate" label="Preferred date" icon={CalendarDays} type="date" />
                                </div>
                            </section>

                            {/* Step 2 — Job details */}
                            <section className="rounded-3xl border bg-card p-6 md:p-8">
                                <StepHeading
                                    step={2}
                                    title={isHomeVisit ? "Service address" : "Job details"}
                                    description={
                                        isHomeVisit
                                            ? "Where should the technician come?"
                                            : "You'll drop your device at the technician's shop."
                                    }
                                />

                                <div className="space-y-5">
                                    <IconField
                                        id="address"
                                        label="Address"
                                        icon={MapPin}
                                        placeholder="House, road, area, city"
                                    />
                                    <div className="space-y-2">
                                        <Label htmlFor="problemDescription">Describe the problem</Label>
                                        <Textarea
                                            id="problemDescription"
                                            name="problemDescription"
                                            rows={5}
                                            placeholder="e.g. Screen flickers after 10 minutes of use…"
                                            className="rounded-xl"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Step 3 — Payment */}
                            <section className="rounded-3xl border bg-card p-6 md:p-8">
                                <StepHeading
                                    step={3}
                                    title="Payment"
                                    description="Secure card payment powered by Stripe."
                                />

                                <div className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-primary/5 p-4">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                        <CreditCard className="size-5" aria-hidden="true" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-foreground">Credit / Debit card</p>
                                        <p className="text-sm text-muted-foreground">
                                            You&apos;ll be redirected to Stripe to complete payment.
                                        </p>
                                    </div>
                                    <span className="size-5 shrink-0 rounded-full border-[6px] border-primary bg-background" />
                                </div>
                            </section>
                        </div>

                        {/* ---------- Right: order summary (sticky on desktop) ---------- */}
                        <aside className="lg:sticky lg:top-24">
                            <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                                <div className="p-6">
                                    <h2 className="mb-4 text-lg font-semibold text-foreground">Order summary</h2>

                                    {/* Service */}
                                    <div className="flex gap-4">
                                        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
                                            {service.image ? (
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    sizes="80px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex size-full items-center justify-center text-muted-foreground">
                                                    <Wrench className="size-6" aria-hidden="true" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <span className="mb-1 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                                                {service.category}
                                            </span>
                                            <p className="line-clamp-2 font-semibold leading-snug text-foreground">
                                                {service.title}
                                            </p>
                                            <p className="mt-0.5 text-sm text-muted-foreground">
                                                by {service.technicianName}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Service meta */}
                                    <ul className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                                        <li className="rounded-xl bg-muted/60 px-2 py-3">
                                            {isHomeVisit ? (
                                                <House className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
                                            ) : (
                                                <Store className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
                                            )}
                                            <span className="line-clamp-1 font-medium text-foreground">
                                                {service.serviceMode}
                                            </span>
                                        </li>
                                        <li className="rounded-xl bg-muted/60 px-2 py-3">
                                            <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
                                            <span className="line-clamp-1 font-medium text-foreground">
                                                {service.serviceArea}
                                            </span>
                                        </li>
                                        <li className="rounded-xl bg-muted/60 px-2 py-3">
                                            <Clock3 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
                                            <span className="font-medium text-foreground">
                                                ~{hours} {hours === 1 ? "hr" : "hrs"}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Price breakdown */}
                                <div className="space-y-3 border-t border-dashed bg-muted/30 p-6 text-sm">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Base price</span>
                                        <span className="font-medium text-foreground">{formatCurrency(price)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Service fee</span>
                                        <span className="font-medium text-emerald-600">Free</span>
                                    </div>
                                    <div className="flex items-baseline justify-between border-t pt-3">
                                        <span className="font-semibold text-foreground">Total due today</span>
                                        <span className="text-2xl font-bold tracking-tight text-foreground">
                                            {formatCurrency(price)}
                                        </span>
                                    </div>

                                    <BookingAction service={service} user={user} price={price} />

                                    <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-muted-foreground">
                                        <ShieldCheck className="size-3.5 text-emerald-600" aria-hidden="true" />
                                        Payments are encrypted and secure
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default BookingSingleId;
