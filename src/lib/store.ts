import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, CardMessageData, AddOnItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  selectedDistrict: string;
  selectedDate: string;
  selectedSlot: string;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  setDeliveryPreferences: (district: string, date: string, slot: string) => void;

  addItem: (
    product: Product,
    quantity?: number,
    options?: {
      deliveryDate?: string;
      deliveryDistrict?: string;
      deliverySlot?: string;
      cardMessage?: CardMessageData;
      addOns?: { item: AddOnItem; quantity: number }[];
    }
  ) => void;

  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed totals
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      selectedDistrict: "merkez",
      selectedDate: "",
      selectedSlot: "slot-2",

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      setDeliveryPreferences: (district, date, slot) =>
        set({
          selectedDistrict: district,
          selectedDate: date,
          selectedSlot: slot,
        }),

      addItem: (product, quantity = 1, options = {}) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.product.id === product.id
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += quantity;
          if (options.cardMessage) {
            updated[existingIndex].cardMessage = options.cardMessage;
          }
          if (options.addOns) {
            updated[existingIndex].addOns = options.addOns;
          }
          set({ items: updated, isCartOpen: true });
        } else {
          const newItem: CartItem = {
            id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            product,
            quantity,
            deliveryDate: options.deliveryDate || get().selectedDate,
            deliveryDistrict: options.deliveryDistrict || get().selectedDistrict,
            deliverySlot: options.deliverySlot || get().selectedSlot,
            cardMessage: options.cardMessage,
            addOns: options.addOns || [],
          };
          set({ items: [...currentItems, newItem], isCartOpen: true });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const itemBase = item.product.price * item.quantity;
          const addOnsTotal = (item.addOns || []).reduce(
            (aSum, add) => aSum + add.item.price * add.quantity,
            0
          );
          return sum + itemBase + addOnsTotal;
        }, 0);
      },
    }),
    {
      name: "mus-cicekci-cart-v1",
      partialize: (state) => ({
        items: state.items,
        selectedDistrict: state.selectedDistrict,
        selectedDate: state.selectedDate,
        selectedSlot: state.selectedSlot,
      }),
    }
  )
);
