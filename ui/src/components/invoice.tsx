import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CreditCard,
  Download,
  Printer,
  Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod?: "card" | "mpesa";
}

interface OrderData {
  products: Product[];
  customer: CustomerDetails;
  orderId: string;
  orderDate: string;
  totalPrice: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered";
}

export default function InvoicePage() {
  const params = useParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order data");
        }
        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  const handlePayment = async (method: "card" | "mpesa") => {
    if (!orderData) return;

    console.log(`Processing payment using method: ${method}`);
    setPaymentProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would call your payment API here

      // Update order status
      setOrderData((prev) => (prev ? { ...prev, status: "paid" } : null));
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Link to="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Invoice Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The requested invoice could not be found.
            </p>
            <Link to="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <div className="mb-8 pb-6 border-b flex justify-between items-center print:hidden">
        <Link
          to="/"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="bg-card p-8 rounded-lg border shadow-sm">
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">INVOICE</h1>
            <p className="text-muted-foreground">#{orderData.orderId}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              orderData.status === "paid"
                ? "bg-green-100 text-green-800"
                : orderData.status === "processing"
                ? "bg-blue-100 text-blue-800"
                : orderData.status === "shipped"
                ? "bg-purple-100 text-purple-800"
                : orderData.status === "delivered"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {orderData.status.charAt(0).toUpperCase() +
              orderData.status.slice(1)}
          </div>
        </div>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-semibold">Your Company</h2>
            <p className="text-muted-foreground">123 Business Street</p>
            <p className="text-muted-foreground">Nairobi, Kenya</p>
            <p className="text-muted-foreground">contact@yourcompany.com</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">
              Invoice Date: {orderData.orderDate}
            </p>
            <p className="text-muted-foreground">
              Due Date: {orderData.orderDate}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Bill To:</h3>
            <p>{orderData.customer.name}</p>
            <p>{orderData.customer.address}</p>
            <p>{orderData.customer.city}</p>
            <p>{orderData.customer.email}</p>
            <p>{orderData.customer.phone}</p>
          </div>
          <div>
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold mb-2">Payment Method:</h3>
                <p className="flex items-center">
                  {orderData.customer.paymentMethod === "mpesa" ? (
                    <>
                      <Smartphone className="h-4 w-4 mr-1" />
                      M-Pesa
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-1" />
                      Credit Card
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-muted rounded-t-md p-3 grid grid-cols-12 font-medium">
            <div className="col-span-6">Item</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          <div className="border-x border-b rounded-b-md divide-y">
            {orderData.products.map((product) => (
              <div
                key={product.id}
                className="p-3 grid grid-cols-12 items-center"
              >
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-muted hidden sm:block">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{product.name}</span>
                </div>
                <div className="col-span-2 text-right">
                  ${product.price.toFixed(2)}
                </div>
                <div className="col-span-2 text-right">{product.quantity}</div>
                <div className="col-span-2 text-right font-medium">
                  ${(product.price * product.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <div className="w-full max-w-xs">
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${orderData.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Tax</span>
              <span>${(orderData.totalPrice * 0.16).toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>
                $
                {(orderData.totalPrice + orderData.totalPrice * 0.16).toFixed(
                  2
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Section - Only show if not paid */}
        {orderData.status !== "paid" && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold mb-4 text-center">
              Complete Your Payment
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <CreditCard className="h-8 w-8 mb-2" />
                  <h4 className="font-medium mb-2">Credit Card</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pay securely with your credit or debit card
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => handlePayment("card")}
                    disabled={paymentProcessing}
                  >
                    {paymentProcessing ? "Processing..." : "Pay with Card"}
                  </Button>
                </div>
              </Card>

              <Card className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <Smartphone className="h-8 w-8 mb-2" />
                  <h4 className="font-medium mb-2">M-Pesa</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pay using M-Pesa mobile money
                  </p>
                  <div className="text-sm text-left w-full mb-4">
                    <p className="mb-1">
                      <span className="font-medium">Business No:</span> 123456
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Account:</span>{" "}
                      {orderData.orderId}
                    </p>
                    <p>
                      <span className="font-medium">Amount:</span> KES{" "}
                      {(orderData.totalPrice * 130).toFixed(2)}
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handlePayment("mpesa")}
                    disabled={paymentProcessing}
                  >
                    {paymentProcessing
                      ? "Processing..."
                      : "Confirm M-Pesa Payment"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>Thank you for your business!</p>
          <p className="mt-1">
            If you have any questions, please contact support@yourcompany.com
          </p>
        </div>
      </div>
    </div>
  );
}
