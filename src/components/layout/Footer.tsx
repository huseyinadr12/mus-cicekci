import BrandSignature from "@/components/BrandSignature";
import { BUSINESS_INFO } from "@/lib/constants";
import {
Award,
Clock,
HeartHandshake,
Mail,
MapPin,
Phone,
ShieldCheck,
Truck,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#18392B] text-[#F8F5EF] pt-16 pb-8 border-t border-[#365B45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#365B45]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#365B45]/40 flex items-center justify-center shrink-0 text-[#A9B8A5]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Aynı Gün Teslimat
              </h4>
              <p className="text-[11px] text-[#A9B8A5]">
                Muş içi aynı gün teslimat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#365B45]/40 flex items-center justify-center shrink-0 text-[#A9B8A5]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Taze Çiçek Garantisi
              </h4>
              <p className="text-[11px] text-[#A9B8A5]">
                Özenle seçilen taze çiçekler
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#365B45]/40 flex items-center justify-center shrink-0 text-[#A9B8A5]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Usta Çiçekçi Eli
              </h4>
              <p className="text-[11px] text-[#A9B8A5]">
                2017&apos;den beri özenli el işçiliği
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#365B45]/40 flex items-center justify-center shrink-0 text-[#A9B8A5]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Kolay İletişim
              </h4>
              <p className="text-[11px] text-[#A9B8A5]">
                Telefon ve WhatsApp desteği
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-[#365B45]/40 text-xs">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <BrandSignature />
              <p className="text-[10px] text-[#E7B9A5] tracking-[0.2em] uppercase font-semibold mt-0.5">
                Muş’ta kök salan bir çiçek atölyesi.
              </p>
            </div>
            <p className="text-[#A9B8A5] leading-relaxed max-w-sm">
              Her çiçeğin bir hikâyesi var. Muş&apos;ta sevdiklerinize en taze çiçekleri, 
              özel tasarım buketleri ve kalpten gelen mesajları özenle ulaştırıyoruz.
            </p>
            <div className="pt-2 text-[#F8F5EF] space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A9B8A5] shrink-0 mt-0.5" />
                <span className="text-[#A9B8A5]">
                  {BUSINESS_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A9B8A5] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.phone} / {BUSINESS_INFO.landline}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A9B8A5] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#A9B8A5] shrink-0" />
                <span className="text-[#A9B8A5]">{BUSINESS_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Çiçekler */}
          <div>
            <h5 className="font-serif text-sm text-white tracking-wider uppercase mb-4 font-semibold">
              Koleksiyonlar
            </h5>
            <ul className="space-y-2.5 text-[#A9B8A5]">
              <li>
                <Link href="/cicekler/guller" className="hover:text-white transition-colors">
                  Kırmızı & Beyaz Güller
                </Link>
              </li>
              <li>
                <Link href="/cicekler/orkideler" className="hover:text-white transition-colors">
                  Çift Dallı Orkideler
                </Link>
              </li>
              <li>
                <Link href="/cicekler/buketler" className="hover:text-white transition-colors">
                  Özel Tasarım Buketler
                </Link>
              </li>
              <li>
                <Link href="/cicekler/vazoda-cicekler" className="hover:text-white transition-colors">
                  Cam Vazoda Çiçekler
                </Link>
              </li>
              <li>
                <Link href="/cicekler/saksi-bitkileri" className="hover:text-white transition-colors">
                  Saksı & Salon Bitkileri
                </Link>
              </li>
              <li>
                <Link href="/cicekler/teraryumlar" className="hover:text-white transition-colors">
                  El Yapımı Teraryumlar
                </Link>
              </li>
              <li>
                <Link href="/cicekler/celenkler" className="hover:text-white transition-colors">
                  Düğün & Taziye Çelenkleri
                </Link>
              </li>
            </ul>
          </div>

          {/* Özel Günler */}
          <div>
            <h5 className="font-serif text-sm text-white tracking-wider uppercase mb-4 font-semibold">
              Duygular & Anlar
            </h5>
            <ul className="space-y-2.5 text-[#A9B8A5]">
              <li>
                <Link href="/ozel-gunler/sevgiliye" className="hover:text-white transition-colors">
                  Sevgiliye & Yıldönümü
                </Link>
              </li>
              <li>
                <Link href="/ozel-gunler/dogum-gunu" className="hover:text-white transition-colors">
                  Doğum Günü Çiçekleri
                </Link>
              </li>
              <li>
                <Link href="/ozel-gunler/soz-nisan-dugun" className="hover:text-white transition-colors">
                  Söz, Nişan & Düğün
                </Link>
              </li>
              <li>
                <Link href="/ozel-gunler/gecmis-olsun" className="hover:text-white transition-colors">
                  Geçmiş Olsun Dilekleri
                </Link>
              </li>
              <li>
                <Link href="/ozel-gunler/yeni-bebek" className="hover:text-white transition-colors">
                  Yeni Bebek Kutlaması
                </Link>
              </li>
              <li>
                <Link href="/ozel-gunler/yeni-is" className="hover:text-white transition-colors">
                  Yeni İş & Tebrik
                </Link>
              </li>
              <li>
                <Link href="/cicekler/celenkler" className="hover:text-white transition-colors">
                  Cenaze & Taziye Çiçeği
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurumsal & Muş Teslimat */}
          <div>
            <h5 className="font-serif text-sm text-white tracking-wider uppercase mb-4 font-semibold">
              Muş Teslimat Bölgeleri
            </h5>
            <ul className="space-y-2.5 text-[#A9B8A5]">
              <li>
                <Link href="/teslimat#merkez" className="hover:text-white transition-colors">
                  Muş Merkez
                </Link>
              </li>
              <li>
                <Link href="/teslimat#haskoy" className="hover:text-white transition-colors">
                  Hasköy Aynı Gün Teslimat
                </Link>
              </li>
              <li>
                <Link href="/teslimat#korkut" className="hover:text-white transition-colors">
                  Korkut Çiçek Siparişi
                </Link>
              </li>
              <li>
                <Link href="/teslimat#bulanik" className="hover:text-white transition-colors">
                  Bulanık Çiçek Gönder
                </Link>
              </li>
              <li>
                <Link href="/teslimat#malazgirt" className="hover:text-white transition-colors">
                  Malazgirt Çiçek Teslimatı
                </Link>
              </li>
              <li>
                <Link href="/teslimat#varto" className="hover:text-white transition-colors">
                  Varto Çiçek Siparişi
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/siparis-takip" className="text-[#E7B9A5] hover:underline font-semibold">
                  → Siparişimi Takip Et
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-[#A9B8A5] gap-4">
          <p>
            © {new Date().getFullYear()} Taşdemir Çiçek Atölyesi. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/hakkimizda" className="hover:text-white transition-colors">
              Hakkımızda
            </Link>
            <Link href="/teslimat" className="hover:text-white transition-colors">
              Teslimat Şartları
            </Link>
            <Link href="/gizlilik-sozlesmesi" className="hover:text-white transition-colors">
              Gizlilik & Güvenlik
            </Link>
            <Link href="/mesafeli-satis-sozlesmesi" className="hover:text-white transition-colors">
              Mesafeli Satış Sözleşmesi
            </Link>
            <Link href="/admin" className="hover:text-white text-[#E7B9A5] transition-colors">
              Yönetici Paneli
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
