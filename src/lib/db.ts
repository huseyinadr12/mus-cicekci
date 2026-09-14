import { CustomerReview,Order,OrderStatus,OrderTimelineStep,Product } from "@/types";
import { CUSTOMER_REVIEWS,PRODUCTS_CATALOG } from "./constants";
import { searchCatalog } from "./search";

// Catalogue snapshot; orders require persistent storage before launch.
const productsStore: Product[] = [...PRODUCTS_CATALOG];
const reviewsStore: CustomerReview[] = [...CUSTOMER_REVIEWS];

const ordersStore: Order[] = [];

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
      p.occasions.some((value) => value === occasion)
    );
  },

  searchProducts: async (query: string) => {
    return searchCatalog(productsStore, query);
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
        label: "Ödeme Bekleniyor",
        description: "Ödeme sağlayıcısının onayı bekleniyor.",
        completed: false,
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
          o.orderNumber.toUpperCase() === clean
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
