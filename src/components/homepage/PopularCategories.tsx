
import Link from "next/link";


import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { categoriesData } from "@/lib/globalshare/Category";

const categories = categoriesData;

const PopularCategories = () => {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mb-10 text-center">
                    <span className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                        Popular Categories
                    </span>

                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Choose Your Repair Category
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                        Find trusted professionals for your devices and home
                        appliances. Choose a category and get your repair started.
                    </p>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={category.name}
                                href={`/services?category=${encodeURIComponent(category.slug)}`}
                                className="group"
                            >
                                <Card className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
                                    <CardContent className="flex h-full flex-col items-center px-3 py-3 text-center">

                                        {/* Icon */}
                                        <div
                                            className={`mb-5 flex size-16 items-center justify-center rounded-2xl ${category.color} transition-transform duration-300 group-hover:scale-110`}
                                        >
                                            <Icon size={32} strokeWidth={1.8} />
                                        </div>

                                        {/* Category Name */}
                                        <h3 className="text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                            {category.name}
                                        </h3>

                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default PopularCategories;
