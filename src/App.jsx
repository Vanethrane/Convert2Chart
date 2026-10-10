import { useState } from "react";
import UnitConverter from "./components/UnitConverter";
import SymbolsBackground from "./components/SymbolsBackground";
import { units } from "./data/conversions";
import {
  getConversionPage,
  getCategoryHub,
  getCategoryHubs
} from "./data/conversionPages";
import {
  getHubBreadcrumbs,
  getPageContent,
  getSitemapBreadcrumbs
} from "./data/pageContent";
import {
  applyDocumentSeo,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHomeSchema,
  buildWebPageSchema,
  HOME_DESCRIPTION,
  HOME_TITLE,
  pageCanonical
} from "./utils/seo";

function getSlug() {
  return window.location.pathname
    .replace(/^\/|\/$/g, "");
}

function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          const href = item.slug ? `/${item.slug}/` : "/";

          return (
            <li key={`${item.slug}-${item.name}`}>
              {current ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <a href={href}>{item.name}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const POPULAR_LINKS = [
  { slug: "meters-to-feet", label: "Meters to Feet" },
  { slug: "feet-to-meters", label: "Feet to Meters" },
  { slug: "kilograms-to-pounds", label: "Kilograms to Pounds" },
  { slug: "pounds-to-kilograms", label: "Pounds to Kilograms" },
  { slug: "celsius-to-fahrenheit", label: "Celsius to Fahrenheit" },
  { slug: "fahrenheit-to-celsius", label: "Fahrenheit to Celsius" },
  { slug: "kilometers-to-miles", label: "Kilometers to Miles" },
  { slug: "miles-to-kilometers", label: "Miles to Kilometers" },
  { slug: "liters-to-gallons", label: "Liters to US Gallons" },
  { slug: "inches-to-centimeters", label: "Inches to Centimeters" },
  { slug: "cooking/cups-to-milliliters", label: "Cups to Milliliters" },
  { slug: "cooking/tablespoons-to-teaspoons", label: "Tablespoons to Teaspoons" }
];

function getCategoryHubLinks() {
  return getCategoryHubs().map(hub => ({
    slug: hub.slug,
    label: hub.categoryName
  }));
}

function HtmlSitemapView() {
  const hubs = getCategoryHubs();
  const title = "All Unit Conversions Sitemap | Convert2Chart";
  const description =
    "Complete HTML sitemap of every Convert2Chart unit category and conversion page for crawling and discovery.";
  const canonical = pageCanonical("conversions");

  applyDocumentSeo({
    title,
    description,
    canonical,
    jsonLd: [
      buildWebPageSchema({ title, description, canonical }),
      buildBreadcrumbSchema(getSitemapBreadcrumbs())
    ]
  });

  return (
    <main>
      <SymbolsBackground />
      <nav className="nav">
        <a href="/" className="logo">Convert2Chart</a>
      </nav>
      <section className="hero">
        <Breadcrumbs items={getSitemapBreadcrumbs()} />
        <p className="tagline">SITEMAP</p>
        <h1 className="page-title">All Unit Conversions</h1>
        <p className="page-description">
          Browse every category and conversion page on Convert2Chart.
        </p>
        <article className="seo-content">
          {hubs.map(hub => (
            <div key={hub.slug}>
              <h2>
                <a href={`/${hub.slug}/`}>{hub.categoryName}</a>
              </h2>
              <p>{hub.pages.length} converters in this category.</p>
              <div className="related-links">
                {hub.pages.slice(0, 24).map(item => (
                  <a key={item.slug} href={`/${item.slug}/`}>
                    {item.label}
                  </a>
                ))}
              </div>
              <p>
                <a href={`/${hub.slug}/`}>
                  See all {hub.categoryName} conversions
                </a>
              </p>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}

function CategoryHubView({ hub }) {
  const canonical = pageCanonical(hub.slug);

  applyDocumentSeo({
    title: hub.title,
    description: hub.description,
    canonical,
    jsonLd: [
      buildWebPageSchema({
        title: hub.title,
        description: hub.description,
        canonical,
        categoryName: hub.categoryName
      }),
      buildBreadcrumbSchema(getHubBreadcrumbs(hub))
    ]
  });

  return (
    <main>
      <SymbolsBackground />
      <nav className="nav">
        <a href="/" className="logo">Convert2Chart</a>
      </nav>
      <section className="hero">
        <Breadcrumbs items={getHubBreadcrumbs(hub)} />
        <p className="tagline">{hub.categoryName.toUpperCase()}</p>
        <h1 className="page-title">{hub.categoryName} Unit Conversions</h1>
        <p className="page-description">
          Explore every {hub.categoryName.toLowerCase()} conversion on
          Convert2Chart. Each page includes a calculator, formula, chart,
          and examples.
        </p>
        <article className="seo-content">
          <h2>All {hub.categoryName.toLowerCase()} converters</h2>
          <p>
            {hub.pages.length} crawlable {hub.categoryName.toLowerCase()}{" "}
            conversion pages are listed below.
          </p>
          <div className="related-links">
            {hub.pages.map(item => (
              <a key={item.slug} href={`/${item.slug}/`}>
                {item.label}
              </a>
            ))}
          </div>
          <p>
            <a href="/conversions/">View all unit categories</a>
          </p>
        </article>
      </section>
    </main>
  );
}

export default function App() {
  const slug = getSlug();
  const isHtmlSitemap = slug === "conversions";
  const hub = !isHtmlSitemap ? getCategoryHub(slug) : null;
  const page =
    !isHtmlSitemap && !hub ? getConversionPage(slug) : null;

  const [activeCategory, setActiveCategory] =
    useState(page?.category || "length");

  if (isHtmlSitemap) {
    return <HtmlSitemapView />;
  }

  if (hub) {
    return <CategoryHubView hub={hub} />;
  }

  if (!page) {
    applyDocumentSeo({
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      canonical: pageCanonical(),
      jsonLd: [buildHomeSchema()]
    });

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
            force, torque, fuel economy, density, cooking, and 50+ more
            unit categories with formulas, charts, and examples.
          </p>

          <UnitConverter
            onCategoryChange={setActiveCategory}
          />
        </section>

        <section className="seo-content home-seo">
          <h2>Popular unit conversions</h2>
          <p>
            Jump to commonly searched converters, or use the calculator
            above to convert any supported unit pair.
          </p>

          <div className="related-links">
            {POPULAR_LINKS.map(item => (
              <a key={item.slug} href={`/${item.slug}/`}>
                {item.label}
              </a>
            ))}
          </div>

          <h2>Unit categories</h2>
          <p>
            Convert2Chart covers everyday and technical measurements,
            including electrical, thermal, magnetic, chemical, and
            cooking units.{" "}
            <a href="/conversions/">Browse the full conversion sitemap</a>.
          </p>

          <div className="related-links">
            {getCategoryHubLinks().map(item => (
              <a key={item.slug} href={`/${item.slug}/`}>
                {item.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    );
  }

  const from = page.from.name.toLowerCase();
  const to = page.to.name.toLowerCase();
  const content = getPageContent(page);

  const title = page.title;
  const description = page.description;
  const canonicalUrl = pageCanonical(slug);
  const formula = content.formula;
  const related = content.related;
  const faqs = content.faqs;
  const commonValues = content.rows;

  applyDocumentSeo({
    title,
    description,
    canonical: canonicalUrl,
    jsonLd: [
      buildWebPageSchema({
        title,
        description,
        canonical: canonicalUrl,
        categoryName: page.categoryName
      }),
      buildBreadcrumbSchema(content.breadcrumbs),
      buildFaqSchema(faqs, canonicalUrl)
    ]
  });

  return (
    <main>
      <SymbolsBackground />

      <nav className="nav" aria-label="Breadcrumb">
        <a href="/" className="logo">
          Convert2Chart
        </a>
      </nav>

      <section className="hero">

        <Breadcrumbs items={content.breadcrumbs} />

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
          free online calculator. {formula}.
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

          <p>
            <a href={`/${content.breadcrumbs[1].slug}/`}>
              More {page.categoryName} conversions
            </a>
            {" · "}
            <a href="/conversions/">All categories</a>
          </p>

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
