import { BadgeCheck, CircleCheck, Star, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TrustPoint = {
  readonly icon: LucideIcon;
  readonly stat: string;
  readonly title: string;
  readonly description: string;
};

type Testimonial = {
  readonly name: string;
  readonly location: string;
  readonly rating: number;
  readonly quote: string;
};

const trustPoints: readonly TrustPoint[] = [
  {
    icon: BadgeCheck,
    stat: "500+",
    title: "Verified Technicians",
    description:
      "Every technician is ID-verified, skill-tested and rated after each job.",
  },
  {
    icon: CircleCheck,
    stat: "12,000+",
    title: "Jobs Completed",
    description:
      "From quick fixes to full repairs, finished on time across the city.",
  },
  {
    icon: Wallet,
    stat: "0%",
    title: "Pay After Service",
    description:
      "No advance payment — you pay only when the job is done to your satisfaction.",
  },
];

const testimonials: readonly Testimonial[] = [
  {
    name: "Rahim Uddin",
    location: "Uttara, Dhaka",
    rating: 5,
    quote:
      "My phone screen was replaced in under an hour, and the price matched the estimate exactly. I paid only after checking everything.",
  },
  {
    name: "Nusrat Jahan",
    location: "Agrabad, Chattogram",
    rating: 5,
    quote:
      "The AC technician arrived on time, explained the gas issue clearly, and I paid after the cooling was verified. Truly hassle-free.",
  },
];

const WhyChoosUs = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/60 to-white py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-24 top-16 size-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -right-16 bottom-10 size-80 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand shadow-sm">
            Why Choose Us
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Why Choose FixMate
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Verified pros, transparent pricing and payment only when you are
            fully satisfied.
          </p>
        </header>

        <ul className="mt-10 grid gap-6 md:grid-cols-3 sm:mt-12">
          {trustPoints.map((point) => {
            const Icon = point.icon;

            return (
              <li
                key={point.title}
                className="rounded-3xl border border-border/50 bg-background/80 p-6 shadow-lg shadow-brand/5 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="text-3xl font-extrabold tracking-tight text-brand tabular-nums">
                    {point.stat}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-3xl bg-brand p-6 text-center text-brand-foreground shadow-lg shadow-brand/20">
            <span className="text-5xl font-extrabold tracking-tight tabular-nums">
              4.9
            </span>
            <span className="mt-1 flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-5 fill-amber-300 text-amber-300" />
              ))}
            </span>
            <span className="mt-3 text-sm font-medium opacity-90">
              Average rating from 2,400+ verified jobs
            </span>
            <span className="sr-only">Rated 4.9 out of 5</span>
          </div>

          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-3xl border border-border/50 bg-background/80 p-6 shadow-lg shadow-brand/5 backdrop-blur-sm"
            >
              <span
                className="flex gap-0.5 text-amber-400"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className={
                      index < testimonial.rating
                        ? "size-4 fill-current"
                        : "size-4 text-border"
                    }
                  />
                ))}
              </span>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                “{testimonial.quote}”
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/10 text-sm font-bold text-brand"
                >
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {testimonial.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoosUs;
