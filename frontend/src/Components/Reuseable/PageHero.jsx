import { useId } from "react";
import { motion } from "framer-motion";

/* Faint dot pattern, visible only on the left and right edges */
const dotPattern = {
    backgroundImage: "radial-gradient(rgba(22, 163, 74, 0.22) 1.3px, transparent 1.6px)",
    backgroundSize: "11px 11px",
    WebkitMaskImage: "linear-gradient(to right, #000 0%, transparent 32%, transparent 68%, #000 100%)",
    maskImage: "linear-gradient(to right, #000 0%, transparent 32%, transparent 68%, #000 100%)",
};

export default function PageHero({ title, description, children, className = "" }) {
    const titleId = useId();

    return (
        <section
            aria-labelledby={titleId}
            className={`relative min-h-[50vh] overflow-hidden bg-[radial-gradient(ellipse_at_center,#f7fbf6_0%,#e6f2e5_100%)] pt-[78px] sm:-mt-[94px] sm:pt-[94px] ${className}`}
        >
            <div className="absolute inset-0" style={dotPattern} aria-hidden="true" />

            <div className="relative mx-auto max-w-[1350px] px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-[72px]">
                <motion.h1
                    id={titleId}
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl"
                >
                    {title}
                </motion.h1>

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-gray-600 sm:text-lg"
                    >
                        {description}
                    </motion.p>
                )}

                {children && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </section>
    );
}