import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaClock, FaSnowflake, FaWandMagicSparkles } from "react-icons/fa6";

const VEHICLE_FLEET = [
    {
        id: "sedan",
        title: "Executive Sedan",
        subtitle: "Swift Dzire / Toyota Etios",
        tag: "Top Choice",
        seats: "4 Seats",
        duration: "1 Day (100 km)",
        highlight: "Dual AC",
        price: "₹2,500",
        priceNote: "per day base",
        image: "/images/cochin-airport.jpg",
        isPopular: false,
    },
    {
        id: "ertiga",
        title: "Maruti Ertiga",
        subtitle: "Spacious 6-Seater MPV",
        tag: "Comfort MPV",
        seats: "6 Seats",
        duration: "1 Day (100 km)",
        highlight: "Dual AC",
        price: "₹3,000",
        priceNote: "per day base",
        image: "/images/kochi-direction.jpg",
        isPopular: false,
    },
    {
        id: "innova-crysta",
        title: "Innova Crysta",
        subtitle: "Premium Hill Travel",
        tag: "Luxury MPV",
        seats: "7-8 Seats",
        duration: "1 Day (100 km)",
        highlight: "Rear Captain Seats",
        price: "₹4,000",
        priceNote: "per day base",
        image: "/images/munnar-innova.jpg",
        isPopular: true,
    },
    {
        id: "tempo-traveller",
        title: "Tempo Traveller",
        subtitle: "Ideal for Family & Groups",
        tag: "Large Groups",
        seats: "12 to 26 Seats",
        duration: "1 Day (100 km)",
        highlight: "Push-back Seats",
        price: "₹5,500",
        priceNote: "per day base",
        image: "/images/van.png",
        isPopular: false,
    },
];

export default function VehiclePackages() {
    const [, setFailedMap] = useState({});

    const handleImgError = (id) => {
        setFailedMap((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <section aria-labelledby="vehicles-title" className="py-4 sm:py-8">
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4"
                >
                    <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800">
                            <FaWandMagicSparkles size={11} className="text-emerald-600" />
                            <span>Pristine Cars & Transparent Rates</span>
                        </div>
                        <h2 id="vehicles-title" className="mt-2.5 sm:mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                            Vehicle Fleet & Daily Packages
                        </h2>
                        <p className="mt-2 max-w-[700px] text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
                            Choose the ideal ride for your family or group. Rates are for one day with clean, spotless vehicles, courteous chauffeurs, and transparent pricing.
                        </p>
                    </div>

                    <div className="shrink-0">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-emerald-800 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Includes 100 km, Toll & Chauffeur
                        </span>
                    </div>
                </motion.div>

                <hr className="mt-5 sm:mt-6 border-gray-200" />

                {/* 4-Card Vehicle Grid */}
                <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {VEHICLE_FLEET.map((v, i) => {
                        return (
                            <motion.article
                                key={v.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{
                                    duration: 0.32,
                                    delay: i * 0.04,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                whileHover={{ y: -6 }}
                                className={`relative flex flex-col overflow-hidden rounded-3xl border bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-xl transition-shadow duration-300 ${
                                    v.isPopular
                                        ? "border-amber-400 ring-2 ring-amber-400/30"
                                        : "border-gray-200/90 hover:border-green-600/30"
                                }`}
                            >
                                {/* Most Popular Ribbon */}
                                {v.isPopular && (
                                    <span className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 rounded-md bg-amber-400 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-extrabold text-gray-900 shadow-sm">
                                        MOST POPULAR
                                    </span>
                                )}

                                {/* Vehicle Image */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center p-2 group">
                                    <img
                                        src={v.image}
                                        alt={v.title}
                                        loading="lazy"
                                        onError={() => handleImgError(v.id)}
                                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Body */}
                                <div className="flex flex-1 flex-col pt-3 sm:pt-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-sm sm:text-base font-bold text-gray-900">{v.title}</h3>
                                            <p className="text-xs text-gray-500">{v.subtitle}</p>
                                        </div>
                                        <span className="rounded-md bg-green-50 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-green-700 shrink-0">
                                            {v.tag}
                                        </span>
                                    </div>

                                    {/* Specs chips */}
                                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-xs font-medium text-gray-700">
                                        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg bg-gray-100 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px]">
                                            <FaUsers size={11} className="text-emerald-700" />
                                            {v.seats}
                                        </span>
                                        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg bg-gray-100 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px]">
                                            <FaClock size={11} className="text-emerald-700" />
                                            {v.duration}
                                        </span>
                                        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg bg-gray-100 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px]">
                                            <FaSnowflake size={11} className="text-emerald-700" />
                                            {v.highlight}
                                        </span>
                                    </div>

                                    {/* Bottom Price & Action */}
                                    <div className="mt-auto flex flex-wrap min-[340px]:flex-nowrap items-center justify-between gap-2 border-t border-gray-100 pt-3 sm:pt-4">
                                        <div>
                                            <span className="block text-[10px] sm:text-[11px] text-gray-500">{v.priceNote}</span>
                                            <span className="text-base sm:text-lg font-extrabold text-gray-900">{v.price}</span>
                                        </div>

                                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} className="shrink-0">
                                            <Link
                                                to="/contact-us"
                                                aria-label={`Book ${v.title}`}
                                                className="inline-block rounded-xl bg-green-600 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors hover:bg-green-700"
                                            >
                                                Book Cab
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}