
import type { MetadataRoute } from "next";
import { mockDestinations } from "@/data/mock-destinations";
import { mockTrails } from "@/data/mock-trails";

const BASE_URL = "https://avara-escapes.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/explore",
    "/destinations",
    "/trails",
    "/plan",
    "/about",
    "/contact",
  ];

  const pages: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const destinationPages: MetadataRoute.Sitemap =
    mockDestinations.map((destination) => ({
      url: `${BASE_URL}/destinations/${destination.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const trailPages: MetadataRoute.Sitemap =
    mockTrails.map((trail) => ({
      url: `${BASE_URL}/trails/${trail.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...pages, ...destinationPages, ...trailPages];
}
