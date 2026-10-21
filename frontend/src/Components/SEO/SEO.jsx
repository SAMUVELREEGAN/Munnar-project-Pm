import { Helmet } from "react-helmet-async";

const DEFAULT_SITE_NAME = "Munnar Taxi Service | Jothilaxmi Cabs";
const DEFAULT_IMAGE = "https://munnarjothilaxmitaxi.com/images/Munnar-bg.webp";
const BASE_URL = "https://munnarjothilaxmitaxi.com";

export default function SEO({
    title,
    description,
    canonicalUrl,
    ogType = "website",
    ogImage = DEFAULT_IMAGE,
    noindex = false,
    keywords,
    schema,
}) {
    const fullCanonical = canonicalUrl
        ? (canonicalUrl.startsWith("http") ? canonicalUrl : `${BASE_URL}${canonicalUrl}`)
        : BASE_URL;

    return (
        <Helmet>
            {/* Primary SEO Meta */}
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />
            <html lang="en" />
            <link rel="canonical" href={fullCanonical} />

            {/* Self-referencing hreflang (single-language site) */}
            <link rel="alternate" hrefLang="en" href={fullCanonical} />
            <link rel="alternate" hrefLang="en-IN" href={fullCanonical} />
            <link rel="alternate" hrefLang="x-default" href={fullCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content={DEFAULT_SITE_NAME} />
            <meta property="og:locale" content="en_IN" />
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            {title && <meta name="twitter:title" content={title} />}
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={ogImage} />

            {/* Structured Data (Schema.org JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
}
