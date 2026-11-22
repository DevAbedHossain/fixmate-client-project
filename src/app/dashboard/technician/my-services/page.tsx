import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PackageOpen, Plus } from "lucide-react";

import MyServicesList from "@/components/dashboard/technician/MyServicesList";
import { buttonVariants } from "@/components/ui/button";
import { getMyServices } from "@/lib/api";
import { auth } from "@/lib/auth";
import { getServerToken } from "@/lib/server-token";
import { cn } from "@/lib/utils";


export default async function MyServicesPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/sign-in");
    }

    // Every service owned by this technician, including pending / rejected / paused ones
    const services = await getMyServices(await getServerToken());

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">My services</h1>
                    <p className="text-sm text-muted-foreground">
                        Edit, pause or remove your listings.
                    </p>
                </div>

                <Link href="/dashboard/technician/add-service" className={cn(buttonVariants(), "w-full sm:w-auto")}>
                    <Plus />
                    Add a service
                </Link>
            </div>

            {services.length > 0 ? (
                <MyServicesList services={services} />
            ) : (
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card px-6 py-16 text-center">
                    <PackageOpen className="size-10 text-muted-foreground" aria-hidden="true" />
                    <div className="space-y-1">
                        <h2 className="font-semibold">No services yet</h2>
                        <p className="text-sm text-muted-foreground">
                            Create your first listing so customers can start booking you.
                        </p>
                    </div>
                    <Link href="/dashboard/technician/add-service" className={buttonVariants({ variant: "outline" })}>
                        <Plus />
                        Add a service
                    </Link>
                </div>
            )}
        </div>
    );
}
