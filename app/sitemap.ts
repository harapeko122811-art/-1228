import type { MetadataRoute } from "next";
import { organizations } from "@/content/orgs";
import { articles } from "@/content/articles";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export const STATIC_PATHS = [
  "/", "/agencies/", "/relations/", "/issues/", "/comparison/", "/outlook/", "/research/", "/paper/",
  "/sources/", "/updates/", "/search/", "/about/", "/reports/", "/books/", "/privacy/", "/ad-policy/", "/disclaimer/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const paths = [
    ...STATIC_PATHS,
    ...organizations.map((o) => `/agencies/${o.slug}/`),
    ...articles.map((a) => `/research/${a.slug}/`),
  ];
  return paths.map((p) => ({ url: base + p, lastModified: SITE.asOf, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
