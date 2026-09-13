import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/commerce/CartDrawer";
import WhatsAppFloatingBtn from "@/components/layout/WhatsAppFloatingBtn";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muscicekci.net"),
  title: {
    default: "Muş Çiçekçi | Taşdemir Çiçekçilik - Muş'ta Aynı Gün Çiçek Siparişi",
    template: "%s | Muş Çiçekçi",
  },
  description:
    "Muş çiçek siparişi. Taşdemir Çiçekçilik güvencesiyle Muş Merkez ve ilçelerine aynı gün teslimat taze kırmızı güller, orkideler, doğum günü buketleri ve çelenkler.",
  keywords: [
    "Muş çiçekçi",
    "Muş çiçek siparişi",
    "Muş çiçek",
    "Taşdemir Çiçekçilik",
    "Muş aynı gün çiçek",
    "Muş online çiçekçi",
    "Muş orkide siparişi",
    "Muş gül buketi",
    "Muş çelenk siparişi",
    "Muş düğün çiçeği",
  ],
  authors: [{ name: "Taşdemir Çiçekçilik" }],
  creator: "Muş Çiçekçi",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://muscicekci.net",
    siteName: "Muş Çiçekçi",
    title: "Muş Çiçekçi | Her Çiçeğin Bir Hikâyesi Var",
    description:
      "Muş'ta aynı gün teslim edilen, özenle hazırlanan taze çiçekler ve hediyeler.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Muş Çiçekçi Taze Buketler",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F5EF] text-[#20221F] font-sans selection:bg-[#6F2232] selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppFloatingBtn />
      </body>
    </html>
  );
}
