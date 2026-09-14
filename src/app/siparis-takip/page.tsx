"use client";

import { BUSINESS_INFO } from "@/lib/constants";
import { Order } from "@/types";
import {
AlertCircle,
Calendar,
CheckCircle2,
Clock,
MapPin,
MessageCircle
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense,useState } from "react";

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";

  const [searchCode, setSearchCode] = useState(initialCode);
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLookup = async (codeToSearch: string) => {
    if (!codeToSearch.trim()) return;
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(
        `/api/orders?code=${encodeURIComponent(codeToSearch.trim())}&phone=${encodeURIComponent(phone)}`
      );
      const data = await res.json();
      if (res.ok && data.order) {
        setOrder(data.order);
      } else {
        setErrorMsg(
          data.error || "Belirtilen sipariş kodu veya telefon ile eşleşen sipariş bulunamadı."
        );
        setOrder(null);
      }
    } catch {
      setErrorMsg("Sipariş sorgulanırken bir sunucu hatası oluştu.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="py-16 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#6F2232]">
            Canlı Takip
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B] mt-1">
            SİPARİŞİM NEREDE?
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#575A53]">
            Sipariş numaranızı ve gönderici telefon numaranızı birlikte girin. Mevcut siteden verdiğiniz siparişler için WhatsApp hattımızdan destek alabilirsiniz.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup(searchCode);
          }}
          className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2 bg-[#FFFDFC] p-2 rounded-xl border border-[#A9B8A5]/40 shadow-sm mb-12"
        >
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            required aria-label="Sipariş numarası" placeholder="Sipariş numarası (MUS-…)"
            className="w-full text-xs sm:text-sm px-4 py-2 bg-transparent text-[#20221F] focus:outline-none"
          />
          <input required type="tel" aria-label="Gönderici telefon numarası" placeholder="Gönderici telefonu" value={phone} onChange={event => setPhone(event.target.value)} className="w-full text-sm px-4 py-2 bg-transparent min-w-0" />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-[#18392B] hover:bg-[#365B45] text-white text-xs font-bold uppercase tracking-wider rounded-full shrink-0 transition-colors cursor-pointer"
          >
            {isLoading ? "Aranıyor..." : "Sorgula"}
          </button>
        </form>

        {/* Error Message */}
        {errorMsg && (
          <div className="max-w-xl mx-auto mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Demo Quick Taps */}
        {!order && !isLoading && (
          <div className="max-w-xl mx-auto text-center p-4 bg-[#FFFDFC] rounded-xl border border-[#A9B8A5]/25 text-xs text-[#575A53] mb-8">
            <span className="font-semibold block mb-1">Örnek Kayıtlı Siparişler:</span>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchCode("MUS-20491");
                  handleLookup("MUS-20491");
                }}
                className="text-[#6F2232] underline hover:font-bold"
              >
                MUS-20491 (Hazırlanıyor)
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setSearchCode("MUS-19842");
                  handleLookup("MUS-19842");
                }}
                className="text-[#18392B] underline hover:font-bold"
              >
                MUS-19842 (Teslim Edildi)
              </button>
            </div>
          </div>
        )}

        {/* Order Details Card */}
        {order && (
          <div className="bg-[#FFFDFC] rounded-3xl p-6 sm:p-10 border border-[#A9B8A5]/30 shadow-sm space-y-8 animate-in fade-in duration-300">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#A9B8A5]/20 gap-4">
              <div>
                <span className="text-[11px] text-[#575A53] uppercase tracking-wider">
                  Sipariş Numarası
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#18392B]">
                  {order.orderNumber}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#365B45]/15 text-[#365B45]">
                  {order.status === "DELIVERED"
                    ? "Teslim Edildi"
                    : order.status === "OUT_FOR_DELIVERY"
                    ? "Dağıtımda"
                    : order.status === "PREPARING"
                    ? "Hazırlanıyor"
                    : "Sipariş Alındı"}
                </span>
              </div>
            </div>

            {/* Visual Timeline (Rule #25) */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#20221F]">
                Sipariş Aşamaları
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#A9B8A5]/30">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                        step.completed
                          ? "bg-[#18392B] text-white shadow-xs"
                          : "bg-[#F8F5EF] text-[#A9B8A5] border border-[#A9B8A5]/40"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <h5
                          className={`text-sm font-bold ${
                            step.completed ? "text-[#18392B]" : "text-[#575A53]"
                          }`}
                        >
                          {step.label}
                        </h5>
                        {step.timestamp && (
                          <span className="text-[11px] font-mono text-[#575A53]">
                            {step.timestamp}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#575A53] mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient & Delivery Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#A9B8A5]/20 text-xs">
              <div className="p-4 rounded-xl bg-[#F8F5EF] space-y-1.5">
                <span className="font-bold text-[#18392B] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Teslimat Adresi
                </span>
                <p className="text-[#20221F] font-semibold">
                  Alıcı: {order.recipient.fullName}
                </p>
                <p className="text-[#575A53]">
                  {order.recipient.district} • {order.recipient.address}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F5EF] space-y-1.5">
                <span className="font-bold text-[#18392B] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Tarih & Saat
                </span>
                <p className="text-[#20221F] font-semibold">
                  Tarih: {order.delivery.date}
                </p>
                <p className="text-[#575A53]">
                  Zaman Dilimi: {order.delivery.timeSlot}
                </p>
              </div>
            </div>

            {/* WhatsApp Direct Help */}
            <div className="pt-4 border-t border-[#A9B8A5]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#575A53]">
                Siparişinizle ilgili özel bir not eklemek veya kurye ile iletişime geçmek için:
              </span>

              <a
                href={`https://api.whatsapp.com/send?phone=${BUSINESS_INFO.whatsapp}&text=${encodeURIComponent(
                  `Merhaba, ${order.orderNumber} numaralı siparişim hakkında bilgi almak istiyorum.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Destek</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-xs text-[#575A53]">
          Sipariş bilgileri yükleniyor...
        </div>
      }
    >
      <OrderTrackingContent />
    </Suspense>
  );
}

