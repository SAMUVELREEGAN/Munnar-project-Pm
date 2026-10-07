import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import defaultData from "../../local/Testimonials.json";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const GOOGLE_REVIEWS_LINK =
    "https://www.google.com/maps/search/?api=1&query=Munnar+Jothilaxmi+Tours+and+Travels";

function GoogleIcon({ size = 16, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`shrink-0 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
        </svg>
    );
}

const AVATAR_COLORS = [
    "bg-emerald-700 text-white",
    "bg-blue-700 text-white",
    "bg-amber-700 text-white",
    "bg-purple-700 text-white",
    "bg-rose-700 text-white",
    "bg-teal-700 text-white",
    "bg-indigo-700 text-white",
];

function AvatarImage({ src, alt, name }) {
    const [failed, setFailed] = useState(false);

    if (failed || !src) {
        const initial = (name || alt || "U").trim().charAt(0).toUpperCase();
        const colorIndex = (initial.charCodeAt(0) || 0) % AVATAR_COLORS.length;
        const colorClass = AVATAR_COLORS[colorIndex];

        return (
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${colorClass} font-bold text-base shadow-soft ring-2 ring-cream-200`}>
                {initial}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt || name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-green-600/20"
        />
    );
}

export default function Testimonials({ data }) {
    const [swiper, setSwiper] = useState(null);

    const testimonialData = data ?? defaultData;
    const {
        title = "What Our Customers Say",
        subtitle = "Real Google reviews from travelers who explored Munnar with Munnar Jothilaxmi Tours and Travels",
        testimonials = [],
    } = testimonialData;

    const navBtn = `grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-green-600 text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-cream-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-green-700 shadow-soft ${focusRing}`;

    return (
        <section aria-labelledby="testimonials-title" className="overflow-hidden">
            <div className="container">
                {/* Header with Navigation Buttons & Google Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-800 shadow-soft border border-cream-200 mb-2.5">
                            <GoogleIcon size={14} />
                            <span>5.0 ★ Google Verified Reviews</span>
                        </div>
                        <h2
                            id="testimonials-title"
                            className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold text-gray-900 tracking-tight"
                        >
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="mt-2 max-w-[650px] text-sm sm:text-base leading-relaxed text-gray-600">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Prev / Next controls */}
                    {testimonials.length > 3 && (
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                aria-label="Previous testimonials"
                                onClick={() => swiper?.slidePrev()}
                                className={navBtn}
                            >
                                <FaChevronLeft size={16} />
                            </button>
                            <button
                                type="button"
                                aria-label="Next testimonials"
                                onClick={() => swiper?.slideNext()}
                                className={navBtn}
                            >
                                <FaChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </motion.div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-cream-300 to-transparent" />

                {/* Swiper Auto-scroll Carousel */}
                <div className="mt-4 sm:mt-6 w-full">
                    <Swiper
                        modules={[Autoplay, A11y, Keyboard]}
                        keyboard={{ enabled: true }}
                        grabCursor
                        loop={testimonials.length > 3}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        slidesPerView={1}
                        spaceBetween={16}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        onSwiper={setSwiper}
                        className="w-full !pt-3 !pb-10 sm:!pt-4 sm:!pb-12 !px-1.5"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id || item.name} className="!h-auto">
                                <article className="flex h-full flex-col justify-between rounded-[28px] border border-cream-200 bg-[#fffdf8] p-5 sm:p-7 md:p-8 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift hover:border-green-700/20">
                                    <div>
                                        {/* 5 Stars with Google Badge */}
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1 text-gold-500">
                                                {[...Array(item.rating || 5)].map((_, i) => (
                                                    <FaStar key={i} size={15} />
                                                ))}
                                            </div>
                                            <a
                                                href={GOOGLE_REVIEWS_LINK}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="View on Google Maps"
                                                className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 hover:text-green-700 transition-colors"
                                            >
                                                <GoogleIcon size={13} />
                                                <span>Google Review</span>
                                            </a>
                                        </div>

                                        {/* Comment */}
                                        <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-gray-700 min-h-[3.8rem] sm:min-h-[4.5rem]">
                                            "{item.comment}"
                                        </p>
                                    </div>

                                    <div>
                                        {/* Divider */}
                                        <div className="my-4 sm:my-5 h-px w-full bg-cream-200" />

                                        {/* Author Profile */}
                                        <div className="flex items-center gap-3">
                                            <AvatarImage src={item.image} alt={item.name} name={item.name} />
                                            <div className="min-w-0">
                                                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 leading-tight truncate">
                                                    {item.name}
                                                </h3>
                                                {item.role && (
                                                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-green-700 font-medium truncate">
                                                        {item.role}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
