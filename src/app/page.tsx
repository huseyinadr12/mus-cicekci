import BouquetStory from "@/components/home/BouquetStory";
import CustomerReviewsSection from "@/components/home/CustomerReviewsSection";
import EmotionSelector from "@/components/home/EmotionSelector";
import FinalClosingScene from "@/components/home/FinalClosingScene";
import FlowerUniverse from "@/components/home/FlowerUniverse";
import MuşDeliveryZones from "@/components/home/MuşDeliveryZones";
import RosePassage from "@/components/home/RosePassage";
import SameDaySection from "@/components/home/SameDaySection";
import FloralHero3D from "@/components/three/FloralHero3D";
import SectionReveal from "@/components/animation/SectionReveal";
import { BUSINESS_INFO } from "@/lib/constants";
import { db } from "@/lib/db";

export default async function HomePage() {
  const products = await db.getProducts();

  // JSON-LD Structured Data for LocalBusiness & Florist
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Florist",
    "name": BUSINESS_INFO.name,
    "legalName": BUSINESS_INFO.legalName,
    "image": "https://muscicekci.net/images/editorial/bouquet.webp",
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
      <SectionReveal><EmotionSelector /></SectionReveal>

      {/* 03: Same-Day Delivery Highlight: "BUGÜN GÖNDER" */}
      <SectionReveal><SameDaySection products={products} /></SectionReveal>
      <RosePassage />

      {/* 04: Botanical Specimen Exhibition: "ÇİÇEKLERİN DÜNYASI" */}
      <SectionReveal><FlowerUniverse /></SectionReveal>

      {/* 05: Craftsmanship & Florist Journey: "BİR BUKET NASIL HAZIRLANIR?" */}
      <SectionReveal><BouquetStory /></SectionReveal>

      {/* 06: Local Geography: "MUŞ'TA AYNI GÜN TESLİMAT" & Districts */}
      <SectionReveal><MuşDeliveryZones /></SectionReveal>

      {/* 07: Real Testimonials: "BİNLERCE ANIN BİR PARÇASI." */}
      <CustomerReviewsSection />

      {/* 08: Final Emotional Closing Scene: "BAZEN BİR ÇİÇEK HER ŞEYİ SÖYLER." */}
      <SectionReveal><FinalClosingScene /></SectionReveal>
    </>
  );
}
