import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Link from 'next/link';

const FinalCTA = () => {
    return (
        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-blue-600 px-6 py-14 text-center shadow-2xl shadow-blue-600/15 sm:px-12 sm:py-20">

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-20 -top-32 size-80 rounded-full bg-white/10 blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-40 -right-20 size-96 rounded-full bg-sky-300/20 blur-3xl"
                />

                <div className="relative mx-auto max-w-2xl">
                    <Badge className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-white hover:bg-white/10">
                        Get Started Today
                    </Badge>

                    <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Your Repair Journey Starts Here.
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-blue-100 sm:text-base">
                        Find trusted technicians, book your repair service,
                        and pay only after the work is completed.
                    </p>

                    <div className="mt-9 flex flex-wrap justify-center gap-3">
                        <Button
                            size="lg"
                            className="h-12 rounded-xl bg-white px-6 font-bold text-blue-600 hover:bg-blue-50"
                        >
                            <Link className="flex gap-3 items-center" href="/services">
                                Explore Services
                                <ArrowUpRight className="ml-2 size-4" />
                            </Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 rounded-xl border-white/40 bg-transparent px-6 font-bold text-white hover:bg-white/10 hover:text-white"
                        >
                            <Link href="/sign-up">
                                Become a Technician
                            </Link>
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FinalCTA;