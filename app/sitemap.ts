import type { MetadataRoute } from "next";
import { localePath, locales } from "./i18n";
import { SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localePath(l)}`]));
  return locales.map((l) => ({
    url: `${SITE_URL}${localePath(l)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: l === "et" ? 1 : 0.8,
    alternates: { languages },
  }));
}
