import React from 'react'
import HeroSection from '../Home-page/HeroSection'
import RouteCategories from '../Home-page/RouteCategories'
import Features from '../Home-page/Features'
import TopPlaces from '../Home-page/TopPlaces'
import Vehicles from '../Home-page/Vehicles'
import Testimonials from '../Home-page/Testimonials'
import FAQSection, { FAQS } from '../Home-page/FAQSection'
import SeoContent from '../Home-page/SeoContent'
import Subscribe from '../Home-page/Subscribe'
import HomeSection from "../../local/HomePage.json"
import SEO from '../SEO/SEO'
import { SEO_CONFIG } from '../../utils/seoConfig'

export const Home = () => {
    // FAQPage node without nested @context (invalid inside @graph)
    const faqSchema = {
        "@type": "FAQPage",
        "@id": "https://munnarjothilaxmitaxi.com/#faq",
        "mainEntity": FAQS.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    const combinedSchema = {
        "@context": "https://schema.org",
        "@graph": [
            ...(SEO_CONFIG.home.schema["@graph"] || [SEO_CONFIG.home.schema]),
            faqSchema
        ]
    };

    return (
        <>
            <SEO
                title={SEO_CONFIG.home.title}
                description={SEO_CONFIG.home.description}
                canonicalUrl={SEO_CONFIG.home.canonicalUrl}
                schema={combinedSchema}
            />
            <div className='space-y-14 sm:space-y-20 lg:space-y-28 pb-16 sm:pb-20' >
                <HeroSection HeroContent={HomeSection?.homePage?.heroSection} />
                <RouteCategories data={HomeSection?.routeCategories} />
                <Features accessibilitySection={HomeSection?.accessibilitySection || HomeSection?.premiumServices} />
                <TopPlaces data={HomeSection?.topPlacesSection} />
                <Vehicles VehiclePackages={HomeSection?.VehiclePackages} />
                <SeoContent />
                <Testimonials />
                <FAQSection />
                <Subscribe />
            </div>
        </>
    )
}
