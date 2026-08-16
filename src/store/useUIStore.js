import { create } from 'zustand';

const useUIStore = create((set) => ({
  // Cart drawer
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  // Search overlay
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  
  // Product modal
  selectedProduct: null,
  isProductModalOpen: false,
  openProductModal: (product) => set({ selectedProduct: product, isProductModalOpen: true }),
  closeProductModal: () => set({ selectedProduct: null, isProductModalOpen: false }),
  
  // Mobile menu
  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  // Filter drawer (mobile)
  isFilterOpen: false,
  openFilter: () => set({ isFilterOpen: true }),
  closeFilter: () => set({ isFilterOpen: false }),
  
  // Loading
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Toasts
  toasts: [],
  addToast: (toast) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }]
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
      }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  })),
}));

export default useUIStore;
