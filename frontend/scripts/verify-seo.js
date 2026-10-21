const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");

console.log("==========================================");
console.log("TECHNICAL SEO VERIFICATION SUITE");
console.log("==========================================");

let failed = false;

function check(testName, condition, details) {
    if (condition) {
        console.log(`[PASS] ${testName}`);
        if (details) console.log(`       ${details}`);
    } else {
        console.error(`[FAIL] ${testName}`);
        if (details) console.error(`       ${details}`);
        failed = true;
    }
}

// 1. Favicon verification
const favIco = path.join(BUILD_DIR, "favicon.ico");
const fav32 = path.join(BUILD_DIR, "favicon-32x32.png");
const fav16 = path.join(BUILD_DIR, "favicon-16x16.png");
const appleIcon = path.join(BUILD_DIR, "apple-touch-icon.png");

check("Favicon ICO exists", fs.existsSync(favIco), `Size: ${fs.existsSync(favIco) ? fs.statSync(favIco).size : 0} bytes`);
check("Favicon PNG 32x32 exists", fs.existsSync(fav32), `Size: ${fs.existsSync(fav32) ? fs.statSync(fav32).size : 0} bytes`);
check("Favicon PNG 16x16 exists", fs.existsSync(fav16), `Size: ${fs.existsSync(fav16) ? fs.statSync(fav16).size : 0} bytes`);
check("Apple Touch Icon exists", fs.existsSync(appleIcon), `Size: ${fs.existsSync(appleIcon) ? fs.statSync(appleIcon).size : 0} bytes`);

// 2. Robots.txt verification
const robotsPath = path.join(BUILD_DIR, "robots.txt");
const robotsContent = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, "utf8") : "";
check("Robots.txt exists", fs.existsSync(robotsPath));
check("Robots.txt has Allow: /", robotsContent.includes("Allow: /"));
check("Robots.txt declares Sitemap", robotsContent.includes("Sitemap: https://munnarjothilaxmitaxi.com/sitemap.xml"));

// 3. Sitemap.xml verification
const sitemapPath = path.join(BUILD_DIR, "sitemap.xml");
const sitemapContent = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
check("Sitemap.xml exists", fs.existsSync(sitemapPath));
check("Sitemap contains homepage", sitemapContent.includes("<loc>https://munnarjothilaxmitaxi.com/</loc>"));
check("Sitemap contains packages", sitemapContent.includes("<loc>https://munnarjothilaxmitaxi.com/our-tour-packages</loc>"));
check("Sitemap contains places", sitemapContent.includes("<loc>https://munnarjothilaxmitaxi.com/places-to-visit</loc>"));
check("Sitemap contains about", sitemapContent.includes("<loc>https://munnarjothilaxmitaxi.com/about</loc>"));
check("Sitemap contains contact", sitemapContent.includes("<loc>https://munnarjothilaxmitaxi.com/contact-us</loc>"));
check("Sitemap does NOT contain redirect aliases", !sitemapContent.includes("/packages<") && !sitemapContent.includes("/placetovisit<"));

// 4. HTML Lang & Canonical & Titles across pages
const PAGES = [
    { file: "index.html", expectedCanon: "https://munnarjothilaxmitaxi.com/", expectedH1: "Munnar Taxi Service", titleMin: 50, titleMax: 60, descMin: 100, descMax: 130 },
    { file: "about/index.html", expectedCanon: "https://munnarjothilaxmitaxi.com/about", expectedH1: "About Our Munnar Taxi Service", titleMin: 50, titleMax: 60, descMin: 100, descMax: 130 },
    { file: "our-tour-packages/index.html", expectedCanon: "https://munnarjothilaxmitaxi.com/our-tour-packages", expectedH1: "Munnar Tour Packages", titleMin: 50, titleMax: 60, descMin: 100, descMax: 130 },
    { file: "places-to-visit/index.html", expectedCanon: "https://munnarjothilaxmitaxi.com/places-to-visit", expectedH1: "Top Places to Visit in Munnar", titleMin: 50, titleMax: 60, descMin: 100, descMax: 130 },
    { file: "contact-us/index.html", expectedCanon: "https://munnarjothilaxmitaxi.com/contact-us", expectedH1: "Contact Us - Munnar Taxi Booking", titleMin: 50, titleMax: 60, descMin: 100, descMax: 130 }
];

PAGES.forEach((page) => {
    const filePath = path.join(BUILD_DIR, page.file);
    const html = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";

    console.log(`\n--- Auditing: ${page.file} ---`);
    check(`${page.file} exists`, fs.existsSync(filePath));
    check(`${page.file} has <html lang="en">`, /<html[^>]*?lang="en"/i.test(html));

    // Title test
    const titleMatch = html.match(/<title[^>]*?>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";
    check(`${page.file} title length (${title.length} chars: "${title}")`, title.length >= page.titleMin && title.length <= page.titleMax);

    // Description test
    const descMatch = html.match(/<meta[^>]*?name="description"[^>]*?content="([\s\S]*?)"/i);
    const desc = descMatch ? descMatch[1].trim() : "";
    check(`${page.file} description length (${desc.length} chars)`, desc.length >= page.descMin && desc.length <= page.descMax, desc);

    // Canonical link test
    const canonMatches = [...html.matchAll(/<link[^>]*?rel="canonical"[^>]*?href="([\s\S]*?)"/gi)];
    check(`${page.file} has exactly 1 canonical tag`, canonMatches.length === 1);
    if (canonMatches.length > 0) {
        check(`${page.file} canonical URL is ${page.expectedCanon}`, canonMatches[0][1] === page.expectedCanon);
    }

    // Robots meta test
    const robotsMatch = html.match(/<meta[^>]*?name="robots"[^>]*?content="([\s\S]*?)"/i);
    check(`${page.file} robots is index, follow`, robotsMatch && robotsMatch[1].includes("index") && !robotsMatch[1].includes("noindex"));

    // Hreflang self-references
    check(`${page.file} has hreflang en`, /hreflang="en"/i.test(html));
    check(`${page.file} has hreflang en-IN`, /hreflang="en-IN"/i.test(html));
    check(`${page.file} has hreflang x-default`, /hreflang="x-default"/i.test(html));

    // Favicon links
    check(`${page.file} links favicon.ico`, /rel="icon"[^>]*favicon\.ico/i.test(html) || /href="[^"]*favicon\.ico"/i.test(html));

    // H1 check in body
    check(`${page.file} has <h1> heading`, /<h1[^>]*?>([\s\S]*?)<\/h1>/i.test(html));

    // Crawlable word count (strip tags roughly)
    const bodyText = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    check(`${page.file} has substantial content (${wordCount} words)`, wordCount >= 120, `Need crawlable text for SEMrush / bots`);

    // Structured data check
    const hasSchema = html.includes("application/ld+json");
    check(`${page.file} has JSON-LD schema`, hasSchema);
    if (hasSchema) {
        try {
            const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
            JSON.parse(schemaMatch[1]);
            check(`${page.file} JSON-LD parses`, true);
        } catch (e) {
            check(`${page.file} JSON-LD parses`, false, e.message);
        }
    }
});

// 5. Hostinger rewrite rules present
const htaccessPath = path.join(BUILD_DIR, ".htaccess");
check(".htaccess exists for Hostinger SPA + static files", fs.existsSync(htaccessPath));

console.log("\n==========================================");
if (failed) {
    console.error("VERIFICATION FAILED: Some checks did not pass.");
    process.exit(1);
} else {
    console.log("ALL TECHNICAL SEO CHECKS PASSED PERFECTLY!");
    console.log("==========================================");
}
