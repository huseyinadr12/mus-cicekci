"use client";

import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { ArrowRight,Minus,Plus,Sparkles,Trash2,Truck,X } from "lucide-react";
import Image from "@/components/StoreImage";
import Link from "next/link";
import { useDialogAccessibility } from "./useDialogAccessibility";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
  } = useCartStore();

  const subtotal = getSubtotal();
  const dialogRef = useDialogAccessibility(isCartOpen, closeCart);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Sepetiniz" tabIndex={-1} className="w-screen max-w-md bg-[#FFFDFC] shadow-2xl flex flex-col justify-between border-l border-[#A9B8A5]/30 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#A9B8A5]/20 bg-[#F8F5EF] flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#18392B]">
                Sepetiniz
              </h3>
              <p className="text-xs text-[#575A53]">
                {items.length === 0
                  ? "Sepetiniz henüz boş"
                  : `${items.length} farklı çiçek / aranjman seçildi`}
              </p>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#575A53] hover:text-[#18392B] rounded-full hover:bg-[#EFE9DE] transition-colors"
              aria-label="Sepeti Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#A9B8A5]/15">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EFE9DE] flex items-center justify-center text-[#18392B]">
                  <Sparkles className="w-8 h-8 stroke-1" />
                </div>
                <h4 className="font-serif text-base text-[#18392B] font-semibold">
                  Çiçek sepetiniz bomboş
                </h4>
                <p className="text-xs text-[#575A53] max-w-xs mx-auto">
                  Muş&apos;taki sevdiklerinize unutulmaz bir sürpriz yapmak için taze çiçeklerimizi keşfedin.
                </p>
                <button
                  onClick={closeCart}
                  className="inline-block text-xs uppercase tracking-wider font-bold bg-[#18392B] text-white py-2.5 px-6 rounded-md hover:bg-[#365B45] transition-colors"
                >
                  Çiçekleri Keşfet
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#EFE9DE] border border-[#A9B8A5]/20">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-semibold text-[#20221F] truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#A9B8A5] hover:text-[#6F2232] transition-colors"
                          aria-label="Ürünü Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#575A53] font-medium">
                        {formatPrice(item.product.price)}
                      </p>

                      {/* Delivery Date Tag */}
                      {item.deliveryDate && (
                        <div className="flex items-center gap-1 text-[11px] text-[#365B45] mt-1 font-medium">
                          <Truck className="w-3 h-3" />
                          <span>
                            {item.deliveryDate} • {item.deliverySlot || "Aynı Gün"}
                          </span>
                        </div>
                      )}

                      {/* Custom Card Message indicator */}
                      {item.cardMessage?.message && (
                        <p className="text-[10px] text-[#6F2232] bg-[#6F2232]/10 px-2 py-0.5 rounded mt-1 line-clamp-1 italic">
                          &ldquo;{item.cardMessage.message}&rdquo;
                        </p>
                      )}

                      {/* Add-ons list */}
                      {item.addOns && item.addOns.length > 0 && (
                        <div className="mt-1 space-y-0.5">
                          {item.addOns.map((add) => (
                            <p
                              key={add.item.id}
                              className="text-[10px] text-[#575A53]"
                            >
                              + {add.item.name} ({formatPrice(add.item.price)})
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#A9B8A5]/40 rounded bg-[#F8F5EF]">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-[#EFE9DE] text-[#20221F]"
                          aria-label="Adeti Azalt"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#20221F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-[#EFE9DE] text-[#20221F]"
                          aria-label="Adeti Artır"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#18392B]">
                        {formatPrice(
                          item.product.price * item.quantity +
                            (item.addOns || []).reduce(
                              (s, a) => s + a.item.price * a.quantity,
                              0
                            )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#A9B8A5]/20 bg-[#F8F5EF] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#575A53]">
                <span>Teslimat ücreti</span>
                <span className="text-[#365B45] font-semibold">Sonraki adımda</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-bold text-[#20221F]">
                  Ürünler Toplamı:
                </span>
                <span className="text-xl font-bold text-[#18392B]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#18392B] hover:bg-[#365B45] text-white font-medium text-xs uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-[0.99]"
              >
                <span>Siparişi Tamamla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[10px] text-center text-[#575A53]">
                Sipariş bilgilerini kontrol ederek devam edin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
