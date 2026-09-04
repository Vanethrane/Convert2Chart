import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  units,
  temperatureUnits,
  convertUnit
} from "../src/data/conversions.js";
import { getConversionPages } from "../src/data/conversionPages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const SITE_URL = "https://www.convert2chart.com";
const pages = getConversionPages();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function format(value) {
  if (!Number.isFinite(value)) return "0";

  const truncated =
    Math.trunc(value * 1_000_000) / 1_000_000;

  return Number(truncated.toFixed(6)).toString();
}

function singularize(name) {
  const irregular = {
    feet: "foot",
    inches: "inch",
    yards: "yard",
    miles: "mile",
    meters: "meter",
    centimeters: "centimeter",
    millimeters: "millimeter",
    kilometers: "kilometer",
    pounds: "pound",
    ounces: "ounce",
    grams: "gram",
    kilograms: "kilogram",
    milligrams: "milligram",
    stones: "stone",
    tons: "ton",
    liters: "liter",
    milliliters: "milliliter",
    teaspoons: "teaspoon",
    tablespoons: "tablespoon",
    cups: "cup",
    pints: "pint",
    quarts: "quart",
    gallons: "gallon",
    degrees: "degree",
    radians: "radian",
    newtons: "newton",
    kilonewtons: "kilonewton",
    watts: "watt",
    kilowatts: "kilowatt",
    joules: "joule",
    kilojoules: "kilojoule",
    calories: "calorie",
    kilocalories: "kilocalorie",
    seconds: "second",
    minutes: "minute",
    hours: "hour",
    days: "day",
    weeks: "week",
    bytes: "byte",
    kilobytes: "kilobyte",
    megabytes: "megabyte",
    gigabytes: "gigabyte",
    terabytes: "terabyte",
    hertz: "hertz",
    kilohertz: "kilohertz",
    megahertz: "megahertz",
    gigahertz: "gigahertz"
  };

  const lower = name.toLowerCase();

  if (irregular[lower]) {
    return irregular[lower];
  }

  if (lower.endsWith("ies")) {
    return lower.slice(0, -3) + "y";
  }

  if (lower.endsWith("s") && !lower.endsWith("ss")) {
    return lower.slice(0, -1);
  }

  return lower;
}

function getFormula(page) {
  if (page.category === "temperature") {
    if (page.fromKey === "celsius" && page.toKey === "fahrenheit")
      return "°F = (°C × 9/5) + 32";

    if (page.fromKey === "fahrenheit" && page.toKey === "celsius")
      return "°C = (°F - 32) × 5/9";

    if (page.fromKey === "celsius" && page.toKey === "kelvin")
      return "K = °C + 273.15";

    if (page.fromKey === "kelvin" && page.toKey === "celsius")
      return "°C = K - 273.15";

    if (page.fromKey === "fahrenheit" && page.toKey === "kelvin")
      return "K = (°F - 32) × 5/9 + 273.15";

    if (page.fromKey === "kelvin" && page.toKey === "fahrenheit")
      return "°F = (K - 273.15) × 9/5 + 32";
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

function slugifyUnit(unit) {
  return unit.name
    .toLowerCase()
    .replace(/^us /, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
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
          slug: `${slugifyUnit(from)}-to-${slugifyUnit(to)}`,
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
          slug:
            page.category === "cooking"
              ? `cooking/${slugifyUnit(from)}-to-${slugifyUnit(to)}`
              : `${slugifyUnit(from)}-to-${slugifyUnit(to)}`,
          label: `${from.name} to ${to.name}`
        });
      }
    }
  }

  return results.slice(0, 12);
}

function buildStaticPage(page, template) {
  const from = page.from.name.toLowerCase();
  const to = page.to.name.toLowerCase();

  const fromSingular = singularize(page.from.name);
  const toSingular = singularize(page.to.name);

  const title =
    `${page.from.name} to ${page.to.name} Converter | Convert2Chart`;

  const description =
    `Convert ${from} to ${to} with our free online ${from} to ${to} calculator. See the conversion formula, examples, chart, and common values.`;

  const canonical =
    `${SITE_URL}/${page.slug}/`;

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
      q: `How many ${to} are in one ${fromSingular}?`,
      a: `One ${fromSingular} equals ${format(page.from.toBase)} ${toSingular}.`
    },
    {
      q: `What is 1 ${fromSingular} in ${toSingular}?`,
      a: `1 ${fromSingular} is equal to ${ratio} ${toSingular}.`
    },
    {
      q: `How do I convert ${from} to ${to}?`,
      a: `Enter a ${fromSingular} value in the converter. Convert2Chart automatically calculates the equivalent value in ${toSingular}.`
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
        Convert ${escapeHtml(from)} to ${escapeHtml(to)} quickly and accurately with this free online calculator.
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

        <h2>Frequently asked questions</h2>

        <div class="faq">
          ${faqHtml}
        </div>

      </article>
    </section>
  `;

  let html = template;

  if (/<title>.*?<\/title>/i.test(html)) {
    html = html.replace(
      /<title>.*?<\/title>/i,
      `<title>${escapeHtml(title)}</title>`
    );
  } else {
    html = html.replace(
      /<head>/i,
      `<head>\n    <title>${escapeHtml(title)}</title>`
    );
  }

  const descriptionTag =
    `<meta name="description" content="${escapeHtml(description)}">`;

  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      descriptionTag
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `    ${descriptionTag}\n  </head>`
    );
  }

  const canonicalTag =
    `<link rel="canonical" href="${canonical}">`;

  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      canonicalTag
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `    ${canonicalTag}\n  </head>`
    );
  }

  html = html.replace(
    /<\/head>/i,
    `
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
  </head>`
  );

  html = html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${staticContent}</div>`
  );

  return html;
}

const indexHtml = fs.readFileSync(
  path.join(dist, "index.html"),
  "utf8"
);

for (const page of pages) {
  const dir = path.join(dist, page.slug);

  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.join(dir, "index.html"),
    buildStaticPage(page, indexHtml)
  );
}

const urls = pages
  .map(page => `  <url>
    <loc>${SITE_URL}/${page.slug}/</loc>
  </url>`)
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
  </url>
${urls}
</urlset>
`;

fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  sitemap
);

fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
);

console.log(`Generated ${pages.length} static conversion pages.`);
console.log("Generated sitemap.xml");
console.log("Generated robots.txt");


