import { useId } from "react";


/* Faint dot pattern, visible only on the left and right edges */
const dotPattern = {
    backgroundImage: "radial-gradient(rgba(22, 163, 74, 0.22) 1.3px, transparent 1.6px)",
    backgroundSize: "11px 11px",
    WebkitMaskImage: "linear-gradient(to right, #000 0%, transparent 32%, transparent 68%, #000 100%)",
    maskImage: "linear-gradient(to right, #000 0%, transparent 32%, transparent 68%, #000 100%)",
};

export default function PageHero({ title, description, children, className = "" }) {
    const titleId = useId();

    return (
        <section
            aria-labelledby={titleId}
            className={`relative min-h-[50vh] overflow-hidden bg-[radial-gradient(ellipse_at_center,#f7fbf6_0%,#e6f2e5_100%)] pt-[78px] sm:-mt-[94px] sm:pt-[94px] ${className}`}
        >
            <div className="absolute inset-0" style={dotPattern} aria-hidden="true" />

            <div className="relative mx-auto max-w-[1350px] px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-[72px]">
                <h1 id={titleId} className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                    {title}
                </h1>

                {description && (
                    <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-gray-600 sm:text-lg">
                        {description}
                    </p>
                )}

                {children && <div className="mt-6">{children}</div>}
            </div>
        </section>
    );
}