import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import service from "../../local/OurPackage.json";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

/* Card photo with a green placeholder if the file is missing */
function CardImage({ src }) {
    const [failed, setFailed] = useState(false);
    const shape = "aspect-[4/3] w-full rounded-3xl";

    if (failed || !src) {
        return <div className={`${shape} bg-gradient-to-br from-green-700 to-green-900`} aria-hidden="true" />;
    }
    return (
        <img
            src={src}
            alt=""
            loading="lazy"
            draggable="false"
            onError={() => setFailed(true)}
            className={`${shape} object-cover`}
        />
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
                <div className="grid gap-4 md:grid-cols-2 md:items-start md:gap-12">
                    <h2 id="services-title" className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-600 md:pt-1">{desc}</p>
                </div>

                <hr className="mt-8 border-gray-200 sm:mt-10" />

                {/* Prev / next */}
                <div className="mb-5 mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        aria-label="Previous services"
                        disabled={atStart}
                        onClick={() => swiper?.slidePrev()}
                        className={navBtn}
                    >
                        <FaChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        aria-label="Next services"
                        disabled={atEnd}
                        onClick={() => swiper?.slideNext()}
                        className={navBtn}
                    >
                        <FaChevronRight size={20} />
                    </button>
                </div>

                {/* Carousel – clipped to the container; extra cards stay hidden until you slide */}
                <div className="-mx-1 px-1">
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
                        className="w-full"
                    >
                        {SERVICES.map((item) => (
                            <SwiperSlide key={item.title} className="!h-auto">
                                <article className="flex h-full flex-col">
                                    <CardImage src={item.image} />
                                    <h3 className="mt-4 text-lg sm:text-xl font-bold text-gray-900">{item.title}</h3>
                                    <p className="mt-2.5 flex-1 text-sm sm:text-base leading-relaxed text-gray-600">
                                        {item.description}
                                    </p>
                                    <Link
                                        to={"/contact-us"}
                                        aria-label={`Learn more about ${item.title}`}
                                        className={`mt-5 inline-flex items-center gap-2 self-start rounded-full bg-green-100 px-5 py-3 text-sm sm:text-base font-semibold text-green-700 transition-colors hover:bg-green-600 hover:text-white ${focusRing}`}
                                    >
                                        Learn more
                                        <FaArrowRight size={16} />
                                    </Link>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}