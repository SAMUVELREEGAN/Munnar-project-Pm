/* ---------- Easy-to-edit content ---------- */
const STAT = {
    eyebrow: "More than",
    value: "10,000", // replace with your real number
    label: "Trips in 12 months",
    text: "Our drivers know Munnar's hill roads well and focus on safe, punctual and comfortable trips for families, couples, seniors and groups.",
};

const ABOUT = {
    title: "How Many Travellers Have We Served?",
    text: "Our taxi service has helped visitors reach Munnar's tea gardens, viewpoints and hotels with ease. Clear pricing, local drivers and well-kept vehicles mean fewer worries, so you can enjoy the trip from the first pick-up to the last drop-off.",
};

const PROCESS_TITLE = "Our Airport & Railway Pickup Process";

const iconProps = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};


/* ------------------------------------------ */

export default function PickupProcess({ StepCard }) {

    const { title, features } = StepCard

    return (
        <section className="bg-[#f7f9f6] py-14 sm:py-20">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6">

                {/* Process */}
                <h2 className="mt-10 text-2xl font-bold text-gray-900 sm:mt-12 sm:text-3xl">{title}</h2>

                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((step) => (
                        <li
                            key={step.title}
                            className="flex flex-col items-center rounded-3xl border border-gray-200 p-6 text-center sm:p-7"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-green-600 shadow-sm ring-1 ring-gray-100">
                                {step.icon}
                            </span>
                            <h3 className="mt-4 text-[15px] font-semibold text-gray-900">
                                {step.title}
                            </h3>
                            <hr className="my-4 w-full border-gray-200" />
                            <p className="text-[12.5px] leading-relaxed text-gray-600">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}