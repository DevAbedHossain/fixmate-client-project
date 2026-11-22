"use client";

import type { SubmitEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { categoriesData } from "@/lib/globalshare/Category";

export interface ServiceFilterValues {
    search?: string;
    category?: string;
    mode?: string;
    sort?: string;
}

const SORT_OPTIONS = [
    { value: "", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
];

const selectClass =
    "h-11 w-full cursor-pointer rounded-xl border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

/**
 * Search bar + filters + sort. Values live in the URL (?search=&category=&mode=&sort=)
 * so they survive a reload and the server does the actual filtering.
 */
export default function ServiceFilters({ values }: { values: ServiceFilterValues }) {
    const router = useRouter();
    const pathname = usePathname();

    const applyFilters = (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const params = new URLSearchParams();
        for (const key of ["search", "category", "mode", "sort"]) {
            const value = String(formData.get(key) ?? "").trim();
            if (value) params.set(key, value);
        }
        router.push(params.size ? `${pathname}?${params}` : pathname, { scroll: false });
    };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        applyFilters(event.currentTarget);
    };

    const hasFilters = Boolean(values.search || values.category || values.mode || values.sort);

    return (
        // key resets the uncontrolled inputs when the URL changes (e.g. "Clear filters")
        <form
            key={JSON.stringify(values)}
            onSubmit={handleSubmit}
            role="search"
            className="rounded-2xl border bg-card p-4 shadow-sm"
        >
            <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto]">
                <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <input
                        name="search"
                        type="search"
                        defaultValue={values.search}
                        placeholder="Search by title or category…"
                        aria-label="Search services"
                        className={`${selectClass} cursor-text pl-10`}
                    />
                </div>

                <select
                    name="category"
                    defaultValue={values.category ?? ""}
                    aria-label="Category"
                    className={selectClass}
                    onChange={(event) => applyFilters(event.currentTarget.form!)}
                >
                    <option value="">All categories</option>
                    {categoriesData.map((category) => (
                        <option key={category.slug} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <select
                    name="mode"
                    defaultValue={values.mode ?? ""}
                    aria-label="Service mode"
                    className={selectClass}
                    onChange={(event) => applyFilters(event.currentTarget.form!)}
                >
                    <option value="">Any service mode</option>
                    <option value="Home Visit">Home Visit</option>
                    <option value="Shop Drop-off">Shop Drop-off</option>
                </select>

                <select
                    name="sort"
                    defaultValue={values.sort ?? ""}
                    aria-label="Sort by"
                    className={selectClass}
                    onChange={(event) => applyFilters(event.currentTarget.form!)}
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <Button type="submit" className="h-11 cursor-pointer gap-2 rounded-xl px-5">
                    <SlidersHorizontal className="size-4" aria-hidden="true" />
                    Apply
                </Button>
            </div>

            {hasFilters && (
                <div className="mt-3 flex justify-end">
                    <button
                        type="button"
                        onClick={() => router.push(pathname, { scroll: false })}
                        className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                        <X className="size-4" aria-hidden="true" />
                        Clear filters
                    </button>
                </div>
            )}
        </form>
    );
}
