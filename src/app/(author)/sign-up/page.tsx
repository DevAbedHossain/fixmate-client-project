// import type { Metadata } from "next";
// import Image from "next/image";
// import { Clock, ShieldCheck, Users } from "lucide-react";

// import SignUpForm from "@/components/auth/sign-up-form";

// export const metadata: Metadata = {
//   title: "Sign Up | FixMate",
//   description:
//     "Create your FixMate account — join as a customer to book repair services or as a technician to start earning.",
// };

// const benefits = [
//   { icon: Users, label: "One account, two ways to use FixMate" },
//   { icon: Clock, label: "Sign up in under a minute" },
//   { icon: ShieldCheck, label: "Secure sign-in powered by Better Auth" },
// ] as const;

// const SignUpPage = () => {
//   return (
//     <section className="relative isolate overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50/80 to-white">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10"
//       >
//         <div className="absolute -left-24 top-16 size-72 rounded-full bg-brand/10 blur-3xl" />
//         <div className="absolute -right-20 top-0 size-96 rounded-full bg-sky-200/50 blur-3xl" />
//         <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-white/70 blur-3xl" />
//       </div>

//       <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
//         <div className="relative hidden lg:block">
//           <div
//             aria-hidden="true"
//             className="absolute -inset-5 rounded-[3rem] bg-brand/10 blur-2xl"
//           />
//           <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2rem] bg-muted shadow-2xl shadow-brand/10 ring-1 ring-border/50">
//             <Image
//               src="/images/hero-technician.jpg"
//               alt="Technician repairing a computer with precision tools"
//               fill
//               sizes="(min-width: 1024px) 34rem, 100vw"
//               className="object-cover object-left"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/10" />

//             <div className="absolute inset-x-0 bottom-0 p-8">
//               <span className="inline-flex items-center rounded-full bg-brand/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">
//                 Join FixMate
//               </span>
//               <p className="mt-4 text-balance text-2xl font-bold leading-snug text-white xl:text-3xl">
//                 Create your account — book services or start earning today.
//               </p>
//               <ul className="mt-6 grid gap-3">
//                 {benefits.map((benefit) => {
//                   const Icon = benefit.icon;

//                   return (
//                     <li
//                       key={benefit.label}
//                       className="flex items-center gap-3 text-sm font-medium text-slate-200"
//                     >
//                       <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
//                         <Icon className="size-4" aria-hidden="true" />
//                       </span>
//                       {benefit.label}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//         </div>

//         <SignUpForm />
//       </div>
//     </section>
//   );
// };

// export default SignUpPage;


import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    Check,
    Clock,
    ShieldCheck,
    Users,
    Wrench,
    Zap,
    Star,
} from "lucide-react";

import SignUpForm from "@/components/auth/sign-up-form";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
    title: "Sign Up | FixMate",
    description:
        "Create your FixMate account — join as a customer to book repair services or as a technician to start earning.",
};

const benefits = [
    {
        icon: Users,
        title: "For Everyone",
        description: "Book repairs or grow your technician business.",
    },
    {
        icon: Clock,
        title: "Quick Registration",
        description: "Create your account in less than a minute.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Platform",
        description: "Your account and information stay protected.",
    },
] as const;

const SignUpPage = () => {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen overflow-hidden bg-[#F5F8FF]">

                {/* Background Decoration */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-40 top-20 size-[500px] rounded-full bg-blue-200/30 blur-[120px]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-40 bottom-0 size-[500px] rounded-full bg-sky-200/30 blur-[120px]"
                />

                <div className="relative mx-auto grid min-h-screen max-w-[1440px] items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-12 xl:px-20">

                    {/* LEFT SIDE - PROMOTIONAL PANEL */}
                    <section className="relative hidden lg:block">

                        {/* Main Visual Card */}
                        <div className="relative min-h-[690px] overflow-hidden rounded-[32px] bg-[#102B65] shadow-2xl shadow-blue-900/15">

                            {/* Background Image */}
                            <Image
                                src="/images/hero-technician.jpg"
                                alt="Professional technician repairing a computer"
                                fill
                                priority
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover object-center"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-blue-950/35 to-[#061B45]/95" />

                            {/* Decorative Gradient */}
                            <div className="absolute -right-32 top-20 size-96 rounded-full bg-blue-500/30 blur-[100px]" />
                            <div className="absolute -left-32 bottom-10 size-80 rounded-full bg-sky-400/20 blur-[90px]" />

                            {/* Panel Content */}
                            <div className="relative z-10 flex min-h-[690px] flex-col justify-between p-8 xl:p-11">

                                {/* Brand */}
                                <Link
                                    href="/"
                                    className="flex w-fit items-center gap-3"
                                >
                                    <span className="flex size-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/30">
                                        <Wrench className="size-6" strokeWidth={2.5} />
                                    </span>

                                    <span className="text-2xl font-extrabold tracking-tight text-white">
                                        FixMate<span className="text-blue-400">.</span>
                                    </span>
                                </Link>

                                {/* Floating Verified Badge */}
                                <div className="absolute top-28 right-8 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3.5 shadow-xl backdrop-blur-xl xl:right-10">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                                        <ShieldCheck className="size-5" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-white">
                                            Verified Professionals
                                        </p>
                                        <p className="text-xs text-blue-100">
                                            Reliable repair experts
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Content */}
                                <div className="mt-auto max-w-xl">

                                    {/* Eyebrow */}
                                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-100 backdrop-blur-md">
                                        <Zap className="size-3.5 text-yellow-300" />
                                        Your Trusted Repair Partner
                                    </span>

                                    {/* Heading */}
                                    <h1 className="mt-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-white xl:text-5xl">
                                        Repair Smarter.
                                        <br />
                                        Live <span className="text-blue-300">Better.</span>
                                    </h1>

                                    <p className="mt-5 max-w-md text-sm leading-7 text-blue-100/90 xl:text-base">
                                        Join FixMate and connect with trusted repair professionals.
                                        Whether you need a repair or want to offer your skills,
                                        everything starts here.
                                    </p>

                                    {/* Benefits */}
                                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                        {benefits.map((benefit) => {
                                            const Icon = benefit.icon;

                                            return (
                                                <div
                                                    key={benefit.title}
                                                    className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
                                                >
                                                    <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-white/15 text-blue-200">
                                                        <Icon className="size-5" />
                                                    </div>

                                                    <h3 className="text-sm font-bold text-white">
                                                        {benefit.title}
                                                    </h3>

                                                    <p className="mt-1.5 text-xs leading-5 text-blue-100/75">
                                                        {benefit.description}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Bottom Trust Information */}
                                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">

                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-2">
                                                <span className="flex size-8 items-center justify-center rounded-full border-2 border-blue-950 bg-blue-300 text-xs font-bold text-blue-950">
                                                    C
                                                </span>
                                                <span className="flex size-8 items-center justify-center rounded-full border-2 border-blue-950 bg-emerald-300 text-xs font-bold text-emerald-950">
                                                    T
                                                </span>
                                                <span className="flex size-8 items-center justify-center rounded-full border-2 border-blue-950 bg-amber-300 text-xs font-bold text-amber-950">
                                                    F
                                                </span>
                                            </div>

                                            <p className="text-xs text-blue-100">
                                                Built for customers & technicians
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                            <span className="flex items-center gap-1 text-yellow-300">
                                                <Star className="size-4 fill-current" />
                                            </span>
                                            Better repair experience
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Floating Bottom Card */}
                        <div className="absolute -right-6 bottom-12 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl xl:flex">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <Check className="size-6" />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Pay After Completion
                                </p>
                                <p className="text-xs text-slate-500">
                                    Your satisfaction comes first
                                </p>
                            </div>

                            <ArrowUpRight className="ml-3 size-4 text-blue-600" />
                        </div>

                    </section>

                    {/* RIGHT SIDE - SIGNUP FORM */}
                    <section className="flex w-full items-center justify-center py-6 lg:py-12">
                        <div className="w-full">

                            {/* Mobile Brand */}
                            <Link
                                href="/"
                                className="mb-8 flex w-fit items-center gap-2.5 lg:hidden"
                            >
                                <span className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                    <Wrench className="size-5" />
                                </span>

                                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                                    FixMate<span className="text-blue-600">.</span>
                                </span>
                            </Link>

                            <SignUpForm />

                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </>
    );
};

export default SignUpPage;

