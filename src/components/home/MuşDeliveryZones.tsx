"use client";

import { DELIVERY_SLOTS,DISTRICT_ZONES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { CheckCircle2,Clock,MapPin,Truck } from "lucide-react";
import { useState } from "react";

export default function MuşDeliveryZones() {
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICT_ZONES[0]);

  return (
    <section className="py-20 bg-[#F8F5EF] border-t border-[#A9B8A5]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#18392B] flex items-center justify-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#365B45]" />
            Yerel Güven & Hız
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B] mt-2">
            MUŞ&apos;TA AYNI GÜN TESLİMAT
          </h2>
          <p className="mt-3 text-sm text-[#575A53]">
            Muş Merkez ve tüm çevre ilçelere özel araçlarımızla güvenli, zamanında teslimat.
          </p>
        </div>

        {/* District Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {DISTRICT_ZONES.map((district) => (
            <button
              key={district.id}
              onClick={() => setSelectedDistrict(district)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedDistrict.id === district.id
                  ? "bg-[#18392B] text-white shadow-md scale-105"
                  : "bg-[#FFFDFC] text-[#20221F] border border-[#A9B8A5]/30 hover:border-[#18392B]"
              }`}
            >
              {district.name}
            </button>
          ))}
        </div>

        {/* Selected District Details Card */}
        <div className="max-w-4xl mx-auto bg-[#FFFDFC] rounded-2xl p-6 sm:p-10 shadow-sm border border-[#A9B8A5]/25">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-[#A9B8A5]/20">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#18392B]/10 flex items-center justify-center text-[#18392B]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-[#575A53] uppercase tracking-wider block">
                  Teslimat Bölgesi
                </span>
                <h4 className="font-serif text-lg font-bold text-[#18392B]">
                  {selectedDistrict.name}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#365B45]/10 flex items-center justify-center text-[#365B45]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-[#575A53] uppercase tracking-wider block">
                  Teslimat Süresi
                </span>
                <h4 className="font-serif text-base font-bold text-[#20221F]">
                  {selectedDistrict.estimatedHours}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#6F2232]/10 flex items-center justify-center text-[#6F2232]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-[#575A53] uppercase tracking-wider block">
                  Kurye Ücreti
                </span>
                <h4 className="font-serif text-lg font-bold text-[#6F2232]">
                  {selectedDistrict.deliveryFee === 0
                    ? "ÜCRETSİZ"
                    : formatPrice(selectedDistrict.deliveryFee)}
                </h4>
              </div>
            </div>
          </div>

          {/* Time Windows */}
          <div className="pt-8">
            <h5 className="text-xs font-bold tracking-widest text-[#20221F] uppercase mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#365B45]" />
              Bugün Geçerli Teslimat Zaman Aralıkları
            </h5>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DELIVERY_SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  className="p-3 rounded-lg border border-[#A9B8A5]/30 bg-[#F8F5EF] text-center"
                >
                  <span className="text-[11px] text-[#575A53] block font-medium">
                    {slot.label}
                  </span>
                  <span className="text-sm font-bold text-[#18392B] block mt-0.5">
                    {slot.startTime} – {slot.endTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#365B45] font-semibold mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Uygun
                  </span>
                </div>
              ))}
            </div>

            {/* Neighborhoods pills */}
            {selectedDistrict.neighborhoods.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#A9B8A5]/15">
                <span className="text-[11px] font-semibold text-[#575A53] uppercase tracking-wider block mb-2.5">
                  Örnek Teslimat Mahalleleri & Noktaları:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDistrict.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="text-xs bg-[#EFE9DE] text-[#20221F] px-3 py-1 rounded-md"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
