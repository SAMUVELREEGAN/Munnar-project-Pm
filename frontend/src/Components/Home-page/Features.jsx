/* ---------- Easy-to-edit content ---------- */
const HEADING = "Making Every Journey Through Munnar Easier";
const SUBTEXT = "Helping travellers reach their destinations with comfort, safety and ease.";

const iconProps = {
    width: 34,
    height: 34,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

const FEATURES = [
    {
        title: "Easy Communication",
        text: "Stay connected with your driver through call, WhatsApp or SMS for smooth coordination before and during your trip.",
        icon: (
            <svg {...iconProps}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 9h8M8 13h5" />
            </svg>
        ),
    },
    {
        title: "On-Time Pickup",
        text: "We plan timings carefully so your travel stays on track, without unnecessary waiting at hotels, stations or airports.",
        icon: (
            <svg {...iconProps}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </svg>
        ),
    },
    {
        title: "Comfortable Travel",
        text: "Enjoy a relaxed journey with clean, well-maintained vehicles designed for comfort on Munnar's winding hill roads.",
        icon: (
            <svg {...iconProps}>
                <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
                <path d="M5 18v2M19 18v2" />
            </svg>
        ),
    },
    {
        title: "Flexible Booking",
        text: "Book your ride around your schedule, with options that suit both well-planned trips and last-minute travel needs.",
        icon: (
            <svg {...iconProps}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18M9.5 15.5l2 2 3.5-3.5" />
            </svg>
        ),
    },
];
/* ------------------------------------------ */

export default function Features() {
    return (
        <section
            aria-labelledby="features-title"
            className="bg-[#f7f9f6] py-14 font-['Nunito_Sans',system-ui,sans-serif] sm:py-20"
        >
            <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-12">
                {/* Intro */}
                <div>
                    <h2 id="features-title" className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        {HEADING}
                    </h2>
                    <p className="mt-4 max-w-[380px] text-sm leading-relaxed text-gray-600">{SUBTEXT}</p>
                </div>

                {/* Cards */}
                <ul className="grid gap-4 sm:grid-cols-2">
                    {FEATURES.map((feature) => (
                        <li
                            key={feature.title}
                            className="flex flex-col items-center rounded-3xl bg-white px-6 py-8 text-center shadow-sm"
                        >
                            <span className="text-green-600">{feature.icon}</span>
                            <h3 className="mt-4 text-[15px] font-semibold text-gray-900">{feature.title}</h3>
                            <p className="mt-3 text-[12.5px] leading-relaxed text-gray-600">{feature.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}