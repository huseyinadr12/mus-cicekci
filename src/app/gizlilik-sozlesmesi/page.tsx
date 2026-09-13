import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/constants";

export const metadata = {
  title: "Gizlilik ve Güvenlik İlkeleri | Muş Çiçekçi",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFFDFC] p-8 sm:p-12 rounded-3xl border border-[#A9B8A5]/25 shadow-xs space-y-6 text-xs text-[#20221F] leading-relaxed">
        <h1 className="font-serif text-2xl sm:text-4xl text-[#18392B] font-bold">
          Gizlilik, Güvenlik ve KVKK Politikası
        </h1>

        <div className="space-y-4">
          <p>
            {BUSINESS_INFO.legalName} olarak müşterilerimizin ve alıcılarımızın kişisel verilerinin korunmasına azami özen göstermekteyiz.
          </p>

          <h3 className="font-bold text-sm text-[#18392B]">KREDİ KARTI GÜVENLİĞİ</h3>
          <p>
            Sitemiz üzerinden yapılan ödemelerde kart bilgileri kesinlikle sunucularımızda saklanmamaktadır. Tüm işlemler 256-Bit SSL sertifikası ve Banka 3D Secure altyapısı üzerinden şifrelenerek doğrudan ödeme sağlayıcısına iletilir.
          </p>

          <h3 className="font-bold text-sm text-[#18392B]">İSİMSİZ GÖNDERİ SEÇENEĞİ</h3>
          <p>
            Sipariş verirken &ldquo;İsimsiz Gönder&rdquo; kutucuğunu işaretlediğiniz takdirde, alıcıya ulaştırılan kart üzerinde ve teslimat esnasında gönderici kimliğiniz kesinlikle paylaşılmaz.
          </p>
        </div>
      </div>
    </div>
  );
}
