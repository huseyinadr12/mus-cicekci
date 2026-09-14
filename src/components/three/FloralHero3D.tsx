"use client";
import DepthImage from "@/components/animation/DepthImage";
import { EDITORIAL } from "@/lib/catalog";
import { ArrowDown,ArrowUpRight,MapPin } from "lucide-react";
import Link from "next/link";

export default function FloralHero3D() {
  return <section className="floral-hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <span className="editorial-eyebrow"><span className="small-rule" /> MUŞ ÇİÇEKÇİ · TAŞDEMİR ÇİÇEKÇİLİK</span>
      <h1 id="hero-title">Her duygu<br />bir <em>çiçek</em> bulur.</h1>
      <p>Söylemek istediğin ne varsa, bir çiçekle başlasın. Muş&apos;ta özenle hazırlanan buketler, sevdiklerinin kapısında.</p>
      <div className="hero-actions">
        <Link href="/cicekler" className="editorial-button">Çiçekleri keşfet <ArrowUpRight size={17} /></Link>
        <Link href="/cicekler?delivery=same-day" className="editorial-text-link">Bugün gönder <span>↗</span></Link>
      </div>
      <div className="hero-location"><MapPin size={15} /><span>Muş&apos;tan, sevgiyle.<br /><strong>Aynı gün teslimat</strong></span></div>
    </div>
    <div className="hero-photograph">
      <DepthImage src={EDITORIAL.bouquet} alt="Doğal ışıkta bordo ve beyaz güller, okaliptus ve saten kurdeleyle özgün buket kompozisyonu" priority />
      <div className="hero-photo-caption"><span>HER ÇİÇEĞİN BİR HİKÂYESİ VAR.</span><span>01 / Özenle, senin için.</span></div>
    </div>
    <Link href="#duyguna-gore-sec" className="hero-scroll"><ArrowDown size={14} /> Biraz ilham için aşağıya</Link>
  </section>;
}
