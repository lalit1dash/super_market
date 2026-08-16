import { create } from 'zustand';

const useCheckoutStore = create((set, get) => ({
  step: 0, // 0=cart, 1=address, 2=delivery, 3=payment, 4=success
  selectedAddress: null,
  selectedDeliverySlot: null,
  selectedPaymentMethod: null,
  orderNumber: null,
  
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 0) })),
  
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  setSelectedDeliverySlot: (slot) => set({ selectedDeliverySlot: slot }),
  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
  
  placeOrder: () => {
    const orderNumber = 'FM' + Date.now().toString().slice(-6);
    set({ orderNumber, step: 4 });
    return orderNumber;
  },
  
  resetCheckout: () => set({
    step: 0,
    selectedAddress: null,
    selectedDeliverySlot: null,
    selectedPaymentMethod: null,
    orderNumber: null,
  }),
}));

export default useCheckoutStore;
