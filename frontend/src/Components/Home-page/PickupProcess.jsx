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
                    className="mt-10 text-2xl font-bold text-gray-900 sm:mt-12 sm:text-3xl"
                >
                    {title}
                </motion.h2>

                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                                className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-7 hover:shadow-lg transition-shadow duration-300"
                            >
                                <motion.span
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="grid h-14 w-14 place-items-center rounded-2xl bg-green-50 text-green-600 shadow-sm ring-1 ring-green-100 cursor-pointer"
                                >
                                    {IconComponent ? <IconComponent size={26} /> : step.icon}
                                </motion.span>
                                <h3 className="mt-5 text-base sm:text-lg font-bold text-gray-900">
                                    {step.title}
                                </h3>
                                <hr className="my-4 w-full border-gray-100" />
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