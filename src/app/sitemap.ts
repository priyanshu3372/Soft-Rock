import type { MetadataRoute } from "next";
import { navigation } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map((item) => ({
    url: absoluteUrl(item.href),
    changeFrequency: item.href === "/" || item.href === "/music" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
