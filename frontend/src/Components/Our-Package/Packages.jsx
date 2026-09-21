import { useMemo, useState } from "react";
import PackageCard from "../Reuseable/PackageCard";
import data from "../../local/OurPackage.json";
import { FaMagnifyingGlass, FaRotateLeft, FaCheck } from "react-icons/fa6";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const EMPTY_PACKAGES = [];

const whatsappLink = (number, text) =>
    `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

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
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                                    isActive
                                        ? "bg-green-600 text-white border border-green-600 shadow-sm"
                                        : "bg-white text-gray-700 border border-gray-200 hover:border-green-600 hover:text-green-700 shadow-sm"
                                } ${focusRing}`}
                            >
                                {cat} {count > 0 && <span className="opacity-80">({count})</span>}
                            </button>
                        );
                    })}
                </div>

                {/* Search & Filter Bar */}
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <FaMagnifyingGlass
                                size={15}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by destination (e.g. Mattupetty, Top Station)..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:outline-none"
                            />
                        </div>

                        {/* Duration Select */}
                        <div className="w-full md:w-48">
                            <select
                                value={durationFilter}
                                onChange={(e) => setDurationFilter(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-700 focus:border-green-600 focus:bg-white focus:outline-none"
                            >
                                <option value="all">Any Duration</option>
                                <option value="day">Day Tours (1-12 Hrs)</option>
                                <option value="multiday">Multi-Day Packages</option>
                            </select>
                        </div>

                        {/* Sort Select */}
                        <div className="w-full md:w-52">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-700 focus:border-green-600 focus:bg-white focus:outline-none"
                            >
                                <option value="popular">Sort: Most Popular</option>
                                <option value="rating">Sort: Highest Rated</option>
                                <option value="price-low">Sort: Price Low to High</option>
                                <option value="price-high">Sort: Price High to Low</option>
                            </select>
                        </div>

                        {/* Reset button */}
                        <button
                            type="button"
                            onClick={handleReset}
                            title="Reset all filters"
                            aria-label="Reset all filters"
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-green-600 hover:text-green-600"
                        >
                            <FaRotateLeft size={14} />
                        </button>
                    </div>
                </div>

                {/* Status bar & Trust points */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
                    <p>
                        Showing <strong className="text-gray-900">{filteredAndSorted.length}</strong> of{" "}
                        {packages.length} curated sightseeing packages
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                            <FaCheck size={12} className="text-emerald-600" /> Transparent Pricing
                        </span>
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                            <FaCheck size={12} className="text-emerald-600" /> 0% Hidden Commission
                        </span>
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                            <FaCheck size={12} className="text-emerald-600" /> Free 24h Cancellation
                        </span>
                    </div>
                </div>

                {/* Cards Grid */}
                {filteredAndSorted.length > 0 ? (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredAndSorted.map((pkg, i) => (
                            <PackageCard
                                key={`${pkg.title}-${i}`}
                                {...pkg}
                                to="/contact-us"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-10 text-center">
                        <p className="text-base text-gray-600">
                            No packages match your search criteria. Try adjusting your filters.
                        </p>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-green-700"
                        >
                            <FaRotateLeft size={14} />
                            <span>Reset Filters</span>
                        </button>
                    </div>
                )}

                {/* Custom Itinerary Callout Banner */}
                <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-green-200/80 bg-gradient-to-r from-[#eef7ee] via-white to-[#eef7ee] p-6 text-center sm:flex-row sm:text-left sm:p-8 shadow-sm">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                            Looking for custom dates, luxury tempo travellers, or honeymoon-tailored packages?
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-gray-600">
                            We customize point-to-point itineraries with experienced hill drivers and best-rate guarantees.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                        <a
                            href="/contact-us"
                            className={`rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-gray-800 shadow-sm transition-colors hover:border-green-600 hover:text-green-700 ${focusRing}`}
                        >
                            BUILD CUSTOM ITINERARY
                        </a>
                        <a
                            href={whatsappLink(whatsappNumber, "Hi Munnar Taxi, I would like to speak to a tour planner for a custom Kerala trip.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-xl bg-green-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors hover:bg-green-700 ${focusRing}`}
                        >
                            SPEAK TO TOUR PLANNER
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}