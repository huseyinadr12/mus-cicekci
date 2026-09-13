"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Sparkles, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FFFDFC] rounded-xl shadow-2xl border border-[#A9B8A5]/30 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#A9B8A5]/20 bg-[#F8F5EF]/50">
          <Search className="w-5 h-5 text-[#365B45] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Gül, orkide, doğum günü veya duygu arayın..."
            className="w-full bg-transparent text-sm sm:text-base text-[#20221F] placeholder-[#575A53]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#575A53] hover:text-[#20221F] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-[#575A53] hover:text-[#18392B] bg-[#EFE9DE] px-2.5 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Suggested Quick Tags */}
        {!query && (
          <div className="p-6">
            <p className="text-xs font-semibold tracking-wider text-[#575A53] uppercase mb-3">
              Popüler Aramalar
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Kırmızı Gül",
                "Beyaz Orkide",
                "Doğum Günü",
                "Bugün Teslim",
                "Geçmiş Olsun",
                "Vazoda Çiçek",
                "Teraryum",
                "Düğün Çelengi",
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs bg-[#F8F5EF] hover:bg-[#18392B] hover:text-white text-[#20221F] px-3 py-1.5 rounded-full border border-[#A9B8A5]/30 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 divide-y divide-[#A9B8A5]/15">
            {isLoading ? (
              <div className="py-8 text-center text-xs text-[#575A53]">
                Çiçekler aranıyor...
              </div>
            ) : results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/urun/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-[#F8F5EF] transition-colors group"
                >
                  <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-[#EFE9DE]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#20221F] truncate group-hover:text-[#6F2232] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#575A53] truncate">
                      {product.subtitle || product.flowerType}
                    </p>
                    {product.sameDayDelivery && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#365B45] font-semibold mt-0.5">
                        <Sparkles className="w-2.5 h-2.5" /> Muş İçi Aynı Gün Teslim
                      </span>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-[#18392B]">
                      {formatPrice(product.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#A9B8A5] ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-[#575A53]">
                &ldquo;{query}&rdquo; ile eşleşen çiçek bulunamadı.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
