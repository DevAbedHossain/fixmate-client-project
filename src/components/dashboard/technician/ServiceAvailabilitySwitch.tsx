"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";
import { updateService } from "@/lib/api";

interface ServiceAvailabilitySwitchProps {
    serviceId: string;
    serviceTitle: string;
    isAvailable: boolean;
}

export default function ServiceAvailabilitySwitch({
    serviceId,
    serviceTitle,
    isAvailable,
}: ServiceAvailabilitySwitchProps) {
    const router = useRouter();
    const [checked, setChecked] = useState(isAvailable);


    const handleChange = async (nextChecked: boolean) => {
        setChecked(nextChecked);

        const result = await updateService(serviceId, { isAvailable: nextChecked });
        console.log("Update result:", result);

        if (result.modifiedCount > 0) {
            toast.add({
                title: `${nextChecked ? "Service available" : "Service paused"}`,
                description: `"${serviceTitle}" is now ${nextChecked ? "visible to" : "hidden from"} customers.`,
            });
            router.refresh();
        }
    }

    return (
        <Switch
            checked={checked}
            onCheckedChange={handleChange}
            aria-label={`Toggle availability for ${serviceTitle}`}
            className="cursor-pointer"
        />
    );
}
