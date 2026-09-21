import { FaShieldHalved, FaMoneyBillWave, FaArrowsRotate, FaHeadset } from "react-icons/fa6";

const TRUST_FEATURES = [
    {
        icon: FaShieldHalved,
        title: "100% Verified Drivers",
        desc: "Experienced native hill-drivers certified & fluent in Malayalam, Tamil, English and Hindi.",
    },
    {
        icon: FaMoneyBillWave,
        title: "Fixed & Fair Fares",
        desc: "Transparent price system; no hidden fuel surcharges, no unexpected tolls or parking fees.",
    },
    {
        icon: FaArrowsRotate,
        title: "Zero Cancellation Fee",
        desc: "Plans delayed or plans changed? Cancel or reschedule free of charge up to 24 hours prior.",
    },
    {
        icon: FaHeadset,
        title: "Dedicated Tour Dispatch",
        desc: "Live WhatsApp/call support and driver coordinates sent 3 hours before your scheduled pickup.",
    },
];

export default function TrustBanner() {
    return (
        <section className="py-6">
            <div className="container">
                <div className="rounded-3xl bg-[#0d2216] px-6 py-10 sm:px-10 lg:px-12 text-white shadow-xl">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {TRUST_FEATURES.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="flex flex-col items-start">
                                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shadow-inner">
                                        <Icon size={22} />
                                    </div>
                                    <h3 className="mt-4 text-base font-bold text-white tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-emerald-100/70">
                                        {item.desc}
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
