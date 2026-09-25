import { useState } from "react";
import { motion } from "framer-motion";
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
    // required on contact form (matches live site)
    phone: (value) => {
        const v = value.trim();
        if (!v) return "Please enter your phone number.";
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
    "w-full rounded-xl border bg-[#fffdf8] px-3.5 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all duration-300";

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
                className="py-6 sm:py-12 lg:py-16"
            >
                <div className="container grid items-start gap-6 sm:gap-8 lg:grid-cols-2">
                    {/* Contact information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-[28px] bg-[#fffdf8] p-5 sm:p-8 lg:p-10 shadow-soft ring-1 ring-cream-200"
                    >
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-gray-900">{infoTitle}</h2>
                        {infoText && (
                            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">{infoText}</p>
                        )}

                        <ul className="mt-6 sm:mt-8">
                            {contacts.map((item) => (
                                <li
                                    key={item.id ?? item.label}
                                    className="flex items-start gap-3 sm:gap-4 border-b border-cream-200 py-4 sm:py-5 first:pt-2 last:border-b-0 last:pb-0"
                                >
                                    <span className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-2xl bg-green-50 text-green-700 shadow-soft">
                                        {CONTACT_ICONS[item.icon]}
                                    </span>
                                    <div className="min-w-0 pt-0.5">
                                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className={`mt-0.5 sm:mt-1 block break-words rounded text-xs sm:text-sm md:text-base text-gray-600 transition-colors hover:text-green-700 ${focusRing}`}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="mt-0.5 sm:mt-1 break-words text-xs sm:text-sm md:text-base text-gray-600">{item.value}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Social icons */}
                        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 border-t border-cream-200 pt-5 sm:pt-6">
                            <p className="text-sm sm:text-base font-bold text-gray-900">{socialsTitle}</p>
                            <ul className="flex items-center gap-2">
                                {socials.map((s) => (
                                    <li key={s.label}>
                                        <motion.a
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${s.label} (opens in a new tab)`}
                                            title={s.label}
                                            className={`grid h-8 w-8 place-items-center rounded-full border border-green-600 text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-cream-50 ${focusRing}`}
                                        >
                                            {SOCIAL_ICONS[s.icon]}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-[28px] bg-cream-100 p-5 sm:p-8 lg:p-10 shadow-soft border border-cream-200"
                    >
                        {formBadge && (
                            <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-900">
                                <FaAsterisk size={13} className="text-green-600" />
                                {formBadge}
                            </span>
                        )}

                        <h2 className={`${formBadge ? "mt-4 sm:mt-5" : ""} font-display text-[28px] sm:text-4xl lg:text-[42px] font-semibold text-gray-900`}>{formTitle}</h2>
                        {formText && (
                            <p className="mt-2.5 sm:mt-4 max-w-[560px] text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">{formText}</p>
                        )}

                        {/* noValidate: the browser's pop-up bubbles are replaced by the inline messages below */}
                        <form onSubmit={handleSubmit} noValidate className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4">
                            <div>
                                <Label htmlFor="contact-name">Your Name</Label>
                                <input
                                    {...fieldProps("name")}
                                    type="text"
                                    required
                                    autoComplete="name"
                                    placeholder="Your Name"
                                />
                                {showError("name") && <FieldError id="contact-name-error" message={errors.name} />}
                            </div>

                            <div>
                                <Label htmlFor="contact-email">Your Email</Label>
                                <input
                                    {...fieldProps("email")}
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Your Email"
                                />
                                {showError("email") && <FieldError id="contact-email-error" message={errors.email} />}
                            </div>

                            <div>
                                <Label htmlFor="contact-phone">Phone Number</Label>
                                <input
                                    {...fieldProps("phone")}
                                    type="tel"
                                    inputMode="tel"
                                    maxLength={18}
                                    autoComplete="tel"
                                    required
                                    placeholder="Phone Number"
                                />
                                {showError("phone") && <FieldError id="contact-phone-error" message={errors.phone} />}
                            </div>

                            {services?.length > 0 && (
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
                            )}

                            <div>
                                <Label htmlFor="contact-message">Message</Label>
                                <textarea
                                    {...fieldProps("message")}
                                    rows={4}
                                    required
                                    maxLength={MESSAGE_MAX}
                                    placeholder="Write your message..."
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

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className={`inline-flex w-full sm:w-auto items-center justify-center gap-3 sm:gap-4 whitespace-nowrap rounded-full bg-green-600 p-1.5 pr-6 sm:pr-7 text-sm sm:text-base font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-green-700 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70 shadow-soft ${focusRing}`}
                                >
                                    <span className="grid h-8 w-9 sm:h-9 sm:w-[52px] place-items-center rounded-full bg-cream-50">
                                        <FaArrowRight size={15} className="text-green-700" />
                                    </span>
                                    <span>{status === "loading" ? "Sending…" : "Send Message"}</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
}