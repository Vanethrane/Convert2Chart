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
          slug: `${createUnitSlug(from)}-to-${createUnitSlug(to)}`,
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
          slug: `${createUnitSlug(from)}-to-${createUnitSlug(to)}`,
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

function getLongTailTerms(page) {
  const from = page.from.name.toLowerCase();
  const to = page.to.name.toLowerCase();
  const ratio = format(
    convertUnit(
      1,
      page.fromKey,
      page.toKey,
      page.category
    )
  );

  const values = getCommonValues(page);

  return {
    from,
    to,
    ratio,
    phrases: [
      `${from} to ${to} converter`,
      `convert ${from} to ${to}`,
      `${from} to ${to} calculator`,
      `${from} to ${to} conversion`,
      `${from} in ${to}`,
      `how to convert ${from} to ${to}`,
      `how many ${to} are in one ${from}`,
      `what is 1 ${from} in ${to}`
    ],
    values: values.map(value => ({
      value,
      result: format(
        convertUnit(
          value,
          page.fromKey,
          page.toKey,
          page.category
        )
      )
    }))
  };
}

function getFaqs(page) {
  const seo = getLongTailTerms(page);
  const { from, to, ratio } = seo;
  const examples = seo.values.slice(0, 4);

  return [
    {
      question: `How many ${to} are in one ${from}?`,
      answer: `One ${from} equals ${ratio} ${to}.`
    },
    {
      question: `How do I convert ${from} to ${to}?`,
      answer: `Enter the ${from} value in the converter above. Convert2Chart automatically applies the standard conversion relationship and displays the result in ${to}.`
    },
    {
      question: `What is the formula for converting ${from} to ${to}?`,
      answer: `The conversion formula for ${from} to ${to} is shown above the reference information on this page.`
    },
    {
      question: `What is 1 ${from} in ${to}?`,
      answer: `1 ${from} is equal to ${ratio} ${to}.`
    },
    {
      question: `What is ${examples[0]?.value ?? 1} ${from} in ${to}?`,
      answer: `${examples[0]?.value ?? 1} ${from} equals ${examples[0]?.result ?? ratio} ${to}.`
    },
    {
      question: `What is ${examples[1]?.value ?? 5} ${from} in ${to}?`,
      answer: `${examples[1]?.value ?? 5} ${from} equals ${examples[1]?.result ?? ratio} ${to}.`
    },
    {
      question: `Is there a ${from} to ${to} calculator?`,
      answer: `Yes. Use the calculator at the top of this page to convert any ${from} value to ${to} instantly.`
    }
  ];
}

export default function App() {
  const slug = getSlug();
  const page = findPage(slug);

  const [activeCategory, setActiveCategory] =
    useState(page?.category || "length");

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
            Convert length, weight, volume, temperature, area, speed,
            pressure, energy, power, time, data, frequency, angle,
            force, torque, fuel economy, density and cooking units.
          </p>

          <UnitConverter
            onCategoryChange={setActiveCategory}
          />
        </section>
      </main>
    );
  }

  const from = page.from.name.toLowerCase();
  const to = page.to.name.toLowerCase();

  const title =
    `${page.from.name} to ${page.to.name} Converter`;

  const description =
    `Convert ${from} to ${to} with our free online ${from} to ${to} calculator. See the conversion formula, examples, chart, and quick reference values.`;

  document.title =
    `${title} | Convert2Chart`;

  const meta =
    document.querySelector('meta[name="description"]');

  if (meta) {
    meta.setAttribute("content", description);
  }

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

  const formula = getFormula(page);
  const related = getRelated(page);
  const seo = getLongTailTerms(page);
  const faqs = getFaqs(page);

  const commonValues = seo.values;

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
          Convert {from} to {to} quickly and accurately with this
          free online calculator.
        </p>

        <UnitConverter
          initialCategory={page.category}
          onCategoryChange={setActiveCategory}
          initialFrom={page.fromKey}
          initialTo={page.toKey}
        />

        <article className="seo-content">

          <h2>
            {page.from.name} to {page.to.name} conversion
          </h2>

          <p>
            Use this {from} to {to} converter to convert values
            quickly and accurately. This page works as a
            {` ${from} to ${to} calculator`} and provides the
            standard conversion relationship, formula, and
            common reference values.
          </p>

          <h2>
            How to convert {from} to {to}
          </h2>

          <p>
            To convert {from} to {to}, enter your value in the
            calculator above. The result is calculated
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
            {page.from.name} to {page.to.name} chart
          </h2>

          <table>
            <thead>
              <tr>
                <th>{page.from.name}</th>
                <th>{page.to.name}</th>
              </tr>
            </thead>

            <tbody>
              {commonValues.map(item => (
                <tr key={item.value}>
                  <td>
                    {item.value} {page.from.symbol}
                  </td>

                  <td>
                    {item.result} {page.to.symbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>
            Common {from} to {to} conversions
          </h2>

          <p>
            Common searches include convert {from} to {to},
            {` ${from} to ${to} calculator`}, {from} in {to},
            and how to convert {from} to {to}. Use the calculator
            above for any value.
          </p>

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
            {faqs.map(faq => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                </summary>

                <p>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

        </article>

      </section>
    </main>
  );
}
