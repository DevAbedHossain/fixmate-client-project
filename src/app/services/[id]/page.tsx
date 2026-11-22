import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
    ArrowLeft,
    BadgeCheck,
    ChevronRight,
    Clock3,
    House,
    MapPin,
    ShieldCheck,
    Store,
    Tag,
    Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPublicProfile, getServiceById, getServiceReviews } from "@/lib/api";
import { RatingBadge, RatingStars } from "@/components/shared/RatingStars";
import { formatCurrency, formatDate, formatDuration } from "@/lib/format";
import { IService } from "@/types/Service";
import BookingRequest from "@/components/booking/BookingRequest";

type PageProps = { params: Promise<{ id: string }> };

/** Only approved + available services are public; anything else is a 404. */
const getPublicService = async (id: string): Promise<IService | null> => {
    const service = await getServiceById(id);
    if (!service || service.approvalStatus !== "approved" || !service.isAvailable) return null;
    return service;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const service = await getPublicService((await params).id);
    return service
        ? { title: `${service.title} | FixMate`, description: service.description.slice(0, 160) }
        : { title: "Service not found | FixMate" };
}

export default async function ServiceDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const service = await getPublicService(id);

    if (!service) notFound();

    // Technician summary: photo, area and bio from their profile
    const [technician, reviews] = await Promise.all([
        service.technicianId ? getPublicProfile(service.technicianId) : null,
        getServiceReviews(id),
    ]);
    const technicianArea = technician?.area || technician?.location || service.serviceArea;
    const isHomeVisit = service.serviceMode === "Home Visit";

    const facts: { icon: LucideIcon; label: string; value: string }[] = [
        { icon: Tag, label: "Category", value: service.category },
        { icon: isHomeVisit ? House : Store, label: "Service mode", value: service.serviceMode },
        { icon: MapPin, label: "Service area", value: service.serviceArea },
        { icon: Clock3, label: "Estimated duration", value: formatDuration(service.estimatedDuration) },
    ];

    return (
        <>
            <Navbar />

            <main className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Link href="/services" className="inline-flex items-center gap-1.5 hover:text-primary">
                            <ArrowLeft className="size-4" aria-hidden="true" />
                            Services
                        </Link>
                        <ChevronRight className="size-4" aria-hidden="true" />
                        <span className="truncate font-medium text-foreground">{service.title}</span>
                    </nav>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
                        {/* ---------- Left column ---------- */}
                        <div className="space-y-6">
                            {/* Large image */}
                            <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl bg-muted shadow-sm">
                                {service.image ? (
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 60vw, 100vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex size-full items-center justify-center text-muted-foreground">
                                        <Wrench className="size-16" aria-hidden="true" />
                                    </div>
                                )}
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/40 to-transparent" />
                                <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold shadow-sm backdrop-blur">
                                    {service.category}
                                </span>
                                <span
                                    className={`absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-white shadow-sm ${service.serviceMode.toLowerCase().includes("home") ? "bg-emerald-500/90" : "bg-violet-500/90"
                                        }`}
                                >
                                    {service.serviceMode.toLowerCase().includes("home") ? (
                                        <House className="size-4" />
                                    ) : (
                                        <Store className="size-4" />
                                    )}
                                    {service.serviceMode}
                                </span>
                            </div>

                            {/* Title + quick facts */}
                            <div className="rounded-3xl border bg-card p-6 md:p-8">
                                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                                    {service.title}
                                </h1>
                                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-1.5">
                                        <MapPin className="size-4" aria-hidden="true" />
                                        {service.serviceArea}
                                    </span>
                                    <RatingBadge avg={service.ratingAvg} count={service.ratingCount} className="text-sm" />
                                </div>

                                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {facts.map(({ icon: Icon, label, value }) => (
                                        <li key={label} className="flex items-center gap-3 rounded-2xl bg-muted/60 p-4">
                                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <Icon className="size-5" aria-hidden="true" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                                                <p className="truncate text-sm font-semibold text-foreground">{value}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Description */}
                            <section className="rounded-3xl border bg-card p-6 md:p-8">
                                <h2 className="mb-3 text-lg font-semibold text-foreground">About this service</h2>
                                <p className="leading-7 whitespace-pre-line text-muted-foreground">
                                    {service.description}
                                </p>
                            </section>

                            {/* Reviews */}
                            <section className="rounded-3xl border bg-card p-6 md:p-8">
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                    <h2 className="text-lg font-semibold text-foreground">Customer reviews</h2>
                                    {service.ratingAvg ? (
                                        <span className="flex items-center gap-2 text-sm">
                                            <RatingStars value={service.ratingAvg} />
                                            <span className="font-semibold">{service.ratingAvg.toFixed(1)}</span>
                                            <span className="text-muted-foreground">· {service.ratingCount} {service.ratingCount === 1 ? "review" : "reviews"}</span>
                                        </span>
                                    ) : null}
                                </div>
                                {reviews.length === 0 ? (
                                    <p className="rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
                                        No reviews yet. Customers can rate this service after a paid job.
                                    </p>
                                ) : (
                                    <ul className="divide-y">
                                        {reviews.map((item) => (
                                            <li key={item._id} className="space-y-1.5 py-4 first:pt-0 last:pb-0">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <p className="font-medium">{item.customerName}</p>
                                                    <span className="text-xs text-muted-foreground">{formatDate(item.reviewedAt)}</span>
                                                </div>
                                                <RatingStars value={item.rating} />
                                                {item.review && <p className="text-sm leading-6 text-muted-foreground">{item.review}</p>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        </div>

                        {/* ---------- Right column (sticky on desktop) ---------- */}
                        <aside className="space-y-6 lg:sticky lg:top-24">
                            {/* Price card */}
                            <div className="rounded-3xl border bg-card p-6 shadow-sm">
                                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                    Starting from
                                </p>
                                <p className="mt-1 text-4xl font-bold tracking-tight text-foreground">
                                    {formatCurrency(Number(service.basePrice))}
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Final amount is confirmed by the technician after the job.
                                </p>

                                <BookingRequest service={service} />

                                <ul className="mt-6 space-y-2.5 border-t border-dashed pt-5 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <ShieldCheck className="size-4 text-emerald-600" aria-hidden="true" />
                                        Admin-approved service
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BadgeCheck className="size-4 text-emerald-600" aria-hidden="true" />
                                        Pay only after the job is completed
                                    </li>
                                </ul>
                            </div>

                            {/* Technician summary */}
                            <div className="rounded-3xl border bg-card p-6">
                                <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                                    Your technician
                                </h2>

                                <div className="flex items-center gap-4">
                                    <Avatar className="size-16">
                                        {technician?.image && (
                                            <AvatarImage src={technician.image} alt={service.technicianName} className="object-cover" />
                                        )}
                                        <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                                            {service.technicianName.toString().split(" ").map((n) => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0">
                                        <p className="truncate text-lg font-semibold text-foreground">
                                            {service.technicianName}
                                        </p>
                                        <p className="inline-flex items-center gap-1 text-sm text-primary">
                                            <BadgeCheck className="size-4" aria-hidden="true" />
                                            Verified technician
                                        </p>
                                        <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                                            <MapPin className="size-4 shrink-0" aria-hidden="true" />
                                            <span className="truncate">{technicianArea}</span>
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-4 rounded-2xl bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
                                    {technician?.bio || "This technician hasn't added a bio yet."}
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
