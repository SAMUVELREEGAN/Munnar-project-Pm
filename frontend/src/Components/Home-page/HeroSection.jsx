import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const HERO_INTERVAL_MS = 5500;

/* Nature-only hero backgrounds (no vehicles) */
const NATURAL_SLIDES = [
    "/images/Munnar-bg.webp",
    "/images/munnar-tea-gardens.jpg",
];

function buildSlides(primary) {
    const isVehicleAsset = /(?:^|\/)(car|van|Ertiga|innova|aboutpage|kerala-tour|munnar-alapuzha|munnar-innova|kochi-direction|cochin-airport)/i.test(
        primary || ""
    );
    const list = [];
    if (primary && !isVehicleAsset) list.push(primary);
    return [...new Set([...list, ...NATURAL_SLIDES])];
}

export default function HeroSection({ HeroContent }) {
    const { title, desc, bgImage, contactLine } = HeroContent || {};
    const slides = useMemo(() => buildSlides(bgImage), [bgImage]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        slides.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [slides]);

    useEffect(() => {
        if (slides.length < 2) return undefined;

        const id = window.setInterval(() => {
            setActive((i) => (i + 1) % slides.length);
        }, HERO_INTERVAL_MS);

        return () => window.clearInterval(id);
    }, [slides.length]);

    return (
        <section
            aria-labelledby="hero-title"
            className="relative w-full min-h-[100svh] sm:min-h-[660px] lg:min-h-[85vh] xl:min-h-[92vh] flex items-end sm:items-center overflow-hidden pt-24 sm:pt-32 pb-28 sm:pb-16 lg:pb-16"
        >
            {/* Dynamic background – stacked crossfade */}
            <div className="absolute inset-0" aria-hidden="true">
                {slides.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt=""
                        fetchPriority={i === 0 ? "high" : "low"}
                        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1200ms] ease-out ${
                            i === active ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1610]/85 via-[#1a1610]/45 to-[#1a1610]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1610]/80 via-[#1a1610]/25 to-[#1a1610]/30" />

            {/* Content */}
            <div className="relative container w-full px-4 sm:px-6 my-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[720px] md:ml-auto"
                >
                    <div className="rounded-[28px] sm:rounded-[32px] bg-[#1a1610]/50 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lift border border-white/10 backdrop-blur-md">
                        <div className="mb-4 flex items-center gap-3">
                            <span aria-hidden="true" className="block h-px w-10 bg-gold-400" />
                            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
                                Munnar · Kerala
                            </span>
                        </div>

                        <motion.h1
                            id="hero-title"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-[34px] min-[400px]:text-[42px] sm:text-5xl lg:text-[58px] font-semibold leading-[1.1] tracking-tight text-cream-50"
                        >
                            {title}
                        </motion.h1>

                        {desc && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-cream-100/90 sm:mt-6 sm:text-lg"
                            >
                                {desc}
                            </motion.p>
                        )}

                        {contactLine && (
                            <motion.p
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                                className="mt-5 font-display text-base sm:text-xl font-semibold text-gold-400"
                            >
                                {contactLine}
                            </motion.p>
                        )}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-7 flex flex-wrap items-center gap-4"
                        >
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    to="/contact-us"
                                    aria-label="Book Now"
                                    className="group inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-green-600 p-[5px] pr-5 text-sm font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-green-700 hover:shadow-glow sm:gap-4 sm:p-1.5 sm:pr-7 sm:text-base"
                                >
                                    <span className="grid h-9 w-10 place-items-center rounded-full bg-cream-50 sm:h-9 sm:w-[52px] transition-transform duration-300 group-hover:translate-x-1">
                                        <FaArrowRight size={16} className="text-green-700" />
                                    </span>
                                    <span>Book Now</span>
                                </Link>
                            </motion.div>

                            {slides.length > 1 && (
                                <div
                                    className="flex items-center gap-2"
                                    role="tablist"
                                    aria-label="Hero images"
                                >
                                    {slides.map((src, i) => (
                                        <button
                                            key={src}
                                            type="button"
                                            role="tab"
                                            aria-selected={i === active}
                                            aria-label={`Show image ${i + 1}`}
                                            onClick={() => setActive(i)}
                                            className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50 ${
                                                i === active
                                                    ? "w-8 bg-gold-400"
                                                    : "w-1.5 bg-cream-50/40 hover:bg-cream-50/70"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
