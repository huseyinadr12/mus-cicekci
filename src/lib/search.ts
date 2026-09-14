import type { Product } from "@/types";
import { normalizeTurkish } from "./utils";

export function searchCatalog(products: Product[], query: string) {
  let normalized = normalizeTurkish(query).replaceAll("-", " ").trim();
  const budget = normalized.match(/(\d[\d.]*)\s*(?:tl|₺)?\s*(?:alti|altinda)/);
  const maximum = budget ? Number(budget[1].replaceAll(".", "")) : Infinity;
  if (budget) normalized = normalized.replace(budget[0], "").trim();
  const sameDay = /bugun|ayni gun/.test(normalized);
  normalized = normalized.replace(/bugun|ayni gun|teslim(at)?/g, "").trim();
  const words = normalized.split(/\s+/).filter(Boolean);
  return products.filter(product => {
    const searchable = normalizeTurkish([product.name, product.flowerType, product.color, product.description, product.category, ...product.occasions].join(" ")).replaceAll("-", " ");
    return product.price < maximum && (!sameDay || product.sameDayDelivery) && words.every(word => searchable.includes(word));
  });
}
