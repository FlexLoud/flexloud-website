import { useEffect, useState } from "react";

const SECTION_IDS = [
    "features",
    "services",
    "testimonials",
    "pricing",
    "contact",
];

export function useActiveSection(offset = 120) {
    const [active, setActive] = useState<string>("");

    useEffect(() => {
        const handler = () => {
            let current = "";

            SECTION_IDS.forEach((id) => {
                const el = document.getElementById(id);
                if (!el) return;

                const top = el.getBoundingClientRect().top;

                if (top <= offset) {
                    current = id;
                }
            });

            setActive(current);
        };

        handler(); // initial
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, [offset]);

    return active;
}
