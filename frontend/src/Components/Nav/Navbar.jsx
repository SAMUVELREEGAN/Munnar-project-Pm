import { Link, NavLink } from "react-router-dom";
import { FaArrowRight, FaHouse, FaSuitcase, FaUsers, FaPhone, FaMountainSun } from "react-icons/fa6";

/* ---------- Easy-to-edit settings ---------- */
const SITE_NAME = "Munnar Taxi Service";

const DEFAULT_LOGO = "/images/munnar_logo.webp";

const NAV_LINKS = [
    { label: "Home", to: "/", end: true, icon: FaHouse },
    { label: "About", shortLabel: "About", to: "/about", icon: FaUsers },
    { label: "Tour Packages", shortLabel: "Packages", to: "/our-tour-packages", icon: FaSuitcase },
    { label: "Places to Visit", shortLabel: "Places", to: "/places-to-visit", icon: FaMountainSun },
    { label: "Contact Us", shortLabel: "Contact", to: "/contact-us", icon: FaPhone },
];
/* ------------------------------------------- */

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const bookNowClass = `inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-green-600 p-1.5 pr-3.5 text-sm font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-green-700 hover:shadow-glow sm:gap-3 sm:p-2 sm:pr-7 sm:text-base ${focusRing}`;

export default function Navbar() {
    return (
        <>
            {/* ---------- Top bar: solid navbar (logo + Book Now; desktop links) ---------- */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#fffdf8] border-b border-cream-200 shadow-soft pt-[env(safe-area-inset-top)]">
                <div className="container flex min-h-[60px] sm:min-h-[72px] items-center justify-between gap-3 py-2 sm:py-2.5">
                    <Link
                        to="/"
                        aria-label={`${SITE_NAME} home`}
                        className={`flex shrink-0 items-center rounded-lg ${focusRing}`}
                    >
                        <img
                            src={DEFAULT_LOGO}
                            alt={SITE_NAME}
                            className="h-10 sm:h-[56px] w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop links */}
                    <nav
                        aria-label="Main"
                        className="ml-auto hidden lg:block"
                    >
                        <ul className="flex items-center gap-4 xl:gap-7">
                            {NAV_LINKS.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        end={link.end}
                                        className={({ isActive }) =>
                                            `relative inline-block whitespace-nowrap rounded py-1.5 text-[14px] xl:text-[15px] font-medium tracking-wide transition-colors duration-300 hover:text-green-700 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-gold-500 after:transition-all after:duration-300 ${focusRing} ${
                                                isActive
                                                    ? "text-green-700 after:w-full"
                                                    : "text-gray-700 after:w-0"
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <Link
                        to="/contact-us"
                        aria-label="Book Now"
                        className={`${bookNowClass} shrink-0`}
                    >
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-cream-50 sm:h-10 sm:w-[48px]">
                            <FaArrowRight size={14} className="text-green-700 sm:text-[16px]" />
                        </span>
                        <span className="pr-1 sm:pr-0">Book Now</span>
                    </Link>
                </div>
            </header>

            {/* ---------- Mobile / tablet bottom navigation ---------- */}
            <nav
                aria-label="Mobile"
                className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#fffdf8] border-t border-cream-200 shadow-[0_-8px_24px_rgba(28,25,20,0.06)] pb-[env(safe-area-inset-bottom)]"
            >
                <ul className="mx-auto grid max-w-lg grid-cols-5 gap-0.5 px-1.5 py-1.5">
                    {NAV_LINKS.map((link) => {
                        const Icon = link.icon;
                        return (
                            <li key={link.to} className="min-w-0">
                                <NavLink
                                    to={link.to}
                                    end={link.end}
                                    className={({ isActive }) =>
                                        `flex flex-col items-center justify-center gap-1 rounded-2xl px-0.5 py-2 text-center transition-all duration-300 ${focusRing} ${
                                            isActive
                                                ? "bg-green-600 text-cream-50 shadow-soft"
                                                : "text-gray-600 hover:bg-cream-100 hover:text-green-700"
                                        }`
                                    }
                                >
                                    <Icon size={16} aria-hidden="true" />
                                    <span className="max-w-full truncate text-[9px] font-semibold tracking-wide leading-none sm:text-[10px]">
                                        {link.shortLabel || link.label}
                                    </span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
