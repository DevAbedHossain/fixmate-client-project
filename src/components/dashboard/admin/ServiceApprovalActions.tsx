"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { updateServiceApproval } from "@/lib/api";
import { getClientToken } from "@/lib/auth-client";
import type { IService } from "@/types/Service";

/** Approve / Reject buttons. The current status's button is hidden. */
export default function ServiceApprovalActions({ service }: { service: IService }) {
    const router = useRouter();
    const [pending, setPending] = useState<"approved" | "rejected" | null>(null);

    const update = async (approvalStatus: "approved" | "rejected") => {
        setPending(approvalStatus);
        try {
            await updateServiceApproval(service._id ?? "", approvalStatus, await getClientToken());
            toast.add({
                type: "success",
                title: approvalStatus === "approved" ? "Service approved" : "Service rejected",
                description: `"${service.title}" is now ${approvalStatus === "approved" ? "live on FixMate" : "hidden from customers"}.`,
            });
            router.refresh();
        } catch (error) {
            toast.add({ type: "error", title: "Update failed", description: error instanceof Error ? error.message : "Please try again." });
        } finally {
            setPending(null);
        }
    };

    return (
        <div className="flex justify-end gap-2">
            {service.approvalStatus !== "approved" && (
                <Button size="sm" className="cursor-pointer" disabled={pending !== null} onClick={() => update("approved")}>
                    {pending === "approved" ? <Loader2 className="animate-spin" /> : <Check />}
                    Approve
                </Button>
            )}
            {service.approvalStatus !== "rejected" && (
                <Button size="sm" variant="outline" className="cursor-pointer" disabled={pending !== null} onClick={() => update("rejected")}>
                    {pending === "rejected" ? <Loader2 className="animate-spin" /> : <X />}
                    Reject
                </Button>
            )}
        </div>
    );
}
