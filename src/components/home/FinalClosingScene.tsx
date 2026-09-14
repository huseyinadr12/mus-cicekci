import { ArrowRight,Sparkles } from "lucide-react";
import Image from "@/components/StoreImage";
import Link from "next/link";

export default function FinalClosingScene() {
  return (
    <section className="relative py-28 bg-[#18392B] text-[#F8F5EF] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#6F2232] blur-[150px] opacity-25 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#365B45] blur-[150px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#E7B9A5]">
              <Sparkles className="w-3.5 h-3.5" />
              Muş&apos;ta Sevginin Adresi
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
              BAZEN BİR ÇİÇEK
              <span className="block font-normal italic text-[#E7B9A5]">
                HER ŞEYİ SÖYLER.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#A9B8A5] max-w-lg leading-relaxed mx-auto lg:mx-0">
              Sen duygunu seç. Taşdemir Çiçekçilik atölyemizde özenle hazırlayıp,
              Muş Merkez ve ilçelerine sevgiyle ulaştıralım.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/cicekler"
                className="w-full sm:w-auto px-8 py-4 bg-[#F8F5EF] hover:bg-white text-[#18392B] text-xs font-bold uppercase tracking-[0.18em] rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>ÇİÇEK GÖNDER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/cicekler?delivery=same-day"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#365B45]/40 text-[#F8F5EF] border border-[#A9B8A5]/40 hover:border-white text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E7B9A5]" />
                <span>BUGÜN TESLİM ÜRÜNLER</span>
              </Link>
            </div>
          </div>

          {/* Right Illuminated Bouquet Composition */}
          <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full rounded-3xl overflow-hidden shadow-2xl border border-[#365B45]/50 group">
            <Image
              src="/images/editorial/bouquet.webp"
              alt="Bordo ve beyaz güllerle özgün buket kompozisyonu" sizes="(max-width: 1024px) 90vw, 40vw"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
              <span className="text-xs text-white font-serif tracking-wider block">
                Her çiçeğin bir hikâyesi var.
              </span>
              <span className="text-[11px] text-[#A9B8A5] block mt-0.5">
                Her gün 08:30 – 22:00
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
