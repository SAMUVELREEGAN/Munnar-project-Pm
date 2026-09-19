import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

/* ---------- Easy-to-edit settings ---------- */
const SITE_NAME = "Munnar Taxi Service";
const SITE_TAGLINE = "Local Taxi & Sightseeing Tours in Munnar, Kerala";

/* Put your logo in /public (public/logo.png), or import it and pass logoSrc */
const DEFAULT_LOGO = "/logo.png";

const NAV_LINKS = [
    { label: "Home", to: "/", end: true },
    { label: "Tour Packages", to: "/packages" },
    { label: "Vehicles", to: "/vehicles" },
    { label: "About Us", to: "/about" },
    { label: "Contact us", to: "/contact-us" },
];
/* ------------------------------------------- */

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

function Arrow() {
    return (
        <svg className="text-green-600" width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
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

/* Shown only if the logo image fails to load */
function FallbackMark() {
    return (
        <svg className="h-[38px] w-[38px] shrink-0 sm:h-[46px] sm:w-[46px]" viewBox="0 0 48 48" aria-hidden="true">
            <rect x="2" y="2" width="44" height="44" rx="12" className="fill-green-600" />
            <path d="M8 34 19 18l7 10 5-6 9 12z" fill="#fff" />
            <circle cx="34" cy="14" r="4" fill="#fff" opacity="0.85" />
        </svg>
    );
}

export default function Navbar({ logoSrc = DEFAULT_LOGO }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoFailed, setLogoFailed] = useState(false);
    const barRef = useRef(null);
    const location = useLocation();

    // close the mobile menu when the route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // close on outside click / Escape
    useEffect(() => {
        const onClick = (e) => {
            if (barRef.current && !barRef.current.contains(e.target)) setMenuOpen(false);
        };
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <header className="relative z-50 px-2 py-2 sm:px-2.5 sm:py-3">
            <div
                ref={barRef}
                className="relative mx-auto flex min-h-[62px] max-w-[1400px] items-center justify-between gap-2 rounded-full bg-white py-1.5 pl-3 pr-2 shadow-[0_6px_22px_rgba(0,0,0,0.14)] sm:min-h-[70px] sm:gap-5 sm:pl-[18px] sm:pr-3"
            >
                {/* Logo */}
                <Link
                    to="/"
                    aria-label={`${SITE_NAME} home`}
                    className={`flex min-w-0 items-center gap-2.5 rounded-lg ${focusRing}`}
                >
                    {logoFailed ? (
                        <FallbackMark />
                    ) : (
                        <img
                            src={logoSrc}
                            alt=""
                            width="46"
                            height="46"
                            onError={() => setLogoFailed(true)}
                            className="h-[38px] w-[38px] shrink-0 object-contain sm:h-[46px] sm:w-[46px]"
                        />
                    )}
                    <span className="flex min-w-0 flex-col leading-tight">
                        <span className="whitespace-nowrap text-base font-extrabold text-green-600 min-[400px]:text-[17px] sm:text-[22px]">
                            {SITE_NAME}
                        </span>
                        <span className="mt-[3px] hidden whitespace-nowrap text-[9.5px] font-bold text-gray-900 md:block lg:hidden xl:block">
                            {SITE_TAGLINE}
                        </span>
                    </span>
                </Link>

                {/* Links – dropdown panel on mobile/tablet, inline on desktop */}
                <nav
                    id="site-nav"
                    aria-label="Main"
                    className={`${menuOpen ? "block" : "hidden"} absolute inset-x-0 top-full mt-2 rounded-3xl bg-white px-5 py-2 shadow-xl lg:static lg:mt-0 lg:block lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none`}
                >
                    <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-5 xl:gap-7">
                        {NAV_LINKS.map((link) => (
                            <li key={link.to} className="border-b border-gray-100 last:border-b-0 lg:border-0">
                                <NavLink
                                    to={link.to}
                                    end={link.end}
                                    className={({ isActive }) =>
                                        `block whitespace-nowrap rounded py-[15px] text-base font-semibold transition-colors hover:text-green-600 lg:inline-block lg:py-1.5 lg:text-[15px] xl:text-base ${focusRing} ${isActive ? "text-green-600" : "text-gray-800"
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right side */}
                <div className="flex shrink-0 items-center gap-2.5">
                    <Link
                        to="/book"
                        aria-label="Book Now"
                        className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-green-600 p-[5px] pr-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700 max-[400px]:pr-[5px] sm:gap-4 sm:p-1.5 sm:pr-7 sm:text-[15px] ${focusRing}`}
                    >
                        <span className="grid h-8 w-[38px] place-items-center rounded-full bg-white sm:h-9 sm:w-[52px]">
                            <Arrow />
                        </span>
                        <span className="max-[400px]:hidden">Book Now</span>
                    </Link>

                    <button
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="site-nav"
                        onClick={() => setMenuOpen((v) => !v)}
                        className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full bg-green-50 sm:h-11 sm:w-11 lg:hidden ${focusRing}`}
                    >
                        <span
                            className={`h-0.5 w-[18px] rounded bg-green-600 transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
                        />
                        <span className={`h-0.5 w-[18px] rounded bg-green-600 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                        <span
                            className={`h-0.5 w-[18px] rounded bg-green-600 transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}