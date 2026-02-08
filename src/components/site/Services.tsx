"use client";

import { motion } from "framer-motion";

const SERVICES = [
    {
        title: "Customized CRM Development",
        desc: "Role-based CRM tailored to your workflow, pipelines, dashboards, and automation.",
        tags: ["Leads", "Tickets", "Reports", "Multi-tenant"],
    },
    {
        title: "Tally Integration",
        desc: "Sync customers, invoices, items, payments—scheduled or near real-time updates.",
        tags: ["XML", "Webhooks", "Sync", "Validation"],
    },
    {
        title: "Cloud Data Management",
        desc: "Secure cloud storage, backups, analytics-ready pipelines, and access controls.",
        tags: ["AWS", "Backups", "Security", "Dashboards"],
    },
    {
        title: "Website Management",
        desc: "Fast, reliable updates, landing pages, performance optimization, and monitoring.",
        tags: ["Next.js", "Speed", "SEO", "Content"],
    },
    {
        title: "Digital Marketing",
        desc: "Campaign setup, tracking, creatives, and conversion optimization that actually moves numbers.",
        tags: ["Ads", "Funnels", "Tracking", "CRO"],
    },
    {
        title: "SEO Optimization",
        desc: "Technical SEO + content strategy to improve rankings, traffic, and conversions.",
        tags: ["On-page", "Tech SEO", "Schema", "Audits"],
    },
    {
        title: "App Development",
        desc: "Mobile-first experiences with clean UI and scalable architecture.",
        tags: ["React Native", "APIs", "Auth", "Push"],
    },
    {
        title: "Web Development",
        desc: "Modern responsive sites and web apps built for performance and maintainability.",
        tags: ["React", "Next.js", "Tailwind", "TypeScript"],
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.06 },
    },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as any;

export function Services() {
    return (
        <section id="services" className="relative ">
            {/* background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200 via-sky-200 to-emerald-200 blur-3xl opacity-50" />
            </div>

            <div className="container relative max-w-6xl">
                {/* Heading */}


                {/* Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {SERVICES.map((s) => (
                        <motion.div key={s.title} variants={item}>
                            <div className="group relative h-full overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/75 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                {/* shine */}
                                <div className="pointer-events-none absolute -left-24 -top-24 h-40 w-40 rounded-full bg-gradient-to-br from-white to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60" />
                                {/* accent line */}
                                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 opacity-10" />

                                <div className="flex h-full flex-col">
                                    <h3 className="text-base font-semibold tracking-tight text-zinc-900">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                                        {s.desc}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {s.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-700"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-zinc-500">Learn more</span>
                                            <span className="text-sm text-zinc-900 transition-transform duration-300 group-hover:translate-x-0.5">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* hover border glow */}
                                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition duration-300 group-hover:ring-zinc-900/10" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom strip */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
                    className="mt-10 rounded-3xl border border-zinc-200/70 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-medium text-zinc-900">Not sure what you need?</p>
                            <p className="mt-1 text-sm text-zinc-600">
                                Tell us your goal. We’ll suggest the right stack + plan (CRM, Tally sync, web/app, SEO).
                            </p>
                        </div>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
                        >
                            Talk to us
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
