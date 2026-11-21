"use client";

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
import { getServices, updateService } from "@/lib/api/GetAPI";
import { IService } from "@/types/Service";
import { useState } from "react";


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


const ServiceCard = async () => {


    const result: IService[] = await getServices();
    const [checked, setChecked] = useState<boolean>()

    const toggleAvailability = async (id: string | undefined, check: boolean) => {
        const result = await updateService(check)
    }

    return (
        < div className="overflow-hidden rounded-2xl border border-[#C7D7D7] bg-white" >
            <div className="w-full overflow-x-auto">
                <Table className="min-w-[900px]">
                    <TableHeader>
                        <TableRow className="h-11 border-b border-[#C7D7D7] bg-[#F7F9F8] hover:bg-[#F7F9F8]">
                            <TableHead className="w-[42%] pl-4 font-semibold text-[#536A70]">
                                Service
                            </TableHead>
                            <TableHead className="w-[13%] font-semibold text-[#536A70]">
                                Category
                            </TableHead>
                            <TableHead className="w-[8%] font-semibold text-[#536A70]">
                                Price
                            </TableHead>
                            <TableHead className="w-[12%] font-semibold text-[#536A70]">
                                Review
                            </TableHead>
                            <TableHead className="w-[14%] font-semibold text-[#536A70]">
                                Available
                            </TableHead>
                            <TableHead className="w-[11%]" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {result.map((service: IService) => (
                            <TableRow
                                key={service._id}
                                className="h-[69px] border-b border-[#D6E0E0] last:border-b-0 hover:bg-[#FAFCFB]"
                            >
                                <TableCell className="pl-4">
                                    <div className="flex items-center gap-3">
                                        <img src={service.image} className="w-9 h-9 rounded-full " alt="" />
                                        <span className="text-[13px] font-semibold">
                                            {service.title}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className="text-[13px]">
                                    {service.category}
                                </TableCell>

                                <TableCell className="text-[13px]">
                                    ${service.basePrice * service.estimatedDuration}
                                </TableCell>

                                <TableCell>
                                    <ReviewBadge status={service.approvalStatus} />
                                </TableCell>

                                <TableCell>
                                    <Switch
                                        checked={service.isAvailable}
                                        onCheckedChange={(checked) =>
                                            toggleAvailability(service._id, checked)
                                        }
                                        aria-label={`Availability for ${service.title}`}
                                        className="data-[state=checked]:bg-[#104D54]"
                                    />
                                </TableCell>

                                <TableCell className="pr-5">
                                    <div className="flex items-center justify-end gap-3">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 rounded-lg bg-[#EDF3F2] px-3 text-[12px] font-semibold text-[#004451] hover:bg-[#DEEAE8]"
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            // onClick={() => setDeleteId(service.id)}
                                            className="h-8 px-1 text-[12px] font-semibold text-[#004451] hover:bg-red-50 hover:text-red-600"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                        {result.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="py-14 text-center text-[#60747A]"
                                >
                                    No services found. Add your first service.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
};

export default ServiceCard;