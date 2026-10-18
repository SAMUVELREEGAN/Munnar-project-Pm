import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

const FAQS = [
    {
        question: "How do I book a taxi in Munnar with Jothilaxmi Cabs?",
        answer: "Booking is simple and fast. You can call us directly at +91 90611 40533 or +91 94003 80433, or message us on WhatsApp. Share your travel dates, pickup location, and vehicle preference for instant confirmation."
    },
    {
        question: "Do you provide Cochin Airport to Munnar taxi transfers?",
        answer: "Yes, we provide 24/7 direct airport pickup and drop services between Cochin International Airport (COK) and Munnar. Our drivers track flight timings to ensure timely greeting at the arrival terminal."
    },
    {
        question: "Which vehicles are available for Munnar sightseeing tours?",
        answer: "We offer a diverse fleet including comfortable 4-seater sedans (Swift Dzire, Toyota Etios), 6 to 7-seater premium SUVs (Innova, Innova Crysta, Ertiga), and 12 to 26-seater Tempo Travellers for groups."
    },
    {
        question: "What attractions are covered in a full-day Munnar cab package?",
        answer: "Our standard full-day package covers popular attractions such as Mattupetty Dam, Echo Point, Kundala Lake, Eravikulam National Park, Tea Museum, and Attukad Waterfalls, fully customizable to your pace."
    },
    {
        question: "Are fuel and driver allowances included in the taxi fare?",
        answer: "Yes, our quotes include vehicle rental, fuel, and driver allowances. Tolls, parking fees, and interstate permits are billed transparently with no hidden fees."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? -1 : index));
    };

    return (
        <section aria-labelledby="faq-title" className="py-4 sm:py-8">
            <div className="container max-w-[960px]">
                <div className="text-center">
                    <h2 id="faq-title" className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <span aria-hidden="true" className="gold-rule mt-4 block" />
                    <p className="mt-3 text-sm sm:text-base text-gray-600">
                        Find quick answers about Munnar taxi bookings, airport pickups, sightseeing routes, and vehicle options.
                    </p>
                </div>

                <div className="mt-8 space-y-3 sm:space-y-4">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className="overflow-hidden rounded-2xl border border-cream-200 bg-[#fffdf8] shadow-soft transition-colors duration-300 hover:border-green-600/30"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggle(idx)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left transition-colors"
                                >
                                    <h3 className="font-display text-base sm:text-lg font-semibold text-gray-900">
                                        {faq.question}
                                    </h3>
                                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream-100 text-green-700 transition-transform duration-300">
                                        <FaChevronDown
                                            size={12}
                                            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <div className="border-t border-cream-200/60 px-4 pb-5 pt-3 sm:px-5 sm:pb-6 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
export { FAQS };
