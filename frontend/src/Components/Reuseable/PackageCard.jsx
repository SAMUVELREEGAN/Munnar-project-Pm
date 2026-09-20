import { useState } from "react";
import { Link } from "react-router-dom";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const formatPrice = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const formatCount = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);

/* "../../public/images/a.jpg" or "public/images/a.jpg" -> "/images/a.jpg" */
function resolveSrc(src) {
    if (!src) return "";
    if (/^(https?:|data:)/.test(src)) return src;
    const clean = src.replace(/^(\.{1,2}\/)+/, "").replace(/^public\//, "").replace(/^\/+/, "");
    return `/${clean}`;
}

/* ---------- Icons ---------- */
function Icon({ children, size = 14, fill = "none", className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={fill}
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

const PinIcon = () => (
    <Icon>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
    </Icon>
);
const ClockIcon = () => (
    <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </Icon>
);
const CarIcon = () => (
    <Icon>
        <path d="M5 16V11l2-5h10l2 5v5" />
        <path d="M3 16h18v3H3z" />
        <path d="M7 11h10" />
    </Icon>
);
const UsersIcon = () => (
    <Icon>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
);
const StarIcon = () => (
    <Icon size={15} fill="currentColor" className="text-amber-400">
        <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
    </Icon>
);
const HeartIcon = ({ filled }) => (
    <Icon size={16} fill={filled ? "currentColor" : "none"}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </Icon>
);
const ArrowRight = () => (
    <Icon size={14}>
        <path d="M4 12h15M13 6l6 6-6 6" />
    </Icon>
);


function CardImage({ src, title, variant }) {
    const [failed, setFailed] = useState(false);
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
        duration && { icon: <ClockIcon />, text: duration },
        vehicle && { icon: <CarIcon />, text: vehicle },
        type && { icon: <UsersIcon />, text: type },
    ].filter(Boolean);

    const hasRating = typeof rating === "number";

    console.log("price", price)

    const bookClass = `mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-800 ${focusRing}`;
    const bookContent = (
        <>
            Book Now
            <ArrowRight />
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
        <article className="flex h-full flex-col rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-gray-100 transition-shadow duration-200 hover:shadow-lg">
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
                    className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm transition-colors ${fav ? "text-rose-600" : "text-green-700 hover:text-rose-600"
                        } ${focusRing}`}
                >
                    <HeartIcon filled={fav} />
                </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col px-2 pb-2 pt-3.5">
                <Heading className="text-[15px] font-bold leading-snug text-gray-900">{title}</Heading>

                {location && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-green-800">
                        <PinIcon />
                        <span>{location}</span>
                    </p>
                )}

                {description && (
                    <p
                        className="mt-2 text-xs leading-relaxed text-gray-600"
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
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-medium text-gray-600">
                        {meta.map((m) => (
                            <li key={m.text} className="inline-flex items-center gap-1.5">
                                <span className="text-green-700">{m.icon}</span>
                                {m.text}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pushes rating, price and button to the bottom so cards line up */}
                <div className="mt-auto" />

                {(hasRating) && (
                    <div className="mt-3 flex items-end justify-between gap-2 border-t border-gray-100 pt-3">
                        {hasRating ? (
                            <p className="inline-flex items-center gap-1 text-xs text-gray-600">
                                <StarIcon />
                                <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
                                {typeof reviews === "number" && <span>({formatCount(reviews)} reviews)</span>}
                            </p>
                        ) : (
                            <span />
                        )}


                        <p className="text-right leading-tight">
                            <span className="block text-base font-bold text-green-700">{price || 0}</span>
                            {priceNote && <span className="block text-[10px] text-gray-500">{priceNote}</span>}
                        </p>

                    </div>
                )}

                {bookButton}
            </div>
        </article>
    );
}