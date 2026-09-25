import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import HomeSection from "../../local/HomePage.json";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Subscribe({ onSubscribe = async () => {} }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const heading = HomeSection?.excellencySection?.title || "Our Excellency";
    const text = HomeSection?.excellencySection?.description;
    const placeholder = HomeSection?.excellencySection?.form?.placeholder || "Enter Email Address";
    const buttonText = HomeSection?.excellencySection?.form?.buttonText || "Subscribe Now";

    const validate = (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
            return "Email address is required";
        }
        if (!EMAIL_REGEX.test(trimmed)) {
            return "Please enter a valid email address (e.g. name@example.com)";
        }
        return "";
    };

    const handleChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        if (status !== "loading") setStatus("idle");

        if (touched) {
            setError(validate(val));
        }
    };

    const handleBlur = () => {
        setTouched(true);
        setError(validate(email));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched(true);

        const err = validate(email);
        if (err) {
            setError(err);
            return;
        }

        setError("");
        setStatus("loading");

        try {
            await onSubscribe(email.trim());
            setStatus("success");
            setEmail("");
            setTouched(false);
        } catch {
            setStatus("error");
        }
    };

    const isError = touched && !!error;

    return (
        <section
            aria-labelledby="subscribe-title"
            className="bg-white px-4 py-8 sm:px-6 sm:py-16"
        >
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-[1200px] rounded-[24px] sm:rounded-[32px] bg-[#f1f5ef] px-4 py-8 text-center sm:px-10 sm:py-16"
            >
                <h2 id="subscribe-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {heading}
                </h2>
                {text && (
                    <p className="mx-auto mt-3 max-w-[760px] text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600">
                        {text}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-[540px] sm:mt-10" noValidate>
                    <div
                        className={`flex flex-col min-[520px]:flex-row items-stretch min-[520px]:items-center gap-2 rounded-2xl min-[520px]:rounded-full bg-white p-2 min-[520px]:p-1.5 shadow-sm transition-all duration-200 ${
                            isError
                                ? "border-2 border-red-500 ring-4 ring-red-100"
                                : "border-2 border-green-600 focus-within:border-green-700 focus-within:ring-4 focus-within:ring-green-100"
                        }`}
                    >
                        <label htmlFor="subscribe-email" className="sr-only">
                            Email address (required)
                        </label>
                        <input
                            id="subscribe-email"
                            type="email"
                            required
                            aria-required="true"
                            placeholder={placeholder}
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={isError}
                            aria-describedby="subscribe-error-msg"
                            className="min-w-0 w-full flex-1 bg-transparent px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        />
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            type="submit"
                            disabled={status === "loading"}
                            className="inline-flex w-full min-[520px]:w-auto shrink-0 items-center justify-center gap-2 rounded-xl min-[520px]:rounded-full bg-green-600 px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-bold text-white transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:opacity-70 shadow-sm"
                        >
                            {status === "loading" ? "Subscribing..." : buttonText}
                            {status !== "loading" && <FaArrowRight size={15} />}
                        </motion.button>
                    </div>

                    {/* In-UI Validation & Status Feedback */}
                    <div id="subscribe-error-msg" role="status" aria-live="polite" className="mt-2.5 min-h-[22px]">
                        <AnimatePresence mode="wait">
                            {isError && (
                                <motion.p
                                    key="error"
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-red-600"
                                >
                                    <FaCircleExclamation size={14} className="text-red-500 shrink-0" />
                                    <span>{error}</span>
                                </motion.p>
                            )}
                            {!isError && status === "success" && (
                                <motion.p
                                    key="success"
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-green-700"
                                >
                                    <FaCircleCheck size={14} className="text-green-600 shrink-0" />
                                    <span>Thank you! You've successfully subscribed.</span>
                                </motion.p>
                            )}
                            {!isError && status === "error" && (
                                <motion.p
                                    key="err"
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600"
                                >
                                    <FaCircleExclamation size={14} className="text-red-500 shrink-0" />
                                    <span>Something went wrong. Please try again later.</span>
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}