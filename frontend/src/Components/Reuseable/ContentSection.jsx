import { useState } from "react";

export default function ContentSection({
    title,
    intro,
    paragraphs = [],
    image,
    imageAlt = "",
    imagePosition = "right",
    className = "",
}) {
    const [imageFailed, setImageFailed] = useState(false);
    const imageOnLeft = imagePosition === "left";

    return (
        <section
            className={`bg-[#f7f9f6] py-12 font-['Nunito_Sans',system-ui,sans-serif] sm:py-16 ${className}`}
        >
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
                {(title || intro) && (
                    <header className="mb-8 sm:mb-10">
                        {title && <h2 className="text-3xl font-bold text-gray-900">{title}</h2>}
                        {intro && (
                            <p className="mt-5 max-w-[800px] text-[13px] leading-relaxed text-gray-600">{intro}</p>
                        )}
                    </header>
                )}

                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                    {/* Text (first in the DOM so it reads first on mobile and for screen readers) */}
                    <div
                        className={`space-y-4 text-[13px] leading-relaxed text-gray-600 ${imageOnLeft ? "lg:order-2" : "lg:order-1"
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
                            {imageFailed ? (
                                <div
                                    className="aspect-square w-full rounded-[32px] bg-gradient-to-br from-green-700 to-green-900 sm:rounded-[44px]"
                                    aria-hidden="true"
                                />
                            ) : (
                                <img
                                    src={image}
                                    alt={imageAlt}
                                    loading="lazy"
                                    onError={() => setImageFailed(true)}
                                    className="aspect-square w-full rounded-[32px] object-cover sm:rounded-[44px]"
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}