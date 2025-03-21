import { create } from "zustand";

interface CheckoutStore {
  email: string;
  phone: string;
  name: string;
  address: string;
}

type CheckoutStoreType = {
  stage: string | null;
  shippingDetails: CheckoutStore;
  setShippingDetails: (details: CheckoutStore) => void;
  paymentMethod: string | null;
  changeStageToPayment: () => void;
  changeStageToInformation: () => void;
  changeStageToCart: () => void;
  setPaymentMethod: (method: string) => void;
  paymentNumber: string | null;
  setPaymentNumber: (number: string) => void;
};

export const useCheckout = create<CheckoutStoreType>((set) => ({
  stage: "information",
  paymentMethod: null,
  paymentNumber: null,
  shippingDetails: {
    email: "",
    phone: "",
    name: "",
    address: "",
  },
  changeStageToPayment: () => set({ stage: "payment" }),
  changeStageToInformation: () => set({ stage: "information" }),
  changeStageToCart: () => set({ stage: "cart" }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setPaymentNumber: (number) => set({ paymentNumber: number }),
  setShippingDetails: (details) =>
    set((state) => ({ ...state, shippingDetails: details })),
}));
