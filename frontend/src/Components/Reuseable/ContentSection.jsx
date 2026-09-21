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
        <section className={`py-4 lg:py-6 ${className}`}>
            <div className="container">
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Text column */}
                    <div
                        className={`flex flex-col justify-center ${imageOnLeft ? "lg:order-2" : "lg:order-1"
                            }`}
                    >
                        {title && (
                            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                                {title}
                            </h2>
                        )}
                        {intro && (
                            <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-600">
                                {intro}
                            </p>
                        )}
                        <div className="mt-4 space-y-3.5 text-sm sm:text-base leading-relaxed text-gray-600">
                            {paragraphs.map((text, i) => (
                                <p key={i}>{text}</p>
                            ))}
                        </div>
                    </div>

                    {/* Image column */}
                    {image && (
                        <div
                            className={`flex w-full items-center justify-center ${imageOnLeft ? "lg:order-1" : "lg:order-2"
                                }`}
                        >
                            <div className="relative w-full overflow-hidden rounded-3xl sm:rounded-[36px] bg-green-50 shadow-md">
                                <img
                                    src={image}
                                    alt={imageAlt}
                                    loading="lazy"
                                    className="aspect-[4/3] sm:aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}