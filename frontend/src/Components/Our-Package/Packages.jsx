import { useMemo, useState } from "react";
import PackageCard from "../Reuseable/PackageCard";
import data from "../../local/OurPackage.json";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const EMPTY_PACKAGES = [];

const whatsappLink = (number, text) =>
    `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export default function Packages() {
    const packages = data?.packages ?? EMPTY_PACKAGES;
    const whatsappNumber = data?.whatsappNumber
    const [active, setActive] = useState("All");

    const filters = useMemo(() => {
        const cats = [...new Set(packages.map((p) => p.category).filter(Boolean))];
        return cats.length > 1 ? ["All", ...cats] : [];
    }, [packages]);

    const visible = active === "All" ? packages : packages.filter((p) => p.category === active);

    return (
        <div className="container">

            {/* Filters */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                {filters.length > 0 ? (
                    <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter packages by type">
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
                ) : (
                    <span />
                )}
                <p className="text-sm sm:text-base font-medium text-gray-600" aria-live="polite">
                    Showing <strong className="text-gray-900">{visible.length}</strong> of {packages.length} packages
                </p>
            </div>

            {/* Cards */}
            {visible.length > 0 ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {visible.map((pkg, i) => (
                        <PackageCard
                            key={`${pkg.title}-${i}`}
                            {...pkg}
                            type={pkg.groupType}
                            priceNote={pkg.priceUnit}
                            headingLevel={2}
                            bookHref={whatsappLink(whatsappNumber, `Hi, I would like to book: ${pkg.title}`)}
                        />
                    ))}
                </div>
            ) : (
                <p className="mt-10 rounded-3xl bg-white p-8 text-center text-base text-gray-600">
                    No packages in this category yet. Choose another filter or message us to plan a custom trip.
                </p>
            )}
        </div>
    );
}