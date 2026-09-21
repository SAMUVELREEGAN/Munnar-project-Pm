import { FaPlaneDeparture, FaMountainSun, FaHeart, FaBuilding } from "react-icons/fa6";
import iconMap from "../Reuseable/iconMap";

/* ---------- Default content (can also be passed as props) ---------- */
const DEFAULT_TITLE = "Use Cases";

const DEFAULT_PARAGRAPHS = [
    "Airport and railway transfers, sightseeing tours, honeymoon and family trips, and group or corporate travel are the main ways our services are used. Each one is a real-world scenario where safe, planned transport matters, whether the trip is booked well ahead or arranged at short notice.",
    "Every service is supported by experienced local drivers, flexible booking options and careful coordination, so travellers can enjoy Munnar without worrying about the road.",
];

const DEFAULT_ITEMS = [
    {
        title: "Airport & Railway Transfers",
        text: "Pick-up and drop-off between Munnar and nearby airports or railway stations. Arrival timings are checked, the driver stays in touch by phone or WhatsApp, and a reasonable waiting time is included, so you are collected on time even if your journey runs late.",
        icon: "FaPlaneDeparture",
    },
    {
        title: "Sightseeing Tours",
        text: "Full-day and half-day trips to tea plantations, dams, waterfalls and viewpoints around Munnar. Routes and stops are planned with you, and your driver knows the best times to visit each place and the safest way to get there.",
        icon: "FaMountainSun",
    },
    {
        title: "Honeymoon & Family Trips",
        text: "Private, unhurried travel for couples and families with a comfortable vehicle for the whole trip. Multi-day packages can include planned stops, flexible timings and space for luggage and children's seats on request.",
        icon: "FaHeart",
    },
    {
        title: "Group & Corporate Travel",
        text: "Tempo travellers and larger vehicles for tour groups, company outings and events. Coordinated pick-ups, clear timings and professional drivers keep everyone together and the schedule on track.",
        icon: "FaBuilding",
    },
];

/* Additional icons used only in default items above (not from JSON) */
const localIconMap = {
    ...iconMap,
    FaPlaneDeparture,
    FaMountainSun,
    FaHeart,
    FaBuilding,
};
/* ------------------------------------------------------------------- */

export default function UseCases({
    title = DEFAULT_TITLE,
    paragraphs = DEFAULT_PARAGRAPHS,
    items,
    rightCards,
}) {
    const cardItems = items ?? rightCards ?? DEFAULT_ITEMS;


    return (
        <section
            aria-labelledby="use-cases-title"
            className=""
        >
            <div className="container grid gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
                {/* Intro (stays in view while the cards scroll on desktop) */}
                <div className="lg:sticky lg:top-10 lg:self-start lg:pt-6 ">
                    <h2 id="use-cases-title" className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <div className="mt-6 max-w-[440px] space-y-4 text-h5 text-gray-600">
                        {paragraphs.map((text, i) => (
                            <p key={i}>{text}</p>
                        ))}
                    </div>
                </div>

                {/* Cards */}
                <ul className="space-y-5">
                    {cardItems.map((item) => {
                        const IconComponent = localIconMap[item.icon];
                        return (
                            <li key={item.id ?? item.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{item?.title}</h3>
                                    {IconComponent && (
                                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-green-50 text-green-600">
                                            <IconComponent size={28} />
                                        </span>
                                    )}
                                </div>
                                <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-gray-600">{item?.text ?? item?.description}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}