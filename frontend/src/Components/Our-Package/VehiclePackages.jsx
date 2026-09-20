import VehicleCard from "./VehicleCard";
import vehicleData from "../../local/Vehicles.json";

/* ---------- Easy-to-edit content ---------- */
const TITLE = "Vehicle Packages";
const DESC =
    "Pick the vehicle that fits your group. Rates are for one day and the distance shown, with an experienced local driver and a clean, well-maintained vehicle.";

const WHATSAPP_NUMBER = "919876543210"; // country code + number, no "+" or spaces (placeholder)
/* ------------------------------------------ */

const whatsappLink = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const bookingMessage = (v) =>
    `Hi, I would like to book: ${v.title}${v.seats ? ` ${v.seats} seater` : ""}` +
    `${v.duration ? `, ${v.duration}` : ""}${v.distance ? `, ${v.distance}` : ""}`;

export default function VehiclePackages({ title = TITLE, desc = DESC }) {
    const vehicles = vehicleData?.vehicles ?? [];

    return (
        <section
            aria-labelledby="vehicles-title"
            className="bg-[#f7f9f6] py-14 font-['Nunito_Sans',system-ui,sans-serif] sm:py-20"
        >
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
                {/* Header */}
                <div className="grid gap-4 md:grid-cols-2 md:items-start md:gap-12">
                    <h2 id="vehicles-title" className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-600 md:pt-1">{desc}</p>
                </div>

                <hr className="mt-8 border-gray-200 sm:mt-10" />

                {/* Cards */}
                {vehicles.length > 0 ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {vehicles.map((v, i) => (
                            <VehicleCard
                                key={`${v.title}-${v.seats}-${i}`}
                                {...v}
                                bookHref={whatsappLink(bookingMessage(v))}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="mt-8 rounded-3xl bg-white p-8 text-center text-sm text-gray-600">
                        Vehicle rates will be listed here soon. Message us for a quote in the meantime.
                    </p>
                )}
            </div>
        </section>
    );
}