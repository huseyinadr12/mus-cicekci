"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const SPECIMENS = [
  {
    id: "gul",
    name: "GÜL (ROSE)",
    latinName: "Rosa",
    symbolism: "Aşk • Tutku • Sonsuz Bağlılık",
    description:
      "Yüzyıllardır duyguların en evrensel ve asil tercümanı. Kırmızı tutkuyu, beyaz masumiyeti ve yeni başlangıçları fısıldar.",
    categoryLink: "/cicekler/guller",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
    careTip: "Saplarını 45 derecelik açıyla kesip serin yerde saklayın.",
  },
  {
    id: "orkide",
    name: "ORKİDE (ORCHID)",
    latinName: "Phalaenopsis",
    symbolism: "Zarafet • Asalet • Hayranlık",
    description:
      "Haftalarca taze kalan narin çiçekleriyle mekânlara heykelsi bir lüks katar. Yeni iş ve özel kutlamaların prestij simgesidir.",
    categoryLink: "/cicekler/orkideler",
    image:
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=1000&auto=format&fit=crop",
    careTip: "Haftada bir kez daldırma sulama yapın, kökleri havalansın.",
  },
  {
    id: "gerbera",
    name: "GERBERA",
    latinName: "Gerbera Jamesonii",
    symbolism: "Yaşama Sevinci • Samimiyet • Pozitif Enerji",
    description:
      "Güneş gibi açan canlı renkleriyle bulunduğu ortama anında yüksek enerji ve neşe aşılar. Doğum günlerinin vazgeçilmezidir.",
    categoryLink: "/cicekler/buketler",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1000&auto=format&fit=crop",
    careTip: "Az su dolu temiz vazoda muhafaza ediniz.",
  },
  {
    id: "lilyum",
    name: "LİLYUM (LILY)",
    latinName: "Lilium",
    symbolism: "Saflık • Yeniden Doğuş • Görkem",
    description:
      "Büyüleyici kokusu ve heybetli taç yapraklarıyla derin saygı ve kutlama anlarının en etkileyici temsilcisidir.",
    categoryLink: "/cicekler/buketler",
    image:
      "https://images.unsplash.com/photo-1509223197845-458d87318791?q=80&w=1000&auto=format&fit=crop",
    careTip: "Açan çiçeklerin polenlerini nazikçe ayıklayınız.",
  },
];

export default function FlowerUniverse() {
  const [selectedSpecimen, setSelectedSpecimen] = useState(SPECIMENS[0]);

  return (
    <section className="py-24 bg-[#18392B] text-[#F8F5EF] relative overflow-hidden">
      {/* Editorial ambient pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#A9B8A5_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E7B9A5]">
            Botanik Sergi
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-2">
            ÇİÇEKLERİN DÜNYASI
          </h2>
          <p className="mt-3 text-sm text-[#A9B8A5]">
            Her çiçeğin karakterini, taşıdığı hikâyeyi ve sembolik anlamını keşfedin.
          </p>

          {/* Specimen Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {SPECIMENS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSpecimen(item)}
                className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${
                  selectedSpecimen.id === item.id
                    ? "bg-[#F8F5EF] text-[#18392B] shadow-md scale-105"
                    : "bg-[#365B45]/40 text-[#A9B8A5] hover:text-white hover:bg-[#365B45]"
                }`}
              >
                {item.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Specimen Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#0F251C]/60 rounded-3xl p-6 sm:p-12 border border-[#365B45]/40 backdrop-blur-xs">
          {/* Specimen Image */}
          <div className="lg:col-span-7 relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={selectedSpecimen.image}
              alt={selectedSpecimen.name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-xs text-[#E7B9A5] italic">
                {selectedSpecimen.latinName}
              </span>
            </div>
          </div>

          {/* Specimen Editorial Story */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#E7B9A5] uppercase flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {selectedSpecimen.symbolism}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                {selectedSpecimen.name}
              </h3>
            </div>

            <p className="text-sm text-[#A9B8A5] leading-relaxed">
              {selectedSpecimen.description}
            </p>

            <div className="p-4 rounded-xl bg-[#18392B]/80 border border-[#365B45]/60 text-xs text-[#F8F5EF]">
              <span className="font-bold text-[#E7B9A5] block mb-1">
                🌿 Çiçek Bakım Tavsiyesi:
              </span>
              {selectedSpecimen.careTip}
            </div>

            <Link
              href={selectedSpecimen.categoryLink}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#E7B9A5] hover:bg-white text-[#18392B] font-bold text-xs uppercase tracking-widest transition-all shadow-md group"
            >
              <span>{selectedSpecimen.name.split(" ")[0]} Çiçeklerini Gör</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
