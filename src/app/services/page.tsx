import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ServiceGrid from "@/components/shared/ServiceGrid";
import { buttonVariants } from "@/components/ui/button";
import { limitServices } from "@/lib/api";

export const metadata: Metadata = {
    title: "Browse Services | FixMate",
    description: "Find verified technicians for phones, laptops, ACs, TVs and home appliances.",
};

export default async function ServicesPage() {
    // Only approved + available services are public
    const services = await limitServices();

    return (
        <>
            <Navbar />

            <main className="bg-slate-50">
                {/* Page header */}
                <section className="border-b bg-linear-to-br from-sky-50 via-blue-50/80 to-white">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                        <span className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                            All Services
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            Browse repair services
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                            Verified technicians, transparent starting prices. Pick a service and book in minutes.
                        </p>
                    </div>
                </section>

                {/* Listing */}
                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
                    {/* Search, filters and sort go here (Challenge 1) */}

                    {services.length > 0 ? (
                        <>
                            <p className="mb-6 text-sm text-slate-500">
                                Showing <span className="font-semibold text-slate-900">{services.length}</span>{" "}
                                {services.length === 1 ? "service" : "services"}
                            </p>
                            <ServiceGrid services={services} columns={3} priorityCount={3} />
                        </>
                    ) : (
                        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                            <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <SearchX className="size-8" aria-hidden="true" />
                            </div>
                            <div className="space-y-1.5">
                                <h2 className="text-lg font-semibold text-slate-900">No services found</h2>
                                <p className="text-sm leading-6 text-slate-500">
                                    We couldn&apos;t find any services right now. New technicians join every day —
                                    please check back soon.
                                </p>
                            </div>
                            <Link href="/" className={buttonVariants({ variant: "outline" })}>
                                Back to home
                            </Link>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
