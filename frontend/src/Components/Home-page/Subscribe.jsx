import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

/* ---------- Easy-to-edit content ---------- */
const HEADING = "Get Travel Offers & Updates";
const TEXT =
    "Subscribe for seasonal offers, new tour packages and travel tips for exploring Munnar and the nearby hill stations.";
/* ------------------------------------------ */

/*
  onSubscribe(email) should return a Promise – connect it to your API, e.g.
  <Subscribe onSubscribe={(email) => fetch("/api/subscribe", { method: "POST", ... })} />
  Throw an error inside it to show the error message.
*/
export default function Subscribe({ onSubscribe = async () => { } }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");
        try {
            await onSubscribe(email.trim());
            setStatus("success");
            setEmail("");
        } catch {
            setStatus("error");
        }
    };

    return (
        <section
            aria-labelledby="subscribe-title"
            className="bg-white px-4 py-10 sm:px-6 sm:py-16"
        >
            <div className="mx-auto max-w-[1200px] rounded-[32px] bg-[#f1f5ef] px-5 py-12 text-center sm:px-10 sm:py-16">
                <h2 id="subscribe-title" className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {HEADING}
                </h2>
                <p className="mx-auto mt-4 max-w-[560px] text-base leading-relaxed text-gray-600 sm:text-lg">{TEXT}</p>

                <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-[520px] sm:mt-10" noValidate={false}>
                    <div className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-green-600">
                        <label htmlFor="subscribe-email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="subscribe-email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (status !== "loading") setStatus("idle");
                            }}
                            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-green-600 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {status === "loading" ? "Subscribing…" : "Subscribe Now"}
                            {status !== "loading" && <FaArrowRight size={16} />}
                        </button>
                    </div>

                    <p role="status" aria-live="polite" className="mt-3 min-h-[20px] text-sm">
                        {status === "success" && (
                            <span className="font-semibold text-green-700">Thanks! You're subscribed.</span>
                        )}
                        {status === "error" && (
                            <span className="font-semibold text-red-600">Something went wrong. Please try again.</span>
                        )}
                    </p>
                </form>
            </div>
        </section>
    );
}