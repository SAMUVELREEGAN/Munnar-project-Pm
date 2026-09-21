import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";

/*
  Reusable tourist-place card.

  Usage:
    <PlaceCard
      title="Echo Point"
      image="/images/places/echo-point.jpg"
      category="Viewpoint"
      location="Munnar"
      description="A unique place where your voice echoes through the hills."
      type="hills"
    />

  Every prop except `title` is optional – a block is simply hidden when its data is missing.

  Props
    title         string   place name
    image         string   photo path, e.g. "/images/places/echo-point.jpg"
                           (an illustration shows if the file is missing or fails to load)
    category      string   small pill on the photo, e.g. "Nature", "Wildlife", "Temple"
    location      string   e.g. "Munnar" or "Alappuzha"
    description   string   short text, clamped to 3 lines
    type          "hills" | "lake" | "waterfall" | "forest" | "temple" | "beach"
                           which illustration to show if the photo is missing
    to            string   router path – adds a "Learn more" link (optional)
    headingLevel  2-6      heading tag for the title (default 3)
*/

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

/* "../../public/images/a.jpg" or "public/images/a.jpg" -> "/images/a.jpg" */
function resolveSrc(src) {
    if (!src) return "";
    if (/^(https?:|data:)/.test(src)) return src;
    const clean = src.replace(/^(\.{1,2}\/)+/, "").replace(/^public\//, "").replace(/^\/+/, "");
    return `/${clean}`;
}

/* ---------- Illustrations shown when the photo is missing ---------- */
const ART = {
    hills: (
        <>
            <rect width="300" height="200" fill="#e8f3e6" />
            <circle cx="235" cy="45" r="20" fill="#fdf3c8" />
            <path d="M0 110 C50 78 100 92 145 72 S235 58 300 90 V200 H0Z" fill="#a9d3a4" />
            <path d="M0 140 C55 110 110 130 165 105 S255 100 300 122 V200 H0Z" fill="#5fae6a" />
            <path d="M0 170 C60 148 120 165 190 142 S260 146 300 160 V200 H0Z" fill="#2f8a4a" />
        </>
    ),
    lake: (
        <>
            <rect width="300" height="200" fill="#e4eef0" />
            <path d="M0 95 C50 60 100 80 150 55 S250 60 300 85 V115 H0Z" fill="#6f9a86" />
            <rect y="95" width="300" height="14" fill="#fff" opacity=".35" />
            <rect y="108" width="300" height="92" fill="#86b7c4" />
            <rect y="150" width="300" height="50" fill="#6aa3b3" />
            <path d="M30 128h70M160 138h90M60 170h80M200 176h60" stroke="#e4eef0" strokeWidth="2" strokeLinecap="round" opacity=".7" />
            <path d="M120 140h50l-6 9h-38z" fill="#c2543a" />
            <path d="M144 120v20" stroke="#5b4636" strokeWidth="2" />
            <path d="M144 122l16 12h-16z" fill="#f5efe0" />
        </>
    ),
    waterfall: (
        <>
            <rect width="300" height="200" fill="#dcefe6" />
            <path d="M0 80 C40 55 90 70 120 50 H180 C215 68 260 52 300 78 V200 H0Z" fill="#3f9a5c" />
            <path d="M132 50 H166 L176 140 H122Z" fill="#fff" opacity=".95" />
            <path d="M142 50 L146 140 M154 50 L158 140" stroke="#cfe8ee" strokeWidth="2" />
            <path d="M0 130 C60 112 110 132 150 126 S250 112 300 128 V200 H0Z" fill="#237a3f" />
            <ellipse cx="149" cy="142" rx="52" ry="8" fill="#bfe3ea" />
            <path d="M0 175 C80 155 180 180 300 160 V200 H0Z" fill="#14532d" />
        </>
    ),
    forest: (
        <>
            <rect width="300" height="200" fill="#d5e9d6" />
            <path d="M0 120 C60 95 120 110 180 90 S260 95 300 105 V200 H0Z" fill="#7fbf85" />
            {[30, 85, 145, 205, 262].map((x, i) => (
                <g key={x}>
                    <rect x={x - 3} y={i % 2 ? 122 : 128} width="6" height="34" fill="#5b4636" />
                    <circle cx={x} cy={i % 2 ? 108 : 114} r="24" fill="#2f8a4a" />
                    <circle cx={x + 10} cy={i % 2 ? 116 : 122} r="18" fill="#237a3f" />
                </g>
            ))}
            <rect y="152" width="300" height="48" fill="#1f6b39" />
        </>
    ),
    temple: (
        <>
            <rect width="300" height="200" fill="#f8d9a8" />
            <circle cx="60" cy="48" r="22" fill="#fff1c0" />
            <rect x="70" y="140" width="160" height="40" fill="#a4512e" />
            <rect x="90" y="112" width="120" height="30" fill="#c96f3b" />
            <path d="M80 112 L150 70 L220 112Z" fill="#8b3a22" />
            <path d="M110 90 L150 52 L190 90Z" fill="#a4512e" />
            <path d="M145 52h10v-14h-10z" fill="#e0b13a" />
            <rect x="138" y="146" width="24" height="34" fill="#3b1d12" />
            {[92, 108, 184, 200].map((x) => (
                <rect key={x} x={x} y="120" width="8" height="52" fill="#e6b27a" />
            ))}
            <rect x="60" y="180" width="180" height="8" fill="#d9b48a" />
            <rect y="188" width="300" height="12" fill="#7a4a2b" />
        </>
    ),
    beach: (
        <>
            <rect width="300" height="200" fill="#e2f2f6" />
            <circle cx="70" cy="42" r="20" fill="#fff3c4" />
            <rect y="80" width="300" height="50" fill="#6fb8cf" />
            <rect y="100" width="300" height="30" fill="#4f9fbb" />
            <path d="M20 96h50M110 108h70M200 90h50" stroke="#fff" strokeWidth="2" opacity=".7" strokeLinecap="round" />
            <path d="M0 130 C90 118 190 140 300 126 V200 H0Z" fill="#f0dcae" />
            <path d="M170 200 C185 140 215 100 250 92 C275 88 290 96 300 90 V200Z" fill="#4da35f" />
            <path d="M190 200 C205 150 230 118 262 110 C280 106 290 108 300 104 V200Z" fill="#2f8a4a" />
            <path d="M40 170 Q46 140 44 112" stroke="#6b4a2f" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M44 112 Q20 100 8 112 M44 112 Q70 100 82 114 M44 112 Q30 92 20 88 M44 112 Q58 92 70 90" stroke="#2f8a4a" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
    ),
};

function PlaceImage({ src, title, type }) {
    const [failed, setFailed] = useState(false);
    const url = resolveSrc(src);

    return (
        <div className="aspect-[3/2] w-full overflow-hidden rounded-xl bg-green-50">
            {failed || !url ? (
                <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
                    {ART[type] ?? ART.hills}
                </svg>
            ) : (
                <img
                    src={url}
                    alt={title}
                    loading="lazy"
                    draggable="false"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-cover"
                />
            )}
        </div>
    );
}

/* ---------- Card ---------- */
export default function PlaceCard({
    title,
    image,
    category,
    location,
    description,
    type = "hills",
    to,
    headingLevel = 3,
}) {
    const Heading = `h${headingLevel}`;

    return (
        <article className="flex h-full flex-col rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition-shadow duration-200 hover:shadow-lg">
            <div className="relative">
                <PlaceImage src={image} title={title} type={type} />
                {category && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-green-800 shadow-sm">
                        {category}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                <Heading className="text-base sm:text-lg font-bold leading-snug text-gray-900">{title}</Heading>

                {location && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-green-800">
                        <FaLocationDot size={15} />
                        <span>{location}</span>
                    </p>
                )}

                {description && (
                    <p
                        className="mt-2 flex-1 text-sm leading-relaxed text-gray-600"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {description}
                    </p>
                )}

                {to && (
                    <Link
                        to={to}
                        aria-label={`Learn more about ${title}`}
                        className={`mt-3 inline-flex items-center gap-1.5 self-start rounded text-sm font-bold text-green-700 hover:text-green-900 ${focusRing}`}
                    >
                        Learn more
                        <FaArrowRight size={15} />
                    </Link>
                )}
            </div>
        </article>
    );
}