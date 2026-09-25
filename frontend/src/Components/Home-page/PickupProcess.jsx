import { motion } from "framer-motion";
import iconMap from "../Reuseable/iconMap";

export default function PickupProcess({ StepCard }) {
    const { title, features } = StepCard;

    return (
        <section>
            <div className="container">
                {/* Process */}
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 font-display text-[28px] font-semibold text-gray-900 sm:mt-10 sm:text-4xl lg:text-[44px]"
                >
                    {title}
                </motion.h2>

                <ul className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((step, index) => {
                        const IconComponent = iconMap[step.icon];
                        return (
                            <motion.li
                                key={step.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{
                                    duration: 0.32,
                                    delay: index * 0.04,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                whileHover={{ y: -6 }}
                                className="flex flex-col items-center rounded-[28px] border border-cream-200 bg-[#fffdf8] p-5 text-center shadow-soft sm:p-7 hover:shadow-lift transition-all duration-500"
                            >
                                <motion.span
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="grid h-14 w-14 place-items-center rounded-2xl bg-green-50 text-green-700 shadow-soft ring-1 ring-green-100 cursor-pointer"
                                >
                                    {IconComponent ? <IconComponent size={26} /> : step.icon}
                                </motion.span>
                                <h3 className="mt-5 font-display text-lg sm:text-xl font-semibold text-gray-900">
                                    {step.title}
                                </h3>
                                <div className="my-4 h-px w-full bg-cream-200" />
                                <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600">
                                    {step.description}
                                </p>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}