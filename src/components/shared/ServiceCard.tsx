import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock3, House, MapPin, Store, Wrench } from "lucide-react";

import { RatingBadge } from "@/components/shared/RatingStars";
import { buttonVariants } from "@/components/ui/button";
import { formatCurrency, formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { IService } from "@/types/Service";

interface ServiceCardProps {
    service: IService;
    className?: string;
    /** Set on cards visible above the fold so the image loads first */
    priority?: boolean;
}

const getInitials = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "T";

/**
 * Public listing card for a service.
 * Fixed-size slots (image ratio, 2-line title, 2-line description) plus a
 * bottom-pinned footer keep every card in a grid the same height and width.
 */
export default function ServiceCard({ service, className, priority = false }: ServiceCardProps) {
    const isHomeVisit = service.serviceMode === "Home Visit";
    const ModeIcon = isHomeVisit ? House : Store;

    return (
        <article
            className={cn(
                "group relative flex h-full w-full flex-col rounded-3xl border bg-card p-2 shadow-sm ring-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-4",
                className
            )}
        >
            {/* Media */}
            <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-2xl bg-muted">
                {service.image ? (
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        priority={priority}
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                        <Wrench className="size-10" aria-hidden="true" />
                    </div>
                )}

                {/* Soft gradient so overlay chips stay readable on any photo */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/40 to-transparent" />

                <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                    {service.category}
                </span>

                <span
                    className={cn(
                        "absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur",
                        isHomeVisit ? "bg-emerald-500/90 text-white" : "bg-violet-500/90 text-white"
                    )}
                >
                    <ModeIcon className="size-3.5" aria-hidden="true" />
                    {service.serviceMode}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 px-3 pt-4 pb-3">
                <div className="space-y-1.5">
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground">
                        {service.title}
                    </h3>
                </div>

                <ul className="flex flex-wrap gap-2 text-xs">
                    <li className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-muted px-2 py-1 text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{service.serviceArea}</span>
                    </li>
                    <li className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1 text-muted-foreground">
                        <Clock3 className="size-3.5 shrink-0" aria-hidden="true" />
                        {formatDuration(service.estimatedDuration)}
                    </li>
                </ul>

                {/* Technician + rating */}
                <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {getInitials(service.technicianName)}
                    </span>
                    <div className="min-w-0 leading-tight">
                        <p className="truncate text-sm font-medium text-foreground">{service.technicianName}</p>
                        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <BadgeCheck className="size-3.5 text-primary" aria-hidden="true" />
                            Verified technician
                        </p>
                    </div>
                    <RatingBadge avg={service.ratingAvg} count={service.ratingCount} className="ml-auto shrink-0" />
                </div>

                {/* Footer — pinned to the bottom so price + button line up across a row */}
                <div className="mt-auto space-y-3 border-t border-dashed pt-3">
                    <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Starting from
                        </span>
                        <span className="text-lg font-semibold tracking-tight text-foreground">
                            {formatCurrency(service.basePrice)}
                        </span>
                    </div>

                    {/* Stretched link: the whole card is clickable, with a single link for screen readers */}
                    <Link
                        href={`/services/${service._id}`}
                        aria-label={`View details for ${service.title}`}
                        className={cn(
                            buttonVariants(),
                            "h-10 w-full gap-1.5 rounded-xl after:absolute after:inset-0 after:rounded-3xl"
                        )}
                    >
                        View Details
                        <ArrowUpRight
                            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </div>
        </article>
    );
}
