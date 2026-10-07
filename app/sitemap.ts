import type { MetadataRoute } from "next";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const siteUrl = "https://drbusarisaheed.com";

const staticRoutes = [
  "",
  "/about",
  "/research",
  "/publications",
  "/articles",
  "/lectures",
  "/questions",
  "/fatwas",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createSupabaseServerClient();

  const { data: lectures } = await supabase
    .from("lectures")
    .select("slug,published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const lectureEntries: MetadataRoute.Sitemap = (lectures ?? []).map(
    (lecture) => ({
      url: `${siteUrl}/lectures/${lecture.slug}`,
      lastModified: lecture.published_at
        ? new Date(lecture.published_at)
        : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticEntries, ...lectureEntries];
}
