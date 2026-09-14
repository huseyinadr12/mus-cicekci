"use client";

import { BUSINESS_INFO } from "@/lib/constants";
import { Clock,Mail,MapPin,MessageCircle,Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-16 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#6F2232]">
            Bize Ulaşın
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B] mt-2">
            İLETİŞİM & ATÖLYE
          </h1>
          <p className="mt-3 text-sm text-[#575A53]">
            Özel çiçek siparişleriniz, düğün çelenkleri veya teslimat sorularınız için haftanın 7 günü hizmetinizdeyiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details Card */}
          <div className="bg-[#FFFDFC] p-8 rounded-3xl border border-[#A9B8A5]/25 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#18392B]">
              Taşdemir Çiçekçilik
            </h3>

            <div className="space-y-4 text-xs text-[#20221F]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#365B45] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm">Mağaza Adresi:</span>
                  <p className="text-[#575A53] mt-0.5 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#365B45] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm">Telefon Numaraları:</span>
                  <p className="text-[#575A53] mt-0.5">
                    GSM: <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`} className="hover:underline font-semibold">{BUSINESS_INFO.phone}</a>
                  </p>
                  <p className="text-[#575A53]">
                    Sabit Tel: <a href={`tel:${BUSINESS_INFO.landline.replace(/\s/g, "")}`} className="hover:underline">{BUSINESS_INFO.landline}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm">WhatsApp Doğrudan Sipariş:</span>
                  <p className="text-[#575A53] mt-0.5">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${BUSINESS_INFO.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      +90 544 549 30 46 (Mesaj Gönder)
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#365B45] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm">E-posta:</span>
                  <p className="text-[#575A53] mt-0.5">
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:underline">
                      {BUSINESS_INFO.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#365B45] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm">Çalışma Saatleri:</span>
                  <p className="text-[#575A53] mt-0.5">
                    {BUSINESS_INFO.workingHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="bg-[#FFFDFC] p-8 rounded-3xl border border-[#A9B8A5]/25 shadow-xs space-y-5">
            <h3 className="font-serif text-2xl font-bold text-[#18392B]">
              Bize Mesaj Bırakın
            </h3>
            <p className="text-xs text-[#575A53]">
              Özel aranjman ve kurumsal teklifleriniz için formu doldurabilirsiniz.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Mesajınız iletildi, en kısa sürede dönüş yapacağız.");
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-semibold text-[#20221F] block mb-1">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  required
                  placeholder="Adınız Soyadınız"
                  className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#20221F] block mb-1">
                  Telefon Numaranız
                </label>
                <input
                  type="tel"
                  required
                  placeholder="05XX XXX XX XX"
                  className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#20221F] block mb-1">
                  Mesajınız
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="İletmek istediğiniz not..."
                  className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#18392B] hover:bg-[#365B45] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Mesajı Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
