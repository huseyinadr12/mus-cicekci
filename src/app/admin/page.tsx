import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Yönetim", robots: { index: false, follow: false } };
export default function AdminPage() {
  return <div className="route-loading"><span className="editorial-eyebrow">TAŞDEMİR · YÖNETİM</span><h1 className="font-serif text-4xl my-5">Yönetici girişi gerekli.</h1><p>Yönetim paneli, yetkili giriş sistemi tamamlandıktan sonra açılacaktır.</p><Link href="/" className="editorial-button mt-6">Ana sayfaya dön</Link></div>;
}
