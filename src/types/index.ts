export type FlowerCategory =
  | "guller"
  | "orkideler"
  | "buketler"
  | "vazoda-cicekler"
  | "saksi-bitkileri"
  | "teraryumlar"
  | "celenkler"
  | "ozel-gunler";

export type OccasionType =
  | "sevgiliye"
  | "dogum-gunu"
  | "soz-nisan-dugun"
  | "ozur-dilerim"
  | "gecmis-olsun"
  | "acilis-toren"
  | "yeni-bebek"
  | "yeni-is"
  | "cenaze"
  | "yildonumu";

export interface EmotionOption {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  emotionName: string;
  colorHint: string;
  accentColor: string;
  flowerType: string;
  description: string;
  targetCategory: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  category: FlowerCategory;
  occasions: OccasionType[];
  flowerType: string;
  flowerCount?: number;
  color: string;
  description: string;
  careInstructions?: string;
  meaning?: string;
  dimensions?: string;
  images: string[];
  sameDayDelivery: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
}

export interface AddOnItem {
  id: string;
  name: string;
  category: "chocolate" | "teddy" | "vase" | "balloon" | "card";
  price: number;
  image: string;
  description: string;
}

export interface CardMessageData {
  templateId?: string;
  message: string;
  senderSignature?: string;
  isAnonymous: boolean;
}

export interface DeliverySlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  extraFee?: number;
}

export interface DistrictZone {
  id: string;
  name: string;
  sameDay: boolean;
  deliveryFee: number;
  estimatedHours: string;
  neighborhoods: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  deliveryDate?: string;
  deliveryDistrict?: string;
  deliverySlot?: string;
  cardMessage?: CardMessageData;
  addOns?: {
    item: AddOnItem;
    quantity: number;
  }[];
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. MUS-24891
  createdAt: string;
  status: OrderStatus;
  customer: {
    fullName: string;
    phone: string;
    email: string;
  };
  recipient: {
    fullName: string;
    phone: string;
    district: string;
    neighborhood?: string;
    address: string;
    addressDescription?: string;
    callBeforeDelivery: boolean;
  };
  delivery: {
    date: string;
    timeSlot: string;
    district: string;
    fee: number;
  };
  cardMessage?: CardMessageData;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  addOns: {
    addOnId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: "CREDIT_CARD" | "HAVALE_EFT";
  paymentStatus: "PAID" | "PENDING_VERIFICATION";
  notes?: string;
  timeline: OrderTimelineStep[];
}

export interface CustomerReview {
  id: string;
  authorName: string;
  city: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}
