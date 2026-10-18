const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const BASE_HTML_PATH = path.join(BUILD_DIR, "index.html");

if (!fs.existsSync(BASE_HTML_PATH)) {
    console.error("Build directory or index.html not found. Run npm run build first.");
    process.exit(1);
}

const baseHtml = fs.readFileSync(BASE_HTML_PATH, "utf8");

const ROUTES = [
    {
        path: "about",
        title: "About Us | Trusted Munnar Taxi Service & Tour Operators",
        description: "Learn about Jothilaxmi Cabs, Munnar's trusted taxi partner offering safe hill travel, expert drivers, and custom Kerala tours.",
        canonical: "https://munnarjothilaxmitaxi.com/about",
        h1: "About Our Munnar Taxi Service",
        summary: "Jothilaxmi Cabs is a leading taxi and tour operator in Munnar, Kerala. We provide safe, comfortable, and affordable transportation with experienced local drivers for Cochin airport transfers, sightseeing tours, and outstation trips."
    },
    {
        path: "our-tour-packages",
        title: "Munnar Tour Packages | Kerala Sightseeing Taxi Fares",
        description: "Explore top Munnar tour packages with affordable taxi fares. Book day sightseeing tours, Cochin transfers, and Kerala holiday cabs.",
        canonical: "https://munnarjothilaxmitaxi.com/our-tour-packages",
        h1: "Munnar Tour Packages & Sightseeing Taxi Fares",
        summary: "Discover full-day and multi-day tour packages in Munnar and across Kerala. Enjoy sightseeing tours to Mattupetty Dam, Top Station, and Eravikulam National Park with transparent fares and comfortable vehicles."
    },
    {
        path: "places-to-visit",
        title: "Top Places to Visit in Munnar | Kerala Sightseeing Guide",
        description: "Discover top tourist places to visit in Munnar including tea gardens, Mattupetty Dam, and viewpoints with convenient taxi service.",
        canonical: "https://munnarjothilaxmitaxi.com/places-to-visit",
        h1: "Top Places to Visit in Munnar",
        summary: "Explore Munnar's famous tourist spots: rolling tea plantations, Eravikulam National Park, Mattupetty Dam, Echo Point, Kundala Lake, and Attukad Waterfalls with private sightseeing taxi cabs."
    },
    {
        path: "contact-us",
        title: "Contact Us | Munnar Taxi Booking & 24/7 Cab Customer Care",
        description: "Contact Jothilaxmi Munnar Taxi for fast cab bookings, 24/7 customer support, airport pickup quotes, and custom Kerala tour plans.",
        canonical: "https://munnarjothilaxmitaxi.com/contact-us",
        h1: "Contact Us - Munnar Taxi Booking",
        summary: "Contact Jothilaxmi Cabs for 24/7 taxi booking in Munnar. Call +91 94003 80433 or +91 90611 40533 for Cochin airport pickups, sightseeing cab rentals, and custom holiday quotes."
    },
    {
        path: "packages",
        title: "Munnar Tour Packages | Kerala Sightseeing Taxi Fares",
        description: "Explore top Munnar tour packages with affordable taxi fares. Book day sightseeing tours, Cochin transfers, and Kerala holiday cabs.",
        canonical: "https://munnarjothilaxmitaxi.com/our-tour-packages",
        h1: "Munnar Tour Packages & Sightseeing Taxi Fares",
        summary: "Discover full-day and multi-day tour packages in Munnar and across Kerala. Enjoy sightseeing tours to Mattupetty Dam, Top Station, and Eravikulam National Park with transparent fares and comfortable vehicles."
    },
    {
        path: "placetovisit",
        title: "Top Places to Visit in Munnar | Kerala Sightseeing Guide",
        description: "Discover top tourist places to visit in Munnar including tea gardens, Mattupetty Dam, and viewpoints with convenient taxi service.",
        canonical: "https://munnarjothilaxmitaxi.com/places-to-visit",
        h1: "Top Places to Visit in Munnar",
        summary: "Explore Munnar's famous tourist spots: rolling tea plantations, Eravikulam National Park, Mattupetty Dam, Echo Point, Kundala Lake, and Attukad Waterfalls with private sightseeing taxi cabs."
    },
    {
        path: "contact",
        title: "Contact Us | Munnar Taxi Booking & 24/7 Cab Customer Care",
        description: "Contact Jothilaxmi Munnar Taxi for fast cab bookings, 24/7 customer support, airport pickup quotes, and custom Kerala tour plans.",
        canonical: "https://munnarjothilaxmitaxi.com/contact-us",
        h1: "Contact Us - Munnar Taxi Booking",
        summary: "Contact Jothilaxmi Cabs for 24/7 taxi booking in Munnar. Call +91 94003 80433 or +91 90611 40533 for Cochin airport pickups, sightseeing cab rentals, and custom holiday quotes."
    }
];

ROUTES.forEach((route) => {
    let routeHtml = baseHtml;

    // Replace Title
    routeHtml = routeHtml.replace(
        /<title>.*?<\/title>/i,
        `<title>${route.title}</title>`
    );

    // Replace Meta Description
    routeHtml = routeHtml.replace(
        /<meta name="description" content=".*?"\s*\/?>/i,
        `<meta name="description" content="${route.description}" />`
    );

    // Replace Canonical
    routeHtml = routeHtml.replace(
        /<link rel="canonical" href=".*?"\s*\/?>/i,
        `<link rel="canonical" href="${route.canonical}" />`
    );

    // Replace OG Title & Description
    routeHtml = routeHtml.replace(
        /<meta property="og:title" content=".*?"\s*\/?>/i,
        `<meta property="og:title" content="${route.title}" />`
    );
    routeHtml = routeHtml.replace(
        /<meta property="og:description" content=".*?"\s*\/?>/i,
        `<meta property="og:description" content="${route.description}" />`
    );
    routeHtml = routeHtml.replace(
        /<meta property="og:url" content=".*?"\s*\/?>/i,
        `<meta property="og:url" content="${route.canonical}" />`
    );

    // Replace Twitter Title & Description
    routeHtml = routeHtml.replace(
        /<meta name="twitter:title" content=".*?"\s*\/?>/i,
        `<meta name="twitter:title" content="${route.title}" />`
    );
    routeHtml = routeHtml.replace(
        /<meta name="twitter:description" content=".*?"\s*\/?>/i,
        `<meta name="twitter:description" content="${route.description}" />`
    );

    // Inject route-specific pre-rendered content inside root container
    const prerenderedContent = `
      <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; font-family: sans-serif; text-align: center; color: #1a1610;">
        <h1>${route.h1}</h1>
        <p style="max-width: 640px; margin-top: 1rem; line-height: 1.6; color: #4b5563;">
          ${route.summary}
        </p>
        <p style="margin-top: 1rem; font-weight: 600; color: #15803d;">
          24/7 Booking Helpline: +91 90611 40533 | +91 94003 80433
        </p>
      </div>
    `;

    routeHtml = routeHtml.replace(
        /<div id="root">[\s\S]*?<\/div>/i,
        `<div id="root">${prerenderedContent}</div>`
    );

    const targetDir = path.join(BUILD_DIR, route.path);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(path.join(targetDir, "index.html"), routeHtml, "utf8");
    console.log(`Prerendered: /${route.path}/index.html`);
});

console.log("Static prerendering completed successfully.");
