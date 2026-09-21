import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaArrowRight, FaCar } from "react-icons/fa6";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

/* Vehicle photo, with a simple placeholder if the file is missing */
function VehicleImage({ src, alt }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className="grid h-24 w-40 place-items-center rounded-2xl bg-green-50 text-green-600" aria-hidden="true">
                <FaCar size={44} />
            </div>
        );
    }
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-24 w-44 object-contain object-left"
        />
    );
}

function VehicleCard({ vehicle }) {
    return (
        <article className="relative flex flex-col overflow-hidden rounded-3xl bg-white p-5 shadow-sm">
            {/* Decorative corner + seat badge */}
            <div className="absolute right-0 top-0 h-28 w-32 rounded-bl-[80px] bg-green-50" aria-hidden="true" />
            <span
                className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-2.5 py-1 text-xs sm:text-sm font-bold text-white shadow-sm"
                aria-label={`${vehicle.capacity} seats`}
            >
                <FaUsers size={16} />
                {vehicle.capacity}
            </span>

            <div className="relative">
                <VehicleImage src={vehicle.image} alt={`${vehicle.tag}`} />
            </div>

            {/* Model chip + optional ribbon */}
            <div className="mt-4 flex min-h-[26px] items-center justify-between">
                <span className="rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {vehicle.tag}
                </span>
                {vehicle.isLowestPrice && (
                    <span className="-mr-5 rounded-l-md bg-green-600 px-3 py-1 text-xs font-bold text-white">
                        Lowest Price
                    </span>
                )}
            </div>

            <h3 className="mt-3 text-lg font-bold text-gray-900">{vehicle.title}</h3>

            {/* Rates */}
            <dl className="my-4 flex-1 space-y-2.5 rounded-2xl bg-[#f4f6f2] p-4">
                {vehicle.pricing.map(({ label, value }) => (
                    <div key={label} className="flex items-baseline justify-between gap-3 text-sm">
                        <dt className="text-gray-600">{label}</dt>
                        <dd className="whitespace-nowrap font-bold text-gray-900">{value}</dd>
                    </div>
                ))}
            </dl>

            {/* Luggage + book */}
            <div className="">
                <Link
                    to={`/contact-us`}
                    aria-label={`Book ${vehicle.title}`}
                    className={`inline-flex items-center justify-center gap-2 rounded-full bg-green-100 px-5 py-3 text-sm sm:text-base font-semibold text-green-700 transition-colors hover:bg-green-600 hover:text-white ${focusRing}`}
                >
                    Book Now
                    <FaArrowRight size={16} />
                </Link>
            </div>
        </article>
    );
}

export default function Vehicles({ VehiclePackages = {} }) {

    if (!VehiclePackages) return null;

    const { pageTitle, pageDescription, vehicles } = VehiclePackages;

    return (
        <section aria-labelledby="vehicles-title" className="py-10" >
            <div className="container">
                {/* Header */}
                <div className="grid gap-4 md:grid-cols-2 md:items-start md:gap-12">
                    <h2 id="vehicles-title" className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        {pageTitle}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-600 md:pt-1">{pageDescription}</p>
                </div>

                <hr className="mt-8 border-gray-200 sm:mt-10" />

                {/* Grid */}
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {vehicles?.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            </div>
        </section>
    );
}