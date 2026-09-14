"use client";
import SearchModal from "@/components/commerce/SearchModal";
import { BUSINESS_INFO } from "@/lib/constants";
import { useCartStore } from "@/lib/store";
import { ArrowUpRight,ChevronDown,Menu,Phone,Search,ShoppingBag,X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect,useRef,useState,useSyncExternalStore } from "react";

const flowers = [["Tüm çiçekler", "/cicekler"], ["Güller", "/cicekler/guller"], ["Orkideler", "/cicekler/orkideler"], ["Buketler", "/cicekler/buketler"], ["Vazoda çiçekler", "/cicekler/vazoda-cicekler"], ["Saksı bitkileri", "/cicekler/saksi-bitkileri"], ["Teraryumlar", "/cicekler/teraryumlar"], ["Çelenkler", "/cicekler/celenkler"]];
const occasions = [["Tüm özel günler", "/ozel-gunler"], ["Sevgiliye", "/ozel-gunler/sevgiliye"], ["Doğum günü", "/ozel-gunler/dogum-gunu"], ["Söz, nişan & düğün", "/ozel-gunler/soz-nisan-dugun"], ["Geçmiş olsun", "/ozel-gunler/gecmis-olsun"], ["Yeni bebek", "/ozel-gunler/yeni-bebek"], ["Yeni iş", "/ozel-gunler/yeni-is"]];
const subscribe = () => () => {};
function HeaderContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const count = useCartStore(state => state.getItemCount());
  const openCart = useCartStore(state => state.openCart);
  useEffect(() => {
    function dismiss(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      nav.current?.querySelectorAll('details[open]').forEach(details => {
        details.removeAttribute('open');
        details.querySelector('summary')?.focus();
      });
      if (mobileOpen) { setMobileOpen(false); mobileToggle.current?.focus(); }
    }
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [mobileOpen]);
  return <>
    <div className="store-topbar"><span>Muş&apos;tan sevdiklerinize, aynı gün.</span><div><Link href="/siparis-takip">Siparişimi takip et</Link><a className="topbar-phone" href={`tel:${BUSINESS_INFO.phone.replaceAll(' ', '')}`}><Phone size={11} />{BUSINESS_INFO.phone}</a></div></div>
    <header className="store-header">
      <div className="store-header-inner">
        <Link href="/" aria-label="Muş Çiçekçi ana sayfa" className="store-wordmark">muş çiçekçi<span>TAŞDEMİR ÇİÇEKÇİLİK</span></Link>
        <nav ref={nav} className="desktop-nav" aria-label="Ana gezinme">
          {[["Çiçekler", flowers], ["Özel günler", occasions]].map(([label, links]) => <details key={label as string} className="nav-dropdown"><summary>{label as string}<ChevronDown size={12} /></summary><div className="nav-dropdown-panel">{(links as string[][]).map(([name, href]) => <Link key={href} href={href}>{name}<ArrowUpRight size={12} /></Link>)}</div></details>)}
          <Link href="/cicekler?delivery=same-day">Bugün teslim</Link><Link href="/hakkimizda">Hikâyemiz</Link><Link href="/iletisim">İletişim</Link>
        </nav>
        <div className="header-tools"><button onClick={() => setSearchOpen(true)} aria-label="Çiçek ara"><Search size={19} /></button><button onClick={openCart} aria-label={`Sepeti aç, ${mounted ? count : 0} ürün`}><ShoppingBag size={19} />{mounted && count > 0 && <span className="bag-count">{count}</span>}</button><button ref={mobileToggle} className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={mobileOpen} aria-controls="mobile-navigation">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      {mobileOpen && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobil gezinme"><Link onClick={() => setMobileOpen(false)} href="/cicekler?delivery=same-day" className="mobile-same-day">Bugün teslim çiçekler <ArrowUpRight size={16} /></Link><div>{[["Çiçekler", flowers], ["Özel günler", occasions]].map(([title, links]) => <section key={title as string}><h2>{title as string}</h2>{(links as string[][]).map(([label, href]) => <Link key={href} onClick={() => setMobileOpen(false)} href={href}>{label}</Link>)}</section>)}</div><div className="mobile-secondary"><Link href="/hakkimizda">Hikâyemiz</Link><Link href="/iletisim">İletişim</Link><Link href="/siparis-takip">Sipariş takibi</Link></div></nav>}
    </header>
    <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
  </>;
}
export default function Header() {
  const pathname = usePathname();
  return <HeaderContent key={pathname} />;
}
