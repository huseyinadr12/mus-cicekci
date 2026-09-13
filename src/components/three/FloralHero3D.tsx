"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Sparkles, ArrowDown, Truck } from "lucide-react";

// Dynamically load Three.js Canvas with SSR false to ensure high performance
const FloralCanvas = dynamic(() => import("./FloralCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border-2 border-[#18392B]/10 border-t-[#6F2232] animate-spin" />
    </div>
  ),
});

export default function FloralHero3D() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL availability for low-end device fallback
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / (heroHeight * 0.85), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExploreClick = () => {
    const emotionSection = document.getElementById("duyguna-gore-sec");
    if (emotionSection) {
      emotionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#F8F5EF]">
      {/* Editorial Botanical Watermark / Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[radial-gradient(#365B45_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {hasWebGL ? (
          <FloralCanvas scrollProgress={scrollProgress} />
        ) : (
          /* Low-End Fallback: High quality static composition */
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden shadow-2xl animate-subtle-float">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=900&auto=format&fit=crop"
              alt="Muş Çiçekçi Taze Güller"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Organic Rose Petal Transition Aperture Mask (Rule #8) */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-transform duration-300 ease-out"
        style={{
          opacity: scrollProgress > 0.4 ? (scrollProgress - 0.4) * 1.6 : 0,
          transform: `scale(${1 + scrollProgress * 1.8})`,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover fill-[#6F2232]"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,0 L 100,0 L 100,100 L 0,100 Z M 50,50 m -25,0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0"
            fillRule="evenodd"
            opacity={0.35 * scrollProgress}
          />
        </svg>
      </div>

      {/* Foreground Hero Editorial Typography & CTAs */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16 flex flex-col items-center">
        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 bg-[#FFFDFC]/90 backdrop-blur-md border border-[#A9B8A5]/40 text-[#18392B] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm animate-fade-in">
          <Truck className="w-3.5 h-3.5 text-[#365B45]" />
          <span>Muş İçi Aynı Gün Teslimat</span>
          <span className="text-[#6F2232] font-bold">• 0436 212 30 46</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#18392B] tracking-tight leading-[1.08] max-w-3xl">
          HER DUYGU
          <span className="block italic font-normal text-[#6F2232]">
            BİR ÇİÇEK BULUR.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-[#575A53] max-w-xl font-normal leading-relaxed">
          Muş&apos;ta aynı gün teslim edilen, usta ellerle özenle hazırlanan
          taptaze çiçekler ve unutulmaz duygusal jestler.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={handleExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#18392B] hover:bg-[#365B45] text-[#F8F5EF] text-xs font-bold uppercase tracking-[0.18em] rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ÇİÇEKLERİ KEŞFET</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <Link
            href="/cicekler?delivery=same-day"
            className="w-full sm:w-auto px-8 py-4 bg-[#FFFDFC]/95 hover:bg-[#FFFDFC] text-[#6F2232] border border-[#6F2232]/40 hover:border-[#6F2232] text-xs font-bold uppercase tracking-[0.18em] rounded-full shadow-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6F2232]" />
            <span>BUGÜN TESLİM</span>
          </Link>
        </div>

        {/* Scroll indicator hint */}
        <div className="mt-14 hidden md:flex flex-col items-center text-[#575A53]/70 text-[11px] tracking-widest uppercase">
          <span className="mb-1">Kaydırarak Duygunu Seç</span>
          <div className="w-4 h-7 rounded-full border border-[#A9B8A5]/60 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#365B45] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
