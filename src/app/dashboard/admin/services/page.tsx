import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PackageCheck, Wrench } from "lucide-react";

import ServiceApprovalActions from "@/components/dashboard/admin/ServiceApprovalActions";
import FilterTabs from "@/components/dashboard/shared/FilterTabs";
import ServiceStatusBadge from "@/components/dashboard/technician/ServiceStatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllServices } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import { requireRole } from "@/lib/require-role";
import { getServerToken } from "@/lib/server-token";
import type { IService } from "@/types/Service";

export const metadata: Metadata = {
    title: "Service Approval | FixMate",
};

// Pending is the default tab so new listings are easy to find
const APPROVAL_FILTERS = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "all", label: "All" },
];

function Thumb({ service }: { service: IService }) {
    return (
        <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
            {service.image ? (
                <Image src={service.image} alt="" fill sizes="48px" className="object-cover" />
            ) : (
                <Wrench className="absolute inset-0 m-auto size-5 text-muted-foreground" aria-hidden="true" />
            )}
        </span>
    );
}

export default async function ServiceApprovalPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
    await requireRole("admin");
    const services = await getAllServices(await getServerToken());

    const { status } = await searchParams;
    const active = APPROVAL_FILTERS.some((filter) => filter.value === status) ? status! : "pending";
    const visible = active === "all" ? services : services.filter((service) => service.approvalStatus === active);
    const counts = Object.fromEntries(
        APPROVAL_FILTERS.map(({ value }) => [
            value,
            value === "all" ? services.length : services.filter((service) => service.approvalStatus === value).length,
        ])
    );

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Service approval</h1>
                    <p className="text-sm text-muted-foreground">Only approved and available services appear on public pages.</p>
                </div>
                {/* "pending" is the default, so its tab links without a parameter */}
                <FilterTabs
                    options={APPROVAL_FILTERS}
                    active={active}
                    counts={counts}
                    allValue="pending"
                    label="Filter services by approval status"
                />
            </div>

            {visible.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
                    <PackageCheck className="size-10 text-muted-foreground" aria-hidden="true" />
                    <p className="font-semibold">{active === "pending" ? "All caught up!" : "No services here"}</p>
                    <p className="text-sm text-muted-foreground">
                        {active === "pending" ? "There are no services waiting for approval." : "Try another filter."}
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="pl-5">Service</TableHead>
                                <TableHead>Technician</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Mode</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="pr-5 text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visible.map((service) => (
                                <TableRow key={service._id}>
                                    <TableCell className="py-3 pl-5">
                                        <div className="flex max-w-80 items-center gap-3">
                                            <Thumb service={service} />
                                            <div className="min-w-0">
                                                <Link href={`/services/${service._id}`} className="block truncate font-medium hover:text-primary">
                                                    {service.title}
                                                </Link>
                                                <p className="text-xs text-muted-foreground">{service.category} · {service.serviceArea}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p>{service.technicianName}</p>
                                        <p className="text-xs text-muted-foreground">{service.technicianEmail}</p>
                                    </TableCell>
                                    <TableCell className="font-semibold">{formatCurrency(Number(service.basePrice))}</TableCell>
                                    <TableCell className="text-muted-foreground">{service.serviceMode}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col items-start gap-1">
                                            <ServiceStatusBadge status={service.approvalStatus} />
                                            {!service.isAvailable && <span className="text-xs text-muted-foreground">Paused by technician</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="pr-5">
                                        <ServiceApprovalActions service={service} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
