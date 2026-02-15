"use client";

import { Tag } from "antd";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type TypeCycleOpts = {
    phrases: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    holdMs?: number;
    loop?: boolean;
    onPhraseDone?: (nextIndex: number) => void;
};


function useTypeCycle({
    phrases,
    typeSpeed = 42,
    deleteSpeed = 26,
    holdMs = 900,
    loop = true,
    onPhraseDone
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
                        onPhraseDone?.(nextIndex);
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

    return { text, cursorOn, phraseIndex };

}

type Slide = {
    key: string;
    title: string;
    subtitle: string;
    img: string; // "/hero/xxx.png"
    tags: string[];
};

function clampIndex(i: number, len: number) {
    return ((i % len) + len) % len;
}

function HeroBgCarousel({
    slides,
    autoMs = 4200,
    idx: controlledIdx,
}: {
    slides: Slide[];
    autoMs?: number;
    idx?: number;
}) {

    const [idx, setIdx] = useState(0);
    const isControlled = typeof controlledIdx === "number";
    const activeIdx = isControlled ? controlledIdx : idx;

    const [dir, setDir] = useState<1 | -1>(1);
    const [paused, setPaused] = useState(false);
    const len = slides.length;

    // auto rotate
    useEffect(() => {
        if (isControlled) return; // ✅ typing controls it
        if (paused || len <= 1) return;

        const t = setInterval(() => {
            setDir(1);
            setIdx((v) => clampIndex(v + 1, len));
        }, autoMs);

        return () => clearInterval(t);
    }, [paused, autoMs, len, isControlled]);


    const next = () => {
        setDir(1);
        setIdx((v) => clampIndex(v + 1, len));
    };
    const prev = () => {
        setDir(-1);
        setIdx((v) => clampIndex(v - 1, len));
    };
    const go = (i: number) => {
        if (i === activeIdx) return;
        setDir(i > activeIdx ? 1 : -1);


        setIdx(clampIndex(i, len));
    };

    // swipe
    const x = useMotionValue(0);
    const threshold = 80;

    const variants = {
        enter: (d: 1 | -1) => ({
            opacity: 0,
            scale: 1.03,
            filter: "blur(10px)",
            x: d * 30,
        }),
        center: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            x: 0,
        },
        exit: (d: 1 | -1) => ({
            opacity: 0,
            scale: 0.99,
            filter: "blur(10px)",
            x: d * -30,
        }),
    };

    const slide = slides[activeIdx];

    return (
        <div
            className="absolute inset-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
        >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                    key={slide.key}
                    className="absolute inset-0"
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    style={{ x }}
                    onDragEnd={(_, info) => {
                        const offset = info.offset.x;
                        if (offset > threshold) prev();
                        else if (offset < -threshold) next();
                    }}
                >
                    <Image
                        src={slide.img}
                        alt={slide.title}
                        fill
                        priority
                    // sizes="100vw"
                    // className="object-cover object-center " //shift right side 60%
                    />

                    {/* overlays for readability + premium look */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-white/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-white/25" />
                    <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.35),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(circle_at_60%_80%,rgba(16,185,129,0.18),transparent_55%)]" />
                </motion.div>
            </AnimatePresence>


        </div>
    );
}

export function HeroV7() {
    // const phrases = useMemo(
    //     () => ["Customized CRM", "Tally Integration", "Cloud Data Management", "AI Agents", "SEO & Content", "Web & App Development", "Digital Marketing"],
    //     []
    // );
    const beatMs = 4200; // same as carousel timing
    const typeSpeed = 42;
    const deleteSpeed = 26;

    const [slideIdx, setSlideIdx] = useState(0);



    const slides: Slide[] = [
        {
            key: "crm",
            title: "Custom CRM Development",
            subtitle: "Role-based CRM tailored to your workflow — pipelines, dashboards, automation.",
            img: "/images/crm.png",
            tags: ["Leads", "Tickets", "Reports", "Multi-tenant"],
        },
        {
            key: "tally",
            title: "Tally Integration",
            subtitle: "Sync customers, invoices, items & payments — scheduled or near real-time.",
            img: "/images/tally3.png",
            tags: ["XML", "Webhooks", "Sync", "Validation"],
        },
        {
            key: "cloud",
            title: "Cloud Data Management",
            subtitle: "Secure storage, backups, analytics-ready pipelines and access controls.",
            img: "/images/data-management2.png",
            tags: ["GCP", "Backups", "Security", "Dashboards"],
        },
        {
            key: "ai",
            title: "AI Agents Creation",
            subtitle: "Automate support, ops and workflows with reliable AI agents.",
            img: "/images/agents.png",
            tags: ["Chat", "Automation", "Insights", "Assistants"],
        },
        {
            key: "seo",
            title: "SEO Optimization",
            subtitle: "Technical SEO + content strategy to improve rankings, traffic and conversions.",
            img: "/images/seo4.png",
            tags: ["On-page", "Tech SEO", "Schema", "Audits"],
        },
        {
            key: "web",
            title: "Web & App Development",
            subtitle: "Modern responsive websites and web apps built for speed and maintainability.",
            img: "/images/apps4.png",
            tags: ["React", "Next.js", "Tailwind", "APIs"],
        },
        {
            key: "digital",
            title: "Digital Marketing",
            subtitle: "SEO + content strategy to improve rankings, traffic and conversions.",
            img: "/images/digital2.png",
            tags: ["SEO", "Content", "Analytics", "Audits"],
        },
    ];

    const phrases = useMemo(() => slides.map((s) => s.title), [slides]);

    const avgLength =
        phrases.reduce((acc, p) => acc + p.length, 0) / phrases.length;

    const holdMs = Math.max(
        200,
        beatMs - (avgLength * (typeSpeed + deleteSpeed) + 160)
    );


    const { text, cursorOn } = useTypeCycle({
        phrases,
        typeSpeed,
        deleteSpeed,
        holdMs,
        onPhraseDone: (nextIndex) => setSlideIdx(nextIndex % slides.length),

    });



    const pills = [
        { title: "Fast delivery", desc: "Ship in days, not weeks" },
        { title: "Enterprise hygiene", desc: "Security + clean ops" },
        { title: "Conversion-ready", desc: "SEO + performance" },
        { title: "Scale cleanly", desc: "Cloud-native foundations" },
    ];

    // Put these in /public/hero/


    return (
        <section className="relative min-h-[680px] overflow-hidden md:min-h-[740px]">
            {/* FULL-WIDTH background carousel */}
            <HeroBgCarousel slides={slides} autoMs={beatMs} idx={slideIdx} />


            {/* CONTENT overlay */}
            <div className="relative z-10">
                <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
                    <div className="max-w-2xl">
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
                            Clean, conversion-ready foundations for cloud, data, and CRM systems — built with
                            best-practice engineering and minimal drama.
                        </p>
                        {/* i want to show tags here in antd tags array */}
                        {slides[slideIdx].tags.map((tag) => (
                            <Tag color="processing" key={tag} className="mr-2">
                                {tag}
                            </Tag>
                        ))}

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

                        {/* pills */}
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
                </div>
            </div>
        </section>
    );
}
