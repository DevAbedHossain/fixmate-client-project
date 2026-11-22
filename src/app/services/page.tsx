import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Pagination from "@/components/services/Pagination";
import ServiceFilters from "@/components/services/ServiceFilters";
import ServiceGrid from "@/components/shared/ServiceGrid";
import { buttonVariants } from "@/components/ui/button";
import { getServices } from "@/lib/api";

export const metadata: Metadata = {
    title: "Browse Services | FixMate",
    description: "Find verified technicians for phones, laptops, ACs, TVs and home appliances.",
};

type SearchParams = { search?: string; category?: string; mode?: string; sort?: string; page?: string };

export default async function ServicesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const { search, category, mode, sort, page } = await searchParams;
    const filters = { search, category, mode, sort };
    const hasFilters = Boolean(search || category || mode);

    // Approved + available only; search, filter, sort and pagination all run in MongoDB
    const { services, total, page: currentPage, totalPages } = await getServices({ ...filters, page });

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
                    <div className="mb-8">
                        <ServiceFilters values={filters} />
                    </div>

                    {services.length > 0 ? (
                        <>
                            <p className="mb-6 text-sm text-slate-500">
                                Showing <span className="font-semibold text-slate-900">{services.length}</span> of{" "}
                                <span className="font-semibold text-slate-900">{total}</span> {total === 1 ? "service" : "services"}
                                {totalPages > 1 && ` · page ${currentPage} of ${totalPages}`}
                            </p>
                            <ServiceGrid services={services} columns={4} priorityCount={4} />
                            <Pagination page={currentPage} totalPages={totalPages} params={filters} />
                        </>
                    ) : (
                        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                            <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <SearchX className="size-8" aria-hidden="true" />
                            </div>
                            <div className="space-y-1.5">
                                <h2 className="text-lg font-semibold text-slate-900">No services found</h2>
                                <p className="text-sm leading-6 text-slate-500">
                                    {hasFilters
                                        ? "No services match your search. Try another keyword or clear the filters."
                                        : "We couldn't find any services right now. New technicians join every day — please check back soon."}
                                </p>
                            </div>
                            <Link href={hasFilters ? "/services" : "/"} className={buttonVariants({ variant: "outline" })}>
                                {hasFilters ? "Clear filters" : "Back to home"}
                            </Link>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
