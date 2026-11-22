"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, ShieldCheck } from "lucide-react";

import ServiceForm, { type ServiceFormValues } from "@/components/dashboard/technician/ServiceForm";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import { createService } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

const MY_SERVICES_URL = "/dashboard/technician/my-services";

export default function AddServicePage() {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const handleAddService = async (values: ServiceFormValues) => {
        if (!user) return;

        const result = await createService({
            ...values,
            isAvailable: true,
            approvalStatus: "pending",
            technicianEmail: user.email,
            technicianName: user.name,
            technicianId: user.id,
        });

        if (result.insertedId) {
            toast.add({
                title: "Success",
                description: "Successfully added service",
            });
            router.push(MY_SERVICES_URL);
        }
    };

    return (
        <div className="mx-auto max-w-5xl space-y-6 pb-10">
            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <Link
                        href={MY_SERVICES_URL}
                        className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="size-4" />
                        Back to My Services
                    </Link>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Add New Service</h1>

                    <p className="text-sm text-muted-foreground">
                        Create a repair service listing and make it available to customers.
                    </p>
                </div>

                <Badge variant="outline" className="w-fit gap-1.5 rounded-full px-3 py-1.5">
                    <ShieldCheck className="size-4" />
                    Technician Panel
                </Badge>
            </div>

            <ServiceForm
                submitLabel="Create Service"
                submittingLabel="Creating..."
                submitIcon={<Plus className="size-4" />}
                cancelHref={MY_SERVICES_URL}
                onSubmit={handleAddService}
            />
        </div>
    );
}
