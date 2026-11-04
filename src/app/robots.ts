import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/login/"],
    },
    sitemap: "https://avara-escapes.vercel.app/sitemap.xml",
    host: "https://avara-escapes.vercel.app",
  };
}
