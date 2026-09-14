import type { AddOnItem,FlowerCategory,OccasionType,Product } from "@/types";
import sourceAddons from "./data/source-addons.json";
import sourceProducts from "./data/source-products.json";

export const ADD_ON_ITEMS: AddOnItem[] = sourceAddons.map(item => ({ ...item, category: "card" }));

const occasionNames: OccasionType[] = ["sevgiliye", "dogum-gunu", "soz-nisan-dugun", "ozur-dilerim", "gecmis-olsun", "acilis-toren", "yeni-bebek", "yeni-is", "cenaze", "yildonumu"];
const labels: Record<string, string> = { guller: "Güller", orkideler: "Orkideler", buketler: "Buketler", "vazoda-cicekler": "Vazoda çiçekler", "saksi-bitkileri": "Saksı bitkileri", teraryumlar: "Teraryumlar", celenkler: "Çelenkler" };
function categoryFor(id: string): FlowerCategory {
  const number = Number(id);
  if (number <= 55) return "guller";
  if (number <= 61) return "vazoda-cicekler";
  if (number <= 67) return "orkideler";
  if (number <= 73) return "buketler";
  if (number <= 79) return "saksi-bitkileri";
  if (number <= 85) return "teraryumlar";
  return "celenkler";
}
// Preserve existing public URLs while importing the complete source catalogue.
const legacySlugs: Record<string, string> = { "84": "buyuleyici-orman-teraryum", "89": "dugun-celengi-beyaz-kirmizi" };
export const PRODUCTS_CATALOG: Product[] = sourceProducts.map((source) => {
  const category = categoryFor(source.id);
  return {
    id: source.id, slug: legacySlugs[source.id] || source.slug, name: source.name,
    price: source.price, originalPrice: source.originalPrice > source.price ? source.originalPrice : undefined,
    category, occasions: source.occasions.filter((occasion): occasion is OccasionType => occasionNames.includes(occasion as OccasionType)),
    flowerType: labels[category], color: source.name.includes("Beyaz") ? "Beyaz" : source.name.includes("Mor") ? "Mor" : source.name.includes("Kırmızı") ? "Kırmızı" : "Karışık",
    description: `${source.name}. Görsel, Muş Çiçekçi'nin kendi ürün kataloğundan alınmıştır. Kullanılan yan ürünlerde stok durumuna göre farklılıklar olabilir.`,
    images: [source.image], sameDayDelivery: true, inStock: true,
    // Public listings do not expose live quantities or a verified review feed.
    stockCount: 0, rating: 0, reviewCount: 0,
    isFeatured: ["52", "55", "64", "70", "84", "89"].includes(source.id),
  };
});
export function sourceImage(id: string) {
  return sourceProducts.find(product => product.id === id)?.image || "/images/editorial/bouquet.webp";
}
export const EDITORIAL = { bouquet: "/images/editorial/bouquet.webp", rose: "/images/editorial/rose.webp", craft: "/images/editorial/craft.webp" };
