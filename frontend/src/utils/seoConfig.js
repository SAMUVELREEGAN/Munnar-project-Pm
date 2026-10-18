/**
 * Centralized SEO Configuration
 * Title targets: 50–60 characters
 * Description targets: 100–130 characters
 */

const BASE_URL = "https://munnarjothilaxmitaxi.com";

export const SEO_CONFIG = {
    home: {
        title: "Munnar Taxi Service | Jothilaxmi Cabs & Tour Packages", // 53 chars
        description: "Book reliable Munnar taxi services with Jothilaxmi Cabs. Affordable sightseeing tours, Cochin airport pickups, and Kerala cabs.", // 128 chars
        canonicalUrl: `${BASE_URL}/`,
        schema: {
            "@context": "https://schema.org",
            "@type": "TaxiService",
            "name": "Jothilaxmi Munnar Taxi Service",
            "image": `${BASE_URL}/images/Munnar-bg.webp`,
            "logo": `${BASE_URL}/images/munnar_logo.webp`,
            "telephone": ["+919061140533", "+919400380433"],
            "url": BASE_URL,
            "priceRange": "₹₹",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Munnar Town",
                "addressLocality": "Munnar",
                "addressRegion": "Kerala",
                "postalCode": "685612",
                "addressCountry": "IN"
            },
            "areaServed": [
                { "@type": "City", "name": "Munnar" },
                { "@type": "State", "name": "Kerala" },
                { "@type": "Airport", "name": "Cochin International Airport" }
            ],
            "description": "Professional Munnar taxi service offering airport transfers, Kerala tour packages, and sightseeing cabs."
        }
    },
    about: {
        title: "About Us | Trusted Munnar Taxi Service & Tour Operators", // 55 chars
        description: "Learn about Jothilaxmi Cabs, Munnar's trusted taxi partner offering safe hill travel, expert drivers, and custom Kerala tours.", // 127 chars
        canonicalUrl: `${BASE_URL}/about`,
        schema: {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Jothilaxmi Munnar Taxi Service",
            "url": `${BASE_URL}/about`,
            "description": "Discover the story, mission, and commitment to safe hill-station driving behind Jothilaxmi Munnar Taxi Service."
        }
    },
    packages: {
        title: "Munnar Tour Packages | Kerala Sightseeing Taxi Fares", // 52 chars
        description: "Explore top Munnar tour packages with affordable taxi fares. Book day sightseeing tours, Cochin transfers, and Kerala holiday cabs.", // 130 chars
        canonicalUrl: `${BASE_URL}/our-tour-packages`,
        schema: {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Munnar Sightseeing Tour Packages",
            "description": "Curated Munnar sightseeing day tours and Kerala holiday cab packages with experienced drivers.",
            "brand": {
                "@type": "Brand",
                "name": "Jothilaxmi Cabs"
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "INR",
                "lowPrice": "1800",
                "highPrice": "15000",
                "offerCount": "12"
            }
        }
    },
    places: {
        title: "Top Places to Visit in Munnar | Kerala Sightseeing Guide", // 55 chars
        description: "Discover top tourist places to visit in Munnar including tea gardens, Mattupetty Dam, and viewpoints with convenient taxi service.", // 130 chars
        canonicalUrl: `${BASE_URL}/places-to-visit`,
        schema: {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Munnar Tourist Attractions",
            "description": "Comprehensive tourist guide covering scenic tea plantations, national parks, waterfalls, and dams in Munnar, Kerala."
        }
    },
    contact: {
        title: "Contact Us | Munnar Taxi Booking & 24/7 Cab Customer Care", // 56 chars
        description: "Contact Jothilaxmi Munnar Taxi for fast cab bookings, 24/7 customer support, airport pickup quotes, and custom Kerala tour plans.", // 130 chars
        canonicalUrl: `${BASE_URL}/contact-us`,
        schema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Jothilaxmi Munnar Taxi Service",
            "url": `${BASE_URL}/contact-us`,
            "telephone": "+919400380433"
        }
    },
    notFound: {
        title: "Page Not Found | Munnar Taxi Service & Cab Booking", // 51 chars
        description: "The requested page was not found. Browse Munnar taxi packages, local sightseeing spots, airport cab rentals, and contact details.", // 129 chars
        canonicalUrl: `${BASE_URL}/404`,
        noindex: true
    }
};
