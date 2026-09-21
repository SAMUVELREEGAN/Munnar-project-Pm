import { motion } from "framer-motion";
import iconMap from "../Reuseable/iconMap";
import { FaCircleCheck } from "react-icons/fa6";

export default function WhyChooseUs({ whyChooseUs }) {
    const { image, imageAlt, title, features } = whyChooseUs;

    return (
        <section aria-labelledby="why-title">
            <div className="container grid gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:gap-5">
                {/* Photo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative min-h-[260px] overflow-hidden rounded-[40px] bg-gradient-to-br from-green-700 to-green-900 sm:min-h-[360px] sm:rounded-[56px] group"
                >
                    <img
                        src={image}
                        alt={imageAlt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </motion.div>

                {/* Reasons */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-center rounded-[32px] bg-gradient-to-br from-green-100/70 via-white to-green-100/70 p-7 sm:rounded-[40px] sm:p-12 shadow-sm"
                >
                    <h2 id="why-title" className="text-3xl font-bold text-gray-900">
                        {title}
                    </h2>

                    <ul className="mt-8 space-y-6">
                        {features.map((reason, index) => {
                            const IconComponent = iconMap[reason.icon] || FaCircleCheck;
                            return (
                                <motion.li
                                    key={reason.title}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.04,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="flex items-start gap-4 group"
                                >
                                    <motion.span
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-100 text-green-600 shadow-sm"
                                    >
                                        <IconComponent size={20} />
                                    </motion.span>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900">{reason.title}</h3>
                                        <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-gray-600">{reason.description}</p>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}