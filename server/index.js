import express from "express";
import {
  getUniqueConversionPages,
  getCategoryHubs
} from "../src/data/conversionPages.js";
import {
  SITE_URL as DEFAULT_SITE_URL,
  buildSitemapEntries,
  chunkSitemapEntries,
  buildUrlsetXml,
  buildSitemapIndexXml,
  buildRobotsTxt
} from "../src/utils/seo.js";

const app = express();

const PORT = process.env.PORT || 3001;
const SITE_URL = process.env.SITE_URL || DEFAULT_SITE_URL;

const pages = getUniqueConversionPages();
const hubs = getCategoryHubs();
const sitemapEntries = buildSitemapEntries({ pages, hubs });
const sitemapChunks = chunkSitemapEntries(sitemapEntries);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "unit-converter",
    pages: pages.length,
    hubs: hubs.length,
    sitemapUrls: sitemapEntries.length,
    sitemapParts: sitemapChunks.length
  });
});

app.get("/sitemap.xml", (req, res) => {
  res
    .type("application/xml")
    .send(buildSitemapIndexXml(sitemapChunks.length, SITE_URL));
});

app.get("/sitemaps/sitemap-:part.xml", (req, res) => {
  const part = Number(req.params.part);

  if (!Number.isInteger(part) || part < 1 || part > sitemapChunks.length) {
    res.status(404).type("text/plain").send("Sitemap part not found");
    return;
  }

  res
    .type("application/xml")
    .send(buildUrlsetXml(sitemapChunks[part - 1], SITE_URL));
});

app.get("/robots.txt", (req, res) => {
  res
    .type("text/plain")
    .send(buildRobotsTxt(SITE_URL));
});

app.listen(PORT, () => {
  console.log(
    `Unit Converter server running on http://localhost:${PORT}`
  );

  console.log(
    `${pages.length} conversion pages, ${hubs.length} hubs, ${sitemapEntries.length} sitemap URLs in ${sitemapChunks.length} parts`
  );
});
