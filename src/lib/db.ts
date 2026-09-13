import { Order, OrderStatus, Product, CustomerReview, OrderTimelineStep } from "@/types";
import { PRODUCTS_CATALOG, CUSTOMER_REVIEWS, DISTRICT_ZONES } from "./constants";
import { normalizeTurkish } from "./utils";

// In-memory data store with realistic initial seeding
let productsStore: Product[] = [...PRODUCTS_CATALOG];
let reviewsStore: CustomerReview[] = [...CUSTOMER_REVIEWS];

let ordersStore: Order[] = [
  {
    id: "ord-1",
    orderNumber: "MUS-20491",
    createdAt: "2026-09-13T14:30:00Z",
    status: "PREPARING",
    customer: {
      fullName: "Kemal Yılmaz",
      phone: "0532 111 22 33",
      email: "kemal.yilmaz@gmail.com",
    },
    recipient: {
      fullName: "Elif Demir",
      phone: "0544 999 88 77",
      district: "Muş Merkez",
      neighborhood: "Kültür Mahallesi",
      address: "Cumhuriyet Caddesi No:42 Daire:5 (Öğretmenevi Karşısı)",
      callBeforeDelivery: true,
    },
    delivery: {
      date: "2026-09-13",
      timeSlot: "15:00 - 18:00",
      district: "Muş Merkez",
      fee: 0,
    },
    cardMessage: {
      message: "Gözlerinin değdiği her yer bahar bahçe... İyi ki varsın bir tanem.",
      senderSignature: "Kemal",
      isAnonymous: false,
    },
    items: [
      {
        productId: "52",
        productName: "11 Adet Kırmızı Gül Buketi",
        price: 1520,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=900&auto=format&fit=crop",
      },
    ],
    addOns: [
      {
        addOnId: "addon-choc-1",
        name: "Artisan Belçika Çikolatası Kutusu (16 Adet)",
        price: 380,
        quantity: 1,
      },
    ],
    subtotal: 1900,
    deliveryFee: 0,
    total: 1900,
    paymentMethod: "CREDIT_CARD",
    paymentStatus: "PAID",
    timeline: [
      {
        status: "PENDING",
        label: "Sipariş Alındı",
        description: "Siparişiniz sistemimize ulaştı ve onaylandı.",
        timestamp: "14:30",
        completed: true,
        current: false,
      },
      {
        status: "CONFIRMED",
        label: "Ödeme Onaylandı",
        description: "Güvenli 3D Secure ödemeniz başarıyla tamamlandı.",
        timestamp: "14:32",
        completed: true,
        current: false,
      },
      {
        status: "PREPARING",
        label: "Usta Eller Hazırlıyor",
        description: "Taze çiçekleriniz Taşdemir Çiçekçilik atölyesinde özenle düzenleniyor.",
        timestamp: "14:45",
        completed: true,
        current: true,
      },
      {
        status: "OUT_FOR_DELIVERY",
        label: "Kurye ile Yola Çıktı",
        description: "Özel klimalı teslimat aracımız adrese doğru yola çıkacak.",
        completed: false,
        current: false,
      },
      {
        status: "DELIVERED",
        label: "Alıcıya Teslim Edildi",
        description: "Çiçekleriniz sevgiyle teslim edildi.",
        completed: false,
        current: false,
      },
    ],
  },
  {
    id: "ord-2",
    orderNumber: "MUS-19842",
    createdAt: "2026-09-12T10:15:00Z",
    status: "DELIVERED",
    customer: {
      fullName: "Ayşe Çelik",
      phone: "0555 444 33 22",
      email: "ayse.celik@hotmail.com",
    },
    recipient: {
      fullName: "Dr. Selim Kaya",
      phone: "0533 222 11 00",
      district: "Muş Merkez",
      neighborhood: "Zafer Mahallesi",
      address: "Muş Devlet Hastanesi Poliklinik Kat 2",
      callBeforeDelivery: false,
    },
    delivery: {
      date: "2026-09-12",
      timeSlot: "12:00 - 15:00",
      district: "Muş Merkez",
      fee: 0,
    },
    cardMessage: {
      message: "Yeni görevinizde muvaffakiyetler dileriz.",
      senderSignature: "Çelik Ailesi",
      isAnonymous: false,
    },
    items: [
      {
        productId: "64",
        productName: "Çift Dallı Beyaz Phalaenopsis Orkide",
        price: 1500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=900&auto=format&fit=crop",
      },
    ],
    addOns: [],
    subtotal: 1500,
    deliveryFee: 0,
    total: 1500,
    paymentMethod: "CREDIT_CARD",
    paymentStatus: "PAID",
    timeline: [
      {
        status: "PENDING",
        label: "Sipariş Alındı",
        description: "Siparişiniz onaylandı.",
        timestamp: "10:15",
        completed: true,
        current: false,
      },
      {
        status: "PREPARING",
        label: "Hazırlandı",
        description: "Orkide hazırlandı ve ambalajlandı.",
        timestamp: "10:45",
        completed: true,
        current: false,
      },
      {
        status: "OUT_FOR_DELIVERY",
        label: "Dağıtıma Çıktı",
        description: "Kurye teslimat adresine hareket etti.",
        timestamp: "11:20",
        completed: true,
        current: false,
      },
      {
        status: "DELIVERED",
        label: "Teslim Edildi",
        description: "Alıcıya bizzat teslim edildi (11:58).",
        timestamp: "11:58",
        completed: true,
        current: true,
      },
    ],
  },
];

export const db = {
  getProducts: async () => [...productsStore],

  getProductBySlug: async (slug: string) => {
    return productsStore.find((p) => p.slug === slug) || null;
  },

  getProductById: async (id: string) => {
    return productsStore.find((p) => p.id === id) || null;
  },

  getProductsByCategory: async (category: string) => {
    return productsStore.filter((p) => p.category === category);
  },

  getProductsByOccasion: async (occasion: string) => {
    return productsStore.filter((p) =>
      p.occasions.includes(occasion as any)
    );
  },

  searchProducts: async (query: string) => {
    const q = normalizeTurkish(query).trim();
    if (!q) return [...productsStore];
    return productsStore.filter(
      (p) =>
        normalizeTurkish(p.name).includes(q) ||
        normalizeTurkish(p.flowerType).includes(q) ||
        normalizeTurkish(p.color).includes(q) ||
        normalizeTurkish(p.description).includes(q) ||
        p.occasions.some((occ) => normalizeTurkish(occ).includes(q))
    );
  },

  createOrder: async (newOrder: Omit<Order, "id" | "createdAt" | "timeline">) => {
    const id = `ord-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const nowTime = new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const timeline: OrderTimelineStep[] = [
      {
        status: "PENDING",
        label: "Sipariş Alındı",
        description: "Siparişiniz onaylandı.",
        timestamp: nowTime,
        completed: true,
        current: true,
      },
      {
        status: "CONFIRMED",
        label: "Ödeme Onaylandı",
        description: "Ödeme işlemi doğrulandı.",
        timestamp: nowTime,
        completed: true,
        current: false,
      },
      {
        status: "PREPARING",
        label: "Usta Eller Hazırlıyor",
        description: "Atölyemizde taze çiçekleriniz hazırlanmaya başlanacak.",
        completed: false,
        current: false,
      },
      {
        status: "OUT_FOR_DELIVERY",
        label: "Kurye ile Yola Çıktı",
        description: "Muş içi kuryemiz teslimat adresine hareket edecek.",
        completed: false,
        current: false,
      },
      {
        status: "DELIVERED",
        label: "Alıcıya Teslim Edildi",
        description: "Alıcıya teslim edilecek.",
        completed: false,
        current: false,
      },
    ];

    const fullOrder: Order = {
      ...newOrder,
      id,
      createdAt,
      timeline,
    };

    ordersStore.unshift(fullOrder);
    return fullOrder;
  },

  getOrderByIdOrNumber: async (code: string) => {
    const clean = code.trim().toUpperCase();
    return (
      ordersStore.find(
        (o) =>
          o.orderNumber.toUpperCase() === clean ||
          o.id.toUpperCase() === clean ||
          o.recipient.phone.replace(/\D/g, "").includes(clean.replace(/\D/g, "")) ||
          o.customer.phone.replace(/\D/g, "").includes(clean.replace(/\D/g, ""))
      ) || null
    );
  },

  getAllOrders: async () => [...ordersStore],

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    const order = ordersStore.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;

    order.status = status;
    const nowTime = new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Update timeline
    order.timeline = order.timeline.map((step) => {
      if (step.status === status) {
        return { ...step, completed: true, current: true, timestamp: nowTime };
      }
      return { ...step, current: false };
    });

    return order;
  },

  getReviews: async () => [...reviewsStore],

  getDashboardMetrics: async () => {
    const totalOrders = ordersStore.length;
    const totalRevenue = ordersStore.reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = ordersStore.filter((o) => o.status === "PENDING" || o.status === "CONFIRMED").length;
    const preparingOrders = ordersStore.filter((o) => o.status === "PREPARING").length;
    const outForDelivery = ordersStore.filter((o) => o.status === "OUT_FOR_DELIVERY").length;
    const deliveredOrders = ordersStore.filter((o) => o.status === "DELIVERED").length;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      preparingOrders,
      outForDelivery,
      deliveredOrders,
      recentOrders: ordersStore.slice(0, 5),
    };
  },
};
