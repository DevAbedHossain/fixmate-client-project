"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
    AirVent,
    Check,
    Laptop,
    PlugZap,
    Refrigerator,
    Smartphone,
    Tv,
    WashingMachine,
} from "lucide-react";
import { cn } from "cn";

export type Category =
    | "Smartphone"
    | "Laptop & PC"
    | "AC"
    | "Refrigerator"
    | "TV"
    | "Washing Machine"
    | "Electrical";

type CategoryEntry = {
    readonly name: Category;
    readonly icon: LucideIcon;
};

const CATEGORIES: readonly CategoryEntry[] = [
    {
        name: "Smartphone",
        icon: Smartphone,
    },
    {
        name: "Laptop & PC",
        icon: Laptop,
    },
    {
        name: "AC",
        icon: AirVent,
    },
    {
        name: "Refrigerator",
        icon: Refrigerator,
    },
    {
        name: "TV",
        icon: Tv,
    },
    {
        name: "Washing Machine",
        icon: WashingMachine,
    },
    {
        name: "Electrical",
        icon: PlugZap,
    },
];

const PopularCategories = () => {
    const [selected, setSelected] = useState<Category | null>(null);

    return (
        <section className="bg-background py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Popular Categories
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Select a category to see its most-requested repairs and typical
                        turnaround times.
                    </p>
                </header>

                <div
                    role="group"
                    aria-label="Repair categories"
                    className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12"
                >
                    {CATEGORIES.map((category) => {
                        const isActive = category.name === selected;
                        const Icon = category.icon;

                        return (
                            <button
                                key={category.name}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setSelected(category.name)}
                                className={cn(
                                    "group relative flex w-[calc(50%-0.5rem)] flex-col items-center gap-3 rounded-2xl border px-3 py-5 text-center transition duration-200 outline-none sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc((100%-6rem)/7)]",
                                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer",
                                    isActive
                                        ? "border-brand bg-brand/5 shadow-md shadow-brand/10"
                                        : "border-border/60 bg-background hover:-translate-y-1 hover:border-brand/40 hover:shadow-md",
                                )}
                            >
                                <span
                                    className={cn(
                                        "grid size-11 place-items-center rounded-full transition duration-200",
                                        isActive
                                            ? "bg-brand text-brand-foreground"
                                            : "bg-brand/10 text-brand group-hover:bg-brand group-hover:text-brand-foreground",
                                    )}
                                >
                                    <Icon className="size-5" aria-hidden="true" />
                                </span>

                                <span className="text-sm font-semibold text-foreground">
                                    {category.name}
                                </span>

                                {isActive && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-brand text-brand-foreground"
                                    >
                                        <Check className="size-3" strokeWidth={3} />
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;
