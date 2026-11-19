import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { HeartHandshake, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const values = [
    {
        icon: ShieldCheck,
        title: "Trust & Safety",
        description:
            "We prioritize trustworthy service by allowing technicians to list services that are reviewed and approved by our admin team.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: HeartHandshake,
        title: "Customer First",
        description:
            "Every feature is designed to make booking repairs easier, improve communication, and give customers more confidence.",
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: Zap,
        title: "Transparency",
        description:
            "Customers can track repair progress and see the final service amount before making their payment.",
        color: "bg-amber-50 text-amber-600",
    },
    {
        icon: Sparkles,
        title: "Quality Service",
        description:
            "We help customers discover skilled technicians and give professionals a platform to showcase their repair services.",
        color: "bg-purple-50 text-purple-600",
    },
];

const OurValues = () => {
    return (
        <section className="bg-slate-50/80 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-2xl text-center">
                    <Badge
                        variant="secondary"
                        className="rounded-full bg-blue-100 px-4 py-1.5 text-blue-700"
                    >
                        Our Core Values
                    </Badge>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        What Makes Us Different?
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                        The principles behind every FixMate experience.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((value) => {
                        const Icon = value.icon;

                        return (
                            <Card
                                key={value.title}
                                className="rounded-2xl border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <CardContent className="p-6">
                                    <div className={`flex size-12 items-center justify-center rounded-xl ${value.color}`}>
                                        <Icon className="size-6" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold text-slate-900">
                                        {value.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default OurValues;