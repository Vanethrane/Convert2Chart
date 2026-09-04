import {
  units,
  temperatureUnits,
  convertUnit
} from "./conversions.js";

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/^us /, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function unitSlug(unit) {
  return slugify(unit.name);
}

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

function createPage(category, categoryName, fromKey, toKey, from, to) {
  return {
    slug: category === "cooking" ? `cooking/${unitSlug(from)}-to-${unitSlug(to)}` : `${unitSlug(from)}-to-${unitSlug(to)}`,
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
      `Convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()} instantly with this free unit converter.`,

    formula:
      `1 ${from.symbol} = ${formatConversion(
        convertUnit(1, fromKey, toKey, category)
      )} ${to.symbol}`,

    commonValues:
      category === "temperature"
        ? getTemperatureValues()
        : getCommonValues(category)
  };
}

export function getConversionPages() {
  const pages = [];

  for (const [category, categoryData] of Object.entries(units)) {
    const entries = Object.entries(categoryData.units);

    for (const [fromKey, from] of entries) {
      for (const [toKey, to] of entries) {
        if (fromKey === toKey) continue;

        pages.push(
          createPage(
            category,
            categoryData.name,
            fromKey,
            toKey,
            from,
            to
          )
        );
      }
    }
  }

  const temperatures = Object.entries(temperatureUnits);

  for (const [fromKey, from] of temperatures) {
    for (const [toKey, to] of temperatures) {
      if (fromKey === toKey) continue;

      pages.push(
        createPage(
          "temperature",
          "Temperature",
          fromKey,
          toKey,
          from,
          to
        )
      );
    }
  }

  return pages;
}

export function getConversionPage(slug) {
  return getConversionPages().find(
    page => page.slug === slug
  );
}


