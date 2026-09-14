import ProductCard from "@/components/commerce/ProductCard";
import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface OccasionPageProps {
  params: Promise<{ occasion: string }>;
}

const OCCASION_TITLES: Record<string, { title: string; desc: string }> = {
  sevgiliye: {
    title: "Sevgiliye & Aşk Çiçekleri",
    desc: "Aşkınızı, tutkunuzu ve bağlılığınızı anlatan en taze kırmızı gül buketleri ve romantik sunumlar.",
  },
  "dogum-gunu": {
    title: "Doğum Günü Çiçekleri",
    desc: "Yeni bir yaşın neşesini yansıtan capcanlı renkli gerberalar, lilyumlar ve neşeli buketler.",
  },
  "soz-nisan-dugun": {
    title: "Söz, Nişan & Düğün Çelenkleri",
    desc: "Yeni bir yuva kurarken en zarif beyaz güller ve Muş düğünlerine özel görkemli çelenkler.",
  },
  "gecmis-olsun": {
    title: "Geçmiş Olsun Çiçekleri",
    desc: "Hastaneye ve eve teslim; moral veren taze orkideler, huzur dolu yeşillikler.",
  },
  "yeni-bebek": {
    title: "Yeni Bebek Çiçekleri",
    desc: "Minik mucizenin gelişini kutlayan en naif pastel tonlu buketler ve tebrik aranjmanları.",
  },
  "yeni-is": {
    title: "Yeni İş & Terfi Çiçekleri",
    desc: "Ofis masalarına prestij katan uzun ömürlü çift dallı orkideler, antoryumlar ve teraryumlar.",
  },
  cenaze: {
    title: "Cenaze & Taziye Çelenkleri",
    desc: "Derin vefanızı ve taziye dileklerinizi saygıyla ileten tören çelenkleri.",
  },
  yildonumu: {
    title: "Yıldönümü Çiçekleri",
    desc: "Birlikte geçen her değerli yılı kutlayan özel tasarım güller ve çiçek sepetleri.",
  },
};

export default async function OccasionPage({ params }: OccasionPageProps) {
  const { occasion } = await params;
  const meta = OCCASION_TITLES[occasion];

  if (!meta) {
    notFound();
  }

  const products = await db.getProductsByOccasion(occasion);

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#575A53] mb-2 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-[#18392B]">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/ozel-gunler" className="hover:text-[#18392B]">
              Özel Günler
            </Link>
            <span>/</span>
            <span className="text-[#18392B] font-bold">{meta.title}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B]">
            {meta.title}
          </h1>
          <p className="mt-2 text-sm text-[#575A53] max-w-2xl">
            {meta.desc}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <h3 className="font-serif text-xl text-[#18392B]">
              Bu özel gün için çiçekler hazırlanıyor.
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
