import Image from "next/image";
import { Wrench } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { IService } from "@/types/Service";
import ServiceAvailabilitySwitch from "./ServiceAvailabilitySwitch";
import ServiceStatusBadge from "./ServiceStatusBadge";
import Link from "next/link";
import DeleteServiceButton from "./DeleteServiceButton";

function ServiceThumbnail({ service }: { service: IService }) {
    return (
        <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
            {service.image ? (
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                />
            ) : (
                <Wrench className="size-5" aria-hidden="true" />
            )}
        </div>
    );
}


export default function MyServicesList({ services }: { services: IService[] }) {
    return (
        <>
            {/* Desktop / tablet: table */}
            <div className="hidden overflow-hidden rounded-xl border bg-card shadow-sm md:block">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="pl-4">Service</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Review</TableHead>
                            <TableHead>Available</TableHead>
                            <TableHead className="pr-4 text-right">
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service._id}>
                                <TableCell className="py-3 pl-4">
                                    <div className="flex items-center gap-3">
                                        <ServiceThumbnail service={service} />
                                        <span className="max-w-xs truncate font-semibold" title={service.title}>
                                            {service.title}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{service.category}</TableCell>
                                <TableCell className="font-mono">${service.basePrice * service.estimatedDuration}</TableCell>
                                <TableCell>
                                    <ServiceStatusBadge status={service.approvalStatus} />
                                </TableCell>
                                <TableCell>
                                    <ServiceAvailabilitySwitch
                                        serviceId={service._id ?? ""}
                                        serviceTitle={service.title}
                                        isAvailable={service.isAvailable}
                                    />
                                </TableCell>
                                <TableCell className="pr-4">
                                    <Link
                                        href={`/dashboard/technician/edit-service/${service._id ?? ""}`}
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        <span>Edit</span>
                                    </Link>
                                    <DeleteServiceButton
                                        serviceId={service._id ?? ""}
                                        serviceTitle={service.title}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile: cards */}
            <ul className="space-y-3 md:hidden">
                {services.map((service) => (
                    <li key={service._id} className="rounded-xl border bg-card p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <ServiceThumbnail service={service} />
                            <div className="min-w-0 flex-1 space-y-1">
                                <p className="font-semibold leading-snug">{service.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {service.category} · <span className="font-mono">${service.basePrice * service.estimatedDuration}</span>
                                </p>
                            </div>
                            <ServiceStatusBadge status={service.approvalStatus} />
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
                            <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ServiceAvailabilitySwitch
                                    serviceId={service._id ?? ""}
                                    serviceTitle={service.title}
                                    isAvailable={service.isAvailable}
                                />
                                Available
                            </label>
                            <Link
                                href={`/dashboard/technician/edit-service/${service._id ?? ""}`}
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                                <span>Edit</span>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
