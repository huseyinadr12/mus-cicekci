import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/constants";

export const metadata = {
  title: "Mesafeli Satış Sözleşmesi | Muş Çiçekçi",
};

export default function DistanceSellingContractPage() {
  return (
    <div className="py-16 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFFDFC] p-8 sm:p-12 rounded-3xl border border-[#A9B8A5]/25 shadow-xs space-y-6 text-xs text-[#20221F] leading-relaxed">
        <h1 className="font-serif text-2xl sm:text-4xl text-[#18392B] font-bold">
          Mesafeli Satış Sözleşmesi
        </h1>

        <div className="space-y-4">
          <h3 className="font-bold text-sm text-[#18392B]">1. TARAFLAR</h3>
          <p>
            <strong>SATICI:</strong> {BUSINESS_INFO.legalName} ({BUSINESS_INFO.name})<br />
            <strong>ADRES:</strong> {BUSINESS_INFO.address}<br />
            <strong>TELEFON:</strong> {BUSINESS_INFO.phone}<br />
            <strong>E-POSTA:</strong> {BUSINESS_INFO.email}
          </p>

          <h3 className="font-bold text-sm text-[#18392B]">2. SÖZLEŞMENİN KONUSU</h3>
          <p>
            İşbu sözleşmenin konusu, ALICI&apos;nın SATICI&apos;ya ait internet sitesinden elektronik ortamda siparişini yaptığı çiçek ve hediyelik ürünlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
          </p>

          <h3 className="font-bold text-sm text-[#18392B]">3. CAYMA HAKKI İSTİSNALARI</h3>
          <p>
            Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesi uyarınca; çabuk bozulabilen veya son kullanma tarihi geçme ihtimali olan canlı çiçek ve taze bitkilerde cayma hakkı kullanılamaz. Ancak hasarlı veya ayıplı teslimat durumunda derhal yenisiyle değişim veya iade sağlanır.
          </p>
        </div>
      </div>
    </div>
  );
}
