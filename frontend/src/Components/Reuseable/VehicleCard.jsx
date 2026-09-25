import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaClock, FaRoute, FaArrowRight } from "react-icons/fa6";

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
                    className="h-full w-full object-contain object-center p-2 mix-blend-multiply transition-transform duration-300 hover:scale-105"
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
        seats && { icon: <FaUsers size={16} />, text: `${seats} seater` },
        duration && { icon: <FaClock size={16} />, text: duration },
        distance && { icon: <FaRoute size={16} />, text: distance },
    ].filter(Boolean);

    const bookClass = `mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm sm:text-base font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-green-800 ${focusRing}`;
    const bookContent = (
        <>
            <span>Book Now</span>
            <FaArrowRight size={16} />
        </>
    );
    const label = `Book ${title}${seats ? `, ${seats} seater` : ""}`;

    let bookButton;
    if (bookHref) {
        bookButton = (
            <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className={bookClass}
            >
                {bookContent}
            </motion.a>
        );
    } else if (to) {
        bookButton = (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                <Link to={to} aria-label={label} className={bookClass}>
                    {bookContent}
                </Link>
            </motion.div>
        );
    } else {
        bookButton = (
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onBook}
                aria-label={label}
                className={bookClass}
            >
                {bookContent}
            </motion.button>
        );
    }

    return (
        <motion.article
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex h-full flex-col rounded-[28px] bg-[#fffdf8] p-3 shadow-soft ring-1 ring-cream-200 hover:shadow-lift transition-all duration-500"
        >
            <VehicleImage src={image} title={title} type={type} />

            <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                <Heading className="font-display text-xl font-semibold leading-snug text-gray-900">{title}</Heading>
                {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}

                {chips.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm font-semibold text-green-800">
                        {chips.map((c) => (
                            <li key={c.text} className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1">
                                {c.icon}
                                {c.text}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pushes price and button to the bottom so cards line up */}
                <div className="mt-auto" />

                {hasPrice && (
                    <div className="mt-4 flex items-baseline justify-between gap-2 border-t border-cream-200 pt-3">
                        <span className="text-xl sm:text-2xl font-bold text-green-700">{formatPrice(price)}</span>
                        {priceNote && <span className="text-xs text-gray-500">{priceNote}</span>}
                    </div>
                )}

                {bookButton}
            </div>
        </motion.article>
    );
}