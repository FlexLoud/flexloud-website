"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

function useTypeCycle(phrases: string[]) {
    const [text, setText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [i, setI] = React.useState(0);
    const [cursorOn, setCursorOn] = React.useState(true);
    const cyclesCompletedRef = React.useRef(0);

    const current = phrases[i % phrases.length];

    React.useEffect(() => {
        let t: any;

        const shouldBlink = cyclesCompletedRef.current < 1;
        let cursorTimer: any;
        if (shouldBlink) cursorTimer = setInterval(() => setCursorOn((v) => !v), 420);
        else setCursorOn(false);

        const typeSpeed = isDeleting ? 24 : 42;

        const tick = () => {
            const next = isDeleting
                ? current.slice(0, Math.max(0, text.length - 1))
                : current.slice(0, text.length + 1);

            setText(next);

            if (!isDeleting && next === current) {
                t = setTimeout(() => setIsDeleting(true), 900);
                return;
            }

            if (isDeleting && next.length === 0) {
                setIsDeleting(false);
                setI((prev) => {
                    const ni = prev + 1;
                    if (ni % phrases.length === 0) cyclesCompletedRef.current += 1;
                    return ni;
                });
                t = setTimeout(tick, 120);
                return;
            }

            t = setTimeout(tick, typeSpeed);
        };

        t = setTimeout(tick, typeSpeed);

        return () => {
            clearTimeout(t);
            if (cursorTimer) clearInterval(cursorTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, isDeleting, i, current, phrases.length]);

    return { text, cursorOn };
}

export function HeroV5() {
    const phrases = useMemo(
        () => ["Cloud • Data • CRM", "AI Agents", "Web Apps", "Secure Integrations"],
        []
    );
    const { text, cursorOn } = useTypeCycle(phrases);

    const stats = [
        { k: "Ship faster", v: "2–4 weeks", s: "MVP to production-ready" },
        { k: "Uptime posture", v: "99.9%", s: "SLO-driven reliability" },
        { k: "Cost wins", v: "-30%", s: "Lean infra + tuning" },
    ];

    return (
        <section className="relative overflow-hidden ">
            {/* bg */}
            {/* <div className="pointer-events-none absolute inset-0">
                <motion.div
                    className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-60"
                    style={{
                        background:
                            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.35), rgba(56,189,248,0.30), rgba(52,211,153,0.25))",
                    }}
                    animate={{ y: [-10, 10, -10], scale: [1, 1.05, 1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                />
            </div> */}

            <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    {/* left */}
                    <div>
                        <p className="text-sm text-zinc-600">Modern delivery, enterprise hygiene</p>

                        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl">
                            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {text}
                            </span>
                            <span className="ml-1 inline-block w-[10px]" style={{ opacity: cursorOn ? 1 : 0 }}>
                                |
                            </span>
                            {/* <span className="text-zinc-900"> — engineered for outcomes</span> */}
                        </h2>

                        <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
                            We build cloud-native systems, CRM platforms, and AI workflows that are secure, scalable,
                            and designed to convert.
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
                            {["Next.js", "TypeScript", "Tailwind", "Cloud Run"].map((t) => (
                                <span key={t} className="rounded-full border border-zinc-200 bg-white px-3 py-1">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* right */}
                    <div className="relative">
                        {/* image */}
                        <motion.div
                            className="relative mx-auto max-w-[520px]"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <img
                                src="/hero-cloud.png"
                                alt="Cloud and data illustration"
                                className="h-auto w-full select-none"
                                draggable={false}
                            />
                        </motion.div>

                        {/* stat cards */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-3 md:grid-cols-1">
                            {stats.map((x, idx) => (
                                <motion.div
                                    key={x.k}
                                    className="rounded-2xl border border-zinc-200 bg-white/10 p-4 shadow-sm backdrop-blur"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.12 * idx, duration: 0.45 }}
                                    whileHover={{ y: -2 }}
                                >
                                    <p className="text-xs text-zinc-500">{x.k}</p>
                                    <p className="mt-1 text-lg font-semibold text-zinc-900">{x.v}</p>
                                    <p className="mt-1 text-xs text-zinc-600">{x.s}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
