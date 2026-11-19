import Image from "next/image";
import { ArrowRight, BadgeCheck, ShieldCheck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: ShieldCheck,
    label: "Verified Technicians",
  },
  {
    icon: Zap,
    label: "Secure Payments",
  },
  {
    icon: BadgeCheck,
    label: "Pay After Completion",
  },
] as const;

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50/80 to-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-24 top-10 size-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -right-16 top-0 size-96 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-white/70 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand sm:text-sm">
            Repair Made Simple
          </span>

          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
            Broken Device?{" "}
            <span className="block">Get It Fixed by</span>
            <span className="block">Verified Technicians.</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Reliable repair services for your home and devices. Track every
            step and pay only when the job is done.
          </p>

          <Link href="/services">
            <Button
              type="button"
              size="lg"
              className="mt-5 cursor-pointer h-12 w-full rounded-xl bg-brand px-6 text-brand-foreground hover:bg-brand/90 sm:w-auto sm:rounded-full"
            >
              Explore Services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </Link>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <li
                  key={feature.label}
                  className="flex items-center gap-3 sm:border-l sm:border-border sm:pl-5 sm:first:border-l-0 sm:first:pl-0"
                >
                  <Icon
                    className="size-6 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  <span className="max-w-36 text-sm font-medium leading-tight text-brand">
                    {feature.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none lg:justify-self-end">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[3rem] bg-brand/10 blur-2xl"
          />
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2rem] bg-muted shadow-2xl shadow-brand/10 ring-1 ring-border/50">
            <Image
              src="/images/hero-technician.jpg"
              alt="Technician repairing a computer with precision tools"
              fill
              preload
              sizes="(min-width: 1024px) 46rem, (min-width: 640px) 36rem, 100vw"
              className="object-cover object-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
