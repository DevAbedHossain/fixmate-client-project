import type { Metadata } from "next";
import { redirect as redirectTo } from "next/navigation";
import Image from "next/image";
import { BadgeCheck, ShieldCheck, Zap } from "lucide-react";

import SignInForm from "@/components/auth/sign-in-form";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Sign In | FixMate",
  description:
    "Sign in to your FixMate account to book repair services and track every step of the job.",
};

const benefits = [
  { icon: ShieldCheck, label: "Verified technicians for every job" },
  { icon: Zap, label: "Book in minutes, track in real time" },
  { icon: BadgeCheck, label: "Pay only after the job is done" },
] as const;

const SignInPage = async ({ searchParams }: { searchParams: Promise<{ redirect?: string }> }) => {
  const { redirect } = await searchParams;

  // Already signed in → straight to their dashboard
  const session = await getSession();
  if (session) redirectTo("/dashboard");

  return (
    <>

      <Navbar />

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50/80 to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-24 top-16 size-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -right-20 top-0 size-96 rounded-full bg-sky-200/50 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-white/70 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          <div className="relative hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[3rem] bg-brand/10 blur-2xl"
            />
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2rem] bg-muted shadow-2xl shadow-brand/10 ring-1 ring-border/50">
              <Image
                src="/images/hero-technician.jpg"
                alt="Technician repairing a computer with precision tools"
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/10" />

              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="inline-flex items-center rounded-full bg-brand/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">
                  Home &amp; Device Repairs
                </span>
                <p className="mt-4 text-balance text-2xl font-bold leading-snug text-white xl:text-3xl">
                  Welcome back — your verified technicians are ready.
                </p>
                <ul className="mt-6 grid gap-3">
                  {benefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <li
                        key={benefit.label}
                        className="flex items-center gap-3 text-sm font-medium text-slate-200"
                      >
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        {benefit.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <SignInForm redirectTo={redirect} />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SignInPage;
