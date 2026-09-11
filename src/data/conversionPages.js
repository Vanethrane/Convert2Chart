import {
  units,
  temperatureUnits,
  convertUnit
} from "./conversions.js";
import {
  conversionPath,
  unitSlug,
  PREFIXED_CATEGORIES,
  categorySlug
} from "../utils/urls.js";

function formatConversion(value) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return Number(value.toFixed(10)).toString();
}

function getCommonValues(category) {
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
    data: [1, 10, 100, 500, 1024, 2048, 10000],
    frequency: [1, 10, 100, 1000, 10000, 100000, 1000000],
    angle: [0, 30, 45, 60, 90, 180, 360],
    force: [1, 5, 10, 25, 50, 100, 1000],
    torque: [1, 5, 10, 25, 50, 100, 500],
    fuelEconomy: [10, 20, 25, 30, 40, 50, 60],
    density: [1, 2, 5, 10, 20, 50, 100],
    cooking: [1, 2, 3, 4, 8, 16, 32]
  };

  return values[category] || [1, 5, 10, 20, 50, 100];
}

function getTemperatureValues() {
  return [-40, -20, 0, 10, 20, 25, 30, 37, 50, 100];
}

function createPage(category, categoryName, fromKey, toKey, from, to, slug) {
  const fromLower = from.name.toLowerCase();
  const toLower = to.name.toLowerCase();
  const ratio = formatConversion(
    convertUnit(1, fromKey, toKey, category)
  );

  return {
    slug,
    category,
    categoryName,
    fromKey,
    toKey,
    from,
    to,

    convert(value) {
      return convertUnit(value, fromKey, toKey, category);
    },

    title: `${from.name} to ${to.name} Converter | Convert2Chart`,

    description:
      `Convert ${fromLower} to ${toLower} instantly. 1 ${from.symbol} = ${ratio} ${to.symbol}. Free ${fromLower} to ${toLower} calculator with formula, chart, and examples.`,

    formula:
      category === "temperature"
        ? null
        : `1 ${from.symbol} = ${ratio} ${to.symbol}`,

    commonValues:
      category === "temperature"
        ? getTemperatureValues()
        : getCommonValues(category)
  };
}

function resolveSlug(category, from, to, usedSlugs) {
  let slug = conversionPath(category, from, to);

  if (!usedSlugs.has(slug)) {
    usedSlugs.add(slug);
    return slug;
  }

  const prefixed = `${categorySlug(category)}/${unitSlug(from)}-to-${unitSlug(to)}`;

  if (!usedSlugs.has(prefixed)) {
    usedSlugs.add(prefixed);
    return prefixed;
  }

  let i = 2;
  let candidate = `${prefixed}-${i}`;

  while (usedSlugs.has(candidate)) {
    i += 1;
    candidate = `${prefixed}-${i}`;
  }

  usedSlugs.add(candidate);
  return candidate;
}

let cachedPages = null;
let slugLookup = null;

export function getConversionPages() {
  if (cachedPages) {
    return cachedPages;
  }

  const pages = [];
  const usedSlugs = new Set();
  const lookup = new Map();

  for (const [category, categoryData] of Object.entries(units)) {
    const entries = Object.entries(categoryData.units);

    for (const [fromKey, from] of entries) {
      for (const [toKey, to] of entries) {
        if (fromKey === toKey) continue;

        const slug = resolveSlug(category, from, to, usedSlugs);
        const page = createPage(
          category,
          categoryData.name,
          fromKey,
          toKey,
          from,
          to,
          slug
        );

        pages.push(page);
        lookup.set(`${category}:${fromKey}:${toKey}`, slug);
      }
    }
  }

  const temperatures = Object.entries(temperatureUnits);

  for (const [fromKey, from] of temperatures) {
    for (const [toKey, to] of temperatures) {
      if (fromKey === toKey) continue;

      const slug = resolveSlug("temperature", from, to, usedSlugs);
      const page = createPage(
        "temperature",
        "Temperature",
        fromKey,
        toKey,
        from,
        to,
        slug
      );

      pages.push(page);
      lookup.set(`temperature:${fromKey}:${toKey}`, slug);
    }
  }

  cachedPages = pages;
  slugLookup = lookup;
  return pages;
}

export function getConversionPage(slug) {
  return getConversionPages().find(
    page => page.slug === slug
  );
}

export function getConversionSlug(category, fromKey, toKey) {
  getConversionPages();
  return slugLookup.get(`${category}:${fromKey}:${toKey}`);
}

export function getUniqueConversionPages() {
  const seen = new Set();
  return getConversionPages().filter(page => {
    if (seen.has(page.slug)) return false;
    seen.add(page.slug);
    return true;
  });
}

export function getCategoryHubs() {
  const pages = getUniqueConversionPages();
  const hubs = new Map();

  for (const page of pages) {
    const hubSlug = categorySlug(page.category);

    if (!hubs.has(page.category)) {
      hubs.set(page.category, {
        category: page.category,
        categoryName: page.categoryName,
        slug: hubSlug,
        title: `${page.categoryName} Unit Converter | Convert2Chart`,
        description:
          `Browse all ${page.categoryName.toLowerCase()} unit conversions on Convert2Chart. Free calculators with formulas, charts, and examples.`,
        pages: []
      });
    }

    hubs.get(page.category).pages.push({
      slug: page.slug,
      label: `${page.from.name} to ${page.to.name}`
    });
  }

  return [...hubs.values()].sort((a, b) =>
    a.categoryName.localeCompare(b.categoryName)
  );
}

export function getCategoryHub(slug) {
  return getCategoryHubs().find(hub => hub.slug === slug);
}

export { PREFIXED_CATEGORIES, categorySlug };
