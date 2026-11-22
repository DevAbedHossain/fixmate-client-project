import { CheckCircle2, Target, Wrench } from 'lucide-react';
import { Badge } from '../ui/badge';
import Image from 'next/image';

const OurStory = () => {
    return (
        <section className="py-20 sm:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

                <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-10">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                                <Image
                                    src="/images/hero-technician.jpg"
                                    alt="Technician working on computer hardware"
                                    fill
                                    sizes="(max-width: 768px) 45vw, 300px"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-blue-600 p-4 text-white">
                                <Wrench className="size-8 shrink-0" />
                                <div>
                                    <p className="text-xl font-bold">One</p>
                                    <p className="text-xs text-blue-100">
                                        Trusted platform
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                                <Target className="size-8 shrink-0 text-blue-600" />
                                <div>
                                    <p className="font-bold text-slate-900">
                                        Our Mission
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Making repairs easier
                                    </p>
                                </div>
                            </div>

                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                                <Image
                                    src="/images/hero-technician.jpg"
                                    alt="Close up of professional device repair"
                                    fill
                                    sizes="(max-width: 768px) 45vw, 300px"
                                    className="object-cover object-right"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Badge
                        variant="secondary"
                        className="rounded-full bg-blue-50 px-4 py-1.5 text-blue-600"
                    >
                        Our Story
                    </Badge>

                    <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                        A Better Way to
                        <span className="text-blue-600"> Get Things Fixed.</span>
                    </h2>

                    <p className="mt-6 leading-7 text-slate-600">
                        Finding a reliable repair technician can be difficult.
                        Customers often struggle to find skilled professionals,
                        understand repair costs, and know what is happening
                        after submitting a repair request.
                    </p>

                    <p className="mt-4 leading-7 text-slate-600">
                        At the same time, skilled technicians need a better
                        opportunity to showcase their services, connect with
                        customers, and manage their repair jobs.
                    </p>

                    <p className="mt-4 leading-7 text-slate-600">
                        That&apos;s why we created FixMate — a platform designed
                        to bring customers and repair professionals together
                        through a simple, transparent, and organized experience.
                    </p>

                    <div className="mt-8 space-y-4">
                        {[
                            "Easy access to approved repair services.",
                            "Trackable repair requests and job progress.",
                            "Secure online payment after completion.",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <CheckCircle2 className="size-5 shrink-0 text-blue-600" />
                                <span className="text-sm font-medium text-slate-700">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default OurStory;