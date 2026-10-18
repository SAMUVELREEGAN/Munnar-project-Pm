/**
 * Centralized Technical SEO Configuration
 * - Canonical domain: https://munnarjothilaxmitaxi.com
 * - Target Title: 50–60 characters
 * - Target Meta Description: 100–130 characters
 * - Valid Schema.org JSON-LD (TaxiService, WebSite, Organization, BreadcrumbList, ContactPage, Service)
 */

const BASE_URL = "https://munnarjothilaxmitaxi.com";

export const SEO_CONFIG = {
    home: {
        title: "Munnar Taxi Service | Jothilaxmi Cabs & Tour Packages", // 53 chars
        description: "Book reliable Munnar taxi services with Jothilaxmi Cabs. Affordable sightseeing tours, Cochin airport pickups, and Kerala cabs.", // 128 chars
        canonicalUrl: `${BASE_URL}/`,
        schema: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": `${BASE_URL}/#website`,
                    "url": `${BASE_URL}/`,
                    "name": "Munnar Taxi Service | Jothilaxmi Cabs",
                    "description": "Professional Munnar taxi service offering airport transfers, Kerala tour packages, and sightseeing cabs."
                },
                {
                    "@type": "TaxiService",
                    "@id": `${BASE_URL}/#taxiservice`,
                    "name": "Jothilaxmi Munnar Taxi Service",
                    "url": `${BASE_URL}/`,
                    "logo": `${BASE_URL}/images/munnar_logo.webp`,
                    "image": `${BASE_URL}/images/Munnar-bg.webp`,
                    "telephone": ["+919061140533", "+919400380433"],
                    "priceRange": "₹₹",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Munnar Town",
                        "addressLocality": "Munnar",
                        "addressRegion": "Kerala",
                        "postalCode": "685612",
                        "addressCountry": "IN"
                    },
                    "openingHoursSpecification": [
                        {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday"
                            ],
                            "opens": "00:00",
                            "closes": "23:59"
                        }
                    ],
                    "areaServed": [
                        { "@type": "City", "name": "Munnar" },
                        { "@type": "State", "name": "Kerala" },
                        { "@type": "Airport", "name": "Cochin International Airport" }
                    ]
                }
            ]
        }
    },
    about: {
        title: "About Us | Trusted Munnar Taxi Service & Tour Operators", // 55 chars
        description: "Learn about Jothilaxmi Cabs, Munnar's trusted taxi partner offering safe hill travel, expert drivers, and custom Kerala tours.", // 127 chars
        canonicalUrl: `${BASE_URL}/about`,
        schema: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "@id": `${BASE_URL}/#organization`,
                    "name": "Jothilaxmi Munnar Taxi Service",
                    "url": `${BASE_URL}/`,
                    "logo": `${BASE_URL}/images/munnar_logo.webp`,
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+919061140533",
                        "contactType": "customer service",
                        "areaServed": "IN"
                    }
                },
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": `${BASE_URL}/`
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "About Us",
                            "item": `${BASE_URL}/about`
                        }
                    ]
                }
            ]
        }
    },
    packages: {
        title: "Munnar Tour Packages | Kerala Sightseeing Taxi Fares", // 52 chars
        description: "Explore top Munnar tour packages with affordable taxi fares. Book sightseeing tours, Cochin airport cabs, and Kerala holidays.", // 126 chars
        canonicalUrl: `${BASE_URL}/our-tour-packages`,
        schema: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Service",
                    "name": "Munnar Sightseeing Taxi Tour Packages",
                    "provider": {
                        "@type": "TaxiService",
                        "name": "Jothilaxmi Munnar Taxi Service",
                        "telephone": "+919061140533"
                    },
                    "serviceType": "Sightseeing Taxi & Tour Packages",
                    "areaServed": {
                        "@type": "City",
                        "name": "Munnar"
                    },
                    "description": "Full-day and multi-day sightseeing cab packages covering Mattupetty Dam, Eravikulam National Park, Top Station, and Cochin Airport transfers."
                },
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": `${BASE_URL}/`
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Tour Packages",
                            "item": `${BASE_URL}/our-tour-packages`
                        }
                    ]
                }
            ]
        }
    },
    places: {
        title: "Top Places to Visit in Munnar | Kerala Sightseeing Guide", // 55 chars
        description: "Discover top tourist places to visit in Munnar including tea gardens, Mattupetty Dam, and viewpoints with convenient taxi service.", // 130 chars
        canonicalUrl: `${BASE_URL}/places-to-visit`,
        schema: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "TouristDestination",
                    "name": "Munnar Tourist Attractions",
                    "description": "Scenic hill station attractions in Munnar including tea plantations, wildlife parks, lakes, dams, and viewpoints.",
                    "touristType": ["Eco-tourism", "Adventure tourism", "Sightseeing"],
                    "containedInPlace": {
                        "@type": "AdministrativeArea",
                        "name": "Idukki District, Kerala, India"
                    }
                },
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": `${BASE_URL}/`
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Places to Visit",
                            "item": `${BASE_URL}/places-to-visit`
                        }
                    ]
                }
            ]
        }
    },
    contact: {
        title: "Contact Us | Munnar Taxi Booking & 24/7 Cab Customer Care", // 56 chars
        description: "Contact Jothilaxmi Munnar Taxi for fast cab bookings, 24/7 customer support, airport pickup quotes, and custom Kerala tour plans.", // 130 chars
        canonicalUrl: `${BASE_URL}/contact-us`,
        schema: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "ContactPage",
                    "name": "Contact Jothilaxmi Munnar Taxi Service",
                    "url": `${BASE_URL}/contact-us`,
                    "mainEntity": {
                        "@type": "TaxiService",
                        "name": "Jothilaxmi Munnar Taxi Service",
                        "telephone": ["+919400380433", "+919061140533"],
                        "email": "veereshvv792484@gmail.com",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Munnar Town",
                            "addressLocality": "Munnar",
                            "addressRegion": "Kerala",
                            "postalCode": "685612",
                            "addressCountry": "IN"
                        }
                    }
                },
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": `${BASE_URL}/`
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Contact Us",
                            "item": `${BASE_URL}/contact-us`
                        }
                    ]
                }
            ]
        }
    },
    notFound: {
        title: "Page Not Found | Munnar Taxi Service & Cab Booking", // 51 chars
        description: "The requested page was not found. Browse Munnar taxi packages, local sightseeing spots, airport cab rentals, and contact details.", // 129 chars
        canonicalUrl: `${BASE_URL}/404`,
        noindex: true
    }
};
