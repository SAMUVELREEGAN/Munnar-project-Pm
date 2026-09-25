import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaArrowRight, FaCar } from "react-icons/fa6";
import iconMap from "../Reuseable/iconMap";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

/* Vehicle photo, with a simple placeholder if the file is missing */
function VehicleImage({ src, alt }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className="grid h-44 w-full place-items-center rounded-2xl bg-green-50 text-green-600" aria-hidden="true">
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
    const FooterIcon = iconMap[vehicle.footerInfo?.icon];

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
            className="relative flex flex-col overflow-hidden rounded-3xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-100 hover:cursor-pointer hover:shadow-xl hover:ring-green-600/30 transition-shadow duration-300 mb-2 sm:mb-5"
        >
            {/* Decorative corner + seat badge */}
            <div className="absolute right-0 top-0 h-24 w-28 sm:h-28 sm:w-32 rounded-bl-[60px] sm:rounded-bl-[80px] bg-green-50" aria-hidden="true" />
            <span
                className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs sm:text-sm font-bold text-white shadow-sm"
                aria-label={`${vehicle.capacity} seats`}
            >
                <FaUsers size={14} />
                {vehicle.capacity} Seats
            </span>

            <div className="relative mt-2 mb-2 flex w-full items-center justify-center">
                <VehicleImage src={vehicle.image} alt={`${vehicle.tag}`} />
            </div>

            {/* Model chip + optional ribbon */}
            <div className="mt-3 sm:mt-4 flex min-h-[26px] items-center justify-between">
                <span className="rounded-md bg-green-100 px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold text-green-700">
                    {vehicle.tag}
                </span>
                {vehicle.isLowestPrice && (
                    <span className="-mr-4 sm:-mr-6 rounded-l-md bg-green-600 px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-bold text-white shadow-sm">
                        Lowest Price
                    </span>
                )}
            </div>

            <h3 className="mt-2.5 sm:mt-3 text-base sm:text-lg font-bold text-gray-900">{vehicle.title}</h3>

            {/* Rates */}
            <dl className="my-3 sm:my-4 flex-1 space-y-2 sm:space-y-2.5 rounded-2xl bg-[#f4f6f2] p-3 sm:p-4">
                {vehicle.pricing.map(({ label, value }) => (
                    <div key={label} className="flex items-baseline justify-between gap-2 text-xs sm:text-sm">
                        <dt className="text-gray-600 truncate">{label}</dt>
                        <dd className="whitespace-nowrap font-bold text-gray-900">{value}</dd>
                    </div>
                ))}
            </dl>

            {/* Footer action bar: Responsive Book Now + Specification badge */}
            <div className="mt-auto grid grid-cols-1 min-[380px]:grid-cols-2 items-center gap-2.5 sm:gap-3 border-t border-gray-100 pt-3 sm:pt-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to={`/contact-us`}
                        aria-label={`Book ${vehicle.title}`}
                        className={`flex h-11 sm:h-12 w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-green-600 px-3 text-xs sm:text-sm md:text-base font-bold text-white shadow-sm transition-colors hover:bg-green-700 ${focusRing}`}
                    >
                        <span>Book Now</span>
                        <FaArrowRight size={14} />
                    </Link>
                </motion.div>

                {vehicle.footerInfo ? (
                    <div
                        className="flex h-11 sm:h-12 w-full items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl bg-[#eef5ed] px-2 sm:px-3 text-[11px] sm:text-xs md:text-sm font-medium text-gray-700 ring-1 ring-green-600/15"
                        title={`${vehicle.footerInfo.label}: ${vehicle.footerInfo.value}`}
                    >
                        {FooterIcon && (
                            <span className="grid h-6 w-6 sm:h-7 sm:w-7 shrink-0 place-items-center rounded-lg bg-green-600/10 text-green-700">
                                <FooterIcon size={13} />
                            </span>
                        )}
                        <span className="truncate whitespace-nowrap">
                            <strong className="font-bold text-gray-900">{vehicle.footerInfo.value}</strong> {vehicle.footerInfo.label}
                        </span>
                    </div>
                ) : (
                    <div className="flex h-11 sm:h-12 w-full items-center justify-center rounded-xl sm:rounded-2xl bg-green-50 text-xs font-semibold text-green-700">
                        Available
                    </div>
                )}
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
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="grid gap-4 md:grid-cols-2 md:items-start md:gap-12"
                >
                    <h2 id="vehicles-title" className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        {pageTitle}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-600 md:pt-1">{pageDescription}</p>
                </motion.div>

                <hr className="mt-8 border-gray-200 sm:mt-10" />

                {/* Grid */}
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {vehicles?.map((vehicle, i) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}