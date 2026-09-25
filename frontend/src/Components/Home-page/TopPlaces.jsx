import { motion } from "framer-motion";

export default function TopPlaces({ data }) {
    if (!data?.places?.length) return null;
    const { title, places } = data;

    return (
        <section aria-labelledby="top-places-title">
            <div className="container">
                <motion.h2
                    id="top-places-title"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold text-gray-900"
                >
                    {title}
                </motion.h2>
                <span aria-hidden="true" className="gold-rule-left" />

                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {places.map((place, index) => (
                        <motion.li
                            key={place.title}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.2), ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[24px] border border-cream-200 bg-[#fffdf8] p-5 shadow-soft"
                        >
                            <h3 className="font-display text-lg font-semibold text-gray-900">{place.title}</h3>
                            {place.description && (
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">{place.description}</p>
                            )}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
