import iconMap from "../Reuseable/iconMap";
import { FaCircleCheck } from "react-icons/fa6";

export default function WhyChooseUs({ whyChooseUs }) {

    const { image, imageAlt, title, features } = whyChooseUs

    return (
        <section
            aria-labelledby="why-title" className="" >
            <div className="container grid gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:gap-5">
                {/* Photo */}
                <div className="relative min-h-[260px] overflow-hidden rounded-[40px] bg-gradient-to-br from-green-700 to-green-900 sm:min-h-[360px] sm:rounded-[56px]">

                    <img
                        src={image}
                        alt={imageAlt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                </div>

                {/* Reasons */}
                <div className="flex flex-col justify-center rounded-[32px] bg-gradient-to-br from-green-100/70 via-white to-green-100/70 p-7 sm:rounded-[40px] sm:p-12">
                    <h2 id="why-title" className="text-3xl font-bold text-gray-900">
                        {title}
                    </h2>

                    <ul className="mt-8 space-y-6">
                        {features.map((reason) => {
                            const IconComponent = iconMap[reason.icon] || FaCircleCheck;
                            return (
                                <li key={reason.title} className="flex items-start gap-4">
                                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-100 text-green-600 shadow-sm">
                                        <IconComponent size={20} />
                                    </span>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900">{reason.title}</h3>
                                        <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-gray-600">{reason.description}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}