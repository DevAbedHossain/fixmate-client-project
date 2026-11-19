import { Card, CardContent } from '../ui/card';
import { Sparkles, Target } from 'lucide-react';
import { Badge } from '../ui/badge';

const MissionBission = () => {
    return (
        <section className="py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-2xl text-center">
                    <Badge
                        variant="secondary"
                        className="rounded-full bg-blue-50 px-4 py-1.5 text-blue-600"
                    >
                        Our Purpose
                    </Badge>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        What Drives <span className="text-blue-600">FixMate?</span>
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                        Our mission and vision guide everything we build.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    <Card className="overflow-hidden rounded-2xl border-0 bg-blue-600 text-white shadow-xl shadow-blue-600/10">
                        <CardContent className="p-8 sm:p-10">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15">
                                <Target className="size-7" />
                            </div>

                            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
                                Our Mission
                            </p>

                            <h3 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
                                Making reliable repair services accessible to everyone.
                            </h3>

                            <p className="mt-5 text-sm leading-7 text-blue-100">
                                We aim to simplify the repair experience by connecting
                                customers with skilled technicians through transparent
                                booking, clear job updates, and secure payments.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/70 shadow-none">
                        <CardContent className="p-8 sm:p-10">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                                <Sparkles className="size-7" />
                            </div>

                            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                                Our Vision
                            </p>

                            <h3 className="mt-3 text-2xl font-bold leading-snug text-slate-950 sm:text-3xl">
                                A world where getting things repaired feels effortless.
                            </h3>

                            <p className="mt-5 text-sm leading-7 text-slate-600">
                                We envision a trusted repair ecosystem where professionals
                                can grow their businesses and customers can get their
                                devices and appliances fixed with confidence.
                            </p>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </section>
    );
};

export default MissionBission;