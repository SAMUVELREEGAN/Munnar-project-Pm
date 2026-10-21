/**
 * Crawlable long-form homepage content for text-to-code ratio / word-count SEO.
 * Keeps a clear H2 → H3 hierarchy (no skipped levels).
 */
export default function SeoContent() {
    return (
        <section aria-labelledby="seo-about-title" className="py-4 sm:py-8">
            <div className="container max-w-[920px]">
                <h2
                    id="seo-about-title"
                    className="font-display text-[28px] sm:text-4xl lg:text-[44px] font-semibold leading-tight text-gray-900"
                >
                    About Jothilaxmi Munnar Taxi Service
                </h2>
                <span aria-hidden="true" className="gold-rule-left" />

                <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
                    <p>
                        Jothilaxmi Cabs is a trusted Munnar taxi service helping travellers explore Kerala&rsquo;s
                        tea-covered hills with comfort, punctuality, and transparent pricing. Whether you need a
                        Cochin Airport to Munnar taxi, a full-day local sightseeing cab, or a multi-day Kerala tour
                        package, our experienced drivers know the mountain roads, seasonal traffic patterns, and the
                        best times to visit popular viewpoints.
                    </p>
                    <p>
                        Families, honeymoon couples, and small groups choose us for clean, well-maintained vehicles
                        ranging from sedans to Innova Crysta SUVs and Tempo Travellers. Every booking includes
                        professional local guidance so you can cover Eravikulam National Park, Mattupetty Dam, Echo
                        Point, Kundala Lake, Top Station, Attukal Waterfalls, and tea estate museums without stress.
                    </p>
                </div>

                <h3 className="mt-8 font-display text-xl sm:text-2xl font-semibold text-gray-900">
                    Cochin Airport Transfers &amp; Kerala Cab Routes
                </h3>
                <div className="mt-3 space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
                    <p>
                        Our Cochin International Airport (COK) pickup and drop service runs 24/7. Drivers track flight
                        schedules, meet you at arrivals, and take the most reliable route through Aluva, Angamaly, or
                        Adimali depending on traffic. We also operate popular Kerala taxi routes from Ernakulam,
                        Thrissur, Cherai, Varkala, Kovalam, Alappuzha, Thekkady, and major Tamil Nadu gateways such as
                        Coimbatore and Madurai.
                    </p>
                    <p>
                        Outstation travellers often combine Munnar with Thekkady wildlife, Alleppey backwaters, or
                        Kochi heritage stops. Share your itinerary and we will suggest a practical day plan, vehicle
                        size, and fare estimate with fuel and driver allowance included so there are no surprises on
                        the road.
                    </p>
                </div>

                <h3 className="mt-8 font-display text-xl sm:text-2xl font-semibold text-gray-900">
                    Why Book a Local Munnar Sightseeing Taxi
                </h3>
                <div className="mt-3 space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
                    <p>
                        Hill-station driving demands local experience. Narrow ghats, monsoon mist, early park entry
                        timings, and changing viewpoint crowds all affect your day. A dedicated sightseeing taxi lets
                        you start early for Eravikulam, pause for tea factory visits, and adjust stops without waiting
                        for shared tourist buses. Children and senior travellers especially benefit from door-to-door
                        comfort and flexible rest breaks.
                    </p>
                    <p>
                        Call or WhatsApp +91 90611 40533 or +91 94003 80433 to book Munnar cabs for same-day trips,
                        hotel pickups, or customised holiday packages. Jothilaxmi Munnar Taxi Service is built for
                        safe, friendly, and affordable travel across Munnar and Kerala.
                    </p>
                </div>
            </div>
        </section>
    );
}
