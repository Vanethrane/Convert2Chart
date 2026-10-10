import { convertUnit, temperatureUnits, units } from "./conversions.js";
import {
  formatDisplay,
  getCommonRows,
  getFormula
} from "./contentShared.js";
import { getConversionSlug } from "./conversionPages.js";
import { categorySlug } from "../utils/urls.js";

function unitEntries(category) {
  if (category === "temperature") {
    return Object.entries(temperatureUnits);
  }

  return Object.entries(units[category].units);
}

function quantity(unit, value) {
  const symbol =
    unit.symbol === "C" || unit.symbol === "F"
      ? `°${unit.symbol}`
      : unit.symbol;

  return `${value} ${symbol}`;
}

export function getFaqs(page) {
  const fromName = page.from.name.toLowerCase();
  const toName = page.to.name.toLowerCase();
  const one = quantity(page.from, 1);
  const ratio = formatDisplay(
    convertUnit(1, page.fromKey, page.toKey, page.category)
  );
  const formula = getFormula(page);
  const examples = getCommonRows(page)
    .filter(row => row.value !== 1)
    .slice(0, 2);

  return [
    {
      question: `How many ${toName} are in ${one}?`,
      answer: `${one} equals ${ratio} ${toName}.`
    },
    {
      question: `How do I convert ${fromName} to ${toName}?`,
      answer: `Enter a value in ${fromName}. Convert2Chart applies the standard conversion relationship and displays the result in ${toName}.`
    },
    {
      question: `What is the formula for converting ${fromName} to ${toName}?`,
      answer: `The conversion formula is: ${formula}.`
    },
    {
      question: `What is ${one} in ${toName}?`,
      answer: `${one} is equal to ${ratio} ${toName}.`
    },
    ...examples.map(example => ({
      question: `What is ${quantity(page.from, example.value)} in ${toName}?`,
      answer: `${quantity(page.from, example.value)} equals ${example.result} ${toName}.`
    })),
    {
      question: `Is there a ${fromName} to ${toName} calculator?`,
      answer: `Yes. Use the calculator at the top of this page to convert any ${fromName} value to ${toName}.`
    }
  ];
}

export function getRelated(page, limit = 12) {
  const reverse = [];
  const sameFrom = [];
  const rest = [];

  for (const [fromKey, from] of unitEntries(page.category)) {
    for (const [toKey, to] of unitEntries(page.category)) {
      if (fromKey === toKey) continue;
      if (fromKey === page.fromKey && toKey === page.toKey) continue;

      const slug = getConversionSlug(page.category, fromKey, toKey);

      if (!slug) continue;

      const item = {
        slug,
        label: `${from.name} to ${to.name}`
      };

      if (fromKey === page.toKey && toKey === page.fromKey) {
        reverse.push(item);
      } else if (fromKey === page.fromKey) {
        sameFrom.push(item);
      } else {
        rest.push(item);
      }
    }
  }

  return [...reverse, ...sameFrom, ...rest].slice(0, limit);
}

export function getBreadcrumbItems(page) {
  return [
    { name: "Home", slug: "" },
    { name: page.categoryName, slug: categorySlug(page.category) },
    {
      name: `${page.from.name} to ${page.to.name}`,
      slug: page.slug
    }
  ];
}

export function getHubBreadcrumbs(hub) {
  return [
    { name: "Home", slug: "" },
    { name: hub.categoryName, slug: hub.slug }
  ];
}

export function getSitemapBreadcrumbs() {
  return [
    { name: "Home", slug: "" },
    { name: "All conversions", slug: "conversions" }
  ];
}

export function getPageContent(page) {
  return {
    formula: getFormula(page),
    ratio: formatDisplay(
      convertUnit(1, page.fromKey, page.toKey, page.category)
    ),
    rows: getCommonRows(page),
    faqs: getFaqs(page),
    related: getRelated(page),
    breadcrumbs: getBreadcrumbItems(page)
  };
}
