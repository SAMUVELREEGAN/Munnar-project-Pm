import { useState } from "react";

/* ---------- Presentational icons (keyed by name from ContactPage.json) ---------- */
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

const CONTACT_ICONS = {
    phone: (
        <svg {...iconProps}>
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <path d="M11 18h2" />
        </svg>
    ),
    email: (
        <svg {...iconProps}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </svg>
    ),
    clock: (
        <svg {...iconProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </svg>
    ),
    location: (
        <svg {...iconProps}>
            <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    ),
};

const socialIconProps = {
    ...iconProps,
    width: 20,
    height: 20,
    strokeWidth: 1.8,
};

const SOCIAL_ICONS = {
    facebook: (
        <svg {...socialIconProps}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    ),
    instagram: (
        <svg {...socialIconProps}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <path d="M17.5 6.5h.01" />
        </svg>
    ),
    youtube: (
        <svg {...socialIconProps}>
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <path d="M9.75 15.02 15.5 11.75 9.75 8.48z" />
        </svg>
    ),
    whatsapp: (
        <svg {...socialIconProps}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    ),
};
/* ------------------------------------------------------------------------------ */

/* ---------- Validation rules (edit the limits / messages here) ---------- */
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 500;

const validators = {
    name: (value) => {
        const v = value.trim();
        if (!v) return "Please enter your name.";
        if (v.length < 2) return "Name must be at least 2 characters.";
        if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(v)) return "Use letters only (spaces, . ' and - are allowed).";
        return "";
    },
    email: (value) => {
        const v = value.trim();
        if (!v) return "Please enter your email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email, e.g. name@example.com.";
        return "";
    },
    // optional – only checked when something is typed
    phone: (value) => {
        const v = value.trim();
        if (!v) return "";
        const digits = v.replace(/\D/g, "");
        if (digits.length < 10 || digits.length > 13) return "Enter a valid phone number (10 to 13 digits).";
        return "";
    },
    // optional
    service: () => "",
    message: (value) => {
        const v = value.trim();
        if (!v) return "Please write a message.";
        if (v.length < MESSAGE_MIN) return `Message must be at least ${MESSAGE_MIN} characters.`;
        if (v.length > MESSAGE_MAX) return `Message must be ${MESSAGE_MAX} characters or fewer.`;
        return "";
    },
};

const FIELD_ORDER = ["name", "email", "phone", "service", "message"];

const validateAll = (form) =>
    FIELD_ORDER.reduce((acc, key) => ({ ...acc, [key]: validators[key](form[key]) }), {});
/* ------------------------------------------------------------------------ */

const emptyForm = { name: "", email: "", phone: "", service: "", message: "" };
const noneTouched = { name: false, email: false, phone: false, service: false, message: false };

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";

const fieldBase =
    "w-full rounded-md border bg-green-50 px-3.5 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1";

const fieldStates = {
    idle: "border-green-200 focus:border-green-600 focus:ring-green-600",
    valid: "border-green-600 focus:border-green-600 focus:ring-green-600",
    invalid: "border-red-500 focus:border-red-600 focus:ring-red-600",
};

function Label({ htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="sr-only">
            {children}
        </label>
    );
}

function FieldError({ id, message }) {
    if (!message) return null;
    return (
        <p id={id} className="mt-1.5 text-xs font-medium text-red-600">
            {message}
        </p>
    );
}

/*
  onSubmit(formData) should return a Promise – connect it to your API, e.g.
  <Contact onSubmit={(data) => fetch("/api/contact", { method: "POST", ... })} />
  Throw inside it to show the error message.
*/
export default function Contact({
    onSubmit = async () => { },
    infoTitle,
    infoText,
    contacts = [],
    socialsTitle,
    socials = [],
    formBadge,
    formTitle,
    formText,
    services = [],
}) {
    const [form, setForm] = useState(emptyForm);
    const [touched, setTouched] = useState(noneTouched);
    const [submitted, setSubmitted] = useState(false); // true after the first submit attempt
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    // Recomputed on every render, so messages update as the person types
    const errors = validateAll(form);

    // An error is shown once the field was left (blur) or after a submit attempt
    const showError = (name) => (touched[name] || submitted) && Boolean(errors[name]);
    const isValid = (name) => touched[name] && form[name].trim() !== "" && !errors[name];

    const update = (e) => {
        const { name } = e.target;
        let { value } = e.target;

        // phone: allow only digits, +, spaces, brackets and dashes while typing
        if (name === "phone") value = value.replace(/[^\d+\s()-]/g, "");

        setForm((f) => ({ ...f, [name]: value }));
        if (status !== "loading") setStatus("idle");
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
        // tidy up leading/trailing spaces once the person leaves the field
        if (value !== value.trim()) setForm((f) => ({ ...f, [name]: value.trim() }));
    };

    const fieldProps = (name) => {
        const state = showError(name) ? "invalid" : isValid(name) ? "valid" : "idle";
        const textColor = name === "service" && !form.service ? "text-gray-500" : "text-gray-900";
        return {
            id: `contact-${name}`,
            name,
            value: form[name],
            onChange: update,
            onBlur: handleBlur,
            "aria-invalid": showError(name) ? "true" : undefined,
            "aria-describedby": showError(name) ? `contact-${name}-error` : undefined,
            className: `${fieldBase} ${fieldStates[state]} ${textColor}`,
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "loading") return;

        setSubmitted(true);

        // stop and jump to the first field that needs attention
        const firstInvalid = FIELD_ORDER.find((key) => errors[key]);
        if (firstInvalid) {
            setTouched({ name: true, email: true, phone: true, service: true, message: true });
            document.getElementById(`contact-${firstInvalid}`)?.focus();
            return;
        }

        setStatus("loading");
        try {
            await onSubmit({
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                service: form.service,
                message: form.message.trim(),
            });
            setStatus("success");
            setForm(emptyForm);
            setTouched(noneTouched);
            setSubmitted(false);
        } catch {
            setStatus("error");
        }
    };

    return (
        <>
            <section
                aria-label="Contact details and enquiry form"
                className="bg-[#f7f9f6] py-12 sm:py-16"
            >
                <div className="container grid items-start gap-6 px-4 sm:px-6 lg:grid-cols-2">
                    {/* Contact information */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="text-xl font-bold text-gray-900">{infoTitle}</h2>
                        <p className="mt-3 text-[13px] leading-relaxed text-gray-600">{infoText}</p>

                        <ul className="mt-6">
                            {contacts.map((item) => (
                                <li
                                    key={item.id ?? item.label}
                                    className="flex items-start gap-4 border-b border-gray-200 py-5 first:pt-2 last:border-b-0 last:pb-0"
                                >
                                    <span className="mt-0.5 shrink-0 text-green-600">{CONTACT_ICONS[item.icon]}</span>
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

                        {/* Social icons */}
                        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-6">
                            <p className="text-base font-semibold text-gray-900">{socialsTitle}</p>
                            <ul className="flex items-center gap-2">
                                {socials.map((s) => (
                                    <li key={s.label}>
                                        <a
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${s.label} (opens in a new tab)`}
                                            title={s.label}
                                            className={`grid h-10 w-10 place-items-center rounded-full border border-green-600 text-green-600 transition-colors hover:bg-green-600 hover:text-white ${focusRing}`}
                                        >
                                            {SOCIAL_ICONS[s.icon]}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="rounded-3xl bg-[#eef4ec] p-6 shadow-sm sm:p-10">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                            <svg width="14" height="14" viewBox="0 0 14 14" className="text-green-600" aria-hidden="true">
                                <path d="M7 1v12M1.8 4l10.4 6M1.8 10l10.4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                            {formBadge}
                        </span>

                        <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">{formTitle}</h2>
                        <p className="mt-4 max-w-[560px] text-[13px] leading-relaxed text-gray-600">{formText}</p>

                        {/* noValidate: the browser's pop-up bubbles are replaced by the inline messages below */}
                        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
                            <div>
                                <Label htmlFor="contact-name">Name</Label>
                                <input
                                    {...fieldProps("name")}
                                    type="text"
                                    required
                                    autoComplete="name"
                                    placeholder="Name"
                                />
                                {showError("name") && <FieldError id="contact-name-error" message={errors.name} />}
                            </div>

                            <div>
                                <Label htmlFor="contact-email">Email address</Label>
                                <input
                                    {...fieldProps("email")}
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Email Address"
                                />
                                {showError("email") && <FieldError id="contact-email-error" message={errors.email} />}
                            </div>

                            <div>
                                <Label htmlFor="contact-phone">Phone number</Label>
                                <input
                                    {...fieldProps("phone")}
                                    type="tel"
                                    inputMode="tel"
                                    maxLength={18}
                                    autoComplete="tel"
                                    placeholder="Phone Number (optional)"
                                />
                                {showError("phone") && <FieldError id="contact-phone-error" message={errors.phone} />}
                            </div>

                            <div>
                                <Label htmlFor="contact-service">Service you're interested in</Label>
                                <select {...fieldProps("service")}>
                                    <option value="">Service You're Interested In</option>
                                    {services.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="contact-message">Message</Label>
                                <textarea
                                    {...fieldProps("message")}
                                    rows={5}
                                    required
                                    maxLength={MESSAGE_MAX}
                                    placeholder="Message"
                                    className={`${fieldProps("message").className} resize-y`}
                                />
                                <div className="mt-1.5 flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        {showError("message") && <FieldError id="contact-message-error" message={errors.message} />}
                                    </div>
                                    <span
                                        className={`ml-auto shrink-0 text-xs ${form.message.length >= MESSAGE_MAX ? "font-semibold text-red-600" : "text-gray-500"}`}
                                    >
                                        {form.message.length}/{MESSAGE_MAX}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className={`inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-green-600 p-1.5 pr-7 text-[15px] font-bold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`}
                                >
                                    <span className="grid h-9 w-[52px] place-items-center rounded-full bg-white">
                                        <Arrow />
                                    </span>
                                    {status === "loading" ? "Sending…" : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}