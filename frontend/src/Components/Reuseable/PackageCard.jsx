import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaLocationDot,
    FaClock,
    FaCar,
    FaUsers,
    FaStar,
    FaHeart,
    FaRegHeart,
    FaArrowRight,
} from "react-icons/fa6";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const formatCount = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);

/* "../../public/images/a.jpg" or "public/images/a.jpg" -> "/images/a.jpg" */
function resolveSrc(src) {
    if (!src) return "";
    if (/^(https?:|data:)/.test(src)) return src;
    const clean = src.replace(/^(\.{1,2}\/)+/, "").replace(/^public\//, "").replace(/^\/+/, "");
    return `/${clean}`;
}

function CardImage({ src, title, variant }) {
    const [, setFailed] = useState(false);
    const url = resolveSrc(src);

    return (
        <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-green-50">
            <img
                src={url}
                alt={title}
                loading="lazy"
                draggable="false"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover"
            />
        </div>
    );
}

/* ---------- Card ---------- */
export default function PackageCard({
    title,
    image,
    badge,
    location,
    description,
    duration,
    vehicle,
    type,
    rating,
    reviews,
    price,
    priceNote = "per trip",
    bookHref,
    to,
    onBook,
    isFavorite,
    onToggleFavorite,
    fallbackVariant = "hills",
    headingLevel = 3,
}) {
    const [localFav, setLocalFav] = useState(false);
    const fav = isFavorite ?? localFav;
    const Heading = `h${headingLevel}`;

    const toggleFav = () => {
        setLocalFav(!fav);
        onToggleFavorite?.(!fav);
    };

    const meta = [
        duration && { icon: <FaClock size={16} className="text-green-700" />, text: duration },
        vehicle && { icon: <FaCar size={16} className="text-green-700" />, text: vehicle },
        type && { icon: <FaUsers size={16} className="text-green-700" />, text: type },
    ].filter(Boolean);

    const hasRating = typeof rating === "number";

    const bookClass = `mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm sm:text-base font-bold text-white transition-colors hover:bg-green-800 ${focusRing}`;
    const bookContent = (
        <>
            Book Now
            <FaArrowRight size={16} />
        </>
    );

    let bookButton;
    if (bookHref) {
        bookButton = (
            <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Book ${title} (opens in a new tab)`}
                className={bookClass}
            >
                {bookContent}
            </a>
        );
    } else if (to) {
        bookButton = (
            <Link to={to} aria-label={`Book ${title}`} className={bookClass}>
                {bookContent}
            </Link>
        );
    } else {
        bookButton = (
            <button type="button" onClick={onBook} aria-label={`Book ${title}`} className={bookClass}>
                {bookContent}
            </button>
        );
    }

    return (
        <article className="flex h-full flex-col rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition-shadow duration-200 hover:shadow-lg">
            {/* Photo */}
            <div className="relative">
                <CardImage src={image} title={title} variant={fallbackVariant} />

                {badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-green-700 px-3 py-1 text-xs font-bold text-white shadow-sm">
                        {badge}
                    </span>
                )}

                <button
                    type="button"
                    onClick={toggleFav}
                    aria-pressed={fav}
                    aria-label={fav ? `Remove ${title} from favourites` : `Save ${title} to favourites`}
                    className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm transition-colors ${fav ? "text-rose-600" : "text-green-700 hover:text-rose-600"
                        } ${focusRing}`}
                >
                    {fav ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                </button>
            </div>

            {/* Body */}
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
                        className="mt-2 text-sm leading-relaxed text-gray-600"
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

                {meta.length > 0 && (
                    <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        {meta.map((m) => (
                            <li key={m.text} className="inline-flex items-center gap-1.5">
                                <span>{m.icon}</span>
                                {m.text}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pushes rating, price and button to the bottom so cards line up */}
                <div className="mt-auto" />

                {(hasRating) && (
                    <div className="mt-4 flex items-end justify-between gap-2 border-t border-gray-100 pt-3">
                        {hasRating ? (
                            <p className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                                <FaStar size={16} className="text-amber-400" />
                                <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
                                {typeof reviews === "number" && <span>({formatCount(reviews)} reviews)</span>}
                            </p>
                        ) : (
                            <span />
                        )}

                        <p className="text-right leading-tight">
                            <span className="block text-lg font-bold text-green-700">{price || 0}</span>
                            {priceNote && <span className="block text-xs text-gray-500">{priceNote}</span>}
                        </p>
                    </div>
                )}

                {bookButton}
            </div>
        </article>
    );
}