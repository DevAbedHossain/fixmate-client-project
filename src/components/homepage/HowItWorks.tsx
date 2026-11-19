import { Fragment } from "react";
import { ArrowRight, ClipboardList, CreditCard, Search, Wrench } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Service",
    description: "Browse admin-approved repair services.",
  },
  {
    icon: ClipboardList,
    title: "Send a Request",
    description: "Share your problem, address and preferred date.",
  },
  {
    icon: Wrench,
    title: "Technician Fixes It",
    description: "Our technician will handle the repair.",
  },
  {
    icon: CreditCard,
    title: "Pay After Completion",
    description: "Make payment only after the job is done.",
  },
] as const;

const HowItWorks = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-100/80 via-blue-50 to-sky-100/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand shadow-sm">
            How FixMate Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get Your Repair Done in 4 Easy Steps
          </h2>
        </div>

        <ol className="mt-12 flex flex-col gap-7 md:flex-row md:items-stretch md:gap-3 lg:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Fragment key={step.title}>
                {index > 0 && (
                  <ArrowRight
                    className="mx-auto size-6 shrink-0 self-center rotate-90 text-brand md:rotate-0"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                )}

                <li className="relative flex flex-1 flex-col items-center rounded-xl bg-white px-6 pb-6 pt-8 text-center shadow-[0_4px_18px_rgba(15,23,42,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(15,23,42,0.12)]">
                  <span
                    aria-hidden="true"
                    className="absolute -top-4 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground"
                  >
                    {index + 1}
                  </span>

                  <Icon className="size-9 text-brand" aria-hidden="true" />

                  <h3 className="mt-4 text-base font-bold text-foreground sm:text-lg">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              </Fragment>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
