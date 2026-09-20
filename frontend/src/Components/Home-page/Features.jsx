
export default function Features({ accessibilitySection }) {

    const { title, subtitle, features } = accessibilitySection;


    return (
        <section aria-labelledby="features-title" className="lg:py-10 py-8" >
            <div className="grid container items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-12">
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