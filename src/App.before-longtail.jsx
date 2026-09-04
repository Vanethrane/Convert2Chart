import { useState } from "react";
import UnitConverter from "./components/UnitConverter";
import SymbolsBackground from "./components/SymbolsBackground";
import {
  units,
  temperatureUnits,
  convertUnit
} from "./data/conversions";
import { getConversionPage } from "./data/conversionPages";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createUnitSlug(unit) {
  return slugify(
    unit.name
      .replace(/^US /, "")
      .replace(/ per /g, "-per-")
  );
}

function findPage(slug) {
  return getConversionPage(slug);
}

function format(value) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return Number(value.toFixed(6)).toString();
}

function getFormula(page) {
  if (page.category === "temperature") {
    if (
      page.fromKey === "celsius" &&
      page.toKey === "fahrenheit"
    ) {
      return "°F = (°C × 9/5) + 32";
    }

    if (
      page.fromKey === "fahrenheit" &&
      page.toKey === "celsius"
    ) {
      return "°C = (°F - 32) × 5/9";
    }

    if (
      page.fromKey === "celsius" &&
      page.toKey === "kelvin"
    ) {
      return "K = °C + 273.15";
    }

    if (
      page.fromKey === "kelvin" &&
      page.toKey === "celsius"
    ) {
      return "°C = K - 273.15";
    }

    if (
      page.fromKey === "fahrenheit" &&
      page.toKey === "kelvin"
    ) {
      return "K = (°F - 32) × 5/9 + 273.15";
    }

    if (
      page.fromKey === "kelvin" &&
      page.toKey === "fahrenheit"
    ) {
      return "°F = (K - 273.15) × 9/5 + 32";
    }
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

  return values[page.category] ||
    [1, 5, 10, 20, 50, 100];
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
          slug:
            `${createUnitSlug(from)}-to-${createUnitSlug(to)}`,
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
            `${createUnitSlug(from)}-to-${createUnitSlug(to)}`,
          label: `${from.name} to ${to.name}`
        });
      }
    }
  }

  return results.slice(0, 12);
}

function getSlug() {
  return window.location.pathname
    .replace(/^\/|\/$/g, "");
}

export default function App() {
  const slug = getSlug();
  const page = findPage(slug);

  const [activeCategory, setActiveCategory] =
    useState(page?.category || "length");

  /*
   * Homepage
   */
  if (!page) {
    document.title = "Unit Converter | Convert2Chart";

    return (
      <main>
        <SymbolsBackground />
        <nav className="nav">
          <a href="/" className="logo">
            Convert2Chart
          </a>
        </nav>

        <section className="hero">
          <p className="tagline">
            SIMPLE. FAST. ACCURATE.
          </p>

          <h1 className="home-title">
            Unit Converter
          </h1>

          <p className="home-description">
            Convert length, weight, volume, temperature, area, speed, pressure, energy, power, time, data, frequency, angle, force, torque, fuel economy, density and cooking units.
          </p>

          <UnitConverter
            onCategoryChange={setActiveCategory}
          />
        </section>
      </main>
    );
  }

  /*
   * Conversion page
   */
  const title =
    `${page.from.name} to ${page.to.name} Converter`;

  const description =
    `Convert ${page.from.name.toLowerCase()} to ${page.to.name.toLowerCase()} with our free online converter. See the formula, common conversions, and quick reference values.`;

  document.title =
    `${title} | Convert2Chart`;

  const meta =
    document.querySelector('meta[name="description"]');

  if (meta) {
    meta.setAttribute("content", description);
  }

  /*
   * Keep canonical URL correct.
   */
  const canonicalUrl =
    `${window.location.origin}/${slug}/`;

  let canonical =
    document.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = canonicalUrl;

  /*
   * Open Graph metadata.
   */
  function setMeta(property, content) {
    let element =
      document.querySelector(
        `meta[property="${property}"]`
      );

    if (!element) {
      element = document.createElement("meta");

      element.setAttribute(
        "property",
        property
      );

      document.head.appendChild(element);
    }

    element.setAttribute(
      "content",
      content
    );
  }

  setMeta(
    "og:title",
    `${title} | Convert2Chart`
  );

  setMeta(
    "og:description",
    description
  );

  setMeta(
    "og:url",
    canonicalUrl
  );

  const formula =
    getFormula(page);

  const related =
    getRelated(page);

  return (
      <main>
        <SymbolsBackground />
      <nav className="nav">
        <a href="/" className="logo">
          Convert2Chart
        </a>
      </nav>

      <section className="hero">

        <p className="tagline">
          {activeCategory === "temperature"
            ? "TEMPERATURE"
            : units[activeCategory]?.name?.toUpperCase() ||
              page.categoryName.toUpperCase()}
        </p>

        <h1 className="page-title">
          {page.from.name} to {page.to.name} Converter
        </h1>

        <p className="page-description">
          Convert {page.from.name.toLowerCase()} to{" "}
          {page.to.name.toLowerCase()} quickly and accurately.
        </p>

        <UnitConverter
          initialCategory={page.category}
          onCategoryChange={setActiveCategory}
          initialFrom={page.fromKey}
          initialTo={page.toKey}
        />

        <article className="seo-content">

          <h2>
            How to convert {page.from.name.toLowerCase()} to{" "}
            {page.to.name.toLowerCase()}
          </h2>

          <p>
            To convert {page.from.name.toLowerCase()} to{" "}
            {page.to.name.toLowerCase()}, enter your value
            in the calculator above. The result is calculated
            automatically using the standard conversion
            relationship between the two units.
          </p>

          <div className="formula-box">
            <strong>Conversion formula</strong>

            <code>
              {formula}
            </code>
          </div>

          <h2>
            Related conversions
          </h2>

          <div className="related-links">
            {related.map(item => (
              <a
                key={item.slug}
                href={`/${item.slug}/`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <h2>
            Frequently asked questions
          </h2>

          <div className="faq">

            <details>
              <summary>
                How many {page.to.name.toLowerCase()} are in one{" "}
                {page.from.name.toLowerCase()}?
              </summary>

              <p>
                One {page.from.name.toLowerCase()} equals{" "}
                {format(
                  convertUnit(
                    1,
                    page.fromKey,
                    page.toKey,
                    page.category
                  )
                )}{" "}
                {page.to.name.toLowerCase()}.
              </p>
            </details>

            <details>
              <summary>
                How do I convert {page.from.name.toLowerCase()} to{" "}
                {page.to.name.toLowerCase()}?
              </summary>

              <p>
                Enter the {page.from.name.toLowerCase()} value
                in the calculator above. The converter applies
                the correct conversion formula automatically.
              </p>
            </details>

            <details>
              <summary>
                What is the formula for converting{" "}
                {page.from.name.toLowerCase()} to{" "}
                {page.to.name.toLowerCase()}?
              </summary>

              <p>
                The conversion is based on the standard unit
                relationship shown above.
              </p>
            </details>

          </div>

        </article>

      </section>
    </main>
  );
}









