import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function HeroSection({ HeroContent }) {
    const { title, desc, bgImage } = HeroContent;

    return (
        <section
            aria-labelledby="hero-title"
            className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[85vh] xl:min-h-[92vh] flex items-center overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-16"
        >
            <img
                src={bgImage}
                alt=""
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/45" />

            {/* Content */}
            <div className="relative container w-full px-4 sm:px-6 my-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-[24px] sm:rounded-[28px] bg-black/60 p-5 sm:p-8 md:p-10 md:ml-auto md:max-w-[640px] lg:max-w-[720px] lg:p-12 shadow-2xl border border-white/10 backdrop-blur-[3px]"
                >
                    <motion.h1
                        id="hero-title"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[26px] min-[400px]:text-[32px] sm:text-5xl lg:text-[56px] font-extrabold uppercase leading-[1.2] sm:leading-[54px] lg:leading-[65px]"
                    >
                        <span className="block text-green-500">{title}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-5 max-w-[560px] text-base leading-relaxed text-white/95 sm:mt-6 sm:text-lg"
                    >
                        {desc}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="py-3 lg:py-0 mt-6"
                    >
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="inline-block"
                        >
                            <Link
                                to="/contact-us"
                                aria-label="Book Now"
                                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-green-600 p-[5px] pr-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700 max-[400px]:pr-[5px] sm:gap-4 sm:p-1.5 sm:pr-7 sm:text-base shadow-lg shadow-green-900/30"
                            >
                                <span className="grid h-8 w-[38px] place-items-center rounded-full bg-white sm:h-9 sm:w-[52px] transition-transform duration-300 group-hover:translate-x-1">
                                    <FaArrowRight size={16} className="text-green-600" />
                                </span>
                                <span className="max-[400px]:hidden">Book Now</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}


