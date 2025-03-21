import { create } from "zustand";

interface ProductCart {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  size: string;
  isNew: boolean;
  inStock: boolean;
  image: string;
  quantity: number; // Add quantity field to track how many of the item are in the cart
}

type CartStore = {
  products: ProductCart[];
  totalPrice: number;
  totalItems: number;
  totalPriceWithTax: number;
  tax: number;
  AddCart: (product: ProductCart) => void;
  RemoveCart: (id: string) => void;
  IncrementQuantity: (id: string) => void;
  DecrementQuantity: (id: string) => void;
};

export const useCart = create<CartStore>((set, get) => ({
  products: [],
  totalPriceWithTax: 0,
  totalPrice: 0,
  totalItems: 0,
  tax: 0,

  AddCart: (product) => {
    const { products } = get();

    const existingItem = products.find(
      (item) => item.id === product.id && item.size === product.size
    );

    let updatedProducts;
    if (existingItem) {
      updatedProducts = products.map((item) =>
        item.id === product.id && item.size === product.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedProducts = [...products, { ...product, quantity: 1 }];
    }

    const updatedTotalPrice = updatedProducts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const updatedTotalItems = updatedProducts.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const updatedTax = updatedTotalPrice * 0.05;
    const finalTotalPrice = updatedTotalPrice + updatedTax;

    set({
      products: updatedProducts,
      totalPrice: updatedTotalPrice,
      totalPriceWithTax: finalTotalPrice,
      totalItems: updatedTotalItems,
      tax: updatedTax,
    });
  },

  RemoveCart: (id) => {
    const { products } = get();

    const updatedProducts = products.filter((item) => item.id !== id);

    const updatedTotalPrice = updatedProducts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const updatedTotalItems = updatedProducts.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const updatedTax = updatedTotalPrice * 0.05;
    const finalTotalPrice = updatedTotalPrice + updatedTax;

    set({
      products: updatedProducts,
      totalPrice: updatedTotalPrice,
      totalPriceWithTax: finalTotalPrice,
      totalItems: updatedTotalItems,
      tax: updatedTax,
    });
  },

  IncrementQuantity: (id) => {
    const { products } = get();

    const updatedProducts = products.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    const updatedTotalPrice = updatedProducts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const updatedTotalItems = updatedProducts.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const updatedTax = updatedTotalPrice * 0.05;
    const finalTotalPrice = updatedTotalPrice + updatedTax;

    set({
      products: updatedProducts,
      totalPrice: updatedTotalPrice,
      totalPriceWithTax: finalTotalPrice,
      totalItems: updatedTotalItems,
      tax: updatedTax,
    });
  },

  DecrementQuantity: (id) => {
    const { products } = get();

    const updatedProducts = products
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    const updatedTotalPrice = updatedProducts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const updatedTotalItems = updatedProducts.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const updatedTax = updatedTotalPrice * 0.05;
    const finalTotalPrice = updatedTotalPrice + updatedTax;

    set({
      products: updatedProducts,
      totalPrice: updatedTotalPrice,
      totalPriceWithTax: finalTotalPrice,
      totalItems: updatedTotalItems,
      tax: updatedTax,
    });
  },
}));
