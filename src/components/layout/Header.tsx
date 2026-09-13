"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Truck,
  Menu,
  X,
  Phone,
  Clock,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { BUSINESS_INFO } from "@/lib/constants";
import SearchModal from "@/components/commerce/SearchModal";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);

  const { items, openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(null);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      {/* Top micro-bar */}
      <div className="bg-[#18392B] text-[#F8F5EF] text-xs py-2 px-4 border-b border-[#365B45]/40 transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 font-medium tracking-wide">
              <Truck className="w-3.5 h-3.5 text-[#A9B8A5]" />
              Muş İçi Aynı Gün Ücretsiz Teslimat
            </span>
            <span className="hidden md:inline-block text-[#A9B8A5]/60">•</span>
            <span className="hidden md:flex items-center gap-1 text-[#A9B8A5]">
              <Clock className="w-3.5 h-3.5" />
              08:30 - 22:00
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <Link
              href="/siparis-takip"
              className="hover:text-[#E7B9A5] transition-colors flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold"
            >
              Siparişim Nerede?
            </Link>
            <span className="text-[#A9B8A5]/60">•</span>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1 font-medium hover:text-[#E7B9A5] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#A9B8A5]" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled || !isHome
            ? "bg-[#F8F5EF]/95 backdrop-blur-md shadow-sm border-b border-[#A9B8A5]/20 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile menu toggle button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#18392B] hover:text-[#365B45] focus:outline-none"
                aria-label="Menüyü Aç"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-[#18392B] hover:text-[#365B45] ml-1"
                aria-label="Arama"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo */}
            <Link href="/" className="flex flex-col items-center lg:items-start group">
              <span className="font-serif text-2xl sm:text-3xl tracking-wider text-[#18392B] font-medium group-hover:text-[#365B45] transition-colors">
                MUŞ ÇİÇEKÇİ
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#6F2232] font-medium">
                Taşdemir Çiçekçilik • 2017
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
              {/* Çiçekler Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setMegaMenuOpen("cicekler")}
                onMouseLeave={() => setMegaMenuOpen(null)}
              >
                <Link
                  href="/cicekler"
                  className="flex items-center gap-1 text-[#20221F] hover:text-[#18392B] py-2 transition-colors uppercase text-xs tracking-widest font-semibold"
                >
                  Çiçekler
                  <ChevronDown className="w-3.5 h-3.5 text-[#A9B8A5] group-hover:rotate-180 transition-transform duration-200" />
                </Link>

                {megaMenuOpen === "cicekler" && (
                  <div className="absolute top-full left-0 w-64 bg-[#FFFDFC] shadow-xl border border-[#A9B8A5]/20 rounded-md py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      href="/cicekler/guller"
                      className="block px-5 py-2.5 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#6F2232] transition-colors"
                    >
                      🌹 Güller (Kırmızı & Beyaz)
                    </Link>
                    <Link
                      href="/cicekler/orkideler"
                      className="block px-5 py-2.5 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      🌿 Çift Dallı Lüks Orkideler
                    </Link>
                    <Link
                      href="/cicekler/buketler"
                      className="block px-5 py-2.5 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      💐 Özel Tasarım Buketler
                    </Link>
                    <Link
                      href="/cicekler/vazoda-cicekler"
                      className="block px-5 py-2.5 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      🏺 Kristal Vazoda Çiçekler
                    </Link>
                    <Link
                      href="/cicekler/saksi-bitkileri"
                      className="block px-5 py-2.5 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      🪴 Salon & Ofis Bitkileri
                    </Link>
                    <Link
                      href="/cicekler/teraryumlar"
                      className="block px-5 py-2.5 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      🌱 El Yapımı Teraryumlar
                    </Link>
                    <Link
                      href="/cicekler/celenkler"
                      className="block px-5 py-2.5 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors border-t border-[#A9B8A5]/10 mt-1 pt-2"
                    >
                      🎀 Düğün, Açılış & Taziye Çelenkleri
                    </Link>
                  </div>
                )}
              </div>

              {/* Özel Günler Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setMegaMenuOpen("ozel-gunler")}
                onMouseLeave={() => setMegaMenuOpen(null)}
              >
                <Link
                  href="/ozel-gunler"
                  className="flex items-center gap-1 text-[#20221F] hover:text-[#18392B] py-2 transition-colors uppercase text-xs tracking-widest font-semibold"
                >
                  Özel Günler
                  <ChevronDown className="w-3.5 h-3.5 text-[#A9B8A5] group-hover:rotate-180 transition-transform duration-200" />
                </Link>

                {megaMenuOpen === "ozel-gunler" && (
                  <div className="absolute top-full left-0 w-60 bg-[#FFFDFC] shadow-xl border border-[#A9B8A5]/20 rounded-md py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      href="/ozel-gunler/sevgiliye"
                      className="block px-5 py-2 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#6F2232] transition-colors"
                    >
                      Sevgiliye & Yıldönümü
                    </Link>
                    <Link
                      href="/ozel-gunler/dogum-gunu"
                      className="block px-5 py-2 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      Doğum Günü Çiçekleri
                    </Link>
                    <Link
                      href="/ozel-gunler/soz-nisan-dugun"
                      className="block px-5 py-2 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      Söz, Nişan & Düğün
                    </Link>
                    <Link
                      href="/ozel-gunler/gecmis-olsun"
                      className="block px-5 py-2 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      Geçmiş Olsun Çiçekleri
                    </Link>
                    <Link
                      href="/ozel-gunler/yeni-bebek"
                      className="block px-5 py-2 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      Yeni Bebek Tebriği
                    </Link>
                    <Link
                      href="/ozel-gunler/yeni-is"
                      className="block px-5 py-2 text-xs text-[#20221F] hover:bg-[#F8F5EF] hover:text-[#18392B] transition-colors"
                    >
                      Yeni İş & Terfi
                    </Link>
                  </div>
                )}
              </div>

              {/* Bugun Teslim CTA */}
              <Link
                href="/cicekler?delivery=same-day"
                className="flex items-center gap-1.5 text-[#6F2232] hover:text-[#18392B] py-2 uppercase text-xs tracking-widest font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6F2232]" />
                Bugün Teslim
              </Link>

              <Link
                href="/hakkimizda"
                className="text-[#20221F] hover:text-[#18392B] py-2 uppercase text-xs tracking-widest font-semibold"
              >
                Hikâyemiz
              </Link>

              <Link
                href="/iletisim"
                className="text-[#20221F] hover:text-[#18392B] py-2 uppercase text-xs tracking-widest font-semibold"
              >
                İletişim
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              {/* Search button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="hidden lg:flex items-center gap-2 text-xs tracking-wider text-[#575A53] hover:text-[#18392B] bg-[#FFFDFC] border border-[#A9B8A5]/30 rounded-full py-1.5 px-4 transition-all hover:border-[#18392B]"
              >
                <Search className="w-3.5 h-3.5 text-[#365B45]" />
                <span>Çiçek, duygu veya ürün ara...</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2 text-[#18392B] hover:text-[#365B45] transition-colors rounded-full hover:bg-[#EFE9DE]/50 focus:outline-none"
                aria-label="Sepeti Görüntüle"
              >
                <ShoppingBag className="w-6 h-6 stroke-[1.75]" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#6F2232] text-[#FFFDFC] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-scale-up">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F8F5EF] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-[#A9B8A5]/20 pb-4 mb-6">
                <div>
                  <span className="font-serif text-xl tracking-wider text-[#18392B] font-bold">
                    MUŞ ÇİÇEKÇİ
                  </span>
                  <p className="text-[10px] text-[#6F2232] tracking-wider uppercase">
                    Taşdemir Çiçekçilik
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-md text-[#20221F] hover:bg-[#EFE9DE]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <Link
                  href="/cicekler?delivery=same-day"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#6F2232]/10 text-[#6F2232] font-semibold text-sm"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Bugün Teslim Çiçekler
                  </span>
                  <span className="text-xs font-bold">Muş İçi</span>
                </Link>

                <div className="pt-2">
                  <p className="text-[11px] font-bold tracking-widest text-[#575A53] uppercase mb-2">
                    Kategoriler
                  </p>
                  <ul className="space-y-2 text-sm text-[#20221F]">
                    <li>
                      <Link href="/cicekler/guller" className="block py-1 hover:text-[#6F2232]">
                        🌹 Kırmızı & Beyaz Güller
                      </Link>
                    </li>
                    <li>
                      <Link href="/cicekler/orkideler" className="block py-1 hover:text-[#18392B]">
                        🌿 Lüks Orkideler
                      </Link>
                    </li>
                    <li>
                      <Link href="/cicekler/buketler" className="block py-1 hover:text-[#18392B]">
                        💐 Tasarım Buketler
                      </Link>
                    </li>
                    <li>
                      <Link href="/cicekler/vazoda-cicekler" className="block py-1 hover:text-[#18392B]">
                        🏺 Vazoda Çiçekler
                      </Link>
                    </li>
                    <li>
                      <Link href="/cicekler/saksi-bitkileri" className="block py-1 hover:text-[#18392B]">
                        🪴 Saksı Bitkileri
                      </Link>
                    </li>
                    <li>
                      <Link href="/cicekler/teraryumlar" className="block py-1 hover:text-[#18392B]">
                        🌱 Cam Teraryumlar
                      </Link>
                    </li>
                    <li>
                      <Link href="/cicekler/celenkler" className="block py-1 hover:text-[#18392B]">
                        🎀 Tören & Düğün Çelenkleri
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#A9B8A5]/20">
                  <p className="text-[11px] font-bold tracking-widest text-[#575A53] uppercase mb-2">
                    Özel Günler
                  </p>
                  <ul className="space-y-2 text-sm text-[#20221F]">
                    <li>
                      <Link href="/ozel-gunler/sevgiliye" className="block py-1 hover:text-[#6F2232]">
                        Sevgiliye / Yıldönümü
                      </Link>
                    </li>
                    <li>
                      <Link href="/ozel-gunler/dogum-gunu" className="block py-1 hover:text-[#18392B]">
                        Doğum Günü
                      </Link>
                    </li>
                    <li>
                      <Link href="/ozel-gunler/soz-nisan-dugun" className="block py-1 hover:text-[#18392B]">
                        Söz, Nişan & Düğün
                      </Link>
                    </li>
                    <li>
                      <Link href="/ozel-gunler/gecmis-olsun" className="block py-1 hover:text-[#18392B]">
                        Geçmiş Olsun
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-[#A9B8A5]/20 pt-4 mt-6 space-y-3">
              <Link
                href="/siparis-takip"
                className="block text-center py-2.5 px-4 rounded-md border border-[#18392B] text-[#18392B] text-xs uppercase tracking-wider font-semibold hover:bg-[#18392B] hover:text-white transition-colors"
              >
                Siparişim Nerede?
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
                className="block text-center py-2.5 px-4 rounded-md bg-[#18392B] text-white text-xs uppercase tracking-wider font-semibold"
              >
                Hemen Ara: {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
