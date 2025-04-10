import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/features/useCart";
import axios from "axios";
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface CheckoutType {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  paymentNumber: string;
  note: string;
  deliveryDate?: string;
}

export default function CheckoutPage() {
  const { products } = useCart();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CheckoutType>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "card",
    paymentNumber: "",
    note: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (products.length === 0) {
    navigate("/cart");
    return null;
  }

  const totalPrice = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Don't proceed if credit card is selected (for now)
    if (formData.paymentMethod === "card") {
      toast.error("Credit card payments are coming soon. Please use M-Pesa.");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      toast.error("Please fill in all the fields");
      return;
    }

    const orderData = {
      total: totalPrice,
      paymentMethod: formData.paymentMethod,
      paymentNumber: formData.paymentNumber,
      orderItem: products.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      shipping: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        schedule: formData.deliveryDate || null,
        note: formData.note || "",
      },
    };

    try {
      const response = await axios.post(
        "https://justo-bath-body-care-siem.vercel.app/api/orders/create",
        orderData
      );

      if (response.status === 201) {
        toast.success("Order placed successfully");

        const productsMessage = products
          .map(
            (item) =>
              `${item.name} (Qty: ${item.quantity}) - $${(
                item.price * item.quantity
              ).toFixed(2)}`
          )
          .join("\n");

        const message = `New Order Received!\n\nCustomer Details:\nName: ${
          formData.name
        }\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${
          formData.address
        }, ${formData.city}\nNote: ${
          formData.note
        } \n\nOrder Details:\n${productsMessage}\nTotal: Ksh${totalPrice.toFixed(
          2
        )}`;

        const phoneNumber = "+254790736909";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        // Open the WhatsApp URL using window.location.href for mobile compatibility
        window.location.href = whatsappUrl;

        // Reset form data
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          paymentMethod: "card",
          paymentNumber: "",
          note: "",
        });
      } else {
        toast.error("Failed to place order. Please try again.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      city: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: value as "card" | "mpesa",
    }));
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="mb-8 pb-6 border-b">
        <Link
          to="/cart"
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to cart
        </Link>
        <h1 className="text-2xl font-semibold text-[#D4AF37]">
          Delivery Information
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="h-12"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254XXXXXXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-12"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Select
                  value={formData.city}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="city" className="h-12">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nairobi">Nairobi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="h-12"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">Schedule Delivery</Label>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    deliveryDate: prev.deliveryDate
                      ? ""
                      : new Date().toISOString().split("T")[0],
                  }))
                }
                className={`w-12 h-6 rounded-full transition-colors ${
                  formData.deliveryDate ? "bg-[#D4AF37]" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    formData.deliveryDate ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {formData.deliveryDate && (
              <Input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    deliveryDate: e.target.value,
                  }))
                }
                className="h-12"
              />
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="note">Note</Label>
            <textarea
              id="note"
              value={formData.note}
              onChange={handleInputChange}
              className="min-h-[100px] rounded-lg border border-gray-200 p-3"
              placeholder="Type your note..."
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base">Payment Method</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={handleRadioChange}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-[#D4AF37]">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex items-center cursor-pointer"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Credit Card (Coming soon)
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-[#D4AF37]">
                <RadioGroupItem value="mpesa" id="mpesa" />
                <Label
                  htmlFor="mpesa"
                  className="flex items-center cursor-pointer"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  M-Pesa
                </Label>
              </div>
            </RadioGroup>

            {formData.paymentMethod === "mpesa" && (
              <div className="grid gap-2">
                <Label htmlFor="paymentNumber">M-Pesa Number</Label>
                <Input
                  id="paymentNumber"
                  type="tel"
                  value={formData.paymentNumber}
                  onChange={handleInputChange}
                  className="h-12"
                  placeholder="Enter your M-Pesa number"
                  required
                />
              </div>
            )}

            {formData.paymentMethod === "card" && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Credit card payments are coming soon. Please select M-Pesa
                      for now.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500">
            By placing your order, you agree to our{" "}
            <Link to="/terms-and-conditions" className="text-black underline">
              Terms and Conditions
            </Link>
            .
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white h-12 flex items-center justify-center gap-2"
            disabled={formData.paymentMethod === "card" || loading}
          >
            {formData.paymentMethod === "card" ? (
              "Coming Soon"
            ) : loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Confirm Order"
            )}
          </Button>
        </form>

        <div>
          <div className="bg-white p-6 rounded-lg border border-[#D4AF37]">
            <h2 className="text-lg font-semibold mb-4 text-[#D4AF37]">
              Order Summary
            </h2>

            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {products.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-md overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-sm">
                        Ksh{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-100 my-4" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>Ksh{totalPrice.toFixed(2)}</span>
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span>Ksh{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
