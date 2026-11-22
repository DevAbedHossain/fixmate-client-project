"use client";

import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

import { toast } from "@/components/ui/toast";
import { updateService } from "@/lib/api";
import type { IService } from "@/types/Service";

import ServiceForm, { type ServiceFormValues } from "./ServiceForm";


export default function EditServiceForm({ service }: { service: IService }) {
    const router = useRouter();

    const handleUpdate = async (values: ServiceFormValues) => {
        try {
            // Any edit must be re-reviewed by an admin
            await updateService(service._id ?? "", { ...values, approvalStatus: "pending" });

            toast.add({
                title: "Service updated",
                description: "Your changes were saved and sent for review.",
            });
            router.push("/dashboard/technician/my-services");
            router.refresh();
        } catch {
            toast.add({
                title: "Update failed",
                description: "Could not save your changes. Please try again.",
            });
        }
    };

    return (
        <ServiceForm
            initialData={service}
            submitLabel="Save changes"
            submittingLabel="Saving..."
            submitIcon={<Save />}
            cancelHref={"/dashboard/technician/my-services"}
            onSubmit={handleUpdate}
        />
    );
}
