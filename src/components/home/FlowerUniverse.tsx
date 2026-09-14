"use client";

import { ArrowRight,Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
      "/images/source/products/a0c32630537e602b9b27d8323247f2e2.jpg",
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
      "/images/source/products/ab22cb774bb490a3926a06b1996f2fbf.jpg",
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
      "/images/source/products/1b8e355b4d35926fcaf3cfb06c889496.jpg",
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
      "/images/source/products/6d06556b48f0c1f4a526d0c269d711a9.jpg",
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
                aria-pressed={selectedSpecimen.id === item.id}
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
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain bg-white transition-transform duration-700 hover:scale-105"
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
                Çiçek Bakım Tavsiyesi:
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
