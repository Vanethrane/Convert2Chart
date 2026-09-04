export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/²/g, "2")
    .replace(/ per /g, "-per-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function unitSlug(unit) {
  return slugify(
    unit.name.replace(/^US /, "")
  );
}

export function conversionSlug(from, to) {
  return `${unitSlug(from)}-to-${unitSlug(to)}`;
}
