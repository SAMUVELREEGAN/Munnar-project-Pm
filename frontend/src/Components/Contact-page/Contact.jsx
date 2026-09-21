import { useState } from "react";
import {
    FaArrowRight,
    FaMobileScreenButton,
    FaEnvelope,
    FaClock,
    FaLocationDot,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
    FaAsterisk,
} from "react-icons/fa6";

/* ---------- Presentational icons (keyed by name from ContactPage.json) ---------- */
const CONTACT_ICONS = {
    phone: <FaMobileScreenButton size={25} />,
    email: <FaEnvelope size={25} />,
    clock: <FaClock size={25} />,
    location: <FaLocationDot size={25} />,
};

const SOCIAL_ICONS = {
    facebook: <FaFacebookF size={18} />,
    instagram: <FaInstagram size={18} />,
    youtube: <FaYoutube size={18} />,
    whatsapp: <FaWhatsapp size={18} />,
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
                <div className="container grid items-start gap-8 px-4 sm:px-6 lg:grid-cols-2">
                    {/* Contact information */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-10">
                        <h2 className="text-2xl font-bold text-gray-900">{infoTitle}</h2>
                        <p className="mt-3 text-base leading-relaxed text-gray-600">{infoText}</p>

                        <ul className="mt-8">
                            {contacts.map((item) => (
                                <li
                                    key={item.id ?? item.label}
                                    className="flex items-start gap-4 border-b border-gray-100 py-5 first:pt-2 last:border-b-0 last:pb-0"
                                >
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-green-50 text-green-600 shadow-sm">
                                        {CONTACT_ICONS[item.icon]}
                                    </span>
                                    <div className="min-w-0 pt-0.5">
                                        <p className="text-base sm:text-lg font-bold text-gray-900">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className={`mt-1 block break-words rounded text-sm sm:text-base text-gray-600 transition-colors hover:text-green-700 ${focusRing}`}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="mt-1 break-words text-sm sm:text-base text-gray-600">{item.value}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Social icons */}
                        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-6">
                            <p className="text-base font-bold text-gray-900">{socialsTitle}</p>
                            <ul className="flex items-center gap-2">
                                {socials.map((s) => (
                                    <li key={s.label}>
                                        <a
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${s.label} (opens in a new tab)`}
                                            title={s.label}
                                            className={`grid h-8 w-8 place-items-center rounded-full border border-green-600 text-green-600 transition-colors hover:bg-green-600 hover:text-white ${focusRing}`}
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
                            <FaAsterisk size={15} className="text-green-600" />
                            {formBadge}
                        </span>

                        <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">{formTitle}</h2>
                        <p className="mt-4 max-w-[560px] text-base leading-relaxed text-gray-600">{formText}</p>

                        {/* noValidate: the browser's pop-up bubbles are replaced by the inline messages below */}
                        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
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
                                    className={`inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-green-600 p-1.5 pr-7 text-base font-bold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`}
                                >
                                    <span className="grid h-9 w-[52px] place-items-center rounded-full bg-white">
                                        <FaArrowRight size={16} className="text-green-600" />
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