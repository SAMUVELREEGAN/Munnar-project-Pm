import { useState } from "react";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";

function resolveSrc(src) {
    if (!src) return "";
    if (/^(https?:|data:)/.test(src)) return src;
    const clean = src.replace(/^(\.{1,2}\/)+/, "").replace(/^public\//, "").replace(/^\/+/, "");
    return `/${clean}`;
}

export default function PlaceCard({
    title,
    image,
    category,
    location,
    description,
}) {
    const [failed, setFailed] = useState(false);
    const url = resolveSrc(image);

    return (
        <motion.article
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-cream-200 bg-[#fffdf8] p-4 shadow-soft hover:shadow-lift hover:border-green-700/20 transition-all duration-500"
        >
            {/* Image Container with Category Badge */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100">
                {failed || !url ? (
                    <div className="h-full w-full bg-gradient-to-br from-green-800 to-green-950" />
                ) : (
                    <img
                        src={url}
                        alt={title}
                        loading="lazy"
                        draggable="false"
                        onError={() => setFailed(true)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                {category && (
                    <span className="rounded-md bg-green-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm absolute left-3 top-3">
                        {category}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col pt-3.5">
                {location && (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                        <FaLocationDot size={12} className="shrink-0 text-emerald-600" />
                        <span className="truncate">{location}</span>
                    </p>
                )}

                <h3 className="mt-1.5 font-display text-lg font-semibold text-gray-900 leading-snug line-clamp-1" title={title}>
                    {title}
                </h3>

                {description && (
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-gray-600 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </motion.article>
    );
}