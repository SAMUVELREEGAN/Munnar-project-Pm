import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaClock, FaCarSide } from "react-icons/fa6";
import PackageSection from "../../local/OurPackage.json";

const VEHICLE_IMAGES = {
    Sedan: "/images/car.png",
    Ertiga: "/images/Ertiga.webp",
    Inova: "/images/munnar-innova.jpg",
    "Inova crysta": "/images/munnar-innova.jpg",
    Tempo: "/images/van.png",
};

function pickImage(title = "") {
    const key = Object.keys(VEHICLE_IMAGES).find((k) => title.toLowerCase().includes(k.toLowerCase()));
    return VEHICLE_IMAGES[key] || "/images/car.png";
}

export default function VehiclePackages() {
    const section = PackageSection?.vehiclePackages;
    const vehicles = section?.vehicles ?? [];

    if (!vehicles.length) return null;

    return (
        <section aria-labelledby="vehicles-title" className="py-4 sm:py-8">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    <h2 id="vehicles-title" className="font-display text-[28px] font-semibold leading-tight text-gray-900 sm:text-4xl lg:text-[44px]">
                        {section?.pageTitle || "Vehicle Packages"}
                    </h2>
                    <span aria-hidden="true" className="gold-rule-left" />
                    <p className="mt-3 max-w-[700px] text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
                        Daily taxi packages with clean vehicles, chauffeur, and transparent rates for 100 km.
                    </p>
                </motion.div>

                <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {vehicles.map((v, i) => (
                        <motion.article
                            key={v.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.32,
                                delay: i * 0.03,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            whileHover={{ y: -6 }}
                            className="relative flex flex-col overflow-hidden rounded-[28px] border border-cream-200 bg-[#fffdf8] p-4 shadow-soft hover:shadow-lift transition-all duration-500"
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center p-2 group">
                                <img
                                    src={pickImage(v.title)}
                                    alt={v.title}
                                    loading="lazy"
                                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-1 flex-col pt-3 sm:pt-4">
                                <h3 className="font-display text-base sm:text-lg font-semibold text-gray-900">{v.title}</h3>

                                <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 text-xs font-medium text-gray-700">
                                    {v.seats && (
                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 text-[11px]">
                                            <FaUsers size={11} className="text-emerald-700" />
                                            {v.seats}
                                        </span>
                                    )}
                                    {v.duration && (
                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 text-[11px]">
                                            <FaClock size={11} className="text-emerald-700" />
                                            {v.duration}
                                        </span>
                                    )}
                                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 text-[11px]">
                                        <FaCarSide size={11} className="text-emerald-700" />
                                        AC Cab
                                    </span>
                                </div>

                                <div className="mt-auto flex flex-wrap min-[340px]:flex-nowrap items-center justify-between gap-2 border-t border-cream-200 pt-3 sm:pt-4">
                                    <div>
                                        <span className="block text-[11px] text-gray-500">Package rate</span>
                                        <span className="text-lg font-extrabold text-gray-900">{v.price}</span>
                                    </div>

                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} className="shrink-0">
                                        <Link
                                            to="/contact-us"
                                            aria-label={`Book ${v.title}`}
                                            className="inline-block rounded-xl bg-green-600 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-cream-50 shadow-soft transition-all duration-300 hover:bg-green-700"
                                        >
                                            Book Now
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
