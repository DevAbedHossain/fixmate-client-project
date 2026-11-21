import Link from "next/link";
import { ArrowRight, PackageOpen } from "lucide-react";

import ServiceGrid from "@/components/shared/ServiceGrid";
import { buttonVariants } from "@/components/ui/button";
import { limitServices } from "@/lib/api/GetAPI";
import { cn } from "@/lib/utils";

const HOME_SERVICE_COUNT = 6;

const ServicesList = async () => {
    const services = (await limitServices()).slice(0, HOME_SERVICE_COUNT);

    return (
        <section className="bg-slate-50 py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section heading */}
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <span className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                            Featured Services
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            Popular Repair Services
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
                            Hand-picked services from verified technicians. Transparent pricing, no surprises.
                        </p>
                    </div>

                    <Link
                        href="/services"
                        className={cn(buttonVariants({ variant: "outline" }), "h-10 w-full gap-2 px-5 md:w-auto")}
                    >
                        View all services
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {services.length > 0 ? (
                    <ServiceGrid services={services} priorityCount={3} />
                ) : (
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <PackageOpen className="size-10 text-slate-400" aria-hidden="true" />
                        <p className="font-semibold text-slate-700">No services available yet</p>
                        <p className="text-sm text-slate-500">Check back soon — new technicians are joining every day.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServicesList;
