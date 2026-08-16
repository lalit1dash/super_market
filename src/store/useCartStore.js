import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items;
        const existing = items.find(item => item.id === product.id);
        
        if (existing) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },
      
      incrementQuantity: (productId) => {
        const item = get().items.find(i => i.id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity + 1);
        }
      },
      
      decrementQuantity: (productId) => {
        const item = get().items.find(i => i.id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity - 1);
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getItemQuantity: (productId) => {
        const item = get().items.find(i => i.id === productId);
        return item ? item.quantity : 0;
      },
      
      get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      get subtotal() {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      
      get totalSavings() {
        return get().items.reduce(
          (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
          0
        );
      },
      
      get deliveryFee() {
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return subtotal >= 499 ? 0 : 49;
      },
      
      get total() {
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const delivery = subtotal >= 499 ? 0 : 49;
        return subtotal + delivery;
      },
      
      get freeDeliveryProgress() {
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return Math.min((subtotal / 499) * 100, 100);
      },
      
      get amountToFreeDelivery() {
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return Math.max(499 - subtotal, 0);
      }
    }),
    {
      name: 'freshmart-cart',
    }
  )
);

export default useCartStore;
