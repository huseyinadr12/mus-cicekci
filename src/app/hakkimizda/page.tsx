import { Award,Heart,ShieldCheck,Sparkles } from "lucide-react";
import Image from "@/components/StoreImage";

export const metadata = {
  title: "Hakkımızda | Muş Çiçekçi - Taşdemir Çiçekçilik",
  description:
    "2017'den beri Muş'ta duyguları taze çiçeklerle buluşturan Taşdemir Çiçekçilik'in hikâyesi, değerleri ve zanaat anlayışı.",
};

export default function AboutPage() {
  return (
    <div className="py-16 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Story Header (Rule #27) */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-bold text-[#6F2232]">
            <Sparkles className="w-3.5 h-3.5" />
            2017&apos;den Beri Muş&apos;ta
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#18392B] leading-tight">
            MUŞ&apos;TA DUYGULARI
            <span className="block font-normal italic text-[#6F2232]">
              ÇİÇEKLERLE BULUŞTURUYORUZ.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#575A53] leading-relaxed pt-2">
            Taşdemir Çiçekçilik olarak yola çıktığımız ilk günden bu yana amacımız
            yalnızca çiçek satmak değil; binlerce kilometre uzaktan veya hemen yan sokaktan
            sevdiklerinize hissettirmek istediğiniz sevgiyi, vefayı ve tebessümü
            taptaze yapraklarla somutlaştırmaktır.
          </p>
        </div>

        {/* Editorial Photo Collage (Rule #28) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-xl border border-[#A9B8A5]/30">
            <Image
              src="/images/editorial/craft.webp"
              alt="Buket hazırlama sürecini anlatan temsili editoryal görsel"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#18392B] font-medium">
                Zanaat, Taze Çiçek & Özenli Paketleme
              </h3>
              <p className="text-xs sm:text-sm text-[#575A53] leading-relaxed">
                Muş Kültür Mahallesi&apos;ndeki atölyemizde her buket, sıradan bir sipariş gibi
                değil bir sanat eseri titizliğiyle ele alınır. Çiçeklerin renk uyumundan
                kullanılan saten kurdelenin dokusuna kadar her ayrıntı el emeğidir.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#A9B8A5]/20">
              <div className="p-4 rounded-xl bg-[#FFFDFC] border border-[#A9B8A5]/25">
                <span className="font-serif text-3xl font-bold text-[#18392B] block">
                  7+ Yıl
                </span>
                <span className="text-xs text-[#575A53] mt-1 block">
                  Muş&apos;ta kesintisiz yerel hizmet
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFDFC] border border-[#A9B8A5]/25">
                <span className="font-serif text-3xl font-bold text-[#6F2232] block">
                  %100
                </span>
                <span className="text-xs text-[#575A53] mt-1 block">
                  Muş içi aynı gün taze teslimat
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Values Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#A9B8A5]/20">
          <div className="p-6 rounded-2xl bg-[#FFFDFC] border border-[#A9B8A5]/25 space-y-2">
            <Heart className="w-6 h-6 text-[#6F2232]" />
            <h4 className="font-serif text-base font-bold text-[#18392B]">
              Duygu Odaklı Yaklaşım
            </h4>
            <p className="text-xs text-[#575A53] leading-relaxed">
              Her çiçeğin bir mesajı vardır. Aşk, minnet, geçmiş olsun veya kutlama...
              Doğru hisse doğru çiçeği öneriyoruz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDFC] border border-[#A9B8A5]/25 space-y-2">
            <Award className="w-6 h-6 text-[#365B45]" />
            <h4 className="font-serif text-base font-bold text-[#18392B]">
              Tazelik Garantisi
            </h4>
            <p className="text-xs text-[#575A53] leading-relaxed">
              Çiçeklerimiz beklemiş soğuk hava deposu çiçekleri değil; haftanın her günü
              taze temin edilen canlı tomurcuklardır.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDFC] border border-[#A9B8A5]/25 space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#18392B]" />
            <h4 className="font-serif text-base font-bold text-[#18392B]">
              Güvenli Yerel Kurye
            </h4>
            <p className="text-xs text-[#575A53] leading-relaxed">
              Kargo şirketleriyle değil; kendi özel çiçek korumalı araçlarımızla bizzat
              alıcısına teslim ediyoruz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
