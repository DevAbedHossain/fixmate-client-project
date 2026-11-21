import { cn } from "@/lib/utils";
import type { IService } from "@/types/Service";

import ServiceCard from "./ServiceCard";

const columnClasses = {
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

interface ServiceGridProps {
    services: IService[];
    /** Max cards per row on large screens. Mobile is always 1, tablet 2. */
    columns?: keyof typeof columnClasses;
    className?: string;
    /** How many leading cards get image priority (above-the-fold) */
    priorityCount?: number;
}

/**
 * Responsive grid of ServiceCards.
 * `auto-rows-fr` makes every row the same height, so all cards match.
 */
export default function ServiceGrid({ services, columns = 3, className, priorityCount = 0 }: ServiceGridProps) {
    return (
        <div className={cn("grid auto-rows-fr gap-6", columnClasses[columns], className)}>
            {services.map((service, index) => (
                <ServiceCard key={service._id} service={service} priority={index < priorityCount} />
            ))}
        </div>
    );
}
