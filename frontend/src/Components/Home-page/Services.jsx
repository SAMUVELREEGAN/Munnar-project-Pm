import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import service from "../../local/OurPackage.json";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

/* Card photo with a green placeholder if the file is missing */
function CardImage({ src }) {
    const [failed, setFailed] = useState(false);
    const shape = "aspect-[4/3] w-full rounded-2xl overflow-hidden";

    if (failed || !src) {
        return <div className={`${shape} bg-gradient-to-br from-green-700 to-green-900`} aria-hidden="true" />;
    }
    return (
        <div className={shape}>
            <img
                src={src}
                alt=""
                loading="lazy"
                draggable="false"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
        </div>
    );
}

export default function Services({ OurTourPackages }) {
    const [swiper, setSwiper] = useState(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const { title, desc } = OurTourPackages;

    const SERVICES = service?.packages ?? [];

    const syncEdges = (s) => {
        setAtStart(s.isBeginning);
        setAtEnd(s.isEnd);
    };

    const navBtn = `grid h-11 w-11 place-items-center rounded-full border border-green-600 text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-cream-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-green-700 ${focusRing}`;

    return (
        <section aria-labelledby="services-title" className="overflow-hidden">
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="grid gap-3 sm:gap-4 md:grid-cols-2 md:items-start md:gap-12"
                >
                    <h2 id="services-title" className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold leading-tight text-gray-900">
                        {title}
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 md:pt-1">{desc}</p>
                </motion.div>

                <div className="mt-6 sm:mt-10 h-px w-full bg-gradient-to-r from-transparent via-cream-300 to-transparent" />

                {/* Prev / next */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="mb-4 mt-4 sm:mb-5 sm:mt-6 flex justify-end gap-2"
                >
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        aria-label="Previous services"
                        disabled={atStart}
                        onClick={() => swiper?.slidePrev()}
                        className={navBtn}
                    >
                        <FaChevronLeft size={18} />
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        aria-label="Next services"
                        disabled={atEnd}
                        onClick={() => swiper?.slideNext()}
                        className={navBtn}
                    >
                        <FaChevronRight size={18} />
                    </motion.button>
                </motion.div>

                {/* Carousel – clipped to the container */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full overflow-hidden"
                >
                    <Swiper
                        modules={[A11y, Keyboard]}
                        keyboard={{ enabled: true }}
                        grabCursor
                        slidesPerView={1}
                        spaceBetween={16}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        onSwiper={(s) => {
                            setSwiper(s);
                            syncEdges(s);
                        }}
                        onSlideChange={syncEdges}
                        onBreakpoint={syncEdges}
                        onResize={syncEdges}
                        className="w-full !py-2 sm:!py-3"
                    >
                        {SERVICES.map((item) => (
                            <SwiperSlide key={item.title} className="!h-auto">
                                <motion.article
                                    whileHover={{ y: -6 }}
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                    className="flex h-full flex-col rounded-[28px] border border-cream-200 bg-[#fffdf8] p-4 sm:p-5 shadow-soft hover:shadow-lift hover:border-green-700/20 transition-all duration-500"
                                >
                                    <CardImage src={item.image} />
                                    <div className="flex flex-1 flex-col pt-3">
                                        <h3
                                            className="mt-1 sm:mt-2 min-h-[2.5rem] sm:min-h-[3.5rem] font-display text-lg sm:text-xl lg:text-[22px] font-semibold text-gray-900 leading-snug line-clamp-2"
                                            title={item.title}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className="mt-2 min-h-[3.8rem] sm:min-h-[4.875rem] text-xs sm:text-sm lg:text-base leading-relaxed text-gray-600 line-clamp-3"
                                        >
                                            {item.description}
                                        </p>
                                        <div className="mt-auto flex items-center justify-center pt-4">
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                                                <Link
                                                    to={"/contact-us"}
                                                    aria-label={`Learn more about ${item.title}`}
                                                    className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-green-50 px-5 sm:px-6 py-2.5 text-xs sm:text-sm md:text-base font-semibold text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-cream-50 ${focusRing}`}
                                                >
                                                    <span>Learn more</span>
                                                    <FaArrowRight size={14} />
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
}