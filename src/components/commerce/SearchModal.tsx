"use client";
import { PRODUCTS_CATALOG } from "@/lib/catalog";
import { searchCatalog } from "@/lib/search";
import { formatPrice } from "@/lib/utils";
import { ArrowUpRight,Search,X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo,useState } from "react";
import { useDialogAccessibility } from "./useDialogAccessibility";

type Props = { isOpen: boolean; onClose: () => void };
function SearchDialog({ onClose }: Pick<Props, 'onClose'>) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCatalog(PRODUCTS_CATALOG, query), [query]);
  const dialogRef = useDialogAccessibility(true, onClose);
  return <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
    <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Çiçek ara" tabIndex={-1} className="relative w-full max-w-2xl bg-warm-white border border-sage/30 overflow-hidden">
      <div className="flex items-center p-4 border-b border-sage/25 gap-3"><Search size={20} /><input aria-label="Aramak istediğiniz çiçek" value={query} onChange={event => setQuery(event.target.value)} placeholder="Gül, orkide, doğum günü veya 1000 TL altı…" className="w-full bg-transparent text-sm py-2 min-w-0" /><button aria-label="Aramayı kapat" onClick={onClose} className="p-2"><X size={20} /></button></div>
      {!query.trim() ? <div className="p-6"><p className="editorial-eyebrow text-forest mb-5">BİRAZ İLHAM</p><div className="flex flex-wrap gap-2">{["Kırmızı Gül", "Beyaz Orkide", "Doğum Günü", "Bugün Teslim", "1000 TL altı", "Teraryum"].map(tag => <button key={tag} onClick={() => setQuery(tag)} className="border border-sage/40 py-3 px-4 text-xs hover:bg-ivory">{tag}</button>)}</div></div> : <div className="p-4 max-h-[65svh] overflow-y-auto"><p role="status" className="text-xs text-charcoal-muted mb-3">{results.length} çiçek bulundu</p>{results.length ? results.map(product => <Link key={product.id} href={`/urun/${product.slug}`} onClick={onClose} className="flex items-center gap-4 py-3 border-b border-sage/20 hover:bg-ivory"><div className="relative w-16 h-20 shrink-0 bg-white"><Image src={product.images[0]} alt={product.name} fill sizes="64px" className="object-contain" /></div><div className="flex-1 min-w-0"><h3 className="font-serif text-xl leading-tight">{product.name}</h3><p className="text-xs text-forest mt-2">{formatPrice(product.price)}</p></div><ArrowUpRight size={17} /></Link>) : <p className="text-sm py-6 text-charcoal-muted">Bu aramaya uygun çiçek bulunamadı. Farklı bir çiçek adı deneyin.</p>}</div>}
    </div>
  </div>;
}
export default function SearchModal({ isOpen, onClose }: Props) {
  return isOpen ? <SearchDialog onClose={onClose} /> : null;
}
