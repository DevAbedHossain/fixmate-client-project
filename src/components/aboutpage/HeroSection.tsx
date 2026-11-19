import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, CheckCircle2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
    return (
        < section className="relative isolate bg-gradient-to-br from-blue-50 via-sky-50/70 to-white" >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute -left-32 top-10 size-80 rounded-full bg-blue-200/30 blur-3xl" />
                <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-sky-200/40 blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">

                <div>
                    <Badge
                        variant="secondary"
                        className="rounded-full border border-blue-100 bg-blue-100/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700"
                    >
                        About FixMate
                    </Badge>

                    <h1 className="mt-6 max-w-xl text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[54px]">
                        Making Repairs
                        <span className="block text-blue-600">
                            Simple, Reliable
                        </span>
                        & Stress-Free.
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
                        FixMate connects people with skilled repair technicians.
                        From broken smartphones to home appliances, we make
                        finding reliable repair services easier than ever.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button
                            size="lg"
                            className="h-12 rounded-xl bg-blue-600 px-6 font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                        >
                            <Link className="flex items-center gap-3" href="/services">
                                Explore Services
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 rounded-xl border-slate-300 bg-white px-6 font-semibold"
                        >
                            <Link href="/sign-up">
                                Join FixMate
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                        {[
                            "Verified Technicians",
                            "Secure Payments",
                            "Pay After Completion",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-2 text-xs font-medium text-slate-600"
                            >
                                <CheckCircle2 className="size-4 text-emerald-500" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 rounded-[2rem] bg-blue-200/40 blur-2xl" />

                    <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white shadow-2xl shadow-blue-900/10">
                        <Image
                            src="/images/hero-technician.jpg"
                            alt="Professional technician repairing a computer"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                                <BadgeCheck className="size-4 text-emerald-400" />
                                Trusted Repair Professionals
                            </div>

                            <h2 className="mt-4 max-w-sm text-2xl font-bold leading-snug text-white sm:text-3xl">
                                Better repair experiences start with FixMate.
                            </h2>
                        </div>
                    </div>

                    <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-left-8">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <ShieldCheck className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">
                                Secure & Reliable
                            </p>
                            <p className="text-xs text-slate-500">
                                Repair with confidence
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section >
    );
};

export default HeroSection;