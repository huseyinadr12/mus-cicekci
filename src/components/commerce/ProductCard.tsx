"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Eye, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <article aria-label={product.name} className="group relative flex flex-col bg-[#FFFDFC] rounded-xl overflow-hidden border border-[#A9B8A5]/25 hover:border-[#365B45]/40 transition-all duration-500">
      {/* Product Image Area (~75% of visual height) */}
      <Link
        href={`/urun/${product.slug}`}
        className="relative aspect-4/5 w-full overflow-hidden bg-[#F6F3ED] block"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.sameDayDelivery && (
            <span className="inline-flex items-center gap-1 bg-[#18392B]/90 backdrop-blur-xs text-[#F8F5EF] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-[#E7B9A5]" />
              Bugün Teslim
            </span>
          )}
          {product.originalPrice && (
            <span className="inline-block bg-[#6F2232] text-white text-[10px] font-bold px-2 py-0.5 rounded-full w-fit">
              İndirim
            </span>
          )}
        </div>

        {/* Floating Quick Action Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="flex-1 mr-2 text-center py-2.5 bg-[#FFFDFC]/95 backdrop-blur-xs text-[#18392B] hover:bg-[#18392B] hover:text-white rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            İncele
          </span>
          <button
            onClick={handleQuickAdd}
            className="p-2.5 bg-[#18392B] hover:bg-[#365B45] text-white rounded-lg shadow-md transition-colors"
            title="Hızlı Sepete Ekle"
            aria-label={`${product.name} ürününü hızlıca sepete ekle`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#FFFDFC] group-hover:bg-[#FDFBF7] transition-colors duration-300">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#575A53] font-medium">
            {product.flowerType}
          </span>
          <Link href={`/urun/${product.slug}`} className="block mt-0.5">
            <h3 className="font-serif text-base sm:text-lg text-[#20221F] group-hover:text-[#6F2232] transition-colors line-clamp-1 font-medium">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#575A53] line-clamp-1 mt-0.5 font-light">
            {product.subtitle || product.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-[#A9B8A5]/20 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-[#18392B]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#575A53] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-[#365B45]">
            Muş İçi
          </span>
        </div>
      </div>
    </article>
  );
}
