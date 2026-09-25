import { motion } from "framer-motion";

export default function RouteCategories({ data }) {
    if (!data?.categories?.length) return null;
    const { title, subtitle, categories } = data;

    return (
        <section aria-labelledby="routes-title" className="py-2">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    <h2 id="routes-title" className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold text-gray-900">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-3 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600">
                            {subtitle}
                        </p>
                    )}
                    <span aria-hidden="true" className="gold-rule-left" />
                </motion.div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.3, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[24px] border border-cream-200 bg-[#fffdf8] p-5 shadow-soft"
                        >
                            <h3 className="font-display text-lg font-semibold text-gray-900">{cat.title}</h3>
                            <ul className="mt-4 space-y-2">
                                {cat.items.map((item) => (
                                    <li key={item} className="text-xs sm:text-sm leading-relaxed text-gray-600">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
