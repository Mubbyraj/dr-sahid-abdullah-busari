import type { MetadataRoute } from "next";

const siteUrl = "https://" + "drbusari" + "saheed.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: String.fromCharCode(42),
      allow: "/", 
      disallow: ["/admin/", "/api/", "/auth/"],
    },
    sitemap: siteUrl + "/sitemap.xml",
  };
}
