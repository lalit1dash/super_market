import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      toggleWishlist: (product) => {
        const items = get().items;
        const exists = items.find(item => item.id === product.id);
        
        if (exists) {
          set({ items: items.filter(item => item.id !== product.id) });
          return false; // removed
        } else {
          set({ items: [...items, product] });
          return true; // added
        }
      },
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },
      
      removeFromWishlist: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'freshmart-wishlist',
    }
  )
);

export default useWishlistStore;
