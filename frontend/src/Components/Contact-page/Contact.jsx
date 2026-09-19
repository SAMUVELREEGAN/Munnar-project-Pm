import { useState } from "react";

/* ---------- Easy-to-edit content (contact details are placeholders) ---------- */
const INFO_TITLE = "Contact Information";
const INFO_TEXT =
    "Have a question or need help planning your Munnar trip? Our team is here to help with reliable support and clear answers. Reach out and we will respond as quickly as possible.";

const iconProps = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

const CONTACTS = [
    {
        label: "Phone Number",
        value: "+91 98765 43210",
        href: "tel:+919876543210",
        icon: (
            <svg {...iconProps}>
                <rect x="7" y="2" width="10" height="20" rx="2" />
                <path d="M11 18h2" />
            </svg>
        ),
    },
    {
        label: "Email Address",
        value: "info@munnartaxiservice.com",
        href: "mailto:info@munnartaxiservice.com",
        icon: (
            <svg {...iconProps}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
            </svg>
        ),
    },
    {
        label: "Opening Hours",
        value: "Every day: 6:00 AM – 10:00 PM",
        icon: (
            <svg {...iconProps}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </svg>
        ),
    },
    {
        label: "Our Location",
        value: "Main Road, Munnar, Idukki, Kerala 685612",
        icon: (
            <svg {...iconProps}>
                <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
            </svg>
        ),
    },
];

const FORM_BADGE = "Get In Touch";
const FORM_TITLE = "Get In Touch";
const FORM_TEXT =
    "Tell us about your trip and we will get back to you soon with the best possible options, whether it is a quick transfer or a multi-day tour.";

const SERVICES = [
    "Local Sightseeing",
    "Airport & Railway Transfer",
    "Tempo Traveller / Group Travel",
    "Jeep Safari",
    "Honeymoon & Family Package",
    "Outstation Trip",
    "Other",
];
/* ------------------------------------------------------------------------------ */

const emptyForm = { name: "", email: "", phone: "", service: "", message: "" };

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const field =
    "w-full rounded-md border border-green-200 bg-green-50 px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600";

function Label({ htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="sr-only">
            {children}
        </label>
    );
}

/*
  onSubmit(formData) should return a Promise – connect it to your API, e.g.
  <Contact onSubmit={(data) => fetch("/api/contact", { method: "POST", ... })} />
  Throw inside it to show the error message.
*/
export default function Contact({ onSubmit = async () => { } }) {
    const [form, setForm] = useState(emptyForm);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const update = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
        if (status !== "loading") setStatus("idle");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");
        try {
            await onSubmit({ ...form });
            setStatus("success");
            setForm(emptyForm);
        } catch {
            setStatus("error");
        }
    };

    return (
        <>

            <section
                aria-label="Contact details and enquiry form"
                className="bg-[#f7f9f6] py-12 font-['Nunito_Sans',system-ui,sans-serif] sm:py-16"
            >
                <div className="mx-auto grid max-w-[1200px] items-start gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)]">
                    {/* Contact information */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="text-xl font-bold text-gray-900">{INFO_TITLE}</h2>
                        <p className="mt-3 text-[13px] leading-relaxed text-gray-600">{INFO_TEXT}</p>

                        <ul className="mt-6">
                            {CONTACTS.map((item) => (
                                <li
                                    key={item.label}
                                    className="flex items-start gap-4 border-b border-gray-200 py-5 first:pt-2 last:border-b-0 last:pb-0"
                                >
                                    <span className="mt-0.5 shrink-0 text-green-600">{item.icon}</span>
                                    <div className="min-w-0">
                                        <p className="text-base font-semibold text-gray-900">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className={`mt-1 block break-words rounded text-[13px] text-gray-600 hover:text-green-700 ${focusRing}`}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="mt-1 break-words text-[13px] text-gray-600">{item.value}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Form */}
                    <div className="rounded-3xl bg-[#eef4ec] p-6 shadow-sm sm:p-10">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                            <svg width="14" height="14" viewBox="0 0 14 14" className="text-green-600" aria-hidden="true">
                                <path d="M7 1v12M1.8 4l10.4 6M1.8 10l10.4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                            {FORM_BADGE}
                        </span>

                        <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">{FORM_TITLE}</h2>
                        <p className="mt-4 max-w-[560px] text-[13px] leading-relaxed text-gray-600">{FORM_TEXT}</p>

                        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="contact-name">Name</Label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={update}
                                    className={field}
                                />
                            </div>

                            <div>
                                <Label htmlFor="contact-email">Email address</Label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={update}
                                    className={field}
                                />
                            </div>

                            <div>
                                <Label htmlFor="contact-phone">Phone number</Label>
                                <input
                                    id="contact-phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="Phone Number"
                                    value={form.phone}
                                    onChange={update}
                                    className={field}
                                />
                            </div>

                            <div>
                                <Label htmlFor="contact-service">Service you're interested in</Label>
                                <select
                                    id="contact-service"
                                    name="service"
                                    value={form.service}
                                    onChange={update}
                                    className={`${field} ${form.service ? "text-gray-900" : "text-gray-500"}`}
                                >
                                    <option value="">Service You're Interested In</option>
                                    {SERVICES.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <Label htmlFor="contact-message">Message</Label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={5}
                                    required
                                    placeholder="Message"
                                    value={form.message}
                                    onChange={update}
                                    className={`${field} resize-y`}
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className={`inline-flex items-center gap-3 rounded-full bg-green-600 py-2 pl-6 pr-2 text-sm font-bold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`}
                                >
                                    {status === "loading" ? "Sending…" : "Send Message"}
                                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-green-600">
                                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                                            <path d="M2.5 9.5 9.5 2.5M3.5 2.5h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </button>

                                <p role="status" aria-live="polite" className="text-sm">
                                    {status === "success" && (
                                        <span className="font-semibold text-green-700">Thanks! We'll get back to you soon.</span>
                                    )}
                                    {status === "error" && (
                                        <span className="font-semibold text-red-600">Something went wrong. Please try again.</span>
                                    )}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}