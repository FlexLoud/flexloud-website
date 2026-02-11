"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useMemo } from "react";

type TypeCycleOpts = {
    phrases: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    holdMs?: number;
    loop?: boolean;
};

function useTypeCycle({
    phrases,
    typeSpeed = 42,
    deleteSpeed = 26,
    holdMs = 900,
    loop = true,
}: TypeCycleOpts) {
    const [text, setText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [phraseIndex, setPhraseIndex] = React.useState(0);
    const [cursorOn, setCursorOn] = React.useState(true);

    const cyclesCompletedRef = React.useRef(0);
    const current = phrases[phraseIndex % phrases.length];

    React.useEffect(() => {
        let timeout: any;

        const shouldCursorBlink = cyclesCompletedRef.current < 1;
        let cursorTimer: any;
        if (shouldCursorBlink) cursorTimer = setInterval(() => setCursorOn((v) => !v), 420);
        else setCursorOn(false);

        const tick = () => {
            if (!isDeleting) {
                const next = current.slice(0, text.length + 1);
                setText(next);
                if (next === current) {
                    timeout = setTimeout(() => setIsDeleting(true), holdMs);
                    return;
                }
                timeout = setTimeout(tick, typeSpeed);
            } else {
                const next = current.slice(0, Math.max(0, text.length - 1));
                setText(next);
                if (next.length === 0) {
                    setIsDeleting(false);
                    setPhraseIndex((i) => {
                        const nextIndex = i + 1;
                        if (nextIndex % phrases.length === 0) cyclesCompletedRef.current += 1;
                        return loop ? nextIndex : Math.min(nextIndex, phrases.length - 1);
                    });
                    timeout = setTimeout(tick, 120);
                    return;
                }
                timeout = setTimeout(tick, deleteSpeed);
            }
        };

        timeout = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);

        return () => {
            clearTimeout(timeout);
            if (cursorTimer) clearInterval(cursorTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, isDeleting, phraseIndex, current, phrases.length, typeSpeed, deleteSpeed, holdMs, loop]);

    return { text, cursorOn };
}


type Slide = {
    key: string;
    title: string;
    subtitle: string;
    img: string; // "/hero/xxx.png"
    tags: string[];
    alt?: string;
};

export function LaptopCarousel({
    slides,
    autoMs = 4200,
}: {
    slides: Slide[];
    autoMs?: number;
}) {
    const [index, setIndex] = React.useState(0);
    const [dir, setDir] = React.useState<1 | -1>(1);

    // ✅ reliable autoplay
    React.useEffect(() => {
        if (slides.length <= 1) return;
        const id = window.setInterval(() => {
            setDir(1);
            setIndex((i) => (i + 1) % slides.length);
        }, 3000);
        return () => window.clearInterval(id);
    }, []);

    const prev = () => {
        setDir(-1);
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    const next = () => {
        setDir(1);
        setIndex((i) => (i + 1) % slides.length);
    };

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.98 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, scale: 0.98 }),
    };

    const slide = slides[index];

    return (
        <div className="relative w-full max-w-[640px] overflow-hidden rounded-2xl bg-white shadow-sm">
            {/* ✅ FIX: give a fixed height/aspect so slide actually animates */}
            <div className="relative aspect-[16/10] w-full">
                <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                        key={slide.key}
                        className="absolute inset-0"
                        custom={dir}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    >
                        {/* Use Image fill OR backgroundImage — but ensure it fills */}
                        <Image
                            src={slide.img}
                            alt={slide.alt || "Laptop"}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 640px"
                            className="object-contain p-6"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* controls */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm shadow"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm shadow"
                    >
                        →
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((s, i) => (
                            <button
                                key={s.key}
                                onClick={() => {
                                    setDir(i > index ? 1 : -1);
                                    setIndex(i);
                                }}
                                className={`h-2 w-2 rounded-full ${i === index ? "bg-zinc-900" : "bg-zinc-300"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}



export function HeroHalf() {
    const phrases = useMemo(
        () => ["Cloud • Data • CRM", "AI Agents", "Web Apps", "Automation Platforms", "Tally Integration"],
        []
    );
    const { text, cursorOn } = useTypeCycle({ phrases });

    const pills = [
        { title: "Fast delivery", desc: "Ship in days, not weeks" },
        { title: "Enterprise hygiene", desc: "Security + clean ops" },
        { title: "Conversion-ready", desc: "SEO + performance" },
        { title: "Scale cleanly", desc: "Cloud-native foundations" },
    ];

    const slides: Slide[] = [
        {
            key: "crm",
            title: "Customized CRM Development",
            subtitle: "Role-based CRM tailored to your workflow — pipelines, dashboards, automation.",
            img: "/images/crm.png",
            tags: ["Leads", "Tickets", "Reports", "Multi-tenant"],
        },
        {
            key: "tally",
            title: "Tally Integration",
            subtitle: "Sync customers, invoices, items & payments — scheduled or near real-time.",
            img: "/images/tally.png",
            tags: ["XML", "Webhooks", "Sync", "Validation"],
        },
        {
            key: "cloud",
            title: "Cloud Data Management",
            subtitle: "Secure storage, backups, analytics-ready pipelines and access controls.",
            img: "/images/data-management.png",
            tags: ["AWS", "Backups", "Security", "Dashboards"],
        },
        {
            key: "ai",
            title: "AI Agents",
            subtitle: "Automate support, ops and workflows with reliable AI agents.",
            img: "/images/agentss.png",
            tags: ["Chat", "Automation", "Insights", "Assistants"],
        },
        {
            key: "seo",
            title: "SEO Optimization",
            subtitle: "Technical SEO + content strategy to improve rankings, traffic and conversions.",
            img: "/images/seo.png",
            tags: ["On-page", "Tech SEO", "Schema", "Audits"],
        },
        {
            key: "web",
            title: "Web & App Development",
            subtitle: "Modern responsive websites and web apps built for speed and maintainability.",
            img: "/images/apps.png",
            tags: ["React", "Next.js", "Tailwind", "APIs"],
        },
    ];

    return (
        <section className="relative overflow-hidden">
            {/* soft background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200 via-sky-200 to-emerald-200 blur-3xl opacity-60" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-16">
                <div className="grid items-center gap-10 md:grid-cols-12">
                    {/* LEFT content */}
                    <div className="md:col-span-6">
                        <p className="text-sm text-zinc-700">Modern delivery, enterprise hygiene</p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
                            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {text}
                            </span>
                            <span className="ml-1 inline-block w-[10px]" style={{ opacity: cursorOn ? 1 : 0 }}>
                                |
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-700 md:text-lg">
                            Clean, conversion-ready foundations for cloud, data, and CRM systems — built with best-practice
                            engineering and minimal drama.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-90"
                            >
                                Talk to us
                            </a>
                            <a
                                href="#services"
                                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/80 px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                            >
                                See capabilities
                            </a>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-2">
                            {pills.map((p, i) => (
                                <motion.div
                                    key={p.title}
                                    className="rounded-full border border-white/40 bg-white/70 px-4 py-2 text-sm text-zinc-800 shadow-sm backdrop-blur"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.12, duration: 0.45 }}
                                    whileHover={{ y: -2 }}
                                >
                                    <span className="font-medium">{p.title}</span>
                                    <span className="text-zinc-600"> • {p.desc}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT carousel */}
                    <div className="md:col-span-6">
                        <LaptopCarousel slides={slides} autoMs={4200} />
                    </div>
                </div>
            </div>
        </section>
    );
}
