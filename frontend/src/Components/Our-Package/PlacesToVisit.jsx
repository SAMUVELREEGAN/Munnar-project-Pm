import { useMemo, useState } from "react";
import placeData from "../../local/PlacesVisit.json";
import PlaceCard from "../Reuseable/PlaceCard";

/* ---------- Easy-to-edit content ---------- */
const TITLE = "Places to Visit in Munnar & Kerala";
const DESC =
    "Discover the most loved sightseeing spots around Munnar and across Kerala. Tell us which ones you would like to see and we will plan the route for you.";
/* ------------------------------------------ */

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const EMPTY_PLACES = [];

export default function PlacesToVisit({ title = TITLE, desc = DESC }) {
    const places = placeData?.places ?? EMPTY_PLACES;
    const [active, setActive] = useState("All");

    // Filter chips come from the optional "region" field in the JSON
    const filters = useMemo(() => {
        const regions = [...new Set(places.map((p) => p.region).filter(Boolean))];
        return regions.length > 1 ? ["All", ...regions] : [];
    }, [places]);

    const visible = active === "All" ? places : places.filter((p) => p.region === active);

    return (
        <section aria-labelledby="places-title" className="" >
            <div className="container">
                {/* Header */}
                <div className="grid gap-4 md:grid-cols-2 md:items-start md:gap-12">
                    <h2 id="places-title" className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-600 md:pt-1">{desc}</p>
                </div>

                <hr className="mt-8 border-gray-200 sm:mt-10" />

                {/* Filters */}
                {filters.length > 0 && (
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter places by region">
                            {filters.map((f) => {
                                const on = f === active;
                                return (
                                    <button
                                        key={f}
                                        type="button"
                                        aria-pressed={on}
                                        onClick={() => setActive(f)}
                                        className={`rounded-full border px-5 py-2.5 text-sm sm:text-base font-semibold transition-colors ${focusRing} ${on
                                            ? "border-green-600 bg-green-600 text-white shadow-sm"
                                            : "border-gray-200 bg-white text-gray-700 hover:border-green-600 hover:text-green-700 shadow-sm"
                                            }`}
                                    >
                                        {f}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-sm sm:text-base font-medium text-gray-600" aria-live="polite">
                            Showing <strong className="text-gray-900">{visible.length}</strong> of {places.length} places
                        </p>
                    </div>
                )}

                {/* Cards */}
                {visible.length > 0 ? (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {visible.map((p, i) => (
                            <PlaceCard key={`${p.title}-${i}`} {...p} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-8 rounded-3xl bg-white p-8 text-center text-base text-gray-600">
                        Places will be listed here soon. Message us and we will suggest a route.
                    </p>
                )}
            </div>
        </section>
    );
}