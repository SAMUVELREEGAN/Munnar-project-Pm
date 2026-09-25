import { useId } from "react";
import { motion } from "framer-motion";

/* Faint dot pattern, visible only on the left and right edges */
const dotPattern = {
    backgroundImage: "radial-gradient(rgba(196, 160, 106, 0.28) 1.2px, transparent 1.5px)",
    backgroundSize: "12px 12px",
    WebkitMaskImage: "linear-gradient(to right, #000 0%, transparent 32%, transparent 68%, #000 100%)",
    maskImage: "linear-gradient(to right, #000 0%, transparent 32%, transparent 68%, #000 100%)",
};

export default function PageHero({ title, description, children, className = "" }) {
    const titleId = useId();

    return (
        <section
            aria-labelledby={titleId}
            className={`relative min-h-[34vh] sm:min-h-[40vh] overflow-hidden bg-[radial-gradient(ellipse_at_center,#faf6ef_0%,#ebe3d4_100%)] pt-28 sm:pt-36 pb-10 sm:pb-14 ${className}`}
        >
            <div className="absolute inset-0" style={dotPattern} aria-hidden="true" />

            <div className="relative mx-auto max-w-[1350px] px-4 text-center sm:px-6">
                <motion.h1
                    id={titleId}
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[32px] sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-gray-900 leading-[1.15]"
                >
                    {title}
                </motion.h1>

                <span aria-hidden="true" className="gold-rule mt-5 block" />

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-auto mt-5 sm:mt-6 max-w-[640px] text-sm sm:text-base md:text-lg leading-relaxed text-gray-600"
                    >
                        {description}
                    </motion.p>
                )}

                {children && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
