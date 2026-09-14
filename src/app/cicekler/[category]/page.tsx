import ProductCard from "@/components/commerce/ProductCard";
import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const CATEGORY_MAP: Record<string, { title: string; subtitle: string; description: string }> = {
  guller: {
    title: "GÜLLER",
    subtitle: "Kırmızı & Beyaz Gül Aranjmanları",
    description: "En taze kırmızı ve beyaz Ekvador gülleri, el yapımı buketler ve kristal vazolu sunumlar.",
  },
  orkideler: {
    title: "ORKİDELER",
    subtitle: "Çift Dallı Lüks Phalaenopsis",
    description: "Haftalarca taze kalan, asalet ve saygının simgesi ithal saksı orkideleri.",
  },
  buketler: {
    title: "BUKETLER",
    subtitle: "Özel Tasarım Çiçek Buketleri",
    description: "Mevsimin en taze gerberaları, lilyumları ve gülleriyle usta ellerde bağlanan buketler.",
  },
  "vazoda-cicekler": {
    title: "VAZODA ÇİÇEKLER",
    subtitle: "Kristal & Seramik Sunumlar",
    description: "Vazosuyla hazır, masaları anında aydınlatan hazır çiçek düzenlemeleri.",
  },
  "saksi-bitkileri": {
    title: "SAKSI BİTKİLERİ",
    subtitle: "Salon & Ofis Canlı Bitkileri",
    description: "Antoryum, difenbahya ve dayanıklı iç mekan yeşil yapraklı bitkiler.",
  },
  teraryumlar: {
    title: "TERARYUMLAR",
    subtitle: "El Yapımı Minyatür Bahçeler",
    description: "Şık cam fanus içerisinde doğal yosun ve sukulentlerle hazırlanan sanatsal dünyalar.",
  },
  celenkler: {
    title: "ÇELENKLER",
    subtitle: "Düğün, Açılış & Taziye Çelenkleri",
    description: "Muş tören ve kutlamalarına özel isim yazılı kurdeleli görkemli ayaklı çelenkler.",
  },
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const meta = CATEGORY_MAP[category];

  if (!meta) {
    notFound();
  }

  const products = await db.getProductsByCategory(category);

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#575A53] mb-2 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-[#18392B]">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/cicekler" className="hover:text-[#18392B]">
              Çiçekler
            </Link>
            <span>/</span>
            <span className="text-[#18392B] font-bold">{meta.title}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B]">
            {meta.title}
          </h1>
          <p className="text-xs uppercase tracking-widest font-semibold text-[#6F2232] mt-1">
            {meta.subtitle}
          </p>
          <p className="mt-2 text-sm text-[#575A53] max-w-2xl">
            {meta.description}
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <h3 className="font-serif text-xl text-[#18392B]">
              Bu kategoride şu anda ürün bulunmuyor.
            </h3>
            <Link
              href="/cicekler"
              className="inline-block text-xs uppercase tracking-wider font-bold bg-[#18392B] text-white py-2.5 px-6 rounded-md"
            >
              Tüm Çiçekleri İncele
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
