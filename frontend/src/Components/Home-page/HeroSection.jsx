import { useState } from "react";
import { Link } from "react-router-dom";


function Arrow() {
    return (
        <svg className="text-green-600" width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
            <path
                d="M1 7h19M14 1l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}


export default function HeroSection({ HeroContent }) {

    const { title, desc, bgImage } = HeroContent

    const CTA_LABEL = "book"

    return (
        <section
            aria-labelledby="hero-title"
            className="relative -mt-[78px] overflow-hidden  pt-[78px] sm:-mt-[94px] sm:pt-[94px]"
        >
            <img
                src={bgImage}
                alt=""
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30" />

            {/* Content */}
            <div className="relative container flex min-h-[560px] items-center px-4 pb-12 pt-10 sm:min-h-[640px] sm:px-6 lg:min-h-[720px]">
                <div className="w-full rounded-[28px] bg-black/60 p-6 backdrop-blur-[2px] sm:p-10 md:ml-auto md:max-w-[640px] lg:max-w-[720px] lg:p-12">
                    <h1
                        id="hero-title"
                        className="text-[32px] font-extrabold uppercase leading-[1.1] sm:text-5xl lg:text-[56px]"
                    >
                        <span className="block text-green-500">{title}</span>

                    </h1>

                    <p className="mt-5 max-w-[520px] text-sm leading-relaxed text-white/95 sm:mt-6 sm:text-base">
                        {desc}
                    </p>

                    <div className="py-3 lg:py-0 mt-5">
                        <Link
                            to="/book"
                            aria-label="Book Now"
                            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-green-600 p-[5px] pr-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700 max-[400px]:pr-[5px] sm:gap-4 sm:p-1.5 sm:pr-7 sm:text-[15px]`}
                        >
                            <span className="grid h-8 w-[38px] place-items-center rounded-full bg-white sm:h-9 sm:w-[52px]">
                                <Arrow />
                            </span>
                            <span className="max-[400px]:hidden">Book Now</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}


