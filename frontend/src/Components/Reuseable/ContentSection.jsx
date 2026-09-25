import { motion } from "framer-motion";

export default function ContentSection({
    title,
    intro,
    paragraphs = [],
    image,
    imageAlt = "",
    imagePosition = "right",
    className = "",
}) {
    const imageOnLeft = imagePosition === "left";

    return (
        <section className={`py-4 sm:py-6 lg:py-8 ${className}`}>
            <div className="container">
                <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Text column */}
                    <motion.div
                        initial={{ opacity: 0, x: imageOnLeft ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`flex flex-col justify-center ${
                            imageOnLeft ? "lg:order-2" : "lg:order-1"
                        }`}
                    >
                        {title && (
                            <>
                                <h2 className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold leading-tight text-gray-900">
                                    {title}
                                </h2>
                                <span aria-hidden="true" className="gold-rule-left" />
                            </>
                        )}
                        {intro && (
                            <p className="mt-3 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600">
                                {intro}
                            </p>
                        )}
                        <div className="mt-3.5 space-y-3 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
                            {paragraphs.map((text, i) => (
                                <p key={i}>{text}</p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image column */}
                    {image && (
                        <motion.div
                            initial={{ opacity: 0, x: imageOnLeft ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex w-full items-center justify-center ${
                                imageOnLeft ? "lg:order-1" : "lg:order-2"
                            }`}
                        >
                            <div className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] bg-cream-100 shadow-soft">
                                <img
                                    src={image}
                                    alt={imageAlt}
                                    loading="lazy"
                                    className="aspect-[16/10] sm:aspect-[4/3] lg:aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}