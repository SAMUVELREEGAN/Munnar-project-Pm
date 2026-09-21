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
        <section aria-labelledby="how-it-works-title" className="py-8">
            <div className="container">
                <div className="rounded-3xl bg-white p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-100">
                    <h2 id="how-it-works-title" className="sr-only">
                        How Our Booking Process Works
                    </h2>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {HOW_IT_WORKS_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

                            return (
                                <div key={index} className="relative flex flex-col items-start group">
                                    {/* Horizontal Dashed Connector Line for Desktop */}
                                    {!isLast && (
                                        <div
                                            aria-hidden="true"
                                            className="hidden lg:block absolute left-14 top-7 w-[calc(100%-3.5rem)] border-t-2 border-dashed border-gray-200 pointer-events-none z-0"
                                        />
                                    )}

                                    {/* Icon Badge with Brand Green */}
                                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600 ring-1 ring-green-100/80 shadow-sm transition-transform duration-200 group-hover:scale-105">
                                        <Icon className="text-xl text-green-600" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="mt-5 text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

