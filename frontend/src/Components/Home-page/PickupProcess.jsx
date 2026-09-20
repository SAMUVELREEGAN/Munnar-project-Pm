export default function PickupProcess({ StepCard }) {

    const { title, features } = StepCard

    return (
        <section>
            <div className="container">

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