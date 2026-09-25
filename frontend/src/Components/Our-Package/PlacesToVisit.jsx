import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import placeData from "../../local/PlacesVisit.json";
import PlaceCard from "../Reuseable/PlaceCard";
import { FaWandMagicSparkles } from "react-icons/fa6";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const EMPTY_PLACES = [];

export default function PlacesToVisit() {
    const places = placeData?.places ?? EMPTY_PLACES;
    const [activeRegion, setActiveRegion] = useState("All");

    const filterTabs = [
        { label: "All Spots", value: "All", count: places.length },
        { label: "Munnar High Range", value: "Munnar", count: places.filter((p) => p.region === "Munnar").length },
        { label: "Kerala Extender", value: "Kerala", count: places.filter((p) => p.region === "Kerala").length },
    ];

    const visiblePlaces = useMemo(() => {
        if (activeRegion === "All") return places;
        return places.filter((p) => p.region === activeRegion);
    }, [places, activeRegion]);

    return (
        <section aria-labelledby="places-title" className="py-4 sm:py-8">
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
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">
                            <FaWandMagicSparkles size={11} className="text-emerald-600" />
                            <span>Top Sightseeing Destinations</span>
                        </div>
                        <h2 id="places-title" className="mt-2.5 sm:mt-3 font-display text-[28px] font-semibold leading-tight text-gray-900 sm:text-4xl lg:text-[44px]">
                            Top Places to Visit in Munnar
                        </h2>
                        <p className="mt-2 max-w-[700px] text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
                            Explore the most beautiful tourist attractions in Munnar. From tea gardens to waterfalls and wildlife, enjoy a perfect trip.
                        </p>
                    </div>

                    {/* Filter Tabs on Right */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 shrink-0">
                        {filterTabs.map((tab) => {
                            const isActive = activeRegion === tab.value;
                            return (
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    key={tab.value}
                                    type="button"
                                    onClick={() => setActiveRegion(tab.value)}
                                    className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${isActive
                                            ? "bg-green-600 text-cream-50 border border-green-600 shadow-soft"
                                            : "bg-[#fffdf8] text-gray-700 border border-cream-200 hover:border-green-600 hover:text-green-700 shadow-soft"
                                        } ${focusRing}`}
                                >
                                    {tab.label} {tab.count > 0 && <span className="opacity-80">({tab.count})</span>}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                <div className="mt-5 sm:mt-6 h-px w-full bg-gradient-to-r from-transparent via-cream-300 to-transparent" />

                {/* Places Grid */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeRegion}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {visiblePlaces.map((p, i) => (
                            <motion.div
                                key={`${p.title}-${i}`}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.32,
                                    delay: Math.min(i * 0.03, 0.3),
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <PlaceCard {...p} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}