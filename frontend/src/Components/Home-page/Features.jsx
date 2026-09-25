
import { motion } from "framer-motion";
import iconMap from "../Reuseable/iconMap";

export default function Features({ accessibilitySection }) {
    const { title, subtitle, features } = accessibilitySection;

    return (
        <section aria-labelledby="features-title" className="py-4 sm:py-6 lg:py-8">
            <div className="grid container items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-12">
                {/* Intro */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 id="features-title" className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold leading-tight text-gray-900">
                        {title}
                    </h2>
                    <span aria-hidden="true" className="gold-rule-left" />
                    <p className="mt-3 sm:mt-4 max-w-[420px] text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600">{subtitle}</p>
                </motion.div>

                {/* Cards */}
                <ul className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                    {features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon];
                        return (
                            <motion.li
                                key={feature.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{
                                    duration: 0.32,
                                    delay: index * 0.04,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                whileHover={{ y: -6 }}
                                className="flex flex-col items-center rounded-[28px] bg-[#fffdf8] p-5 sm:px-6 sm:py-8 text-center shadow-soft border border-cream-200 hover:shadow-lift transition-all duration-500"
                            >
                                <motion.span
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="grid h-14 w-14 place-items-center rounded-2xl bg-green-50 text-green-700 shadow-soft cursor-pointer"
                                >
                                    {IconComponent ? <IconComponent size={28} /> : feature.icon}
                                </motion.span>
                                <h3 className="mt-5 font-display text-lg sm:text-xl font-semibold text-gray-900">{feature.title}</h3>
                                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-gray-600">{feature.description}</p>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}