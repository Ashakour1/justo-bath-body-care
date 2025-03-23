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
  paymentMethod: "card" | "mpesa";
  paymentNumber: string;
  note: string;
  deliveryDate?: string; // Optional field
}

export default function CheckoutPage() {
  const { products } = useCart();
  const [mounted, setMounted] = useState(false);
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

  // Redirect to cart if cart is empty
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

    // Basic validation
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

    // Prepare order data to match backend structure
    const orderData = {
      total: totalPrice,
      paymentMethod: formData.paymentMethod,
      paymentNumber: formData.paymentNumber,
      orderItem: products.map((item) => ({
        product_id: item.id, // Match backend's expected field name
        quantity: item.quantity,
      })),
      shipping: {
        // Ensure the key is "shipping" (lowercase)
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        schedule: formData.deliveryDate || null, // Optional field
        note: formData.note || "", // Optional field
      },
    };

    console.log("Order Data:", JSON.stringify(orderData, null, 2)); // Debugging

    try {
      // Send order data to the API
      const response = await axios.post(
        "https://justo-bath-body-care-siem.vercel.app/api/orders/create",
        orderData
      );

      if (response.status === 201) {
        toast.success("Order placed successfully");

        // console.log(response.data.order.id);
        // const orderId = response.data.order.id;

        // const invoiceUrl = `${window.location.origin}/invoice/${orderId}`;

        // Generate WhatsApp message
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
        }, ${
          formData.city
        }\nOrder Details:\n${productsMessage}\nTotal: $${totalPrice.toFixed(
          2
        )}\n\nNote: ${formData.note}`;

        const phoneNumber = "252616590033";
        // Encode the message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp with the pre-filled message
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");

        // navigate(`/invoice/${orderId}`, {
        //   state: {
        //     orderDetails: products,
        //     customerDetails: {
        //       name: formData.name,
        //       email: formData.email,
        //       phone: formData.phone,
        //       address: formData.address,
        //       city: formData.city,
        //     },
        //     totalPrice,
        //     orderId, // Pass the order ID to the invoice page
        //   },
        // });
        // Navigate to Invoice Page
        // navigate("/invoice", {
        //   state: {
        //     orderDetails: products,
        //     customerDetails: {
        //       name: formData.name,
        //       email: formData.email,
        //       phone: formData.phone,
        //       address: formData.address,
        //       city: formData.city,
        //     },
        //     totalPrice,
        //   },
        // });
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
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
        <h1 className="text-2xl font-normal">Delivery Information</h1>
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
                    <SelectItem value="Mombasa">Mombasa</SelectItem>
                    <SelectItem value="Kisumu">Kisumu</SelectItem>
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
                  formData.deliveryDate ? "bg-black" : "bg-gray-200"
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
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-black">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex items-center cursor-pointer"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Credit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-black">
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
            className="w-full bg-black hover:bg-gray-900 text-white h-12"
          >
            Confirm Order
          </Button>
        </form>

        <div>
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

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
                        ${(item.price * item.quantity).toFixed(2)}
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
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>Free</span>
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
