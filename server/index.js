import express from "express";
import { getConversionPages } from "../src/data/conversionPages.js";

const app = express();

const PORT = process.env.PORT || 3001;
const SITE_URL = process.env.SITE_URL || "http://localhost:5173";

const pages = getConversionPages();

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "unit-converter",
    pages: pages.length
  });
});

app.get("/sitemap.xml", (req, res) => {
  const urls = pages
    .map(page => `
  <url>
    <loc>${SITE_URL}/${page.slug}/</loc>
  </url>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  res
    .type("application/xml")
    .send(xml);
});

app.get("/robots.txt", (req, res) => {
  res
    .type("text/plain")
    .send(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`);
});

app.listen(PORT, () => {
  console.log(
    `Unit Converter server running on http://localhost:${PORT}`
  );

  console.log(
    `${pages.length} conversion pages generated from conversionPages.js`
  );
});
