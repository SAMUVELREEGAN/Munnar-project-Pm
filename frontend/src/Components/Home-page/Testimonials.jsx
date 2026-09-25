import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { FaStar, FaUser, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import defaultData from "../../local/Testimonials.json";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

function AvatarImage({ src, alt }) {
    const [failed, setFailed] = useState(false);

    if (failed || !src) {
        return (
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green-100 text-green-700 font-bold text-sm ring-2 ring-green-200/60">
                <FaUser size={18} />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-green-600/20"
        />
    );
}

export default function Testimonials({ data }) {
    const [swiper, setSwiper] = useState(null);

    const testimonialData = data ?? defaultData;
    const { title, subtitle, testimonials = [] } = testimonialData;

    const navBtn = `grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-green-600 text-green-600 transition-all hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-green-600 shadow-sm ${focusRing}`;

    return (
        <section aria-labelledby="testimonials-title" className="overflow-hidden">
            <div className="container">
                {/* Header with Navigation Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
                >
                    <div>
                        <h2
                            id="testimonials-title"
                            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight"
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

                <hr className="mt-6 border-gray-200" />

                {/* Swiper Auto-scroll Carousel */}
                <div className="mt-6 sm:mt-8 w-full overflow-hidden">
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
                        className="w-full !py-2 sm:!py-3"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id || item.name} className="!h-auto">
                                <article className="flex h-full flex-col justify-between rounded-3xl border border-green-200/70 bg-white p-5 sm:p-7 md:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-green-600/40">
                                    <div>
                                        {/* 5 Stars with Brand Green Accent */}
                                        <div className="flex items-center gap-1 text-green-600">
                                            {[...Array(item.rating || 5)].map((_, i) => (
                                                <FaStar key={i} size={15} />
                                            ))}
                                        </div>

                                        {/* Comment */}
                                        <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-gray-700 line-clamp-4 min-h-[3.8rem] sm:min-h-[4.5rem]">
                                            "{item.comment}"
                                        </p>
                                    </div>

                                    <div>
                                        {/* Divider */}
                                        <hr className="my-4 sm:my-5 border-gray-100" />

                                        {/* Author Profile */}
                                        <div className="flex items-center gap-3">
                                            <AvatarImage src={item.image} alt={item.name} />
                                            <div className="min-w-0">
                                                <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 leading-tight truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-green-700 font-medium truncate">
                                                    ( {item.role} )
                                                </p>
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
