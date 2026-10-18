const fs = require("fs");
const path = require("path");
const { SEO_CONFIG } = require("../src/utils/seoConfig");

const BUILD_DIR = path.join(__dirname, "..", "build");
const BASE_HTML_PATH = path.join(BUILD_DIR, "index.html");

if (!fs.existsSync(BASE_HTML_PATH)) {
    console.error("Build directory or index.html not found. Run npm run build first.");
    process.exit(1);
}

let baseHtml = fs.readFileSync(BASE_HTML_PATH, "utf8");

// Ensure exact responsive viewport meta tag: width=device-width, initial-scale=1.0
baseHtml = baseHtml.replace(
    /<meta name="viewport" content="[^"]*"\s*\/?>/i,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
);

// Also inject Schema.org JSON-LD into the root build/index.html for the homepage
if (SEO_CONFIG.home && SEO_CONFIG.home.schema) {
    const homeSchemaTag = `<script type="application/ld+json">${JSON.stringify(SEO_CONFIG.home.schema)}</script>`;
    if (!baseHtml.includes("application/ld+json")) {
        baseHtml = baseHtml.replace("</head>", `${homeSchemaTag}</head>`);
    }
}
fs.writeFileSync(BASE_HTML_PATH, baseHtml, "utf8");
console.log("Updated root /index.html with viewport and Schema.org JSON-LD");

const ROUTES = [
    {
        path: "about",
        title: SEO_CONFIG.about.title,
        description: SEO_CONFIG.about.description,
        canonical: SEO_CONFIG.about.canonicalUrl,
        schema: SEO_CONFIG.about.schema,
        h1: "About Our Munnar Taxi Service",
        summary: "Jothilaxmi Cabs is a leading taxi and tour operator in Munnar, Kerala. We provide safe, comfortable, and affordable transportation with experienced local drivers for Cochin airport transfers, sightseeing tours, and outstation trips."
    },
    {
        path: "our-tour-packages",
        title: SEO_CONFIG.packages.title,
        description: SEO_CONFIG.packages.description,
        canonical: SEO_CONFIG.packages.canonicalUrl,
        schema: SEO_CONFIG.packages.schema,
        h1: "Munnar Tour Packages & Sightseeing Taxi Fares",
        summary: "Discover full-day and multi-day tour packages in Munnar and across Kerala. Enjoy sightseeing tours to Mattupetty Dam, Top Station, and Eravikulam National Park with transparent fares and comfortable vehicles."
    },
    {
        path: "places-to-visit",
        title: SEO_CONFIG.places.title,
        description: SEO_CONFIG.places.description,
        canonical: SEO_CONFIG.places.canonicalUrl,
        schema: SEO_CONFIG.places.schema,
        h1: "Top Places to Visit in Munnar",
        summary: "Explore Munnar's famous tourist spots: rolling tea plantations, Eravikulam National Park, Mattupetty Dam, Echo Point, Kundala Lake, and Attukad Waterfalls with private sightseeing taxi cabs."
    },
    {
        path: "contact-us",
        title: SEO_CONFIG.contact.title,
        description: SEO_CONFIG.contact.description,
        canonical: SEO_CONFIG.contact.canonicalUrl,
        schema: SEO_CONFIG.contact.schema,
        h1: "Contact Us - Munnar Taxi Booking",
        summary: "Contact Jothilaxmi Cabs for 24/7 taxi booking in Munnar. Call +91 94003 80433 or +91 90611 40533 for Cochin airport pickups, sightseeing cab rentals, and custom holiday quotes."
    },
    {
        path: "packages",
        title: SEO_CONFIG.packages.title,
        description: SEO_CONFIG.packages.description,
        canonical: SEO_CONFIG.packages.canonicalUrl,
        schema: SEO_CONFIG.packages.schema,
        h1: "Munnar Tour Packages & Sightseeing Taxi Fares",
        summary: "Discover full-day and multi-day tour packages in Munnar and across Kerala. Enjoy sightseeing tours to Mattupetty Dam, Top Station, and Eravikulam National Park with transparent fares and comfortable vehicles."
    },
    {
        path: "placetovisit",
        title: SEO_CONFIG.places.title,
        description: SEO_CONFIG.places.description,
        canonical: SEO_CONFIG.places.canonicalUrl,
        schema: SEO_CONFIG.places.schema,
        h1: "Top Places to Visit in Munnar",
        summary: "Explore Munnar's famous tourist spots: rolling tea plantations, Eravikulam National Park, Mattupetty Dam, Echo Point, Kundala Lake, and Attukad Waterfalls with private sightseeing taxi cabs."
    },
    {
        path: "contact",
        title: SEO_CONFIG.contact.title,
        description: SEO_CONFIG.contact.description,
        canonical: SEO_CONFIG.contact.canonicalUrl,
        schema: SEO_CONFIG.contact.schema,
        h1: "Contact Us - Munnar Taxi Booking",
        summary: "Contact Jothilaxmi Cabs for 24/7 taxi booking in Munnar. Call +91 94003 80433 or +91 90611 40533 for Cochin airport pickups, sightseeing cab rentals, and custom holiday quotes."
    }
];

ROUTES.forEach((route) => {
    let routeHtml = baseHtml;

    // Replace Title with data-rh="true" to prevent React Helmet duplicates
    routeHtml = routeHtml.replace(
        /<title.*?>.*?<\/title>/i,
        `<title data-rh="true">${route.title}</title>`
    );

    // Replace Meta Description
    routeHtml = routeHtml.replace(
        /<meta[^>]*?name="description"[^>]*?>/i,
        `<meta data-rh="true" name="description" content="${route.description}" />`
    );

    // Replace Canonical Link
    routeHtml = routeHtml.replace(
        /<link[^>]*?rel="canonical"[^>]*?>/i,
        `<link data-rh="true" rel="canonical" href="${route.canonical}" />`
    );

    // Replace OG Title & Description & URL
    routeHtml = routeHtml.replace(
        /<meta[^>]*?property="og:title"[^>]*?>/i,
        `<meta data-rh="true" property="og:title" content="${route.title}" />`
    );
    routeHtml = routeHtml.replace(
        /<meta[^>]*?property="og:description"[^>]*?>/i,
        `<meta data-rh="true" property="og:description" content="${route.description}" />`
    );
    routeHtml = routeHtml.replace(
        /<meta[^>]*?property="og:url"[^>]*?>/i,
        `<meta data-rh="true" property="og:url" content="${route.canonical}" />`
    );

    // Replace Twitter Title & Description
    routeHtml = routeHtml.replace(
        /<meta[^>]*?name="twitter:title"[^>]*?>/i,
        `<meta data-rh="true" name="twitter:title" content="${route.title}" />`
    );
    routeHtml = routeHtml.replace(
        /<meta[^>]*?name="twitter:description"[^>]*?>/i,
        `<meta data-rh="true" name="twitter:description" content="${route.description}" />`
    );

    // Replace or inject JSON-LD schema
    if (route.schema) {
        const schemaTag = `<script type="application/ld+json">${JSON.stringify(route.schema)}</script>`;
        if (routeHtml.includes("application/ld+json")) {
            routeHtml = routeHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, schemaTag);
        } else {
            routeHtml = routeHtml.replace("</head>", `${schemaTag}</head>`);
        }
    }

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
