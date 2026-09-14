"use client";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { ArrowUpRight,Plus } from "lucide-react";
import Image from "@/components/StoreImage";
import Link from "next/link";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const addItem = useCartStore(state => state.addItem);
  return <article aria-label={product.name} className="product-editorial group">
    <Link href={`/urun/${product.slug}`} className="product-photo block">
      <Image src={product.images[0]} alt={product.name} fill priority={priority} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw" />
      {product.sameDayDelivery && <span className="product-tag">AYNI GÜN TESLİMAT</span>}
    </Link>
    <div className="product-info">
      <Link href={`/urun/${product.slug}`}><h3>{product.name}</h3></Link>
      <div className="product-price"><div><span className="text-sm font-semibold text-forest">{formatPrice(product.price)}</span>{product.originalPrice && <span className="text-[10px] text-charcoal-muted line-through ml-2">{formatPrice(product.originalPrice)}</span>}</div><button type="button" className="quick-add" onClick={() => addItem(product, 1)} disabled={!product.inStock} aria-label={`${product.name} ürününü sepete ekle`}><Plus size={18} /></button></div>
      <Link href={`/urun/${product.slug}`} className="inline-flex items-center gap-2 text-[10px] text-charcoal-muted mt-2">Ürünü incele <ArrowUpRight size={12} /></Link>
    </div>
  </article>;
}
