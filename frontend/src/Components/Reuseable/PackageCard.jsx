import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaLocationDot,
    FaStar,
    FaHeart,
    FaRegHeart,
    FaArrowRight,
    FaCheck,
} from "react-icons/fa6";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const formatCount = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);

function resolveSrc(src) {
    if (!src) return "";
    if (/^(https?:|data:)/.test(src)) return src;
    const clean = src.replace(/^(\.{1,2}\/)+/, "").replace(/^public\//, "").replace(/^\/+/, "");
    return `/${clean}`;
}

export default function PackageCard({
    title,
    image,
    badge,
    bestseller,
    location,
    description,
    duration,
    vehicle,
    rating = null,
    reviews = null,
    routes = [],
    extraRoutesCount = 0,
    inclusions = [],
    price,
    originalPrice,
    priceUnit = "per trip",
    bookHref,
    to = "/contact-us",
    onBook,
    isFavorite,
    onToggleFavorite,
}) {
    const [localFav, setLocalFav] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);
    const fav = isFavorite ?? localFav;

    const toggleFav = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLocalFav(!fav);
        onToggleFavorite?.(!fav);
    };

    const bookContent = (
        <>
            <span>Book Now</span>
            <FaArrowRight size={13} />
        </>
    );

    const bookClass = `inline-flex items-center justify-center gap-1.5 rounded-xl bg-green-600 px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-green-700 hover:shadow-glow ${focusRing}`;

    let bookButton;
    if (bookHref) {
        bookButton = (
            <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Book ${title}`}
                className={bookClass}
            >
                {bookContent}
            </motion.a>
        );
    } else if (to) {
        bookButton = (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                <Link to={to} aria-label={`Book ${title}`} className={bookClass}>
                    {bookContent}
                </Link>
            </motion.div>
        );
    } else {
        bookButton = (
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onBook}
                aria-label={`Book ${title}`}
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
            className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-cream-200 bg-[#fffdf8] p-4 shadow-soft hover:shadow-lift hover:border-green-700/20 transition-all duration-500"
        >
            {/* Image Container with Badges */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100">
                {imgFailed || !image ? (
                    <div className="h-full w-full bg-gradient-to-br from-green-800 to-green-950" />
                ) : (
                    <img
                        src={resolveSrc(image)}
                        alt={title}
                        loading="lazy"
                        draggable="false"
                        onError={() => setImgFailed(true)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                {/* Top Badges */}
                <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
                    {badge && (
                        <span className="rounded-md bg-green-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                            {badge}
                        </span>
                    )}
                    {bestseller && (
                        <span className="rounded-md bg-amber-400 px-2 py-1 text-[11px] font-extrabold text-gray-900 shadow-sm">
                            BESTSELLER
                        </span>
                    )}
                </div>

                {/* Favorite Heart Button */}
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.15 }}
                    type="button"
                    onClick={toggleFav}
                    aria-label={fav ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm ${
                        fav ? "text-rose-600" : "text-gray-700 hover:text-rose-600"
                    } ${focusRing}`}
                >
                    {fav ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
                </motion.button>

                {/* Location Overlay Badge */}
                {location && (
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1.5 rounded-lg bg-black/65 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white">
                        <FaLocationDot size={12} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{location}</span>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col pt-3.5">
                {/* Rating & Duration Row (only when live data provides them) */}
                {(rating != null || duration) && (
                    <div className="flex items-center justify-between text-xs">
                        {rating != null ? (
                            <div className="flex items-center gap-1.5 font-bold text-gray-800">
                                <FaStar size={13} className="text-amber-400" />
                                <span>{Number(rating).toFixed(1)}</span>
                                {reviews != null && (
                                    <span className="font-normal text-gray-500">({formatCount(reviews)})</span>
                                )}
                            </div>
                        ) : <span />}
                        {duration && (
                            <span className="rounded-md bg-green-50 px-2 py-0.5 font-semibold text-green-700">
                                ⏱ {duration}
                            </span>
                        )}
                    </div>
                )}

                {/* Title */}
                <h3 className={`font-display text-base sm:text-lg font-semibold text-gray-900 leading-snug line-clamp-2 ${rating != null || duration ? "mt-2" : ""}`} title={title}>
                    {title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-gray-600 line-clamp-4">
                    {description}
                </p>

                {/* Route Tags */}
                {routes.length > 0 && (
                    <div className="mt-2.5 sm:mt-3 flex items-baseline gap-1.5 text-xs min-h-[1.75rem]">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-gray-600 shrink-0">
                            Route:
                        </span>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                            {routes.slice(0, 2).map((r) => (
                                <span
                                    key={r}
                                    className="inline-flex items-center rounded-md bg-gray-100 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-gray-800 whitespace-nowrap"
                                >
                                    {r}
                                </span>
                            ))}
                            {(extraRoutesCount > 0 || routes.length > 2) && (
                                <span className="inline-flex items-center rounded-md bg-green-50 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-green-700 ring-1 ring-green-600/15 whitespace-nowrap">
                                    +{extraRoutesCount + Math.max(0, routes.length - 2)}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Inclusions */}
                {inclusions.length > 0 && (
                    <div className="mt-2.5 space-y-1 text-xs text-gray-600">
                        {inclusions.map((inc) => (
                            <div key={inc} className="flex items-center gap-1.5 text-[11px] sm:text-[12px]">
                                <FaCheck size={10} className="text-emerald-600 shrink-0" />
                                <span className="truncate">{inc}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Spacer pushes price & button to bottom */}
                <div className="mt-auto pt-3 sm:pt-4" />

                {/* Footer Price & Book Row */}
                <div className={`flex flex-wrap min-[340px]:flex-nowrap items-center gap-2 border-t border-cream-200 pt-3 ${price ? "justify-between" : "justify-end"}`}>
                    {price && (
                        <div>
                            <span className="block text-[10px] sm:text-[11px] text-gray-500">From</span>
                            <div className="flex items-baseline gap-1 sm:gap-1.5">
                                <span className="text-base sm:text-lg font-extrabold text-gray-900">{price}</span>
                                {originalPrice && (
                                    <span className="text-[11px] sm:text-xs text-gray-400 line-through">{originalPrice}</span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="shrink-0">{bookButton}</div>
                </div>
            </div>
        </motion.article>
    );
}