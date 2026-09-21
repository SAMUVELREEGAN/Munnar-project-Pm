import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";


export default function HeroSection({ HeroContent }) {

    const { title, desc, bgImage } = HeroContent

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

                    <p className="mt-5 max-w-[560px] text-base leading-relaxed text-white/95 sm:mt-6 sm:text-lg">
                        {desc}
                    </p>

                    <div className="py-3 lg:py-0 mt-6">
                        <Link
                            to="/contact-us"
                            aria-label="Book Now"
                            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-green-600 p-[5px] pr-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700 max-[400px]:pr-[5px] sm:gap-4 sm:p-1.5 sm:pr-7 sm:text-base`}
                        >
                            <span className="grid h-8 w-[38px] place-items-center rounded-full bg-white sm:h-9 sm:w-[52px]">
                                <FaArrowRight size={16} className="text-green-600" />
                            </span>
                            <span className="max-[400px]:hidden">Book Now</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}


