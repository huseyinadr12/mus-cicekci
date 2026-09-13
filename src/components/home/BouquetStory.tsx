import { Sparkles, Scissors, Palette, HeartHandshake, Package, Send, Truck } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Scissors,
    title: "Taze Çiçek Seçimi",
    description:
      "Her sabah mezattan gelen birinci sınıf, iri taç yapraklı ve taze açan çiçekler tek tek elle seçilir.",
  },
  {
    step: "02",
    icon: Palette,
    title: "Renk & Form Dengesi",
    description:
      "Çiçeklerin tonları, okaliptus yaprakları ve dolgu bitkileriyle botanik altın orana göre harmanlanır.",
  },
  {
    step: "03",
    icon: HeartHandshake,
    title: "Usta El Düzenlemesi",
    description:
      "2017'den bu yana Muş'ta çiçekçilik sanatını icra eden deneyimli ustalarımız buketi incelikle bağlar.",
  },
  {
    step: "04",
    icon: Package,
    title: "Lüks İtalyan Ambalaj",
    description:
      "Doğal kraft veya saten kumaş ambalaj, özel kesim kurdele ile koruyucu su haznesiyle paketlenir.",
  },
  {
    step: "05",
    icon: Send,
    title: "Kişisel Duygu Kartı",
    description:
      "Seçtiğiniz veya kaleme aldığınız duygu dolu mesaj, özel dokulu zarflı karta özenle basılır.",
  },
  {
    step: "06",
    icon: Truck,
    title: "Özel Kurye ile Teslimat",
    description:
      "Çiçekler klimalı teslimat araçlarımızla ezilmeden, tam saatinde sevdiklerinizin kapısına teslim edilir.",
  },
];

export default function BouquetStory() {
  return (
    <section className="py-24 bg-[#FFFDFC] border-t border-[#A9B8A5]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#6F2232] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Zanaat & Emek
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B] mt-2">
            BİR BUKET NASIL HAZIRLANIR?
          </h2>
          <p className="mt-3 text-sm text-[#575A53]">
            Sıradan bir kutu değil; topraktan kapıya uzanan titiz ve duygusal bir el emeği hikâyesi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-7 rounded-2xl bg-[#F8F5EF] border border-[#A9B8A5]/25 hover:border-[#365B45]/50 transition-all duration-300 hover:shadow-md group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-light text-[#A9B8A5] group-hover:text-[#6F2232] transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#FFFDFC] flex items-center justify-center text-[#18392B] shadow-xs group-hover:bg-[#18392B] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif text-lg font-semibold text-[#18392B] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#575A53] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
