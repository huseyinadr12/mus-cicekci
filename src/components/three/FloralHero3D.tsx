"use client";
import DepthImage from "@/components/animation/DepthImage";
import { EDITORIAL } from "@/lib/catalog";
import { ArrowDown,ArrowUpRight,MapPin } from "lucide-react";
import Link from "next/link";

export default function FloralHero3D() {
  return <section className="floral-hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <span className="editorial-eyebrow"><span className="small-rule" /> TAŞDEMİR SEÇKİSİ · MUŞ</span>
      <h1 id="hero-title">Duygulara<br /><em>biçim</em> veriyoruz.</h1>
      <p>Rengiyle, dokusuyla, kokusuyla. Söylemek istediğiniz her şey, atölyemizde size özel bir çiçeğe dönüşür.</p>
      <div className="hero-actions">
        <Link href="/cicekler" className="editorial-button">Seçkiyi keşfet <ArrowUpRight size={17} /></Link>
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
