import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

/* ---------- Easy-to-edit settings ---------- */
const SITE_NAME = "Munnar Taxi Service";

const DEFAULT_LOGO = "/images/munnar_logo.webp";

const NAV_LINKS = [
    { label: "Home", to: "/", end: true },
    { label: "Tour Packages", to: "/our-tour-packages" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact-us" },
];
/* ------------------------------------------- */

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
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
        <header className="sticky top-0 z-50 px-2 py-2 sm:px-2.5 sm:py-3">
            <div
                ref={barRef}
                className="relative container flex min-h-[62px] items-center justify-between gap-2 rounded-full bg-white py-1.5 pl-3 pr-2 shadow-[0_6px_22px_rgba(0,0,0,0.14)] sm:min-h-[70px] sm:gap-5 sm:pl-[18px] sm:pr-3"
            >
                {/* Logo */}
                <Link
                    to="/"
                    aria-label={`${SITE_NAME} home`}
                    className={`flex items-center rounded-lg ${focusRing}`}
                >
                    <img
                        src={DEFAULT_LOGO}
                        alt={SITE_NAME}
                        className="h-11 sm:h-14 w-auto object-contain"
                    />
                </Link>

                {/* Links – dropdown panel on mobile/tablet, inline (pushed to the right) on desktop */}
                <nav
                    id="site-nav"
                    aria-label="Main"
                    className={`${menuOpen ? "block" : "hidden"} absolute inset-x-0 top-full mt-2 rounded-3xl bg-white px-5 py-2 shadow-xl lg:static lg:ml-auto lg:mt-0 lg:block lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none`}
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

                        {/* Book Now – wrapped in <li> (valid HTML) */}
                        <li className="py-3 lg:py-0">
                            <Link
                                to="/contact-us"
                                aria-label="Book Now"
                                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-green-600 p-[5px] pr-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700 max-[400px]:pr-[5px] sm:gap-4 sm:p-1.5 sm:pr-7 sm:text-base ${focusRing}`}
                            >
                                <span className="grid h-8 w-[38px] place-items-center rounded-full bg-white sm:h-9 sm:w-[52px]">
                                    <FaArrowRight size={16} className="text-green-600" />
                                </span>
                                <span className="max-[400px]:hidden">Book Now</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Hamburger – mobile/tablet only. Hidden on desktop so this empty box
                    no longer takes up space on the right side of the bar. */}
                <div className="flex shrink-0 items-center gap-2.5 lg:hidden">
                    <button
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="site-nav"
                        onClick={() => setMenuOpen((v) => !v)}
                        className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full bg-green-50 sm:h-11 sm:w-11 ${focusRing}`}
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