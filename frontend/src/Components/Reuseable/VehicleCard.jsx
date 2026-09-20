import { useState } from "react";
import { Link } from "react-router-dom";


const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const formatPrice = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

/* "../../public/images/a.png" or "public/images/a.png" -> "/images/a.png" */
function resolveSrc(src) {
    if (!src) return "";
    if (/^(https?:|data:)/.test(src)) return src;
    const clean = src.replace(/^(\.{1,2}\/)+/, "").replace(/^public\//, "").replace(/^\/+/, "");
    return `/${clean}`;
}

/* ---------- Icons ---------- */
function Icon({ children, size = 14 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

const UsersIcon = () => (
    <Icon>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
);
const ClockIcon = () => (
    <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </Icon>
);
const RouteIcon = () => (
    <Icon>
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="5" r="2" />
        <path d="M8 19h8a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h8" />
    </Icon>
);
const ArrowRight = () => (
    <Icon>
        <path d="M4 12h15M13 6l6 6-6 6" />
    </Icon>
);

/* ---------- Illustrations shown when the photo is missing ---------- */
function VehicleArt({ type }) {
    const body = "#f8f8f5";
    const edge = "#c9cfc9";
    const glass = "#8db9cf";

    const wheel = (cx, cy) => (
        <g>
            <circle cx={cx} cy={cy} r="20" fill="#1f2430" />
            <circle cx={cx} cy={cy} r="9" fill="#aab1bd" />
        </g>
    );

    return (
        <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
            <ellipse cx="160" cy="136" rx="128" ry="8" fill="#000" opacity=".1" />
            {type === "van" ? (
                <>
                    <path
                        d="M20 120 V70 Q20 48 44 46 H236 Q262 46 276 68 L298 92 Q304 100 304 108 V120 Q304 126 296 126 H28 Q20 126 20 120Z"
                        fill={body}
                        stroke={edge}
                        strokeWidth="2"
                    />
                    {[50, 90, 130, 170, 210].map((x) => (
                        <rect key={x} x={x} y="58" width="32" height="26" rx="4" fill={glass} />
                    ))}
                    <path d="M246 58 H258 Q268 58 274 70 L284 88 H246Z" fill={glass} />
                    <path d="M20 102 H300" stroke="#2f8a4a" strokeWidth="4" opacity=".8" />
                    {wheel(80, 126)}
                    {wheel(252, 126)}
                </>
            ) : type === "mpv" ? (
                <>
                    <path
                        d="M28 118 V92 Q28 76 46 70 L96 56 Q110 34 140 32 H232 Q256 32 268 54 L288 72 Q296 82 296 98 V118 Q296 124 288 124 H36 Q28 124 28 118Z"
                        fill={body}
                        stroke={edge}
                        strokeWidth="2"
                    />
                    <path d="M104 58 Q116 42 140 42 H160 V70 H96Z" fill={glass} />
                    <path d="M168 42 H196 V70 H168Z" fill={glass} />
                    <path d="M204 42 H232 Q246 42 254 56 L258 70 H204Z" fill={glass} />
                    <path d="M28 100 H296" stroke="#2f8a4a" strokeWidth="3" opacity=".6" />
                    {wheel(88, 124)}
                    {wheel(240, 124)}
                </>
            ) : (
                <>
                    <path
                        d="M30 112 L44 88 Q52 72 74 68 L112 58 Q126 44 150 42 H198 Q222 42 238 62 L268 70 Q290 74 292 96 V112 Q292 120 284 120 H38 Q30 120 30 112Z"
                        fill={body}
                        stroke={edge}
                        strokeWidth="2"
                    />
                    <path d="M118 62 Q130 50 150 50 H172 V72 H108Z" fill={glass} />
                    <path d="M180 50 H198 Q214 50 226 64 L232 72 H180Z" fill={glass} />
                    {wheel(88, 120)}
                    {wheel(238, 120)}
                </>
            )}
        </svg>
    );
}

function VehicleImage({ src, title, type }) {
    const [failed, setFailed] = useState(false);
    const url = resolveSrc(src);

    return (
        <div className="grid aspect-[16/10] place-items-center overflow-hidden rounded-xl bg-[#eef4ec]">
            {failed || !url ? (
                <div className="h-full w-full p-4">
                    <VehicleArt type={type} />
                </div>
            ) : (
                <img
                    src={url}
                    alt={title}
                    loading="lazy"
                    draggable="false"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-contain p-4 mix-blend-multiply"
                />
            )}
        </div>
    );
}

/* ---------- Card ---------- */
export default function VehicleCard({
    title,
    subtitle,
    image,
    type = "sedan",
    seats,
    duration,
    distance,
    price,
    priceNote,
    bookHref,
    to,
    onBook,
    headingLevel = 3,
}) {
    const Heading = `h${headingLevel}`;
    const hasPrice = price !== undefined && price !== null && price !== "";

    const chips = [
        seats && { icon: <UsersIcon />, text: `${seats} seater` },
        duration && { icon: <ClockIcon />, text: duration },
        distance && { icon: <RouteIcon />, text: distance },
    ].filter(Boolean);

    const bookClass = `mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-800 ${focusRing}`;
    const bookContent = (
        <>
            Book Now
            <ArrowRight />
        </>
    );
    const label = `Book ${title}${seats ? `, ${seats} seater` : ""}`;

    let bookButton;
    if (bookHref) {
        bookButton = (
            <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className={bookClass}
            >
                {bookContent}
            </a>
        );
    } else if (to) {
        bookButton = (
            <Link to={to} aria-label={label} className={bookClass}>
                {bookContent}
            </Link>
        );
    } else {
        bookButton = (
            <button type="button" onClick={onBook} aria-label={label} className={bookClass}>
                {bookContent}
            </button>
        );
    }

    return (
        <article className="flex h-full flex-col rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-gray-100 transition-shadow duration-200 hover:shadow-lg">
            <VehicleImage src={image} title={title} type={type} />

            <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                <Heading className="text-base font-bold leading-snug text-gray-900">{title}</Heading>
                {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}

                {chips.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-green-800">
                        {chips.map((c) => (
                            <li key={c.text} className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1">
                                {c.icon}
                                {c.text}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pushes price and button to the bottom so cards line up */}
                <div className="mt-auto" />

                {hasPrice && (
                    <div className="mt-4 flex items-baseline justify-between gap-2 border-t border-gray-100 pt-3">
                        <span className="text-xl font-bold text-green-700">{formatPrice(price)}</span>
                        {priceNote && <span className="text-[11px] text-gray-500">{priceNote}</span>}
                    </div>
                )}

                {bookButton}
            </div>
        </article>
    );
}