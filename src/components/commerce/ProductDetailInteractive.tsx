"use client";

import {
ADD_ON_ITEMS,
CARD_TEMPLATES,
DELIVERY_SLOTS,
DISTRICT_ZONES,
} from "@/lib/constants";
import { useCartStore } from "@/lib/store";
import {
formatDateTurkish,
formatPrice,
getTodayDateString,
getTomorrowDateString,
} from "@/lib/utils";
import { AddOnItem,Product } from "@/types";
import {
ArrowRight,
Check,
Heart,
Plus,
ShieldCheck,
Sparkles,
Truck
} from "lucide-react";
import Image from "@/components/StoreImage";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductDetailInteractiveProps {
  product: Product;
}

export default function ProductDetailInteractive({
  product,
}: ProductDetailInteractiveProps) {
  const router = useRouter();
  const { addItem, closeCart } = useCartStore();

  // Image Gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Delivery configuration
  const today = getTodayDateString();
  const tomorrow = getTomorrowDateString();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICT_ZONES[0].name);
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[1].label);

  // Card message state
  const [cardMessage, setCardMessage] = useState("");
  const [senderSignature, setSenderSignature] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Upsell Add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<
    { item: AddOnItem; quantity: number }[]
  >([]);

  // Quantity
  const quantity = 1;

  const toggleAddOn = (addon: AddOnItem) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((a) => a.item.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.item.id !== addon.id);
      } else {
        return [...prev, { item: addon, quantity: 1 }];
      }
    });
  };

  const handleTemplateSelect = (text: string) => {
    setCardMessage(text);
  };

  const calculateTotal = () => {
    const base = product.price * quantity;
    const addOnsTotal = selectedAddOns.reduce(
      (sum, a) => sum + a.item.price * a.quantity,
      0
    );
    return base + addOnsTotal;
  };

  const handleAddToCart = () => {
    addItem(product, quantity, {
      deliveryDate: selectedDate,
      deliveryDistrict: selectedDistrict,
      deliverySlot: selectedSlot,
      cardMessage: cardMessage
        ? {
            message: cardMessage,
            senderSignature: isAnonymous ? "Bir Dost" : senderSignature,
            isAnonymous,
          }
        : undefined,
      addOns: selectedAddOns,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* LEFT COLUMN: Photographic Gallery (75% visual weight) */}
      <div className="lg:col-span-6 space-y-4">
        {/* Main Hero Photo */}
        <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-[#F6F3ED] border border-[#A9B8A5]/25 shadow-sm">
          <Image
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-center bg-white transition-all duration-500"
          />

          {product.sameDayDelivery && (
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-[#18392B]/90 backdrop-blur-xs text-white text-xs uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-md">
              <Sparkles className="w-3 h-3 text-[#E7B9A5]" />
              Muş İçi Bugün Teslim
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-[#18392B] scale-105 shadow-xs"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Botanical Care & Meaning Accords */}
        <div className="mt-8 pt-8 border-t border-[#A9B8A5]/25 space-y-4">
          {product.meaning && (
            <div className="p-4 rounded-xl bg-[#FFFDFC] border border-[#A9B8A5]/20">
              <span className="text-xs font-bold text-[#6F2232] uppercase tracking-wider block mb-1">
                🌹 Çiçeğin Sembolik Anlamı
              </span>
              <p className="text-xs text-[#575A53] leading-relaxed">
                {product.meaning}
              </p>
            </div>
          )}

          {product.careInstructions && (
            <div className="p-4 rounded-xl bg-[#FFFDFC] border border-[#A9B8A5]/20">
              <span className="text-xs font-bold text-[#365B45] uppercase tracking-wider block mb-1">
                🌿 Taşdemir Florist Bakım Rehberi
              </span>
              <p className="text-xs text-[#575A53] leading-relaxed">
                {product.careInstructions}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Commercial & Emotional Configurator */}
      <div className="lg:col-span-6 space-y-8 bg-[#FFFDFC] p-6 sm:p-8 rounded-3xl border border-[#A9B8A5]/25 shadow-xs">
        {/* Title & Price Header */}
        <div>
          <span className="text-xs uppercase tracking-widest text-[#6F2232] font-semibold">
            {product.flowerType} • {product.color}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl text-[#18392B] font-light mt-1">
            {product.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#575A53] mt-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#18392B]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#575A53] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-[#365B45] font-semibold bg-[#365B45]/10 px-2.5 py-1 rounded-full">
              KDV Dahil
            </span>
          </div>
        </div>

        {/* 01. DELIVERY PICKER (Rule #18 & #19) */}
        <div className="pt-6 border-t border-[#A9B8A5]/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#20221F] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#18392B]" />
              Teslimat Bilgileri
            </h3>
            <span className="text-[11px] text-[#365B45] font-semibold">
              Muş İçi Aynı Gün Kapıda
            </span>
          </div>

          {/* Date Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedDate(today)}
              className={`p-3 rounded-xl text-left border text-xs transition-all ${
                selectedDate === today
                  ? "border-[#18392B] bg-[#18392B] text-white shadow-xs"
                  : "border-[#A9B8A5]/30 bg-[#F8F5EF] text-[#20221F]"
              }`}
            >
              <span className="block font-bold">Bugün Teslimat</span>
              <span className="text-[10px] opacity-80">
                {formatDateTurkish(today)}
              </span>
            </button>

            <button
              onClick={() => setSelectedDate(tomorrow)}
              className={`p-3 rounded-xl text-left border text-xs transition-all ${
                selectedDate === tomorrow
                  ? "border-[#18392B] bg-[#18392B] text-white shadow-xs"
                  : "border-[#A9B8A5]/30 bg-[#F8F5EF] text-[#20221F]"
              }`}
            >
              <span className="block font-bold">Yarın Teslimat</span>
              <span className="text-[10px] opacity-80">
                {formatDateTurkish(tomorrow)}
              </span>
            </button>
          </div>

          {/* District & Time Window Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#575A53] uppercase block mb-1">
                Teslimat İlçesi
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF] text-[#20221F] focus:outline-none focus:border-[#18392B]"
              >
                {DISTRICT_ZONES.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} {d.deliveryFee === 0 ? "(Ücretsiz)" : `(+${d.deliveryFee} TL)`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#575A53] uppercase block mb-1">
                Teslimat Saati
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF] text-[#20221F] focus:outline-none focus:border-[#18392B]"
              >
                {DELIVERY_SLOTS.map((slot) => (
                  <option key={slot.id} value={slot.label}>
                    {slot.startTime} – {slot.endTime} ({slot.label})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 02. CARD MESSAGE WITH LIVE PARCHMENT PREVIEW (Rule #23) */}
        <div className="pt-6 border-t border-[#A9B8A5]/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#20221F] flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-[#6F2232]" />
              Duygusal Mesaj Kartı
            </h3>
            <span className="text-[10px] text-[#575A53]">
              {cardMessage.length} / 250 karakter
            </span>
          </div>

          {/* Ready Templates Pills */}
          <div className="flex flex-wrap gap-1.5">
            {CARD_TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTemplateSelect(t.text)}
                className="text-[10px] bg-[#F8F5EF] hover:bg-[#6F2232] hover:text-white text-[#20221F] px-2.5 py-1 rounded-full border border-[#A9B8A5]/30 transition-colors"
              >
                {t.category}
              </button>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={cardMessage}
            onChange={(e) => setCardMessage(e.target.value.slice(0, 250))}
            rows={3}
            placeholder="Kartınıza yazılmasını istediğiniz sevgi dolu notunuzu buraya yazın..."
            className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF] text-[#20221F] focus:outline-none focus:border-[#6F2232]"
          />

          {/* Live Parchment Card Preview (Rule #23: "render inside the card preview") */}
          {cardMessage && (
            <div className="relative p-5 rounded-xl bg-[#FFFBF0] border border-[#E7B9A5]/60 shadow-xs animate-in fade-in duration-300">
              <div className="text-center font-serif italic text-xs sm:text-sm text-[#20221F] leading-relaxed">
                &ldquo;{cardMessage}&rdquo;
              </div>
              <div className="mt-3 text-right font-serif text-xs text-[#6F2232] font-semibold">
                {isAnonymous ? "— Bir Dost (İsimsiz)" : senderSignature ? `— ${senderSignature}` : "— Adınız"}
              </div>
            </div>
          )}

          {/* Sender Signature & Anonymous Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <input
              type="text"
              value={senderSignature}
              disabled={isAnonymous}
              onChange={(e) => setSenderSignature(e.target.value)}
              placeholder="Kart İmzası (Örn: Caner)"
              className="text-xs p-2.5 rounded-lg border border-[#A9B8A5]/30 bg-[#F8F5EF] text-[#20221F] focus:outline-none disabled:opacity-40"
            />

            <label className="flex items-center gap-2 text-xs text-[#575A53] cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded text-[#18392B] focus:ring-0"
              />
              <span>İsimsiz Gönder (Gizli Kalsın)</span>
            </label>
          </div>
        </div>

        {/* 03. ADD A LITTLE MORE: UPSELL GIFTS (Rule #19) */}
        <div className="pt-6 border-t border-[#A9B8A5]/20 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#20221F] flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-[#365B45]" />
            Hediyeni Zenginleştir (Ek Ürünler)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ADD_ON_ITEMS.map((addon) => {
              const isSelected = selectedAddOns.some(
                (a) => a.item.id === addon.id
              );

              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddOn(addon)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#18392B] bg-[#18392B]/5 shadow-xs"
                      : "border-[#A9B8A5]/30 bg-[#F8F5EF] hover:border-[#18392B]"
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 bg-white">
                    <Image
                      src={addon.image}
                      alt={addon.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-semibold text-[#20221F] truncate">
                      {addon.name}
                    </h4>
                    <span className="text-xs font-bold text-[#18392B]">
                      +{formatPrice(addon.price)}
                    </span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                      isSelected
                        ? "bg-[#18392B] border-[#18392B] text-white"
                        : "border-[#A9B8A5] text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 04. BOTTOM ACTION & STICKY CTA */}
        <div className="pt-6 border-t border-[#A9B8A5]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-serif text-sm font-semibold text-[#575A53]">
              Toplam Sipariş Tutarı:
            </span>
            <span className="text-2xl font-bold text-[#18392B]">
              {formatPrice(calculateTotal())}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              className="py-4 px-6 rounded-full border border-[#18392B] text-[#18392B] hover:bg-[#18392B] hover:text-white text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer"
            >
              Sepete Ekle
            </button>

            <button
              onClick={handleBuyNow}
              className="py-4 px-6 rounded-full bg-[#18392B] hover:bg-[#365B45] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Şimdi Gönder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-[#575A53] pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#365B45]" />
              %100 Taze Çiçek Garantisi
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#365B45]" />
              Muş Merkez Teslimatı
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
