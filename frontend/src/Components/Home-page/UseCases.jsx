/* ---------- Default content (can also be passed as props) ---------- */
const iconProps = {
    width: 44,
    height: 44,
    viewBox: "0 0 24 24",
    fill: "#dcfce7",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

const DEFAULT_TITLE = "Use Cases";

const DEFAULT_PARAGRAPHS = [
    "Airport and railway transfers, sightseeing tours, honeymoon and family trips, and group or corporate travel are the main ways our services are used. Each one is a real-world scenario where safe, planned transport matters, whether the trip is booked well ahead or arranged at short notice.",
    "Every service is supported by experienced local drivers, flexible booking options and careful coordination, so travellers can enjoy Munnar without worrying about the road.",
];

const DEFAULT_ITEMS = [
    {
        title: "Airport & Railway Transfers",
        text: "Pick-up and drop-off between Munnar and nearby airports or railway stations. Arrival timings are checked, the driver stays in touch by phone or WhatsApp, and a reasonable waiting time is included, so you are collected on time even if your journey runs late.",
        icon: (
            <svg {...iconProps}>
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
        ),
    },
    {
        title: "Sightseeing Tours",
        text: "Full-day and half-day trips to tea plantations, dams, waterfalls and viewpoints around Munnar. Routes and stops are planned with you, and your driver knows the best times to visit each place and the safest way to get there.",
        icon: (
            <svg {...iconProps}>
                <path d="M3 20 9 9l4 6 3-4 5 9z" />
                <circle cx="17" cy="6" r="2" />
            </svg>
        ),
    },
    {
        title: "Honeymoon & Family Trips",
        text: "Private, unhurried travel for couples and families with a comfortable vehicle for the whole trip. Multi-day packages can include planned stops, flexible timings and space for luggage and children's seats on request.",
        icon: (
            <svg {...iconProps}>
                <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" />
            </svg>
        ),
    },
    {
        title: "Group & Corporate Travel",
        text: "Tempo travellers and larger vehicles for tour groups, company outings and events. Coordinated pick-ups, clear timings and professional drivers keep everyone together and the schedule on track.",
        icon: (
            <svg {...iconProps}>
                <rect x="5" y="3" width="14" height="18" rx="1.5" />
                <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
            </svg>
        ),
    },
];
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
            className="bg-[#f7f9f6] py-14 sm:py-20"
        >
            <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
                {/* Intro (stays in view while the cards scroll on desktop) */}
                <div className="lg:sticky lg:top-10 lg:self-start lg:pt-6">
                    <h2 id="use-cases-title" className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <div className="mt-6 max-w-[440px] space-y-4 text-[13px] leading-relaxed text-gray-600">
                        {paragraphs.map((text, i) => (
                            <p key={i}>{text}</p>
                        ))}
                    </div>
                </div>

                {/* Cards */}
                <ul className="space-y-4">
                    {cardItems.map((item) => (
                        <li key={item.id ?? item.title} className="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-lg font-semibold text-gray-900">{item?.title}</h3>
                                {item.icon && <span className="shrink-0 text-green-600">{item?.icon}</span>}
                            </div>
                            <p className="mt-4 text-[13px] leading-relaxed text-gray-600">{item?.text ?? item?.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}