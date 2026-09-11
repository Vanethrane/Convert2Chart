import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  units,
  temperatureUnits,
  convertUnit
} from "../src/data/conversions.js";
import {
  getConversionPages,
  getConversionSlug,
  getUniqueConversionPages,
  getCategoryHubs
} from "../src/data/conversionPages.js";
import {
  SITE_URL,
  HOME_TITLE,
  HOME_DESCRIPTION,
  escapeHtml,
  buildFaqSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildHomeSchema,
  buildSitemapEntries,
  chunkSitemapEntries,
  buildUrlsetXml,
  buildSitemapIndexXml,
  buildRobotsTxt,
  pageCanonical
} from "../src/utils/seo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const pages = getUniqueConversionPages();
const hubs = getCategoryHubs();

function format(value) {
  if (!Number.isFinite(value)) return "0";

  const truncated =
    Math.trunc(value * 1_000_000) / 1_000_000;

  return Number(truncated.toFixed(6)).toString();
}

function getFormula(page) {
  if (page.category === "temperature") {
    if (page.fromKey === "celsius" && page.toKey === "fahrenheit")
      return "F = (C x 9/5) + 32";

    if (page.fromKey === "fahrenheit" && page.toKey === "celsius")
      return "C = (F - 32) x 5/9";

    if (page.fromKey === "celsius" && page.toKey === "kelvin")
      return "K = C + 273.15";

    if (page.fromKey === "kelvin" && page.toKey === "celsius")
      return "C = K - 273.15";

    if (page.fromKey === "fahrenheit" && page.toKey === "kelvin")
      return "K = (F - 32) x 5/9 + 273.15";

    if (page.fromKey === "kelvin" && page.toKey === "fahrenheit")
      return "F = (K - 273.15) x 9/5 + 32";
  }

  const ratio = convertUnit(
    1,
    page.fromKey,
    page.toKey,
    page.category
  );

  return `1 ${page.from.symbol} = ${format(ratio)} ${page.to.symbol}`;
}

function getCommonValues(page) {
  if (page.category === "temperature") {
    return [-40, -20, 0, 10, 20, 25, 30, 37, 50, 100];
  }

  const values = {
    length: [1, 5, 10, 12, 20, 50, 100],
    weight: [1, 5, 10, 20, 50, 100],
    volume: [1, 2, 5, 10, 20, 50, 100],
    area: [1, 10, 50, 100, 500, 1000],
    speed: [1, 5, 10, 25, 50, 60, 100],
    pressure: [1, 5, 10, 20, 50, 100],
    energy: [1, 5, 10, 50, 100, 500, 1000],
    power: [1, 5, 10, 50, 100, 500, 1000],
    time: [1, 5, 10, 15, 30, 60, 120],
    data: [1, 5, 10, 25, 50, 100],
    frequency: [1, 10, 100, 1000, 10000, 1000000],
    angle: [0, 30, 45, 90, 180, 360],
    force: [1, 5, 10, 25, 50, 100],
    torque: [1, 5, 10, 25, 50, 100],
    fuelEconomy: [1, 5, 10, 20, 30, 50, 100],
    density: [1, 5, 10, 50, 100, 500],
    cooking: [1, 2, 4, 8, 16, 32, 64]
  };

  return values[page.category] || [1, 5, 10, 20, 50, 100];
}

function getRelated(page) {
  const results = [];

  if (page.category === "temperature") {
    for (const [fromKey, from] of Object.entries(temperatureUnits)) {
      for (const [toKey, to] of Object.entries(temperatureUnits)) {
        if (
          fromKey === toKey ||
          (fromKey === page.fromKey && toKey === page.toKey)
        ) {
          continue;
        }

        results.push({
          slug: getConversionSlug("temperature", fromKey, toKey),
          label: `${from.name} to ${to.name}`
        });
      }
    }
  } else {
    const data = units[page.category];

    for (const [fromKey, from] of Object.entries(data.units)) {
      for (const [toKey, to] of Object.entries(data.units)) {
        if (
          fromKey === toKey ||
          (fromKey === page.fromKey && toKey === page.toKey)
        ) {
          continue;
        }

        results.push({
          slug: getConversionSlug(page.category, fromKey, toKey),
          label: `${from.name} to ${to.name}`
        });
      }
    }
  }

  return results.filter(item => item.slug).slice(0, 12);
}

function injectHeadSeo(html, {
  title,
  description,
  canonical,
  jsonLd = []
}) {
  let next = html;

  next = next.replace(/<title>[\s\S]*?<\/title>/gi, "");

  if (/<head[^>]*>/i.test(next)) {
    next = next.replace(
      /<head[^>]*>/i,
      `$&\n    <title>${escapeHtml(title)}</title>`
    );
  } else {
    next = `<title>${escapeHtml(title)}</title>\n${next}`;
  }

  const descriptionTag =
    `<meta name="description" content="${escapeHtml(description)}">`;

  if (/<meta\s+name=["']description["'][^>]*>/i.test(next)) {
    next = next.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      descriptionTag
    );
  } else {
    next = next.replace(
      /<\/head>/i,
      `    ${descriptionTag}\n  </head>`
    );
  }

  const canonicalTag =
    `<link rel="canonical" href="${canonical}">`;

  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(next)) {
    next = next.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      canonicalTag
    );
  } else {
    next = next.replace(
      /<\/head>/i,
      `    ${canonicalTag}\n  </head>`
    );
  }

  next = next
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, "");

  const headExtras = `
    <meta name="robots" content="index, follow">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Convert2Chart">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    ${jsonLd
      .filter(Boolean)
      .map(
        data =>
          `<script type="application/ld+json">${JSON.stringify(data)}</script>`
      )
      .join("\n    ")}
  </head>`;

  next = next.replace(/<\/head>/i, headExtras);

  return next;
}

function buildStaticPage(page, template) {
  const from = page.from.name.toLowerCase();
  const to = page.to.name.toLowerCase();

  const title = page.title;
  const description = page.description;
  const canonical = pageCanonical(page.slug);
  const formula = getFormula(page);
  const values = getCommonValues(page);

  const rows = values.map(value => {
    const result = convertUnit(
      value,
      page.fromKey,
      page.toKey,
      page.category
    );

    return `
              <tr>
                <td>${escapeHtml(value)} ${escapeHtml(page.from.symbol)}</td>
                <td>${escapeHtml(format(result))} ${escapeHtml(page.to.symbol)}</td>
              </tr>`;
  }).join("");

  const ratio = format(
    convertUnit(
      1,
      page.fromKey,
      page.toKey,
      page.category
    )
  );

  const related = getRelated(page)
    .map(item =>
      `<a href="/${item.slug}/">${escapeHtml(item.label)}</a>`
    )
    .join("\n            ");

  const faqs = [
    {
      q: `How many ${to} are in one ${from}?`,
      a: `One ${from} equals ${ratio} ${to}.`
    },
    {
      q: `What is 1 ${from} in ${to}?`,
      a: `1 ${from} is equal to ${ratio} ${to}.`
    },
    {
      q: `How do I convert ${from} to ${to}?`,
      a: `Enter a ${from} value in the converter. Convert2Chart automatically calculates the equivalent value in ${to}.`
    },
    {
      q: `What is the formula for ${from} to ${to}?`,
      a: `The conversion formula for ${from} to ${to} is ${formula}.`
    },
    {
      q: `What is the ${from} to ${to} conversion?`,
      a: `The ${from} to ${to} conversion uses the standard relationship between these two units. The calculator above can convert any value instantly.`
    },
    {
      q: `Is there a ${from} to ${to} calculator?`,
      a: `Yes. Use the free ${from} to ${to} calculator at the top of this page to convert values instantly.`
    }
  ];

  const faqHtml = faqs.map(faq => `
            <details>
              <summary>${escapeHtml(faq.q)}</summary>
              <p>${escapeHtml(faq.a)}</p>
            </details>`).join("");

  const staticContent = `
    <nav class="nav">
      <a href="/" class="logo">Convert2Chart</a>
    </nav>

    <section class="hero">
      <p class="tagline">${escapeHtml(page.categoryName || page.category).toUpperCase()}</p>

      <h1 class="page-title">
        ${escapeHtml(page.from.name)} to ${escapeHtml(page.to.name)} Converter
      </h1>

      <p class="page-description">
        Convert ${escapeHtml(from)} to ${escapeHtml(to)} quickly and accurately with this free online calculator. ${escapeHtml(formula)}.
      </p>

      <article class="seo-content">

        <h2>
          ${escapeHtml(page.from.name)} to ${escapeHtml(page.to.name)} conversion
        </h2>

        <p>
          Use this ${escapeHtml(from)} to ${escapeHtml(to)} converter to convert values quickly and accurately.
          This free online calculator provides the standard conversion relationship, formula, examples,
          and common reference values.
        </p>

        <h2>
          How to convert ${escapeHtml(from)} to ${escapeHtml(to)}
        </h2>

        <p>
          To convert ${escapeHtml(from)} to ${escapeHtml(to)}, enter your value in the calculator above.
          The result is calculated automatically using the standard conversion relationship between the two units.
        </p>

        <div class="formula-box">
          <strong>Conversion formula</strong>
          <code>${escapeHtml(formula)}</code>
        </div>

        <h2>
          ${escapeHtml(page.from.name)} to ${escapeHtml(page.to.name)} chart
        </h2>

        <table>
          <thead>
            <tr>
              <th>${escapeHtml(page.from.name)}</th>
              <th>${escapeHtml(page.to.name)}</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <h2>
          Common ${escapeHtml(from)} to ${escapeHtml(to)} conversions
        </h2>

        <p>
          Common conversion searches include
          <strong>${escapeHtml(from)} to ${escapeHtml(to)} converter</strong>,
          <strong>convert ${escapeHtml(from)} to ${escapeHtml(to)}</strong>,
          <strong>${escapeHtml(from)} to ${escapeHtml(to)} calculator</strong>,
          ${escapeHtml(from)} in ${escapeHtml(to)}, and
          how to convert ${escapeHtml(from)} to ${escapeHtml(to)}.
        </p>

        <h2>Related conversions</h2>

        <div class="related-links">
          ${related}
        </div>

        <p>
          <a href="/${escapeHtml(
            hubs.find(hub => hub.category === page.category)?.slug || "conversions"
          )}/">More ${escapeHtml(page.categoryName)} conversions</a>
          ·
          <a href="/conversions/">All categories</a>
        </p>

        <h2>Frequently asked questions</h2>

        <div class="faq">
          ${faqHtml}
        </div>

      </article>
    </section>
  `;

  let html = injectHeadSeo(template, {
    title,
    description,
    canonical,
    jsonLd: [
      buildWebPageSchema({
        title,
        description,
        canonical,
        categoryName: page.categoryName
      }),
      buildBreadcrumbSchema(page.slug, page.from.name, page.to.name),
      buildFaqSchema(faqs, canonical)
    ]
  });

  html = html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${staticContent}</div>`
  );

  return html;
}

function buildHomePage(template) {
  const popular = [
    ["meters-to-feet", "Meters to Feet"],
    ["feet-to-meters", "Feet to Meters"],
    ["kilograms-to-pounds", "Kilograms to Pounds"],
    ["pounds-to-kilograms", "Pounds to Kilograms"],
    ["celsius-to-fahrenheit", "Celsius to Fahrenheit"],
    ["fahrenheit-to-celsius", "Fahrenheit to Celsius"],
    ["kilometers-to-miles", "Kilometers to Miles"],
    ["miles-to-kilometers", "Miles to Kilometers"],
    ["liters-to-gallons", "Liters to US Gallons"],
    ["inches-to-centimeters", "Inches to Centimeters"],
    ["cooking/cups-to-milliliters", "Cups to Milliliters"],
    ["cooking/tablespoons-to-teaspoons", "Tablespoons to Teaspoons"]
  ];

  const categoryLinks = hubs.map(hub => [hub.slug, hub.categoryName]);

  const homeSeo = `
    <section class="seo-content home-seo">
      <h2>Popular unit conversions</h2>
      <p>
        Jump to commonly searched converters, or use the calculator above to convert any supported unit pair.
      </p>
      <div class="related-links">
        ${popular
          .map(
            ([slug, label]) =>
              `<a href="/${slug}/">${escapeHtml(label)}</a>`
          )
          .join("\n        ")}
      </div>
      <h2>Unit categories</h2>
      <p>
        Convert2Chart covers everyday and technical measurements, including electrical, thermal, magnetic, chemical, and cooking units.
        <a href="/conversions/">Browse the full conversion sitemap</a>.
      </p>
      <div class="related-links">
        ${categoryLinks
          .map(
            ([slug, label]) =>
              `<a href="/${slug}/">${escapeHtml(label)}</a>`
          )
          .join("\n        ")}
      </div>
    </section>
  `;

  let html = injectHeadSeo(template, {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: pageCanonical(),
    jsonLd: [buildHomeSchema()]
  });

  html = html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root"><nav class="nav"><a href="/" class="logo">Convert2Chart</a></nav><section class="hero"><p class="tagline">SIMPLE. FAST. ACCURATE.</p><h1 class="home-title">Unit Converter</h1><p class="home-description">${escapeHtml(HOME_DESCRIPTION)}</p></section>${homeSeo}</div>`
  );

  return html;
}

function buildCategoryHubPage(hub, template) {
  const canonical = pageCanonical(hub.slug);
  const title = hub.title;
  const description = hub.description;

  const links = hub.pages
    .map(
      item =>
        `<a href="/${item.slug}/">${escapeHtml(item.label)}</a>`
    )
    .join("\n            ");

  const staticContent = `
    <nav class="nav">
      <a href="/" class="logo">Convert2Chart</a>
    </nav>

    <section class="hero">
      <p class="tagline">${escapeHtml(hub.categoryName).toUpperCase()}</p>
      <h1 class="page-title">${escapeHtml(hub.categoryName)} Unit Conversions</h1>
      <p class="page-description">
        Explore every ${escapeHtml(hub.categoryName.toLowerCase())} conversion on Convert2Chart.
        Each page includes a calculator, formula, chart, and examples.
      </p>

      <article class="seo-content">
        <h2>All ${escapeHtml(hub.categoryName.toLowerCase())} converters</h2>
        <p>
          ${hub.pages.length} crawlable ${escapeHtml(hub.categoryName.toLowerCase())}
          conversion pages are listed below.
        </p>
        <div class="related-links">
          ${links}
        </div>
        <p>
          <a href="/conversions/">View all unit categories</a>
        </p>
      </article>
    </section>
  `;

  let html = injectHeadSeo(template, {
    title,
    description,
    canonical,
    jsonLd: [
      buildWebPageSchema({
        title,
        description,
        canonical,
        categoryName: hub.categoryName
      })
    ]
  });

  return html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${staticContent}</div>`
  );
}

function buildHtmlSitemapPage(template, categoryHubs) {
  const canonical = pageCanonical("conversions");
  const title = "All Unit Conversions Sitemap | Convert2Chart";
  const description =
    "Complete HTML sitemap of every Convert2Chart unit category and conversion page for crawling and discovery.";

  const sections = categoryHubs
    .map(hub => {
      const preview = hub.pages
        .slice(0, 24)
        .map(
          item =>
            `<a href="/${item.slug}/">${escapeHtml(item.label)}</a>`
        )
        .join("\n            ");

      return `
        <h2><a href="/${hub.slug}/">${escapeHtml(hub.categoryName)}</a></h2>
        <p>${hub.pages.length} converters in this category.</p>
        <div class="related-links">
          ${preview}
        </div>
        <p><a href="/${hub.slug}/">See all ${escapeHtml(hub.categoryName)} conversions</a></p>
      `;
    })
    .join("\n");

  const staticContent = `
    <nav class="nav">
      <a href="/" class="logo">Convert2Chart</a>
    </nav>

    <section class="hero">
      <p class="tagline">SITEMAP</p>
      <h1 class="page-title">All Unit Conversions</h1>
      <p class="page-description">
        Browse every category and conversion page on Convert2Chart.
      </p>

      <article class="seo-content">
        ${sections}
      </article>
    </section>
  `;

  let html = injectHeadSeo(template, {
    title,
    description,
    canonical,
    jsonLd: [
      buildWebPageSchema({
        title,
        description,
        canonical
      })
    ]
  });

  return html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${staticContent}</div>`
  );
}

const indexHtml = fs.readFileSync(
  path.join(dist, "index.html"),
  "utf8"
);

fs.writeFileSync(
  path.join(dist, "index.html"),
  buildHomePage(indexHtml)
);

const conversionsDir = path.join(dist, "conversions");
fs.mkdirSync(conversionsDir, { recursive: true });
fs.writeFileSync(
  path.join(conversionsDir, "index.html"),
  buildHtmlSitemapPage(indexHtml, hubs)
);

for (const hub of hubs) {
  const dir = path.join(dist, hub.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    buildCategoryHubPage(hub, indexHtml)
  );
}

for (const page of pages) {
  const dir = path.join(dist, page.slug);

  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.join(dir, "index.html"),
    buildStaticPage(page, indexHtml)
  );
}

const sitemapEntries = buildSitemapEntries({ pages, hubs });
const sitemapChunks = chunkSitemapEntries(sitemapEntries);
const sitemapsDir = path.join(dist, "sitemaps");
fs.mkdirSync(sitemapsDir, { recursive: true });

sitemapChunks.forEach((chunk, index) => {
  fs.writeFileSync(
    path.join(sitemapsDir, `sitemap-${index + 1}.xml`),
    buildUrlsetXml(chunk)
  );
});

fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  buildSitemapIndexXml(sitemapChunks.length)
);

fs.writeFileSync(
  path.join(dist, "robots.txt"),
  buildRobotsTxt()
);

fs.writeFileSync(path.join(dist, ".nojekyll"), "");

console.log(
  `Generated ${pages.length} static conversion pages (from ${getConversionPages().length} definitions).`
);
console.log(`Generated ${hubs.length} category hub pages`);
console.log("Generated /conversions/ HTML sitemap");
console.log(
  `Generated sitemap index with ${sitemapChunks.length} parts (${sitemapEntries.length} total URLs)`
);
console.log("Generated robots.txt");
console.log("Wrote .nojekyll");
