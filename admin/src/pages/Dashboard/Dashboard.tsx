"use client";

import { BarChart, CreditCard, LineChart, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { useAuthStore } from "../../store/store";
import axios from "axios";

export function DashboardPage() {
  const { username, isAuthenticated, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  interface Product {
    inStock: boolean;

    // add other properties of Product if needed
  }
  interface Order {
    total: number;
    // add other properties of Order if needed
  }

  const [products, setProducts] = useState<Product[]>([]);

  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const fetchProducts = async (apikey: any) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://justo-bath-body-care-siem.vercel.app/api/${apikey}/`
      );
      if (apikey === "orders") {
        setOrders(data);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts("orders");
    fetchProducts("products");
  }, []);

  const TotalProducts = products.length;
  const TotalOrders = orders.length;
  const TotalSales = orders.reduce((acc, order) => acc + order.total, 0);
  const inStockProducts = products.filter((product) => product.inStock);

  return (
    <div className="flex min-h-screen flex-col p-6">
      {isAuthenticated && (
        <div className="mb-6 p-4 bg-blue-100 text-blue-900 rounded-lg shadow">
          <h1 className="text-xl font-semibold">
            Welcome back, {username}! 👋
          </h1>
          <p className="text-sm">
            We're glad to have you here. Explore your dashboard!
          </p>
          <Button onClick={logout} className="mt-4">
            Logout
          </Button>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {["Total Products", "Total Orders", "Sales", "In Stock"].map(
          (title, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {index === 0 && (
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                )}
                {index === 1 && (
                  <Users className="h-4 w-4 text-muted-foreground" />
                )}
                {index === 2 && (
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                )}
                {index === 3 && (
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-20 mb-2" />
                ) : (
                  <div className="text-2xl font-bold">
                    {index === 0 && TotalProducts}
                    {index === 1 && TotalOrders}
                    {index === 2 &&
                      TotalSales.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    {index === 3 && inStockProducts.length}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {index === 0 && "+20.1% from last month"}
                  {index === 1 && "+180.1% from last month"}
                  {index === 2 && "+19% from last month"}
                  {index === 3 && "+201 since last hour"}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
