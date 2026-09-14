import Link from "next/link";
export default function NotFound() {
  return <div className="route-loading"><span className="editorial-eyebrow">404 · SAYFA BULUNAMADI</span><h1 className="font-serif text-5xl my-5">Yeni bir çiçekle başlayalım.</h1><p>Bu sayfa taşınmış ya da kaldırılmış olabilir.</p><Link href="/cicekler" className="editorial-button mt-8">Çiçekleri keşfet ↗</Link></div>;
}
