import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PackageCard from "../Reuseable/PackageCard";
import data from "../../local/OurPackage.json";
import { FaMagnifyingGlass, FaRotateLeft, FaCheck, FaChevronDown } from "react-icons/fa6";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const EMPTY_PACKAGES = [];

const whatsappLink = (number, text) =>
    `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

const DURATION_OPTIONS = [
    { value: "all", label: "Any Duration" },
    { value: "day", label: "Day Tours (1-12 Hrs)" },
    { value: "multiday", label: "Multi-Day Packages" },
];

const SORT_OPTIONS = [
    { value: "popular", label: "Sort: Most Popular" },
    { value: "rating", label: "Sort: Highest Rated" },
    { value: "price-low", label: "Sort: Price Low to High" },
    { value: "price-high", label: "Sort: Price High to Low" },
];

function CustomDropdown({ options, value, onChange, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    const selectedOption = options.find((opt) => opt.value === value) || options[0];

    return (
        <div ref={dropdownRef} className={`relative w-full ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50/70 px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-800 transition-colors hover:bg-white hover:border-green-600 focus:border-green-600 focus:bg-white focus:outline-none ${focusRing}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="truncate text-left">{selectedOption.label}</span>
                <FaChevronDown
                    size={11}
                    className={`text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-green-600" : ""}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-full mt-1.5 z-40 max-h-60 overflow-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5"
                        role="listbox"
                    >
                        {options.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs sm:text-sm font-medium transition-colors ${
                                        isSelected
                                            ? "bg-green-50 text-green-700 font-semibold"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                    role="option"
                                    aria-selected={isSelected}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {isSelected && <FaCheck size={11} className="text-green-600 shrink-0 ml-2" />}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Packages() {
    const packages = data?.packages ?? EMPTY_PACKAGES;
    const whatsappNumber = data?.whatsappNumber || "919876543210";
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [durationFilter, setDurationFilter] = useState("all");
    const [sortBy, setSortBy] = useState("popular");

    const categories = [
        "All",
        "Munnar Day Tours",
        "Kochi & Airport Transfers",
        "Kerala Multi-Day",
        "Honeymoon Special",
    ];

    const filteredAndSorted = useMemo(() => {
        let result = packages.filter((pkg) => {
            // Category filter
            if (activeCategory !== "All" && pkg.category !== activeCategory) {
                return false;
            }

            // Search filter
            if (searchTerm.trim()) {
                const term = searchTerm.toLowerCase();
                const matchTitle = pkg.title?.toLowerCase().includes(term);
                const matchDesc = pkg.description?.toLowerCase().includes(term);
                const matchLocation = pkg.location?.toLowerCase().includes(term);
                const matchRoutes = pkg.routes?.some((r) => r.toLowerCase().includes(term));
                if (!matchTitle && !matchDesc && !matchLocation && !matchRoutes) {
                    return false;
                }
            }

            // Duration filter
            if (durationFilter === "day") {
                if (!pkg.duration?.includes("Hour") && !pkg.badge?.toLowerCase().includes("day")) {
                    return false;
                }
            } else if (durationFilter === "multiday") {
                if (!pkg.duration?.includes("Day") && !pkg.badge?.toLowerCase().includes("days")) {
                    return false;
                }
            }

            return true;
        });

        // Sorting
        if (sortBy === "price-low") {
            result.sort((a, b) => {
                const priceA = parseInt(String(a.price).replace(/[^0-9]/g, ""), 10) || 0;
                const priceB = parseInt(String(b.price).replace(/[^0-9]/g, ""), 10) || 0;
                return priceA - priceB;
            });
        } else if (sortBy === "price-high") {
            result.sort((a, b) => {
                const priceA = parseInt(String(a.price).replace(/[^0-9]/g, ""), 10) || 0;
                const priceB = parseInt(String(b.price).replace(/[^0-9]/g, ""), 10) || 0;
                return priceB - priceA;
            });
        } else if (sortBy === "rating") {
            result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === "popular") {
            result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        }

        return result;
    }, [packages, activeCategory, searchTerm, durationFilter, sortBy]);

    const handleReset = () => {
        setActiveCategory("All");
        setSearchTerm("");
        setDurationFilter("all");
        setSortBy("popular");
    };

    return (
        <section className="py-2">
            <div className="container">
                {/* Category Pill Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {categories.map((cat) => {
                        const count =
                            cat === "All"
                                ? packages.length
                                : packages.filter((p) => p.category === cat).length;
                        const isActive = activeCategory === cat;

                        return (
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-colors duration-200 ${isActive
                                        ? "bg-green-600 text-white border border-green-600 shadow-sm"
                                        : "bg-white text-gray-700 border border-gray-200 hover:border-green-600 hover:text-green-700 shadow-sm"
                                    } ${focusRing}`}
                            >
                                {cat} {count > 0 && <span className="opacity-80">({count})</span>}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Search & Filter Bar */}
                <div className="mt-5 sm:mt-6 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
                    <div className="flex flex-col gap-2.5 sm:gap-3 md:flex-row md:items-center">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <FaMagnifyingGlass
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search destination (Mattupetty, Top Station)..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 sm:py-2.5 pl-9 sm:pl-10 pr-4 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:outline-none"
                            />
                        </div>

                        {/* Duration Select */}
                        <div className="w-full md:w-48">
                            <CustomDropdown
                                options={DURATION_OPTIONS}
                                value={durationFilter}
                                onChange={setDurationFilter}
                            />
                        </div>

                        {/* Sort Select */}
                        <div className="w-full md:w-52">
                            <CustomDropdown
                                options={SORT_OPTIONS}
                                value={sortBy}
                                onChange={setSortBy}
                            />
                        </div>

                        {/* Reset button */}
                        <button
                            type="button"
                            onClick={handleReset}
                            title="Reset all filters"
                            aria-label="Reset all filters"
                            className="flex h-10 w-full md:w-10 items-center justify-center gap-1.5 shrink-0 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-600 transition-colors hover:border-green-600 hover:text-green-600"
                        >
                            <FaRotateLeft size={13} />
                            <span className="md:hidden font-medium">Reset</span>
                        </button>
                    </div>
                </div>

                {/* Status bar & Trust points */}
                <div className="mt-3.5 sm:mt-4 flex flex-col min-[540px]:flex-row items-start min-[540px]:items-center justify-between gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-gray-600">
                    <p>
                        Showing <strong className="text-gray-900">{filteredAndSorted.length}</strong> of{" "}
                        {packages.length} curated packages
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold text-gray-700">
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                            <FaCheck size={11} className="text-emerald-600" /> Transparent Pricing
                        </span>
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                            <FaCheck size={11} className="text-emerald-600" /> 0% Hidden Fees
                        </span>
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                            <FaCheck size={11} className="text-emerald-600" /> Free 24h Cancel
                        </span>
                    </div>
                </div>

                {/* Cards Grid */}
                <AnimatePresence mode="popLayout">
                    {filteredAndSorted.length > 0 ? (
                        <motion.div
                            key={activeCategory + searchTerm + durationFilter + sortBy}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-5 sm:mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                        >
                            {filteredAndSorted.map((pkg, i) => (
                                <motion.div
                                    key={`${pkg.title}-${i}`}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.32,
                                        delay: Math.min(i * 0.03, 0.2),
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <PackageCard
                                        {...pkg}
                                        to="/contact-us"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className="mt-6 sm:mt-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 text-center"
                        >
                            <p className="text-sm sm:text-base text-gray-600">
                                No packages match your search criteria. Try adjusting your filters.
                            </p>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={handleReset}
                                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-green-700"
                            >
                                <FaRotateLeft size={13} />
                                <span>Reset Filters</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Custom Itinerary Callout Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-8 sm:mt-12 flex flex-col items-center justify-between gap-4 sm:gap-5 rounded-3xl border border-green-200/80 bg-gradient-to-r from-[#eef7ee] via-white to-[#eef7ee] p-5 text-center sm:flex-row sm:text-left sm:p-8 shadow-sm"
                >
                    <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                            Looking for custom dates, luxury tempo travellers, or honeymoon-tailored packages?
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-gray-600">
                            We customize point-to-point itineraries with experienced hill drivers and best-rate guarantees.
                        </p>
                    </div>
                    <div className="flex flex-col min-[480px]:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            href="/contact-us"
                            className={`w-full min-[480px]:w-auto text-center rounded-xl border border-gray-300 bg-white px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-gray-800 shadow-sm transition-colors hover:border-green-600 hover:text-green-700 ${focusRing}`}
                        >
                            CUSTOM ITINERARY
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            href={whatsappLink(whatsappNumber, "Hi Munnar Taxi, I would like to speak to a tour planner for a custom Kerala trip.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full min-[480px]:w-auto text-center rounded-xl bg-green-600 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors hover:bg-green-700 ${focusRing}`}
                        >
                            TOUR PLANNER
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}