import DepthImage from "@/components/animation/DepthImage";
import { EDITORIAL } from "@/lib/catalog";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const steps = [
  ["Çiçeği seçiyoruz.", "Rengi, dokusu ve tazeliğiyle birbiriyle uyumlu çiçekler bir araya gelir."],
  ["Duygunu ekliyoruz.", "Özenli bir düzenleme, güzel bir kurdele ve senin kelimelerin."],
  ["Sevgiyle ulaştırıyoruz.", "Hazırlanan buket, seçtiğin adrese ve sevdiğin kişiye doğru yola çıkar."],
];
export default function BouquetStory() {
  return <section className="craft-section">
    <figure className="craft-photo"><DepthImage src={EDITORIAL.craft} alt="Bir buketin kurdelesinin elde bağlanmasını anlatan özgün editoryal görsel" /><figcaption>Buket hazırlama sürecini anlatan temsili görsel.</figcaption></figure>
    <div className="craft-copy"><span className="editorial-eyebrow">BİR BUKETİN HİKÂYESİ</span><h2>Her dokunuşta<br /><em>biraz özen.</em></h2><div className="craft-steps">{steps.map(([title, description], index) => <div key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div><Link href="/hakkimizda" className="editorial-text-link">Bizi daha yakından tanı <ArrowUpRight size={16} /></Link></div>
  </section>;
}
