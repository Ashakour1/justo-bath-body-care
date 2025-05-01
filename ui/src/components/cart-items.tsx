"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCart } from "@/features/useCart";

export default function CartPage() {
  const navigate = useNavigate();

  const {
    products,
    DecrementQuantity,
    IncrementQuantity,
    RemoveCart,
    totalPrice,
  } = useCart();

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null;
  // }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  const handleCheckout = () => {
    if (products.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-[1200px] min-h-screen mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 pb-4 border-b border-yellow-500">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#D4AF37] mb-2 sm:mb-0">
          Shopping Cart
        </h1>
        <Link to="/shop" className="text-sm text-gray-500 hover:text-gray-900">
          Continue Shopping
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 md:py-16">
          <p className="text-gray-700 mb-6 md:mb-8">Your cart is empty</p>
          <Link to="/">
            <Button
              variant="outline"
              className="bg-[#D4AF37] text-white px-6 md:px-8"
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 md:gap-12">
          <div className="md:col-span-2">
            {/* Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 text-sm text-gray-500 mb-4 px-4">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Size</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total Price</div>
            </div>

            <div className="space-y-4">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 items-center bg-white p-4 rounded-lg"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden grid grid-cols-3 gap-3 mb-3">
                    <div className="col-span-1">
                      <div className="w-full aspect-square bg-gray-50 rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          onClick={() => RemoveCart(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm">Size: {item.size}</span>
                        <span className="font-medium">
                          {(item.price * item.quantity).toFixed(2)} Ksh
                        </span>
                      </div>
                      <div className="flex items-center mt-3">
                        <button
                          onClick={() => DecrementQuantity(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => IncrementQuantity(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex md:col-span-6 gap-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:col-span-2 text-center">
                    <span className="text-sm">{item.size}</span>
                  </div>

                  <div className="hidden md:block md:col-span-2">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => DecrementQuantity(item.id)}
                        className="w-6 h-6 flex items-center justify-center rounded-full border hover:bg-gray-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => IncrementQuantity(item.id)}
                        className="w-6 h-6 flex items-center justify-center rounded-full border hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:flex md:col-span-2 items-center justify-end gap-4">
                    <span className="font-medium">
                      {(item.price * item.quantity).toFixed(2)} Ksh
                    </span>
                    <button
                      onClick={() => RemoveCart(item.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <div className="bg-white p-5 md:p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span> {totalPrice.toFixed(2)} Ksh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>

                <div className="h-px bg-gray-100 my-4" />

                <div className="flex justify-between text-base font-medium">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)} Ksh</span>
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-[#D4AF37] hover:bg-[#dec470] text-white"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
