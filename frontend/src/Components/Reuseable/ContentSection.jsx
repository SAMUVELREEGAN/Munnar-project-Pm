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
        <section
            className={`${className}`}
        >
            <div className="container">
                {(title || intro) && (
                    <header className="mb-8 sm:mb-10">
                        {title && <h2 className="text-h2 font-bold text-gray-900">{title}</h2>}
                        {intro && (
                            <p className="mt-5 max-w-[800px] text-[13px] leading-relaxed text-gray-600">{intro}</p>
                        )}
                    </header>
                )}

                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                    {/* Text (first in the DOM so it reads first on mobile and for screen readers) */}
                    <div
                        className={`space-y-4 text-h5 leading-relaxed text-gray-600 ${imageOnLeft ? "lg:order-2" : "lg:order-1"
                            }`}
                    >
                        {paragraphs.map((text, i) => (
                            <p key={i}>{text}</p>
                        ))}
                    </div>

                    {/* Image */}
                    {image && (
                        <div
                            className={`w-full ${imageOnLeft ? "lg:order-1 lg:justify-self-start" : "lg:order-2 lg:justify-self-end"} lg:max-w-[460px]`}
                        >
                            <img
                                src={image}
                                alt={imageAlt}
                                loading="lazy"
                                className="aspect-square w-full rounded-[32px] object-cover sm:rounded-[44px]"
                            />

                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}