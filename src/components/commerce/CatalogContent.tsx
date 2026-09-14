"use client";
import ProductCard from "@/components/commerce/ProductCard";
import { PRODUCTS_CATALOG } from "@/lib/catalog";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function CatalogContent() {
  const params = useSearchParams();
  const categoryFilter = params.get("cat") || "";
  const deliveryFilter = params.get("delivery") || "";
  function filterUrl(category: string, delivery: string) {
    const query = new URLSearchParams();
    if (category) query.set("cat", category);
    if (delivery) query.set("delivery", delivery);
    return `/cicekler${query.size ? `?${query}` : ""}`;
  }

  let products = PRODUCTS_CATALOG;

  if (categoryFilter) {
    products = products.filter((p) => p.category === categoryFilter);
  }

  if (deliveryFilter === "same-day") {
    products = products.filter((p) => p.sameDayDelivery);
  }

  const categories = [
    { label: "Tümü", slug: "" },
    { label: "Güller", slug: "guller" },
    { label: "Orkideler", slug: "orkideler" },
    { label: "Buketler", slug: "buketler" },
    { label: "Vazoda Çiçekler", slug: "vazoda-cicekler" },
    { label: "Saksı Bitkileri", slug: "saksi-bitkileri" },
    { label: "Teraryumlar", slug: "teraryumlar" },
    { label: "Çelenkler", slug: "celenkler" },
  ];

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#575A53] mb-2 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-[#18392B]">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-[#18392B] font-bold">Çiçekler</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B]">
            ÇİÇEK KOLEKSİYONLARI
          </h1>
          <p className="mt-2 text-sm text-[#575A53]">
            Muş&apos;ta sevgiyle hazırlanan taze güller, lüks orkideler ve özel tasarım buketler.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-8 mb-8 border-b border-[#A9B8A5]/25">
          {categories.map((cat) => {
            const isActive = categoryFilter === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={filterUrl(cat.slug, deliveryFilter)}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? "bg-[#18392B] text-white shadow-xs"
                    : "bg-[#FFFDFC] text-[#20221F] border border-[#A9B8A5]/30 hover:border-[#18392B]"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}

          <Link
            href={filterUrl(categoryFilter, deliveryFilter ? "" : "same-day")}
            aria-current={deliveryFilter === "same-day" ? "page" : undefined}
            className={`ml-auto flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              deliveryFilter === "same-day"
                ? "bg-[#6F2232] text-white shadow-xs"
                : "bg-[#FFFDFC] text-[#6F2232] border border-[#6F2232]/40 hover:bg-[#6F2232]/10"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E7B9A5]" />
            Bugün Teslim
          </Link>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <h3 className="font-serif text-xl text-[#18392B]">
              Seçilen kriterlere uygun çiçek bulunamadı.
            </h3>
            <Link
              href="/cicekler"
              className="inline-block text-xs uppercase tracking-wider font-bold bg-[#18392B] text-white py-2.5 px-6 rounded-md"
            >
              Tüm Çiçekleri Göster
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
