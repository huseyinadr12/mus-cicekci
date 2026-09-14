import { DELIVERY_SLOTS,DISTRICT_ZONES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { CheckCircle2,MapPin,Truck } from "lucide-react";

export const metadata = {
  title: "Muş Aynı Gün Teslimat Şartları | Taşdemir Çiçek Atölyesi",
  description:
    "Muş Merkez ve Hasköy, Korkut, Bulanık, Malazgirt, Varto ilçelerine aynı gün çiçek teslimatı saatleri, ücretleri ve kurye kuralları.",
};

export default function DeliveryPage() {
  return (
    <div className="py-16 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#18392B] flex items-center justify-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#365B45]" />
            Taşdemir Çiçek Atölyesi Lojistiği
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B] mt-2">
            MUŞ&apos;TA AYNI GÜN TESLİMAT
          </h1>
          <p className="mt-3 text-sm text-[#575A53]">
            Siparişlerinizin tazeliğini ve formunu koruyarak tam zamanında ulaştırıyoruz.
          </p>
        </div>

        {/* Time Windows */}
        <div className="bg-[#FFFDFC] rounded-3xl p-8 border border-[#A9B8A5]/25 shadow-xs space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#18392B]">
            Günlük Teslimat Zaman Aralıkları
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DELIVERY_SLOTS.map((slot) => (
              <div
                key={slot.id}
                className="p-4 rounded-xl bg-[#F8F5EF] border border-[#A9B8A5]/30 text-center space-y-1"
              >
                <span className="text-xs text-[#575A53] font-medium block">
                  {slot.label}
                </span>
                <span className="font-serif text-lg font-bold text-[#18392B] block">
                  {slot.startTime} – {slot.endTime}
                </span>
                <span className="text-[10px] text-[#365B45] font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Aynı Gün Geçerli
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Districts Table */}
        <div className="bg-[#FFFDFC] rounded-3xl p-8 border border-[#A9B8A5]/25 shadow-xs space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#18392B]">
            İlçelere Göre Teslimat Süreleri ve Ücretler
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F5EF] text-[#575A53] uppercase text-[10px] tracking-wider border-b border-[#A9B8A5]/20">
                <tr>
                  <th className="p-4 font-bold">Bölge / İlçe</th>
                  <th className="p-4 font-bold">Aynı Gün Durumu</th>
                  <th className="p-4 font-bold">Tahmini Varış Süresi</th>
                  <th className="p-4 font-bold">Kurye Ücreti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A9B8A5]/15 text-[#20221F]">
                {DISTRICT_ZONES.map((zone) => (
                  <tr key={zone.id} className="hover:bg-[#F8F5EF]/50">
                    <td className="p-4 font-bold text-[#18392B] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#365B45]" />
                      {zone.name}
                    </td>
                    <td className="p-4 text-[#365B45] font-semibold">
                      Evet (Aynı Gün)
                    </td>
                    <td className="p-4 text-[#575A53]">
                      {zone.estimatedHours}
                    </td>
                    <td className="p-4 font-bold text-[#18392B]">
                      {zone.deliveryFee === 0 ? "ÜCRETSİZ" : formatPrice(zone.deliveryFee)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
