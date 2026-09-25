import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import HomeSection from "../../local/HomePage.json";

export default function Subscribe() {
    const heading = HomeSection?.excellencySection?.title || "Book Your Munnar Taxi Today";
    const text = HomeSection?.excellencySection?.description || "Plan your perfect hill station trip with our reliable taxi services.";
    const buttonText = HomeSection?.excellencySection?.form?.buttonText || "Book Now";

    return (
        <section
            aria-labelledby="subscribe-title"
            className="px-4 py-8 sm:px-6 sm:py-16"
        >
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-[1200px] rounded-[28px] sm:rounded-[36px] bg-[#fffdf8] px-4 py-10 text-center sm:px-10 sm:py-16 border border-cream-200 shadow-soft"
            >
                <h2 id="subscribe-title" className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold text-gray-900">
                    {heading}
                </h2>
                <span aria-hidden="true" className="gold-rule mt-5 block" />
                {text && (
                    <p className="mx-auto mt-3 max-w-[760px] text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600">
                        {text}
                    </p>
                )}

                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-8 sm:mt-10 inline-flex"
                >
                    <Link
                        to="/contact-us"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-7 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-green-700 hover:shadow-glow shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        {buttonText}
                        <FaArrowRight size={15} />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
