import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaArrowRight, FaCar } from "react-icons/fa6";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

function VehicleImage({ src, alt }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className="grid h-44 w-full place-items-center rounded-2xl bg-green-50 text-green-700" aria-hidden="true">
                <FaCar size={56} />
            </div>
        );
    }
    return (
        <div className="flex h-44 sm:h-48 w-full items-center justify-center">
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onError={() => setFailed(true)}
                className="h-full w-full object-contain object-center transition-transform duration-500 hover:scale-105"
            />
        </div>
    );
}

function VehicleCard({ vehicle, index = 0 }) {
    const hasPricing = Array.isArray(vehicle.pricing) && vehicle.pricing.length > 0;

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                duration: 0.35,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6 }}
            className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#fffdf8] p-4 sm:p-6 shadow-soft ring-1 ring-cream-200 hover:shadow-lift hover:ring-green-700/25 transition-all duration-500 mb-2 sm:mb-5"
        >
            {vehicle.capacity != null && vehicle.capacity !== "" && (
                <>
                    <div className="absolute right-0 top-0 h-24 w-28 sm:h-28 sm:w-32 rounded-bl-[60px] sm:rounded-bl-[80px] bg-cream-100" aria-hidden="true" />
                    <span
                        className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs sm:text-sm font-bold text-white shadow-sm"
                        aria-label={`${vehicle.capacity} seats`}
                    >
                        <FaUsers size={14} />
                        {vehicle.capacity} Seats
                    </span>
                </>
            )}

            <div className="relative mt-2 mb-2 flex w-full items-center justify-center">
                <VehicleImage src={vehicle.image} alt={vehicle.title || vehicle.tag} />
            </div>

            {vehicle.tag && (
                <div className="mt-3 sm:mt-4 flex min-h-[26px] items-center justify-between">
                    <span className="rounded-full bg-green-50 px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold tracking-wide text-green-700">
                        {vehicle.tag}
                    </span>
                </div>
            )}

            <h3 className="mt-2.5 sm:mt-3 font-display text-lg sm:text-xl font-semibold text-gray-900">{vehicle.title}</h3>

            {vehicle.shortDesc && (
                <p className="mt-2 text-sm leading-relaxed text-gray-600 flex-1">{vehicle.shortDesc}</p>
            )}

            {hasPricing && (
                <dl className="my-3 sm:my-4 flex-1 space-y-2 sm:space-y-2.5 rounded-2xl bg-cream-100 p-3 sm:p-4">
                    {vehicle.pricing.map(({ label, value }) => (
                        <div key={label} className="flex items-baseline justify-between gap-2 text-xs sm:text-sm">
                            <dt className="text-gray-600 truncate">{label}</dt>
                            <dd className="whitespace-nowrap font-bold text-gray-900">{value}</dd>
                        </div>
                    ))}
                </dl>
            )}

            <div className="mt-auto pt-3 sm:pt-4 border-t border-cream-200">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to="/contact-us"
                        aria-label={`Book ${vehicle.title}`}
                        className={`flex h-11 sm:h-12 w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-green-600 px-3 text-xs sm:text-sm md:text-base font-semibold tracking-wide text-cream-50 shadow-soft transition-all duration-300 hover:bg-green-700 hover:shadow-glow ${focusRing}`}
                    >
                        <span>Book Now</span>
                        <FaArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </motion.article>
    );
}

export default function Vehicles({ VehiclePackages = {} }) {
    if (!VehiclePackages) return null;

    const { pageTitle, pageDescription, vehicles } = VehiclePackages;

    return (
        <section aria-labelledby="vehicles-title" className="py-10">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="grid gap-4 md:grid-cols-2 md:items-start md:gap-12"
                >
                    <h2 id="vehicles-title" className="font-display text-[28px] font-semibold leading-tight text-gray-900 sm:text-4xl lg:text-[44px]">
                        {pageTitle}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-600 md:pt-1">{pageDescription}</p>
                </motion.div>

                <div className="mt-8 sm:mt-10 h-px w-full bg-gradient-to-r from-transparent via-cream-300 to-transparent" />

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {vehicles?.map((vehicle, i) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
