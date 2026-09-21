import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa6";

/* ---------- Easy-to-edit content ---------- */
const BRAND = "Munnar Jothi Laxmi Taxi";

const logoSrc = "/images/munnar_logo.webp";

const ABOUT_TEXT =
    "Reliable Munnar taxi and tour services with experienced local drivers, clean well-maintained vehicles and fair rates. From airport transfers to full-day sightseeing, we make every trip across Kerala safe, comfortable and stress-free.";

/* Change the `to` values to match your routes */
const COMPANY_LINKS = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Tour Packages", to: "/our-tour-packages" },
    { label: "Contact Us", to: "/contact-us" },
];

const SERVICE_LINKS = [
    { label: "Munnar Sightseeing Taxi", to: "/packages" },
    { label: "Cochin Airport Taxi", to: "/packages" },
    { label: "Munnar to Alleppey Trips", to: "/packages" },
    { label: "Kerala Tour Packages", to: "/packages" },
    { label: "Innova Crysta Rental", to: "/packages" },
    { label: "Tempo Traveller Rental", to: "/packages" },
    { label: "Honeymoon Packages", to: "/packages" },
    { label: "Outstation Taxi", to: "/packages" },
];

/* Replace each href with your real profile / chat link */
const SOCIALS = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/your-page",
        icon: <FaFacebookF size={20} />,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/your-account",
        icon: <FaInstagram size={20} />,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@your-channel",
        icon: <FaYoutube size={20} />,
    },
    {
        label: "WhatsApp",
        href: "https://wa.me/919876543210",
        icon: <FaWhatsapp size={20} />,
    },
];
/* ------------------------------------------ */

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const linkClass = `rounded text-sm sm:text-[15px] font-medium text-gray-600 transition-colors hover:text-green-700 ${focusRing}`;

function ColumnTitle({ children }) {
    return (
        <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">{children}</h3>
            <span aria-hidden="true" className="mt-3 block h-[3px] w-10 overflow-hidden rounded-full bg-gray-200">
                <span className="block h-full w-1/2 rounded-full bg-green-600" />
            </span>
        </div>
    );
}

/* Outlined square with a solid corner block – purely decorative */
function CornerShape({ className = "" }) {
    return (
        <div aria-hidden="true" className={`pointer-events-none absolute hidden h-20 w-20 rounded-2xl border border-white/40 sm:block ${className}`}>
            <span className="absolute left-3 top-3 h-9 w-9 rounded-lg bg-white" />
        </div>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-green-700 px-4 py-12 sm:px-6 sm:py-16 mt-20">
            {/* Decorative shapes */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-9 left-1/2 hidden h-16 w-16 -translate-x-1/2 rotate-45 rounded-xl border border-white/40 sm:block"
            />
            <CornerShape className="-right-3 top-4" />
            <CornerShape className="-left-3 bottom-4" />

            <div className="relative container rounded-[2rem] bg-white p-7 shadow-xl sm:p-12">
                <div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_1.9fr] lg:gap-12">
                    {/* About */}
                    <div>
                        <Link to="/" aria-label={`${BRAND} – home`} className={`inline-block rounded ${focusRing}`}>
                            <img src={logoSrc} alt={BRAND} className="h-14 w-auto" />
                        </Link>
                        <p className="mt-6 max-w-sm text-sm sm:text-[15px] leading-relaxed text-gray-600">{ABOUT_TEXT}</p>
                    </div>

                    {/* Company */}
                    <nav aria-label="Company">
                        <ColumnTitle>Company</ColumnTitle>
                        <ul className="mt-5 space-y-3">
                            {COMPANY_LINKS.map((l) => (
                                <li key={l.label}>
                                    <Link to={l.to} className={linkClass}>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Services */}
                    <nav aria-label="Services">
                        <ColumnTitle>Services</ColumnTitle>
                        <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                            {SERVICE_LINKS.map((l) => (
                                <li key={l.label}>
                                    <Link to={l.to} className={linkClass}>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <hr className="mt-10 border-gray-200 sm:mt-12" />

                {/* Bottom bar */}
                <div className="mt-6 flex flex-col items-center justify-between gap-5 sm:flex-row">
                    <p className="text-center text-sm text-gray-600 sm:text-left">
                        Copyright © {year} <strong className="font-bold text-gray-900">{BRAND}</strong>. All Rights Reserved
                    </p>

                    <ul className="flex items-center gap-2">
                        {SOCIALS.map((s) => (
                            <li key={s.label}>
                                <a
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${s.label} (opens in a new tab)`}
                                    title={s.label}
                                    className={`grid h-10 w-10 place-items-center rounded-full text-green-700 transition-colors hover:bg-green-700 hover:text-white ${focusRing}`}
                                >
                                    {s.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}