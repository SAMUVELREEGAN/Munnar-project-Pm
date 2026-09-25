import {
    FaPlaneDeparture,
    FaMountainSun,
    FaHeart,
    FaBuilding,
    FaRing,
    FaPeopleGroup,
    FaCarSide,
    FaMapLocationDot,
} from "react-icons/fa6";
import iconMap from "../Reuseable/iconMap";

/* ---------- Default content (can also be passed as props) ---------- */
const DEFAULT_TITLE = "Use Cases";

const DEFAULT_PARAGRAPHS = [
    "Airport and railway transfers, sightseeing tours, honeymoon and family trips, and group or corporate travel are the main ways our services are used. Each one is a real-world scenario where safe, planned transport matters, whether the trip is booked well ahead or arranged at short notice.",
    "Every service is supported by experienced local drivers, flexible booking options and careful coordination, so travellers can enjoy Munnar without worrying about the road.",
    "With round-the-clock customer assistance, instant WhatsApp booking support, and transparent billing, travellers receive a dependable, premium travel experience across Kerala.",
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
        title: "Honeymoon & Romantic Trips",
        text: "Private, unhurried travel for couples with a comfortable vehicle for the whole trip. Multi-day packages can include planned stops, flexible timings and scenic viewpoints tailored specifically for couples.",
        icon: "FaHeart",
    },
    {
        title: "Family Vacations & Multi-Day Tours",
        text: "Spacious multi-seater vehicles for family trips across Kerala. Connect Munnar with Alleppey backwaters, Thekkady wildlife sanctuaries, and Kochi heritage sites with comfortable hill chauffeurs.",
        icon: "FaPeopleGroup",
    },
    {
        title: "Group & Corporate Travel",
        text: "Tempo travellers and larger vehicles for tour groups, company outings and events. Coordinated pick-ups, clear timings and professional drivers keep everyone together and the schedule on track.",
        icon: "FaBuilding",
    },
    {
        title: "Weddings & Special Events",
        text: "Dedicated multi-vehicle fleet coordination for destination weddings and family celebrations. Seamless guest transfers from transit hubs to venues with dedicated driver support.",
        icon: "FaRing",
    },
];

/* Additional icons used only in default items above (not from JSON) */
const localIconMap = {
    ...iconMap,
    FaPlaneDeparture,
    FaMountainSun,
    FaHeart,
    FaBuilding,
    FaRing,
    FaPeopleGroup,
    FaCarSide,
    FaMapLocationDot,
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
            className="py-4 sm:py-6"
        >
            <div className={`container grid gap-6 sm:gap-8 items-start ${paragraphs?.length ? "lg:grid-cols-2 lg:gap-10 xl:gap-12" : ""}`}>
                {/* Intro */}
                <div className={paragraphs?.length ? "lg:sticky lg:top-28 xl:top-32 lg:self-start" : ""}>
                    <h2 id="use-cases-title" className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold text-gray-900">
                        {title}
                    </h2>
                    <span aria-hidden="true" className="gold-rule-left" />
                    {!!paragraphs?.length && (
                        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
                            {paragraphs.map((text, i) => (
                                <p key={i}>{text}</p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cards */}
                <ul className={`space-y-4 sm:space-y-5 ${!paragraphs?.length ? "sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0" : ""}`}>
                    {cardItems.map((item) => {
                        const IconComponent = localIconMap[item.icon];
                        return (
                            <li key={item.id ?? item.title} className="rounded-[28px] bg-[#fffdf8] p-5 sm:p-7 md:p-8 shadow-soft ring-1 ring-cream-200 transition-all duration-500 hover:shadow-lift">
                                <div className="flex items-start justify-between gap-3 sm:gap-4">
                                    <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">{item?.title}</h3>
                                    {IconComponent && (
                                        <span className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-2xl bg-green-50 text-green-700">
                                            <IconComponent size={24} />
                                        </span>
                                    )}
                                </div>
                                <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">{item?.text ?? item?.description}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}