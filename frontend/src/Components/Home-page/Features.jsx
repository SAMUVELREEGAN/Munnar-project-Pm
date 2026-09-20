
const iconProps = {
    width: 34,
    height: 34,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};


export default function Features({ accessibilitySection }) {

    const { title, subtitle, features } = accessibilitySection;


    return (
        <section
            aria-labelledby="features-title"
            className="bg-[#f7f9f6] py-14 sm:py-20"
        >
            <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-12">
                {/* Intro */}
                <div>
                    <h2 id="features-title" className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <p className="mt-4 max-w-[380px] text-sm leading-relaxed text-gray-600">{subtitle}</p>
                </div>

                {/* Cards */}
                <ul className="grid gap-4 sm:grid-cols-2">
                    {features.map((feature) => (
                        <li
                            key={feature.title}
                            className="flex flex-col items-center rounded-3xl bg-white px-6 py-8 text-center shadow-sm"
                        >
                            <span className="text-green-600">{feature.icon}</span>
                            <h3 className="mt-4 text-[15px] font-semibold text-gray-900">{feature.title}</h3>
                            <p className="mt-3 text-[12.5px] leading-relaxed text-gray-600">{feature.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}