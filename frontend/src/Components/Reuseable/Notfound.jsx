import { useEffect } from "react";
import { Link } from "react-router-dom";

/* ---------- Easy-to-edit settings ---------- */
const SITE_NAME = "Munnar Taxi Service";

const HOME_LINK = "/";
const PACKAGES_LINK = "/our-tour-packages";
const CONTACT_LINK = "/contact-us";
/* ------------------------------------------- */

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

/* Hill outlines (reused for the tea-terrace contour lines) */
const BACK_HILL_TOP = "M0 165 C 100 100 220 88 330 128 S 520 68 640 108 S 760 98 800 118";
const MID_HILL_TOP = "M0 205 C 90 140 170 130 260 165 S 420 118 520 148 S 700 108 800 158";

function Arrow({ className = "" }) {
    return (
        <svg className={`text-green-600 ${className}`} width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
            <path
                d="M1 7h19M14 1l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function DeadEndScene() {
    return (
        <svg
            viewBox="0 0 800 300"
            className="block h-auto w-full bg-sky-100"
            role="img"
            aria-label="A yellow taxi stopped on a hill road in Munnar, next to a Dead end sign that reads 404"
        >
            <defs>
                <clipPath id="mt-mid-hill">
                    <path d={`${MID_HILL_TOP} V 260 H 0 Z`} />
                </clipPath>
            </defs>

            {/* Sun and mist */}
            <circle cx="650" cy="62" r="28" className="fill-yellow-200" />
            <g className="fill-white" opacity="0.85">
                <ellipse cx="140" cy="58" rx="52" ry="11" />
                <ellipse cx="184" cy="49" rx="34" ry="10" />
                <ellipse cx="430" cy="38" rx="46" ry="10" />
                <ellipse cx="466" cy="30" rx="26" ry="8" />
            </g>

            {/* Back hill */}
            <path d={`${BACK_HILL_TOP} V 260 H 0 Z`} className="fill-green-200" />

            {/* Mid hill with tea-terrace contour lines */}
            <path d={`${MID_HILL_TOP} V 260 H 0 Z`} className="fill-green-300" />
            <g clipPath="url(#mt-mid-hill)">
                {[14, 28, 42, 56, 70, 84].map((dy) => (
                    <path
                        key={dy}
                        d={MID_HILL_TOP}
                        transform={`translate(0 ${dy})`}
                        fill="none"
                        className="stroke-green-600"
                        strokeWidth="1.5"
                        opacity="0.45"
                    />
                ))}
            </g>

            {/* Front slope */}
            <path d="M0 232 C 150 206 300 210 420 222 S 700 210 800 222 V 300 H 0 Z" className="fill-green-600" />

            {/* Road */}
            <rect x="0" y="238" width="800" height="52" className="fill-gray-700" />
            <rect x="0" y="290" width="800" height="10" className="fill-green-700" />
            <line x1="0" y1="242" x2="800" y2="242" stroke="#fff" strokeWidth="1.5" opacity="0.55" />
            <line x1="0" y1="286" x2="800" y2="286" stroke="#fff" strokeWidth="1.5" opacity="0.55" />
            <line
                x1="0"
                y1="254"
                x2="800"
                y2="254"
                className="stroke-yellow-300"
                strokeWidth="2.5"
                strokeDasharray="20 16"
            />

            {/* Sign post */}
            <rect x="606" y="128" width="8" height="110" rx="2" className="fill-gray-600" />
            <rect x="546" y="94" width="128" height="60" rx="9" className="fill-white stroke-green-700" strokeWidth="3" />
            <text x="610" y="138" textAnchor="middle" fontSize="38" fontWeight="800" className="fill-green-700">
                404
            </text>
            <rect x="566" y="160" width="88" height="24" rx="5" className="fill-red-600" />
            <text x="610" y="177" textAnchor="middle" fontSize="13" fontWeight="700" className="fill-white">
                Dead end
            </text>

            {/* Taxi (drives in once on load, then stops at the sign) */}
            <g transform="translate(0 12)">
                <g className="mt-taxi">
                    {/* body */}
                    <rect x="360" y="224" width="130" height="28" rx="8" className="fill-yellow-400" />
                    <path d="M385 224 L398 200 H452 L470 224 Z" className="fill-yellow-400" />
                    {/* windows */}
                    <path d="M403 205 H425 V221 H392 Z" className="fill-sky-100" />
                    <path d="M430 205 H449 L461 221 H430 Z" className="fill-sky-100" />
                    {/* roof sign */}
                    <rect x="413" y="189" width="26" height="11" rx="3" className="fill-gray-900" />
                    <text x="426" y="198" textAnchor="middle" fontSize="7" fontWeight="800" className="fill-white">
                        TAXI
                    </text>
                    {/* body stripe and lights */}
                    <rect x="360" y="238" width="130" height="3" className="fill-gray-900" opacity="0.25" />
                    <rect x="484" y="230" width="6" height="8" rx="2" className="fill-yellow-100" />
                    <rect x="360" y="230" width="5" height="8" rx="2" className="fill-red-500" />
                    {/* wheels */}
                    <circle cx="384" cy="254" r="13" className="fill-gray-900" />
                    <circle cx="384" cy="254" r="5" className="fill-gray-300" />
                    <circle cx="468" cy="254" r="13" className="fill-gray-900" />
                    <circle cx="468" cy="254" r="5" className="fill-gray-300" />
                </g>
            </g>
        </svg>
    );
}

export default function NotFound() {
    // set a helpful browser tab title for this page
    useEffect(() => {
        const previous = document.title;
        document.title = `Page not found | ${SITE_NAME}`;
        return () => {
            document.title = previous;
        };
    }, []);

    return (
        <section className="bg-green-50 px-4 py-10 sm:py-16">
            {/* One-time animation: the taxi arrives and stops at the sign. Skipped if the visitor prefers reduced motion. */}
            <style>{`
                @keyframes mt-taxi-arrive {
                    from { transform: translateX(-560px); }
                    to { transform: translateX(0); }
                }
                @media (prefers-reduced-motion: no-preference) {
                    .mt-taxi { animation: mt-taxi-arrive 2.4s cubic-bezier(0.16, 0.7, 0.25, 1) both; }
                }
            `}</style>

            <div className="container mx-auto max-w-3xl">
                <div className="overflow-hidden rounded-3xl shadow-[0_6px_22px_rgba(0,0,0,0.14)]">
                    <DeadEndScene />
                </div>

                <div className="mx-auto mt-8 max-w-xl text-center sm:mt-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">We couldn&rsquo;t find that page</h1>

                    <p className="mt-3 text-base text-gray-600 sm:text-lg">
                        The link may be broken, or the page may have moved. Go back to the homepage, or look through our
                        Munnar tour packages.
                    </p>

                    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                        <Link
                            to={HOME_LINK}
                            className={`inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-green-600 p-1.5 pr-7 text-[15px] font-bold text-white transition-colors hover:bg-green-700 ${focusRing}`}
                        >
                            <span className="grid h-9 w-[52px] place-items-center rounded-full bg-white">
                                <Arrow className="rotate-180" />
                            </span>
                            Back to home
                        </Link>

                        <Link
                            to={PACKAGES_LINK}
                            className={`inline-flex items-center whitespace-nowrap rounded-full border-2 border-green-600 px-7 py-[10px] text-[15px] font-bold text-green-700 transition-colors hover:bg-white ${focusRing}`}
                        >
                            See tour packages
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-gray-600">
                        Still stuck?{" "}
                        <Link
                            to={CONTACT_LINK}
                            className={`rounded font-semibold text-green-700 underline underline-offset-2 hover:text-green-800 ${focusRing}`}
                        >
                            Contact us
                        </Link>{" "}
                        and we&rsquo;ll help you find your way.
                    </p>
                </div>
            </div>
        </section>
    );
}