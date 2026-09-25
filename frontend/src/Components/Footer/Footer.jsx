import { Link } from "react-router-dom";

/* ---------- Easy-to-edit content (matched to live site) ---------- */
const BRAND = "Munnar Tourism";

const logoSrc = "/images/munnar_logo.webp";

const ABOUT_TEXT =
    "We provide the best taxi services and tour packages in Munnar. Enjoy safe, comfortable and affordable travel with us.";

const QUICK_LINKS = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Tour Packages", to: "/our-tour-packages" },
    { label: "Places to Visit", to: "/places-to-visit" },
    { label: "Contact Us", to: "/contact-us" },
];

const SERVICE_LINKS = [
    { label: "Airport Pickup", to: "/our-tour-packages" },
    { label: "Munnar Sightseeing", to: "/our-tour-packages" },
    { label: "Taxi Service", to: "/contact-us" },
    { label: "Custom Packages", to: "/our-tour-packages" },
];

const PHONES = [
    { label: "+91 90611 40533", href: "tel:+919061140533" },
    { label: "+91 94003 80433", href: "tel:+919400380433" },
];
/* ------------------------------------------ */

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const linkClass = `rounded text-sm sm:text-[15px] font-medium text-gray-600 transition-colors duration-300 hover:text-green-700 ${focusRing}`;

function ColumnTitle({ children }) {
    return (
        <div>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-gray-900">{children}</h3>
            <span aria-hidden="true" className="mt-3 block h-[2px] w-10 overflow-hidden rounded-full bg-cream-200">
                <span className="block h-full w-1/2 rounded-full bg-gold-500" />
            </span>
        </div>
    );
}

function CornerShape({ className = "" }) {
    return (
        <div aria-hidden="true" className={`pointer-events-none absolute hidden h-20 w-20 rounded-2xl border border-gold-400/25 sm:block ${className}`}>
            <span className="absolute left-3 top-3 h-9 w-9 rounded-lg bg-gold-400/20" />
        </div>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-green-900 px-3 py-12 sm:px-6 sm:py-20 mb-[calc(4.75rem+env(safe-area-inset-bottom))] lg:mb-0">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-9 left-1/2 hidden h-16 w-16 -translate-x-1/2 rotate-45 rounded-xl border border-gold-400/30 sm:block"
            />
            <CornerShape className="-right-3 top-4" />
            <CornerShape className="-left-3 bottom-4" />

            <div className="relative container rounded-3xl sm:rounded-[2rem] bg-[#fffdf8] p-6 sm:p-10 lg:p-14 shadow-lift">
                <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1fr] lg:gap-10">
                    {/* Brand */}
                    <div>
                        <Link to="/" aria-label={`${BRAND} – home`} className={`inline-block rounded ${focusRing}`}>
                            <img src={logoSrc} alt={BRAND} className="h-12 sm:h-14 w-auto" />
                        </Link>
                        <h3 className="mt-4 font-display text-xl font-semibold text-gray-900">{BRAND}</h3>
                        <p className="mt-3 max-w-sm text-xs sm:text-sm md:text-[15px] leading-relaxed text-gray-600">{ABOUT_TEXT}</p>
                    </div>

                    {/* Quick Links */}
                    <nav aria-label="Quick Links">
                        <ColumnTitle>Quick Links</ColumnTitle>
                        <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                            {QUICK_LINKS.map((l) => (
                                <li key={l.label}>
                                    <Link to={l.to} className={linkClass}>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Services */}
                    <nav aria-label="Our Services">
                        <ColumnTitle>Our Services</ColumnTitle>
                        <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                            {SERVICE_LINKS.map((l) => (
                                <li key={l.label}>
                                    <Link to={l.to} className={linkClass}>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div>
                        <ColumnTitle>Contact</ColumnTitle>
                        <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                            {PHONES.map((p) => (
                                <li key={p.href}>
                                    <a href={p.href} className={linkClass}>
                                        {p.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 sm:mt-10 lg:mt-12 h-px w-full bg-gradient-to-r from-transparent via-cream-300 to-transparent" />

                <div className="mt-5 sm:mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-center text-xs sm:text-sm text-gray-600 sm:text-left">
                        © {year} <strong className="font-semibold text-gray-900">{BRAND}</strong>. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
