import { useState } from "react";

/* ---------- Default content (can also be passed as props) ---------- */
const DEFAULT_BADGE = "Ride Options";
const DEFAULT_TITLE = "What Are You Looking For? Tailored Travel Solutions";

/* Put the photos in /public/options/ (or change the paths) */
const DEFAULT_ITEMS = [
    {
        title: "Airport & Railway Transfers",
        image: "/options/transfers.jpg",
        text: "Smooth, stress-free arrival. Your driver tracks your flight or train, waits a reasonable time after you land, and helps with luggage. No queues, no surprises.",
    },
    {
        title: "Full-Day Sightseeing & Tours",
        image: "/options/sightseeing.jpg",
        text: "Planning a full day out? Go by the day or by the hour. Perfect for tea gardens, waterfalls and viewpoints, family trips or group outings. You set the itinerary, we handle the drive.",
    },
    {
        title: "One-Way & Outstation Hire",
        image: "/options/outstation.jpg",
        text: "Need a simple one-way transfer? Easy. Whether it's from your hotel to Thekkady, Kochi or Alleppey, or just across town, we have a straightforward point-to-point option.",
    },
];
/* ------------------------------------------------------------------- */

function PinIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    );
}

function CardImage({ src }) {
    const [failed, setFailed] = useState(false);
    const shape = "h-[240px] w-full rounded-2xl sm:h-[290px]";

    if (failed) {
        return <div className={`${shape} bg-gradient-to-br from-green-700 to-green-900`} aria-hidden="true" />;
    }
    return (
        <img
            src={src}
            alt=""
            loading="lazy"
            onError={() => setFailed(true)}
            className={`${shape} object-cover`}
        />
    );
}

export default function RideOptions({
    badge = DEFAULT_BADGE,
    title = DEFAULT_TITLE,
    items = DEFAULT_ITEMS,
}) {
    return (
        <section
            aria-labelledby="ride-options-title"
            className="bg-[#f7f9f6] py-14 font-['Nunito_Sans',system-ui,sans-serif] sm:py-20"
        >
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
                {badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                        <PinIcon />
                        {badge}
                    </span>
                )}

                <h2
                    id="ride-options-title"
                    className="mt-4 max-w-[760px] text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
                >
                    {title}
                </h2>

                <ul className="mt-10 grid gap-x-4 gap-y-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
                    {items.map((item) => (
                        <li key={item.title} className="flex flex-col">
                            <CardImage src={item.image} />

                            {/* Text card overlaps the bottom of the photo */}
                            <div className="relative z-10 -mt-28 mx-5 flex flex-1 flex-col items-center rounded-xl bg-white px-5 py-6 text-center shadow-[0_4px_12px_rgba(0,0,0,0.18)] sm:-mt-36 sm:mx-6 sm:px-6">
                                <h3 className="text-[15px] font-bold text-gray-900">{item.title}</h3>
                                <p className="mt-3 text-[13px] leading-relaxed text-gray-600">{item.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}