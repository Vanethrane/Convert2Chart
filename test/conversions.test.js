import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  MPG_TO_KM_PER_LITER,
  convertUnit,
  units
} from "../src/data/conversions.js";
import { searchCategories, searchUnits } from "../src/data/contentShared.js";
import {
  getConversionPage,
  getConversionPages,
  getUniqueConversionPages
} from "../src/data/conversionPages.js";
import { getPageContent } from "../src/data/pageContent.js";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

function findDuplicateObjectKeys(source) {
  const duplicates = [];
  let i = 0;
  const stack = [];

  function skipLine() {
    while (i < source.length && source[i] !== "\n") i += 1;
  }

  function skipString(quote) {
    i += 1;

    while (i < source.length) {
      if (source[i] === "\\") {
        i += 2;
        continue;
      }

      if (source[i] === quote) {
        i += 1;
        return;
      }

      i += 1;
    }
  }

  while (i < source.length) {
    const char = source[i];

    if (char === '"' || char === "'" || char === "`") {
      skipString(char);
      continue;
    }

    if (char === "/" && source[i + 1] === "/") {
      skipLine();
      continue;
    }

    if (char === "{") {
      stack.push(new Set());
      i += 1;
      continue;
    }

    if (char === "}") {
      stack.pop();
      i += 1;
      continue;
    }

    if (stack.length > 0 && /[A-Za-z_$]/.test(char)) {
      const start = i;
      i += 1;

      while (i < source.length && /[\w$]/.test(source[i])) i += 1;

      const key = source.slice(start, i);

      while (" \n\r\t".includes(source[i])) i += 1;

      if (source[i] === ":") {
        const keys = stack[stack.length - 1];

        if (keys.has(key)) {
          duplicates.push(key);
        }

        keys.add(key);
      }

      continue;
    }

    i += 1;
  }

  return duplicates;
}

test("linear conversions use exact scale factors", () => {
  assert.ok(
    Math.abs(convertUnit(1, "meter", "foot", "length") - 1 / 0.3048) < 1e-9
  );
  assert.equal(convertUnit(100, "celsius", "fahrenheit", "temperature"), 212);
  assert.equal(convertUnit(0, "celsius", "fahrenheit", "temperature"), 32);
  assert.equal(convertUnit(-40, "celsius", "fahrenheit", "temperature"), -40);
  assert.equal(convertUnit(0, "celsius", "kelvin", "temperature"), 273.15);
});

test("cooking teaspoons convert to milliliters", () => {
  const milliliters = convertUnit(1, "teaspoon", "milliliter", "cooking");
  assert.ok(Math.abs(milliliters - 4.92892159375) < 0.0001);
});

test("fuel economy uses the inverse relationship", () => {
  const litersPer100Km = convertUnit(
    1,
    "mpg",
    "litersPer100Km",
    "fuelEconomy"
  );

  assert.ok(
    Math.abs(litersPer100Km - 100 / MPG_TO_KM_PER_LITER) < 1e-6
  );
  assert.equal(
    convertUnit(0, "mpg", "litersPer100Km", "fuelEconomy"),
    Infinity
  );
  assert.ok(
    convertUnit(30, "mpg", "kilometersPerLiter", "fuelEconomy") >
      convertUnit(10, "mpg", "kilometersPerLiter", "fuelEconomy")
  );
});

test("every linear unit has a positive factor", () => {
  for (const [category, data] of Object.entries(units)) {
    if (category === "fuelEconomy") continue;

    for (const [key, unit] of Object.entries(data.units)) {
      const factor = unit.factor ?? unit.toBase;
      assert.equal(typeof factor, "number", `${category}.${key}`);
      assert.ok(factor > 0, `${category}.${key}`);
    }
  }
});

test("conversion slugs are unique", () => {
  const pages = getConversionPages();
  const slugs = pages.map(page => page.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(getUniqueConversionPages().length, pages.length);
});

test("catalog source has no duplicate object keys", () => {
  const source = fs.readFileSync(
    path.join(root, "src/data/conversions.js"),
    "utf8"
  );
  assert.deepEqual(findDuplicateObjectKeys(source), []);
});

test("page content leads with the reverse conversion", () => {
  const page = getConversionPage("meters-to-feet");
  const content = getPageContent(page);

  assert.equal(content.formula, "1 m = 3.280839 ft");
  assert.equal(content.related[0].label, "Feet to Meters");
  assert.equal(content.related[1].label, "Meters to Millimeters");
  assert.deepEqual(
    content.breadcrumbs.map(item => item.name),
    ["Home", "Length", "Meters to Feet"]
  );
  assert.equal(content.rows[0].value, 1);
  assert.equal(content.rows[0].result, "3.280839");
  assert.equal(content.faqs.length, 7);
  assert.equal(content.faqs[0].question, "How many feet are in 1 m?");
  assert.equal(content.faqs[4].question, "What is 5 m in feet?");
});

test("search finds units in any category", () => {
  const inches = searchUnits("inch");
  assert.equal(inches[0].name, "Inches");
  assert.equal(inches[0].category, "length");

  const celsius = searchUnits("celsius");
  assert.equal(celsius[0].category, "temperature");

  assert.equal(searchUnits("").length, 0);
  assert.equal(searchUnits("zzzz-not-a-unit").length, 0);
  assert.ok(
    searchCategories("thermal").some(item => item.name === "Thermal Conductivity")
  );
});

test("fuel economy formula is not a linear ratio", () => {
  const page = getConversionPage("miles-per-gallon-to-liters-per-100-km");
  assert.ok(page, "expected an mpg to L/100 km page");
  const content = getPageContent(page);
  assert.match(content.formula, /^L\/100 km = .+ \/ MPG$/);
});
