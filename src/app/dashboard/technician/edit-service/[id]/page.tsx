import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import EditServiceForm from "@/components/dashboard/technician/EditServiceForm";
import ServiceStatusBadge from "@/components/dashboard/technician/ServiceStatusBadge";
import { getServiceById } from "@/lib/api";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Edit Service | FixMate",
};

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/sign-in");
    }

    const service = await getServiceById(id);

    // Hide services that don't exist or belong to another technician
    if (!service || service.technicianEmail !== session.user.email) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-5xl space-y-6 pb-10">
            <div className="space-y-1">
                <Link
                    href="/dashboard/technician/my-services"
                    className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    <ArrowLeft className="size-4" />
                    Back to My Services
                </Link>

                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Edit Service</h1>
                    <ServiceStatusBadge status={service.approvalStatus} />
                </div>

                <p className="text-sm text-muted-foreground">
                    Saving changes sends this service back to <strong>Pending</strong> until an admin approves it again.
                </p>
            </div>

            <EditServiceForm service={service} />
        </div>
    );
}
