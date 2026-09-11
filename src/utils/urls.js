export const SITE_URL = "https://www.convert2chart.com";

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/²/g, "2")
    .replace(/³/g, "3")
    .replace(/ per /g, "-per-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function unitSlug(unit) {
  return slugify(unit.name.replace(/^US /, ""));
}

export function categorySlug(category) {
  return slugify(
    category
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
  );
}

/**
 * Base pair slug without category prefix.
 */
export function conversionSlug(from, to) {
  return `${unitSlug(from)}-to-${unitSlug(to)}`;
}

/**
 * Categories that always use a path prefix to avoid collisions
 * with more common conversion URLs (e.g. cooking vs volume).
 */
export const PREFIXED_CATEGORIES = new Set([
  "cooking",
  "wavelength",
  "dielectricStrength",
  "thermalDiffusivity"
]);

export function conversionPath(category, from, to) {
  const base = conversionSlug(from, to);

  if (PREFIXED_CATEGORIES.has(category)) {
    return `${categorySlug(category)}/${base}`;
  }

  return base;
}
