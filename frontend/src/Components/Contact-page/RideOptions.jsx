import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

function CardImage({ src }) {
    const [failed, setFailed] = useState(false);
    const shape = "h-[240px] w-full rounded-2xl sm:h-[290px]";

    if (failed) {
        return <div className={`${shape} bg-gradient-to-br from-green-700 to-green-900`} aria-hidden="true" />;
    }
    return (
        <img
            src={src}
            alt=""
            loading="lazy"
            onError={() => setFailed(true)}
            className={`${shape} object-cover`}
        />
    );
}

export default function RideOptions({
    badge,
    title,
    items = [],
}) {
    return (
        <section
            aria-labelledby="ride-options-title"
            className="py-14 sm:py-20"
        >
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
                {badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3.5 py-1.5 text-sm font-semibold text-gold-600">
                        <FaLocationDot size={15} />
                        {badge}
                    </span>
                )}

                <h2
                    id="ride-options-title"
                    className="mt-4 max-w-[760px] font-display text-[28px] font-semibold leading-snug text-gray-900 sm:text-4xl"
                >
                    {title}
                </h2>

                <ul className="mt-10 grid gap-x-5 gap-y-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
                    {items.map((item) => (
                        <li key={item.title} className="flex flex-col">
                            <CardImage src={item.image} />

                            {/* Text card overlaps the bottom of the photo */}
                            <div className="relative z-10 -mt-28 mx-5 flex flex-1 flex-col items-center rounded-2xl bg-[#fffdf8] px-6 py-7 text-center shadow-lift ring-1 ring-cream-200 sm:-mt-36 sm:mx-6">
                                <h3 className="font-display text-lg sm:text-xl font-semibold text-gray-900">{item.title}</h3>
                                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-gray-600">{item.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}