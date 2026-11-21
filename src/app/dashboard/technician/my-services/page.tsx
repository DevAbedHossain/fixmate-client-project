import {
    Plus,
    Trash2,
    Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getServices, updateService } from "@/lib/api/GetAPI";
import { IService } from "@/types/Service";
import ServiceCard from "@/components/dashboard/technician/ServiceCard";
import ServiceCardCTA from "@/components/dashboard/technician/ServiceCardCTA";

function ServiceIcon({ category }: { category: string }) {
    return (
        <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EDF3F2] text-[#104D54]"
            role="img"
            aria-label={`${category} service`}
        >
            <Wrench className="h-4 w-4" aria-hidden="true" />
        </span>
    );
}

function ReviewBadge({ status }: { status: string }) {
    const normalizedStatus = status.toLowerCase();
    const statusClass =
        normalizedStatus === "approved"
            ? "bg-green-100 text-green-700"
            : normalizedStatus === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700";

    return (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClass}`}>
            {status}
        </span>
    );
}

export default async function MyServicesPage() {




    return (
        <main className="min-h-screen  px-4 py-5 text-[#001E28] sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1234px]">
                {/* Header */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[28px] font-bold tracking-[-1px]">
                            My services
                        </h1>
                        <p className="mt-1 text-[15px] text-[#60747A]">
                            Edit, pause or remove your listings.
                        </p>
                    </div>

                    <Button
                        className="h-10 rounded-lg bg-[#FF681B] px-4 text-[13px] font-semibold text-white shadow-[0_5px_12px_#ff681b25] hover:bg-[#E95C12]"
                    >
                        <Plus className="mr-1 h-4 w-4 sm:hidden" />
                        Add a service
                    </Button>
                </div>

                <ServiceCard />
            </div>

            <ServiceCardCTA />
        </main>
    );
}
