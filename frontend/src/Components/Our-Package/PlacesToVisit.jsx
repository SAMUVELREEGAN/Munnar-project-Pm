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
        <section aria-labelledby="places-title" className="py-8">
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800">
                            <FaWandMagicSparkles size={11} className="text-emerald-600" />
                            <span>Top Sightseeing Destinations</span>
                        </div>
                        <h2 id="places-title" className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                            Places to Visit in Munnar & Kerala
                        </h2>
                        <p className="mt-2 max-w-[700px] text-sm sm:text-base leading-relaxed text-gray-600">
                            Pick your must-see landmarks and customize with a personal chauffeur at the wheel, scenic routes, and zero hassle.
                        </p>
                    </div>

                    {/* Filter Tabs on Right */}
                    <div className="flex flex-wrap gap-2 shrink-0">
                        {filterTabs.map((tab) => {
                            const isActive = activeRegion === tab.value;
                            return (
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    key={tab.value}
                                    type="button"
                                    onClick={() => setActiveRegion(tab.value)}
                                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-colors ${isActive
                                            ? "bg-green-600 text-white border border-green-600 shadow-sm"
                                            : "bg-white text-gray-700 border border-gray-200 hover:border-green-600 hover:text-green-700 shadow-sm"
                                        } ${focusRing}`}
                                >
                                    {tab.label} {tab.count > 0 && <span className="opacity-80">({tab.count})</span>}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                <hr className="mt-6 border-gray-200" />

                {/* Places Grid */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeRegion}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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