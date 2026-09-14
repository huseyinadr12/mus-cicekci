import Link from "next/link";

export default function PreviewOnly() {
  return <div className="min-h-[60vh] px-6 py-24 text-center max-w-2xl mx-auto"><p className="editorial-eyebrow">TASARIM ÖNİZLEMESİ</p><h1 className="font-serif text-4xl mt-5 mb-5">Çiçekleri keşfet, tasarımı incele.</h1><p>Bu bağlantı projenin demo sürümüdür. Gerçek sipariş alınmaz, ödeme yapılmaz ve kişisel bilgi toplanmaz. Sipariş takibi ve yönetici girişi bu önizlemede kapalıdır.</p><Link href="/cicekler" className="editorial-button mt-8">Koleksiyona dön ↗</Link></div>;
}
