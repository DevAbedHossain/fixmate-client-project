"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { deleteService } from "@/lib/api";

interface DeleteServiceButtonProps {
    serviceId: string;
    serviceTitle: string;
}

export default function DeleteServiceButton({ serviceId, serviceTitle }: DeleteServiceButtonProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {

        const result = await deleteService(serviceId);
        console.log("Delete result:", result);

        setOpen(false);
        if (result.deletedCount === 1) {
            toast.add({
                title: "Service deleted",
                description: `"${serviceTitle}" has been removed.`,
            });
            router.refresh();
        } else {
            toast.add({
                title: "Delete failed",
                description: "Could not delete the service. Please try again.",
            });
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button variant="ghost" size="sm" className="cursor-pointer text-destructive hover:text-destructive" />
                }
            >
                <Trash2 className="sm:hidden" />
                <span>Delete</span>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this service?</AlertDialogTitle>
                    <AlertDialogDescription>
                        &quot;{serviceTitle}&quot; will be permanently removed and customers will no
                        longer be able to book it. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDelete} >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
