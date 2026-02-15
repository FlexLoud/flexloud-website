"use client";

import { motion } from "framer-motion";
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
        if (shouldCursorBlink) {
            cursorTimer = setInterval(() => setCursorOn((v) => !v), 420);
        } else {
            setCursorOn(false);
        }

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

export function HeroV4() {
    const phrases = useMemo(
        () => ["Cloud • Data • CRM", "AI Agents", "Web Apps", "Automation Platforms", 'Tally Integration'],
        []
    );

    const { text, cursorOn } = useTypeCycle({ phrases });

    const pills = [
        { title: "Fast delivery", desc: "Ship in days, not weeks" },
        { title: "Enterprise hygiene", desc: "Security + clean ops" },
        { title: "Conversion-ready", desc: "SEO + performance" },
        { title: "Scale cleanly", desc: "Cloud-native foundations" },
    ];

    return (
        <section className="relative overflow-hidden py-5 md:py-14">
            {/* soft bg */}
            {/* <div className="pointer-events-none absolute inset-0">
                <motion.div
                    className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-60"
                    style={{
                        background:
                            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.35), rgba(56,189,248,0.30), rgba(52,211,153,0.25))",
                    }}
                    animate={{ y: [-8, 8, -8], scale: [1, 1.06, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div> */}

            <div className="container mx-auto max-w-6xl ">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    {/* left */}
                    <div>
                        <p className="text-sm text-zinc-600">Modern delivery, enterprise hygiene</p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
                            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {text}
                            </span>
                            <span className="ml-1 inline-block w-[10px]" style={{ opacity: cursorOn ? 1 : 0 }}>
                                |
                            </span>
                            {/* <span className="text-zinc-900"> — engineered for outcomes</span> */}
                        </h2>

                        <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
                            Clean, conversion-ready foundations for cloud, data, and CRM systems — built with
                            best-practice engineering and minimal drama.
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
                                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                            >
                                See capabilities
                            </a>
                        </div>

                        {/* rotating pills */}
                        <div className="mt-10 flex flex-wrap gap-2">
                            {pills.map((p, i) => (
                                <motion.div
                                    key={p.title}
                                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 shadow-sm"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.12, duration: 0.45 }}
                                    whileHover={{ y: -2 }}
                                >
                                    <span className="font-medium">{p.title}</span>
                                    <span className="text-zinc-500"> • {p.desc}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
}
