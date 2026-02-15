"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type TypeCycleOpts = {
    phrases: string[];
    typeSpeed?: number;   // ms per char
    deleteSpeed?: number; // ms per char
    holdMs?: number;      // pause after typing full phrase
    loop?: boolean;
};

function useTypeCycle({
    phrases,
    typeSpeed = 45,
    deleteSpeed = 28,
    holdMs = 900,
    loop = true,
}: TypeCycleOpts) {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [cursorOn, setCursorOn] = useState(true);

    // cursor: blink ONLY during the first full cycle
    const cyclesCompletedRef = useRef(0);

    const current = phrases[phraseIndex % phrases.length];

    useEffect(() => {
        let timeout: any;

        // When to stop cursor blinking after first cycle completes
        const shouldCursorBlink = cyclesCompletedRef.current < 1;

        // Cursor blink timer
        let cursorTimer: any;
        if (shouldCursorBlink) {
            cursorTimer = setInterval(() => setCursorOn((v) => !v), 420);
        } else {
            setCursorOn(false);
        }

        const tick = () => {
            if (!isDeleting) {
                // typing
                const next = current.slice(0, text.length + 1);
                setText(next);

                if (next === current) {
                    timeout = setTimeout(() => setIsDeleting(true), holdMs);
                    return;
                }
                timeout = setTimeout(tick, typeSpeed);
            } else {
                // deleting
                const next = current.slice(0, Math.max(0, text.length - 1));
                setText(next);

                if (next.length === 0) {
                    setIsDeleting(false);
                    setPhraseIndex((i) => {
                        const nextIndex = i + 1;
                        // Completed a cycle when we wrap around
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
    }, [text, isDeleting, phraseIndex, current, typeSpeed, deleteSpeed, holdMs, loop, phrases.length]);

    return { text, cursorOn };
}

export function HeroAnimated() {
    const phrases = useMemo(
        () => [
            "Cloud • Data • CRM",
            "AI Agents",
            "Web Apps",
            "Automation Platforms",
            "Cloud • Data • CRM • AI Agents • Web Apps",
        ],
        []
    );

    const { text, cursorOn } = useTypeCycle({
        phrases,
        typeSpeed: 42,
        deleteSpeed: 26,
        holdMs: 900,
        loop: true,
    });

    const seoH1 = "Cloud, Data, CRM, AI Agents and Web Apps — engineered for outcomes";

    return (
        <section className="relative overflow-hidden bg-white">
            {/* SEO fallback (bots + no-js + accessibility) */}
            <h1 className="sr-only">{seoH1}</h1>
            <noscript>
                <div className="sr-only">{seoH1}</div>
            </noscript>

            {/* Soft moving background */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    aria-hidden
                    className="absolute -top-28 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-3xl opacity-60"
                    style={{
                        background:
                            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.35), rgba(56,189,248,0.30), rgba(52,211,153,0.25))",
                    }}
                    animate={{
                        x: ["-50%", "-48%", "-52%", "-50%"],
                        y: [-8, 6, -4, -8],
                        scale: [1, 1.05, 0.98, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    aria-hidden
                    className="absolute right-[-120px] top-[120px] h-[360px] w-[360px] rounded-full blur-3xl opacity-40"
                    style={{
                        background:
                            "radial-gradient(circle at 40% 40%, rgba(14,165,233,0.35), rgba(168,85,247,0.25), rgba(255,255,255,0))",
                    }}
                    animate={{ y: [0, 18, 0], x: [0, -12, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    {/* Left */}
                    <div>
                        <p className="text-sm text-zinc-600">Modern delivery, enterprise hygiene</p>

                        <h2
                            className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl"
                            aria-label={seoH1}
                        >
                            <span className="inline-flex items-baseline gap-1">
                                <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    {text}
                                </span>

                                {/* Cursor: blinks only on first cycle */}
                                <span
                                    className="ml-1 inline-block w-[10px] text-zinc-900"
                                    style={{ opacity: cursorOn ? 1 : 0 }}
                                >
                                    |
                                </span>
                            </span>
                            {/* <span className="text-zinc-900"> — engineered for outcomes</span> */}
                        </h2>

                        <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
                            A clean, conversion-ready website foundation with best-practice engineering.
                            Designed to ship fast, scale cleanly, and deploy with minimal drama.
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

                        <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-600">
                            {["Next.js", "TypeScript", "Tailwind", "Cloud Run", "Security-first"].map((t) => (
                                <span key={t} className="rounded-full border border-zinc-200 bg-white px-3 py-1">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right: floating + glow “cloud” image */}
                    <div className="relative">
                        {/* Glow ring */}
                        <motion.div
                            aria-hidden
                            className="absolute inset-0 mx-auto h-[360px] w-[360px] rounded-full blur-2xl opacity-40 md:h-[440px] md:w-[440px]"
                            style={{
                                background:
                                    "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.45), rgba(99,102,241,0.25), rgba(255,255,255,0))",
                            }}
                            animate={{ scale: [1, 1.05, 1], opacity: [0.32, 0.5, 0.32] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* <motion.div
                            className="relative mx-auto max-w-[520px]"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <img
                                src="/hero-cloud.png" // <-- put your cloud image in /public/hero-cloud.png
                                alt="Cloud and data illustration"
                                className="h-auto w-full select-none"
                                draggable={false}
                            />
                        </motion.div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
