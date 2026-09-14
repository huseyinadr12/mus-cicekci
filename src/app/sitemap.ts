import { BLOG_POSTS,PRODUCTS_CATALOG } from "@/lib/constants";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://muscicekci.net";

  const staticRoutes = [
    "",
    "/cicekler",
    "/cicekler/guller",
    "/cicekler/orkideler",
    "/cicekler/buketler",
    "/cicekler/vazoda-cicekler",
    "/cicekler/saksi-bitkileri",
    "/cicekler/teraryumlar",
    "/cicekler/celenkler",
    "/ozel-gunler",
    "/ozel-gunler/sevgiliye",
    "/ozel-gunler/dogum-gunu",
    "/ozel-gunler/soz-nisan-dugun",
    "/ozel-gunler/gecmis-olsun",
    "/ozel-gunler/yeni-bebek",
    "/ozel-gunler/yeni-is",
    "/hakkimizda",
    "/teslimat",
    "/iletisim",
    "/siparis-takip",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = PRODUCTS_CATALOG.map((product) => ({
    url: `${baseUrl}/urun/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
