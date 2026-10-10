import { SITE_URL } from "./urls.js";

export { SITE_URL };

export const HOME_TITLE =
  "Unit Converter | Convert Length, Weight, Temperature & More | Convert2Chart";

export const HOME_DESCRIPTION =
  "Free online unit converter for length, weight, volume, temperature, area, speed, pressure, energy, power, time, data, cooking, and 50+ more unit categories. Fast, accurate conversions with formulas and charts.";

export function pageCanonical(slug) {
  if (!slug) {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}/${slug}/`;
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildFaqSchema(faqs, canonical) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question || faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer || faq.a
      }
    })),
    url: canonical
  };
}

export function buildWebPageSchema({
  title,
  description,
  canonical,
  categoryName
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "Convert2Chart",
      url: `${SITE_URL}/`
    },
    about: categoryName
      ? {
          "@type": "Thing",
          name: categoryName
        }
      : undefined
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.slug ? pageCanonical(item.slug) : pageCanonical()
    }))
  };
}

export function buildHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Convert2Chart Unit Converter",
    url: `${SITE_URL}/`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    description: HOME_DESCRIPTION
  };
}

export const SITEMAP_CHUNK_SIZE = 400;

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

export function buildUrlsetXml(entries, siteUrl = SITE_URL) {
  const lastmod = todayStamp();
  const urls = entries.map(entry => {
    const loc =
      entry.slug === "" || entry.slug == null
        ? `${siteUrl}/`
        : `${siteUrl}/${entry.slug}/`;

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${entry.lastmod || lastmod}</lastmod>
    <changefreq>${entry.changefreq || "monthly"}</changefreq>
    <priority>${entry.priority ?? "0.8"}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

/**
 * Build a flat list of every crawlable URL entry for the site.
 */
export function buildSitemapEntries({
  pages = [],
  hubs = [],
  includeHtmlSitemap = true
} = {}) {
  const entries = [
    {
      slug: "",
      changefreq: "weekly",
      priority: "1.0"
    }
  ];

  if (includeHtmlSitemap) {
    entries.push({
      slug: "conversions",
      changefreq: "weekly",
      priority: "0.9"
    });
  }

  for (const hub of hubs) {
    entries.push({
      slug: hub.slug,
      changefreq: "weekly",
      priority: "0.9"
    });
  }

  for (const page of pages) {
    entries.push({
      slug: page.slug,
      changefreq: "monthly",
      priority: "0.8"
    });
  }

  return entries;
}

export function chunkSitemapEntries(
  entries,
  chunkSize = SITEMAP_CHUNK_SIZE
) {
  const chunks = [];

  for (let i = 0; i < entries.length; i += chunkSize) {
    chunks.push(entries.slice(i, i + chunkSize));
  }

  return chunks.length > 0 ? chunks : [[]];
}

export function buildSitemapIndexXml(partCount, siteUrl = SITE_URL) {
  const lastmod = todayStamp();
  const parts = [];

  for (let i = 1; i <= partCount; i += 1) {
    parts.push(`  <sitemap>
    <loc>${siteUrl}/sitemaps/sitemap-${i}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${parts.join("\n")}
</sitemapindex>
`;
}

/** @deprecated Prefer sitemap index helpers; kept for simple single-file use. */
export function buildSitemapXml(pages, siteUrl = SITE_URL) {
  return buildUrlsetXml(
    buildSitemapEntries({ pages, hubs: [], includeHtmlSitemap: false }),
    siteUrl
  );
}

export function buildRobotsTxt(siteUrl = SITE_URL) {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

/**
 * Apply document head tags in the browser.
 */
export function applyDocumentSeo({
  title,
  description,
  canonical,
  jsonLd = []
}) {
  if (typeof document === "undefined") return;

  document.title = title;

  setNamedMeta("description", description);
  setNamedMeta("robots", "index, follow");

  let canonicalEl = document.querySelector('link[rel="canonical"]');

  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.rel = "canonical";
    document.head.appendChild(canonicalEl);
  }

  canonicalEl.href = canonical;

  setPropertyMeta("og:type", "website");
  setPropertyMeta("og:site_name", "Convert2Chart");
  setPropertyMeta("og:title", title);
  setPropertyMeta("og:description", description);
  setPropertyMeta("og:url", canonical);

  setNamedMeta("twitter:card", "summary");
  setNamedMeta("twitter:title", title);
  setNamedMeta("twitter:description", description);

  document
    .querySelectorAll('script[data-seo-jsonld="true"]')
    .forEach(node => node.remove());

  for (const data of jsonLd) {
    if (!data) continue;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-jsonld", "true");
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
}

function setNamedMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
}

function setPropertyMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
}
