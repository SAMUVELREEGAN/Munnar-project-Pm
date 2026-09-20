import { useState } from "react";
import { Link } from "react-router-dom";


export default function HeroSection({ HeroContent }) {

    console.log("dd", HeroContent)

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
            <div className="relative mx-auto flex min-h-[560px] max-w-[1200px] items-center px-4 pb-12 pt-10 sm:min-h-[640px] sm:px-6 lg:min-h-[720px]">
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

                    <Link
                        to={"/"}
                        className="mt-7 inline-flex items-center rounded-full bg-green-600 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-8"
                    >
                        {CTA_LABEL}
                    </Link>
                </div>
            </div>
        </section>
    );
}


