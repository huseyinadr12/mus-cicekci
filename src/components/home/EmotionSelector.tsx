"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { EMOTION_OPTIONS } from "@/lib/constants";

export default function EmotionSelector() {
  const [activeEmotion, setActiveEmotion] = useState(EMOTION_OPTIONS[0]);

  return (
    <section id="duyguna-gore-sec" className="py-20 sm:py-28 bg-[#FFFDFC] relative overflow-hidden">
      {/* Background ambient color shift on active emotion */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeEmotion.colorHint }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#6F2232]">
            Duyguların Dili
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B] mt-2">
            NE SÖYLEMEK İSTİYORSUN?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#575A53]">
            Çiçek seçimi katalog sayfaları arasında kaybolmak değil, hislerinizi
            doğru çiçekle buluşturmaktır.
          </p>
        </div>

        {/* Emotion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMOTION_OPTIONS.map((emotion) => {
            const isSelected = activeEmotion.id === emotion.id;

            return (
              <Link
                key={emotion.id}
                href={`/ozel-gunler/${emotion.slug}`}
                onMouseEnter={() => setActiveEmotion(emotion)}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-7 border border-[#A9B8A5]/20 block"
              >
                {/* Background Image with botanical zoom */}
                <Image
                  src={emotion.imageUrl}
                  alt={emotion.title}
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Editorial Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18392B]/95 via-[#18392B]/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Card Content */}
                <div className="relative z-10 text-white">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-[#E7B9A5] mb-2">
                    <Sparkles className="w-2.5 h-2.5" />
                    {emotion.emotionName}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide leading-tight group-hover:text-[#F8F5EF] transition-colors">
                    {emotion.title}
                  </h3>

                  <p className="text-xs text-[#F8F5EF]/80 font-light mt-2 line-clamp-2 leading-relaxed">
                    {emotion.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-[#E7B9A5] tracking-wider uppercase">
                    <span>{emotion.flowerType}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
