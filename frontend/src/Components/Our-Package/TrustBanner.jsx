import { motion } from "framer-motion";
import { FaComments, FaClipboardList, FaFileInvoiceDollar, FaCar } from "react-icons/fa6";

const HOW_IT_WORKS_STEPS = [
    {
        icon: FaComments,
        title: "Start The Conversation",
        desc: "Tap The WhatsApp Button Below Or Give Us A Quick Call.",
    },
    {
        icon: FaClipboardList,
        title: "Share 4 Simple Details",
        desc: "Share Date, Pickup Location, Destination, And People & Luggage.",
    },
    {
        icon: FaFileInvoiceDollar,
        title: "Get Your Fixed Price",
        desc: "We Check Availability And Reply Instantly With Your All-In Rate.",
    },
    {
        icon: FaCar,
        title: "Confirm & Travel",
        desc: "We Assign Your Driver. You Pay By Cash Or Bank Transfer On The Travel Day.",
    },
];

export default function TrustBanner() {
    return (
        <section aria-labelledby="how-it-works-title" className="py-4 sm:py-8">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[28px] bg-[#fffdf8] p-5 sm:p-8 lg:p-12 shadow-soft border border-cream-200"
                >
                    <h2 id="how-it-works-title" className="sr-only">
                        How Our Booking Process Works
                    </h2>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {HOW_IT_WORKS_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{
                                        duration: 0.32,
                                        delay: index * 0.04,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="relative flex flex-col items-start group"
                                >
                                    {/* Horizontal Dashed Connector Line for Desktop */}
                                    {!isLast && (
                                        <div
                                            aria-hidden="true"
                                            className="hidden lg:block absolute left-14 top-7 w-[calc(100%-3.5rem)] border-t-2 border-dashed border-cream-300 pointer-events-none z-0"
                                        />
                                    )}

                                    {/* Icon Badge with Brand Green */}
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 4 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-700 ring-1 ring-green-100/80 shadow-soft cursor-pointer"
                                    >
                                        <Icon className="text-xl text-green-600" />
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="mt-5 font-display text-lg sm:text-xl font-semibold text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-green-700">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

