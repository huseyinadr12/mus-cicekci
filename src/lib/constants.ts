import {
BlogPost,
CustomerReview,
DeliverySlot,
DistrictZone,
EmotionOption,
} from "@/types";

export const BUSINESS_INFO = {
  name: "Taşdemir Çiçek Atölyesi",
  legalName: "Taşdemir Çiçekçilik",
  foundingYear: 2017,
  tagline: "Her Çiçeğin Bir Hikâyesi Var",
  subTagline: "Muş'ta aynı gün teslim edilen, özenle hazırlanan çiçekler.",
  phone: "0 544 549 30 46",
  landline: "0436 212 30 46",
  whatsapp: "905445493046",
  email: "vehbitasdemir@gmail.com",
  address: "Kültür Mahallesi İstasyon Caddesi 168. Sokak, Yeni Öğretmen Evi Karşısı Büyük Eczane yanı, 49100 Muş",
  workingHours: "Haftanın 7 Günü: 08:30 – 22:00",
  instagramUrl: "https://www.instagram.com/tasdemircicekcilik2/",
  facebookUrl: "https://www.facebook.com/profile.php?id=100063621848036",
  iban: "",
  bankName: "",
  accountHolder: "Vehbi Taşdemir - Taşdemir Çiçekçilik",
};

export const EMOTION_OPTIONS: EmotionOption[] = [
  {
    id: "seni-seviyorum",
    slug: "sevgiliye",
    title: "SENİ SEVİYORUM",
    subtitle: "Aşk, Tutku & Saf Bağlılık",
    emotionName: "Aşk & Tutku",
    colorHint: "#6F2232",
    accentColor: "from-rose-900 to-red-950",
    flowerType: "Kırmızı Ekvador Gülleri",
    description: "Kelimelerin yetmediği anlarda en derin duygularınızı taze kırmızı güller anlatsın.",
    targetCategory: "guller",
    imageUrl: "/images/source/products/a0c32630537e602b9b27d8323247f2e2.jpg",
  },
  {
    id: "iyi-ki-dogdun",
    slug: "dogum-gunu",
    title: "İYİ Kİ DOĞDUN",
    subtitle: "Neşe, Coşku & Yeni Bir Yaş",
    emotionName: "Doğum Günü",
    colorHint: "#E7B9A5",
    accentColor: "from-amber-800 to-orange-900",
    flowerType: "Renkli Gerberalar & Papatyalar",
    description: "Günün enerjisini yükselten, taptaze mevsim renkleriyle harmanlanmış buketler.",
    targetCategory: "buketler",
    imageUrl: "/images/source/products/1b8e355b4d35926fcaf3cfb06c889496.jpg",
  },
  {
    id: "bir-omur-mutluluk",
    slug: "soz-nisan-dugun",
    title: "BİR ÖMÜR MUTLULUK",
    subtitle: "Söz, Nişan, Düğün & Tebrik",
    emotionName: "Kutlama & Birliktelik",
    colorHint: "#18392B",
    accentColor: "from-emerald-900 to-teal-950",
    flowerType: "Beyaz Güller & Lüks Aranjmanlar",
    description: "Yeni bir hayatın ilk adımında zarafetiyle büyüleyen görkemli düğün ve nişan çelenkleri.",
    targetCategory: "celenkler",
    imageUrl: "/images/source/products/cecabe4daba4067ab56001a0beea6ff0.jpg",
  },
  {
    id: "gecmis-olsun",
    slug: "gecmis-olsun",
    title: "GEÇMİŞ OLSUN",
    subtitle: "Huzur, Şifa & Canlandırıcı Yeşil",
    emotionName: "Şifa & Moral",
    colorHint: "#365B45",
    accentColor: "from-emerald-800 to-green-950",
    flowerType: "Beyaz Orkideler & Ökaliptus",
    description: "Huzur ve yaşam enerjisi fısıldayan saf orkide ve taze botanik yapraklar.",
    targetCategory: "orkideler",
    imageUrl: "/images/source/products/ab22cb774bb490a3926a06b1996f2fbf.jpg",
  },
  {
    id: "hos-geldin",
    slug: "yeni-bebek",
    title: "HOŞ GELDİN DÜNYAYA",
    subtitle: "Masumiyet & Yeni Bir Hayat",
    emotionName: "Yeni Bebek",
    colorHint: "#C98E98",
    accentColor: "from-pink-900 to-rose-950",
    flowerType: "Pastel Çiçekler & Papatyalar",
    description: "Minik bir mucizenin gelişini kutlamak için en naif pastel tonlar ve sevimli detaylar.",
    targetCategory: "buketler",
    imageUrl: "/images/source/products/849b0b4915f7e925d9a9a43365bd3697.jpg",
  },
  {
    id: "yanindayim",
    slug: "cenaze",
    title: "HER AN YANINDAYIM",
    subtitle: "Hüzün, Vefa & Saygı",
    emotionName: "Vefa & Taziye",
    colorHint: "#20221F",
    accentColor: "from-stone-800 to-zinc-950",
    flowerType: "Lilyumlar & Saygı Çelenkleri",
    description: "Zor günlerde desteğinizi ve derin saygınızı ifade eden asil taziye çelenkleri.",
    targetCategory: "celenkler",
    imageUrl: "/images/source/products/6d06556b48f0c1f4a526d0c269d711a9.jpg",
  },
];

export const DISTRICT_ZONES: DistrictZone[] = [
  {
    id: "merkez",
    name: "Muş Merkez",
    sameDay: true,
    deliveryFee: 30,
    estimatedHours: "Aynı Gün (2-3 Saat İçinde)",
    neighborhoods: [
      "Kültür Mahallesi",
      "Sunay Mahallesi",
      "Muratpaşa Mahallesi",
      "Zafer Mahallesi",
      "Hürriyet Mahallesi",
      "Saray Mahallesi",
      "Yeşilyurt Mahallesi",
      "Karşıyaka Mahallesi",
      "Kale Mahallesi",
      "Bağlar Mahallesi",
      "Muş Alparslan Üniversitesi Kampüsü",
      "Muş Devlet Hastanesi Çevresi",
    ],
  },
  {
    id: "haskoy",
    name: "Hasköy",
    sameDay: true,
    deliveryFee: 150,
    estimatedHours: "Aynı Gün (3-4 Saat)",
    neighborhoods: ["Hasköy Merkez", "Aşağıüçdam", "Karakütük", "Koçköy"],
  },
  {
    id: "korkut",
    name: "Korkut",
    sameDay: true,
    deliveryFee: 200,
    estimatedHours: "Aynı Gün (Özel Kurye)",
    neighborhoods: ["Korkut Merkez", "Altınova", "Kümbet"],
  },
  {
    id: "bulanik",
    name: "Bulanık",
    sameDay: true,
    deliveryFee: 250,
    estimatedHours: "Aynı Gün (Özel Kurye)",
    neighborhoods: ["Bulanık Merkez", "Yoncalı", "Rüstemgedik"],
  },
  {
    id: "malazgirt",
    name: "Malazgirt",
    sameDay: true,
    deliveryFee: 300,
    estimatedHours: "Aynı Gün (Özel Kurye)",
    neighborhoods: ["Malazgirt Merkez", "Konakkuran"],
  },
  {
    id: "varto",
    name: "Varto",
    sameDay: true,
    deliveryFee: 250,
    estimatedHours: "Aynı Gün (Özel Kurye)",
    neighborhoods: ["Varto Merkez", "Çaylar"],
  },
];

export const DELIVERY_SLOTS: DeliverySlot[] = [
  {
    id: "slot-1",
    label: "Sabah Teslimatı",
    startTime: "09:00",
    endTime: "12:00",
    isAvailable: true,
  },
  {
    id: "slot-2",
    label: "Öğle Teslimatı",
    startTime: "12:00",
    endTime: "15:00",
    isAvailable: true,
  },
  {
    id: "slot-3",
    label: "İkindi Teslimatı",
    startTime: "15:00",
    endTime: "18:00",
    isAvailable: true,
  },
  {
    id: "slot-4",
    label: "Akşam Teslimatı",
    startTime: "18:00",
    endTime: "21:00",
    isAvailable: true,
  },
];

export const CARD_TEMPLATES = [
  {
    id: "t1",
    category: "Sevgiliye & Aşk",
    text: "Gözlerinin değdiği her yer bahar bahçe... İyi ki varsın, seni çok seviyorum.",
  },
  {
    id: "t2",
    category: "Doğum Günü",
    text: "Yeni yaşın sana tüm güzellikleri, sağlık ve huzuru getirsin. Doğum günün kutlu olsun!",
  },
  {
    id: "t3",
    category: "Geçmiş Olsun",
    text: "Bir an önce sağlığına kavuşup aramıza dönmen dileğiyle. Çok geçmiş olsun, dualarımız seninle.",
  },
  {
    id: "t4",
    category: "Yeni İş / Tebrik",
    text: "Yeni görevinde başarılarının katlanarak devam etmesini dilerim. Yolun açık olsun!",
  },
  {
    id: "t5",
    category: "Özür Dilerim",
    text: "Seni kırmak asla istemezdim. Kalbimin en derin yerinden gelen samimi bir özürle affını diliyorum.",
  },
];

export { ADD_ON_ITEMS } from "./catalog";

export { PRODUCTS_CATALOG } from "./catalog";

export const CUSTOMER_REVIEWS: CustomerReview[] = [];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "orkide-bakimi-nasil-yapilir",
    title: "Orkide Bakımının Püf Noktaları: Çiçekleri Aylarca Nasıl Korunur?",
    excerpt: "Evinize veya ofisinize gelen zarif Phalaenopsis orkidenin haftalarca canlı kalmasını sağlayacak doğru sulama, ışık ve nem tüyoları.",
    content: `Orkideler sanıldığının aksine kaprisli değil, yalnızca doğal ortamlarındaki ritmi arayan özel bitkilerdir. Doğada ağaç gövdelerine tutunarak yaşarlar; bu nedenle köklerinin nefes alması ve suyun içinde boğulmaması hayati önem taşır.

1. Sulama Rutini: Orkidenizi haftada bir defa oda sıcaklığındaki içme suyu dolu bir kaba saksısıyla daldırın. 10-15 dakika bekledikten sonra fazla suyu tamamen süzün.
2. Işık İhtiyacı: Direkt güneş ışığı yaprakları yakabilir. Tül arkasından gelen aydınlık, filtrelenmiş gün ışığı orkideler için idealdir.
3. Kök Rengi Göstergesi: Kökler gümüşi griye döndüğünde sulama zamanı gelmiştir. Kökler parlak yeşilse su ihtiyacı yoktur.`,
    category: "Çiçek Bakımı",
    readTime: "4 dk okuma",
    date: "10 Eylül 2026",
    author: "Vehbi Taşdemir",
    image: "/images/source/products/ab22cb774bb490a3926a06b1996f2fbf.jpg",
    tags: ["Orkide", "Ev Bitkisi", "Sulama", "Muş Çiçek"],
  },
  {
    id: "blog-2",
    slug: "guller-vazoda-nasil-daha-uzun-dayanir",
    title: "Vazodaki Güllerin Ömrünü 2 Katına Çıkaran 5 Doğal Yöntem",
    excerpt: "Gül buketinizin ilk günkü tazeliğini ve büyüleyici kokusunu 10 güne kadar korumanın botanik sırları.",
    content: `Özel bir anda hediye gelen kırmızı veya beyaz güllerin solup gitmesi herkesi üzer. Doğru adımlarla gül buketinizin ömrünü 10-12 güne kadar rahatlıkla uzatabilirsiniz.

- 45 Derecelik Kesim: Sap uçlarını su altında 45 derecelik açıyla kesin. Bu, su emilim yüzeyini maksimize eder ve hava kabarcığı oluşmasını engeller.
- Su Seviyesindeki Yaprakları Temizleyin: Su içinde kalan yapraklar bakteriye sebep olarak suyun kalitesini bozar.
- 2 Günde Bir Taze Su: Vazonuzun suyunu gün aşırı değiştirin ve serin bir ortamda tutun.`,
    category: "Rehber",
    readTime: "3 dk okuma",
    date: "5 Eylül 2026",
    author: "Taşdemir Florist Ekibi",
    image: "/images/source/products/a0c32630537e602b9b27d8323247f2e2.jpg",
    tags: ["Gül Bakımı", "Buket", "Püf Noktaları"],
  },
  {
    id: "blog-3",
    slug: "musa-ayni-gun-cicek-gonderimi-nasil-isler",
    title: "Muş'ta Aynı Gün Çiçek Gönderimi: Dakikalar İçinde Kapıda",
    excerpt: "Muş Merkez ve çevre ilçelere en hızlı, güvenilir ve özenli çiçek siparişi nasıl verilir?",
    content: `Unutulan bir yıldönümü veya son dakikada gelen güzel bir haber... Taşdemir Çiçekçilik olarak Muş içi tüm siparişlerinizi aynı gün usta ellerde hazırlayıp kendi özel korumalı araçlarımızla ulaştırıyoruz.`,
    category: "Lojistik & Teslimat",
    readTime: "2 dk okuma",
    date: "1 Eylül 2026",
    author: "Muş Çiçekçi",
    image: "/images/source/products/cecabe4daba4067ab56001a0beea6ff0.jpg",
    tags: ["Muş Çiçekçi", "Aynı Gün Teslimat", "Hızlı Gönderi"],
  },
];
