import iconMap from "../Reuseable/iconMap";

export default function PickupProcess({ StepCard }) {

    const { title, features } = StepCard

    return (
        <section>
            <div className="container">

                {/* Process */}
                <h2 className="mt-10 text-2xl font-bold text-gray-900 sm:mt-12 sm:text-3xl">{title}</h2>

                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((step) => {
                        const IconComponent = iconMap[step.icon];
                        return (
                            <li
                                key={step.title}
                                className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-7"
                            >
                                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-green-50 text-green-600 shadow-sm ring-1 ring-green-100">
                                    {IconComponent ? <IconComponent size={26} /> : step.icon}
                                </span>
                                <h3 className="mt-5 text-base sm:text-lg font-bold text-gray-900">
                                    {step.title}
                                </h3>
                                <hr className="my-4 w-full border-gray-100" />
                                <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600">
                                    {step.description}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}