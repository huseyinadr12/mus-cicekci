import { EMOTION_OPTIONS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import Image from "@/components/StoreImage";
import Link from "next/link";

const names = ["Seni seviyorum", "İyi ki doğdun", "Bir ömür mutluluk", "Geçmiş olsun", "Hoş geldin", "Yanındayım"];
export default function EmotionSelector() {
  return <section id="duyguna-gore-sec" className="py-16 sm:py-24 bg-ivory-light">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10"><div><span className="editorial-eyebrow text-burgundy">ÖNCE DUYGUNU SEÇ</span><h2 className="font-serif text-[38px] sm:text-5xl text-forest mt-3 leading-tight">Ne söylemek istiyorsun?</h2></div><p className="text-xs text-charcoal-muted max-w-xs leading-relaxed">Bazı duygular kelimelere sığmaz.<br />Bırak, senin yerine çiçekler anlatsın.</p></div>
      <div className="emotion-editorial">{EMOTION_OPTIONS.map((emotion, index) => <Link key={emotion.id} href={`/ozel-gunler/${emotion.slug}`}><div className="emotion-photo"><Image src={emotion.imageUrl} alt={emotion.flowerType} fill sizes="(max-width: 640px) 50vw, 33vw" /></div><div className="emotion-label"><div><h3>{names[index]}</h3><p>{emotion.emotionName}</p></div><ArrowUpRight size={20} className="text-forest" /></div></Link>)}</div>
    </div>
  </section>;
}
