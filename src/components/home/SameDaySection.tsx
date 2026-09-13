import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import ProductCard from "@/components/commerce/ProductCard";
import { Product } from "@/types";

interface SameDaySectionProps {
  products: Product[];
}

export default function SameDaySection({ products }: SameDaySectionProps) {
  const sameDayProducts = products.filter((p) => p.sameDayDelivery).slice(0, 6);

  return (
    <section className="py-20 bg-[#F8F5EF] border-t border-[#A9B8A5]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6F2232] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Muş İçi Hızlı Teslimat
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B]">
              BUGÜN GÖNDER
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#575A53]">
              Son dakikaya kalmış olabilir. Hissettirdiklerin kalmasın.
            </p>
          </div>

          <Link
            href="/cicekler?delivery=same-day"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#18392B] hover:text-[#365B45] transition-colors group"
          >
            <span>Tüm Aynı Gün Ürünler</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Curated Photographic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sameDayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
