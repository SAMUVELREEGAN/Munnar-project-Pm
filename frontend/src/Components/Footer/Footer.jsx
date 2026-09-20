import { Link } from "react-router-dom";

/* ---------- Easy-to-edit content ---------- */
const BRAND = "Munnar Jothi Laxmi Taxi";

const ABOUT_TEXT =
    "Reliable Munnar taxi and tour services with experienced local drivers, clean well-maintained vehicles and fair rates. From airport transfers to full-day sightseeing, we make every trip across Kerala safe, comfortable and stress-free.";

/* Change the `to` values to match your routes */
const COMPANY_LINKS = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Tour Packages", to: "/packages" },
    { label: "Places to Visit", to: "/places" },
    { label: "Contact Us", to: "/contact" },
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
const iconProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

const SOCIALS = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/your-page",
        icon: (
            <svg {...iconProps}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/your-account",
        icon: (
            <svg {...iconProps}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <path d="M17.5 6.5h.01" />
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@your-channel",
        icon: (
            <svg {...iconProps}>
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <path d="M9.75 15.02 15.5 11.75 9.75 8.48z" />
            </svg>
        ),
    },
    {
        label: "WhatsApp",
        href: "https://wa.me/919876543210",
        icon: (
            <svg {...iconProps}>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        ),
    },
];
/* ------------------------------------------ */

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const linkClass = `rounded text-[13px] text-gray-600 transition-colors hover:text-green-700 ${focusRing}`;

/* Logo: pass logoSrc="/images/logo.png" to use your image, otherwise a wordmark is shown */
function Brand({ logoSrc }) {
    if (logoSrc) {
        return (
            <Link to="/" aria-label={`${BRAND} – home`} className={`inline-block rounded ${focusRing}`}>
                <img src={logoSrc} alt={BRAND} className="h-14 w-auto" />
            </Link>
        );
    }
    return (
        <Link to="/" aria-label={`${BRAND} – home`} className={`inline-flex items-center gap-3 rounded ${focusRing}`}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 16V11l2-5h10l2 5v5" />
                <path d="M3 16h18v3H3z" />
                <path d="M7 11h10" />
                <circle cx="7.5" cy="19" r="1.2" fill="#16a34a" />
                <circle cx="16.5" cy="19" r="1.2" fill="#16a34a" />
            </svg>
            <span className="leading-none">
                <span className="block text-[22px] font-medium tracking-[0.1em] text-gray-900">MUNNAR</span>
                <span className="mt-1.5 block text-[9px] font-medium tracking-[0.32em] text-gray-500">JOTHI LAXMI TAXI</span>
            </span>
        </Link>
    );
}

function ColumnTitle({ children }) {
    return (
        <div>
            <h3 className="text-[15px] font-semibold text-gray-900">{children}</h3>
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

export default function Footer({ logoSrc }) {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-green-700 px-4 py-12 font-['Nunito_Sans',system-ui,sans-serif] sm:px-6 sm:py-16">
            {/* Decorative shapes */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-9 left-1/2 hidden h-16 w-16 -translate-x-1/2 rotate-45 rounded-xl border border-white/40 sm:block"
            />
            <CornerShape className="-right-3 top-4" />
            <CornerShape className="-left-3 bottom-4" />

            <div className="relative mx-auto max-w-[1100px] rounded-[2rem] bg-white p-7 shadow-xl sm:p-12">
                <div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_1.9fr] lg:gap-12">
                    {/* About */}
                    <div>
                        <Brand logoSrc={logoSrc} />
                        <p className="mt-6 max-w-sm text-[13px] leading-[1.9] text-gray-600">{ABOUT_TEXT}</p>
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
                    <p className="text-center text-[13px] text-gray-600 sm:text-left">
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
                                    className={`grid h-9 w-9 place-items-center rounded-full text-green-700 transition-colors hover:bg-green-700 hover:text-white ${focusRing}`}
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