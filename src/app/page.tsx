import FloralHero3D from "@/components/three/FloralHero3D";
import EmotionSelector from "@/components/home/EmotionSelector";
import SameDaySection from "@/components/home/SameDaySection";
import FlowerUniverse from "@/components/home/FlowerUniverse";
import BouquetStory from "@/components/home/BouquetStory";
import MuşDeliveryZones from "@/components/home/MuşDeliveryZones";
import CustomerReviewsSection from "@/components/home/CustomerReviewsSection";
import FinalClosingScene from "@/components/home/FinalClosingScene";
import { db } from "@/lib/db";
import { BUSINESS_INFO } from "@/lib/constants";

export default async function HomePage() {
  const products = await db.getProducts();

  // JSON-LD Structured Data for LocalBusiness & Florist
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Florist",
    "name": BUSINESS_INFO.name,
    "legalName": BUSINESS_INFO.legalName,
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200",
    "@id": "https://muscicekci.net",
    "url": "https://muscicekci.net",
    "telephone": BUSINESS_INFO.phone,
    "priceRange": "₺₺",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kültür Mahallesi İstasyon Caddesi 168. Sokak, Yeni Öğretmen Evi Karşısı",
      "addressLocality": "Muş",
      "postalCode": "49100",
      "addressCountry": "TR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.7432,
      "longitude": 41.4916,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      "opens": "08:30",
      "closes": "22:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01: Signature 3D Floral Hero with Rose Petal Transition */}
      <FloralHero3D />

      {/* 02: Emotion-Driven Selection: "NE SÖYLEMEK İSTİYORSUN?" */}
      <EmotionSelector />

      {/* 03: Same-Day Delivery Highlight: "BUGÜN GÖNDER" */}
      <SameDaySection products={products} />

      {/* 04: Botanical Specimen Exhibition: "ÇİÇEKLERİN DÜNYASI" */}
      <FlowerUniverse />

      {/* 05: Craftsmanship & Florist Journey: "BİR BUKET NASIL HAZIRLANIR?" */}
      <BouquetStory />

      {/* 06: Local Geography: "MUŞ'TA AYNI GÜN TESLİMAT" & Districts */}
      <MuşDeliveryZones />

      {/* 07: Real Testimonials: "BİNLERCE ANIN BİR PARÇASI." */}
      <CustomerReviewsSection />

      {/* 08: Final Emotional Closing Scene: "BAZEN BİR ÇİÇEK HER ŞEYİ SÖYLER." */}
      <FinalClosingScene />
    </>
  );
}
