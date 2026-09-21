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

    const navBtn = `grid h-11 w-11 place-items-center rounded-full border border-green-600 text-green-600 transition-colors hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-green-600 ${focusRing}`;

    return (
        <section aria-labelledby="services-title" className="overflow-hidden">
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="grid gap-4 md:grid-cols-2 md:items-start md:gap-12"
                >
                    <h2 id="services-title" className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-600 md:pt-1">{desc}</p>
                </motion.div>

                <hr className="mt-8 border-gray-200 sm:mt-10" />

                {/* Prev / next */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="mb-5 mt-6 flex justify-end gap-2"
                >
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        aria-label="Previous services"
                        disabled={atStart}
                        onClick={() => swiper?.slidePrev()}
                        className={navBtn}
                    >
                        <FaChevronLeft size={20} />
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        aria-label="Next services"
                        disabled={atEnd}
                        onClick={() => swiper?.slideNext()}
                        className={navBtn}
                    >
                        <FaChevronRight size={20} />
                    </motion.button>
                </motion.div>

                {/* Carousel – clipped to the container */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="-mx-2 px-2"
                >
                    <Swiper
                        modules={[A11y, Keyboard]}
                        keyboard={{ enabled: true }}
                        grabCursor
                        slidesPerView={1}
                        spaceBetween={20}
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
                        className="w-full !py-3"
                    >
                        {SERVICES.map((item) => (
                            <SwiperSlide key={item.title} className="!h-auto">
                                <motion.article
                                    whileHover={{ y: -6 }}
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                    className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-xl hover:border-green-600/30 transition-shadow duration-300"
                                >
                                    <CardImage src={item.image} />
                                    <div className="flex flex-1 flex-col pt-3">
                                        <h3
                                            className="mt-2 min-h-[3rem] sm:min-h-[3.5rem] text-lg sm:text-xl font-bold text-gray-900 leading-snug line-clamp-2"
                                            title={item.title}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className="mt-2 min-h-[4.5rem] sm:min-h-[4.875rem] text-sm sm:text-base leading-relaxed text-gray-600 line-clamp-3"
                                        >
                                            {item.description}
                                        </p>
                                        <div className="mt-auto flex items-center justify-center pt-4">
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link
                                                    to={"/contact-us"}
                                                    aria-label={`Learn more about ${item.title}`}
                                                    className={`inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-2.5 text-sm sm:text-base font-bold text-green-700 transition-colors hover:bg-green-600 hover:text-white ${focusRing}`}
                                                >
                                                    <span>Learn more</span>
                                                    <FaArrowRight size={15} />
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