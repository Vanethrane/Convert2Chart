import {
  convertUnit,
  MPG_TO_KM_PER_LITER,
  temperatureUnits,
  units
} from "./conversions.js";

export const EVERYDAY_CATEGORIES = [
  "length",
  "weight",
  "volume",
  "area",
  "speed",
  "temperature",
  "time",
  "cooking",
  "data",
  "fuelEconomy"
];

export const CHART_LINE_MAX = 50;

export const CHART_DEFAULTS = {
  length: { start: 1, end: 100, lines: 20 },
  weight: { start: 1, end: 100, lines: 20 },
  volume: { start: 1, end: 20, lines: 20 },
  area: { start: 1, end: 100, lines: 20 },
  speed: { start: 0, end: 100, lines: 21 },
  pressure: { start: 1, end: 100, lines: 20 },
  energy: { start: 1, end: 100, lines: 20 },
  power: { start: 1, end: 100, lines: 20 },
  time: { start: 1, end: 60, lines: 20 },
  data: { start: 1, end: 1024, lines: 17 },
  frequency: { start: 1, end: 1000, lines: 20 },
  angle: { start: 0, end: 360, lines: 19 },
  force: { start: 1, end: 100, lines: 20 },
  torque: { start: 1, end: 100, lines: 20 },
  fuelEconomy: { start: 10, end: 60, lines: 11 },
  density: { start: 1, end: 20, lines: 20 },
  cooking: { start: 1, end: 16, lines: 16 },
  temperature: { start: -40, end: 100, lines: 15 }
};

export const COMMON_VALUES = {
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
  cooking: [1, 2, 3, 4, 8, 16, 32],
  temperature: [-40, -20, 0, 10, 20, 25, 30, 37, 50, 100]
};

const TEMPERATURE_FORMULAS = {
  "celsius:fahrenheit": "F = (C x 9/5) + 32",
  "fahrenheit:celsius": "C = (F - 32) x 5/9",
  "celsius:kelvin": "K = C + 273.15",
  "kelvin:celsius": "C = K - 273.15",
  "fahrenheit:kelvin": "K = (F - 32) x 5/9 + 273.15",
  "kelvin:fahrenheit": "F = (K - 273.15) x 9/5 + 32"
};

function rankUnit(unit, query) {
  const name = unit.name.toLowerCase();
  const symbol = unit.symbol.toLowerCase();

  if (name.startsWith(query)) return 5;
  if (symbol === query) return 4;
  if (symbol.startsWith(query)) return 3;
  if (name.includes(query)) return 2;
  if (symbol.includes(query)) return 1;

  return 0;
}

export function searchUnits(query, limit = 8) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) return [];

  const hits = [];

  function add(category, categoryName, key, unit) {
    const rank = rankUnit(unit, normalized);

    if (!rank) return;

    hits.push({
      type: "unit",
      category,
      categoryName,
      key,
      name: unit.name,
      symbol: unit.symbol,
      rank
    });
  }

  for (const [category, data] of Object.entries(units)) {
    for (const [key, unit] of Object.entries(data.units)) {
      add(category, data.name, key, unit);
    }
  }

  for (const [key, unit] of Object.entries(temperatureUnits)) {
    add("temperature", "Temperature", key, unit);
  }

  hits.sort(
    (a, b) => b.rank - a.rank || a.name.localeCompare(b.name)
  );

  return hits.slice(0, limit);
}

export function searchCategories(query) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) return [];

  const categories = [
    ...Object.entries(units).map(([key, data]) => ({
      type: "category",
      key,
      name: data.name
    })),
    { type: "category", key: "temperature", name: "Temperature" }
  ];

  return categories.filter(item =>
    item.name.toLowerCase().includes(normalized)
  );
}

export function chartDefaults(category) {
  return CHART_DEFAULTS[category] || { start: 1, end: 100, lines: 20 };
}

export function formatDisplay(value) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  const truncated = Math.trunc(value * 1_000_000) / 1_000_000;
  return Number(truncated.toFixed(6)).toString();
}

export function getSampleValues(category) {
  return COMMON_VALUES[category] || [1, 5, 10, 20, 50, 100];
}

export function getFormula(page) {
  if (page.category === "temperature") {
    const formula = TEMPERATURE_FORMULAS[`${page.fromKey}:${page.toKey}`];

    if (formula) {
      return formula;
    }
  }

  if (page.category === "fuelEconomy") {
    const perMpg = formatDisplay(100 / MPG_TO_KM_PER_LITER);
    const kmPerLiter = formatDisplay(MPG_TO_KM_PER_LITER);
    const pair = `${page.fromKey}:${page.toKey}`;

    const formulas = {
      "mpg:litersPer100Km": `L/100 km = ${perMpg} / MPG`,
      "litersPer100Km:mpg": `MPG = ${perMpg} / (L/100 km)`,
      "mpg:kilometersPerLiter": `km/L = MPG x ${kmPerLiter}`,
      "kilometersPerLiter:mpg": `MPG = (km/L) / ${kmPerLiter}`,
      "litersPer100Km:kilometersPerLiter": "km/L = 100 / (L/100 km)",
      "kilometersPerLiter:litersPer100Km": "L/100 km = 100 / (km/L)"
    };

    if (formulas[pair]) {
      return formulas[pair];
    }
  }

  const ratio = convertUnit(1, page.fromKey, page.toKey, page.category);
  return `1 ${page.from.symbol} = ${formatDisplay(ratio)} ${page.to.symbol}`;
}

export function getCommonRows(page) {
  return getSampleValues(page.category).map(value => ({
    value,
    result: formatDisplay(
      convertUnit(value, page.fromKey, page.toKey, page.category)
    )
  }));
}
