"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/features/useCart";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Shield, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    price: 0,
    rating: 0,
    size: "",
    isNew: false,
    inStock: true,
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { AddCart } = useCart();

  useEffect(() => {
    // Fetch product details using the id from the URL
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://justo-bath-body-care-siem.vercel.app/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Product not found or network error");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleAddToCart = () => {
    AddCart({ ...product, quantity: 1 });
    toast.success("Product added to cart!");
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            asChild
            className="bg-[#D4AF37] hover:bg-[#C09F2F] text-white"
          >
            <Link to="/shop">Return to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="mb-4 md:mb-8 text-sm overflow-x-auto whitespace-nowrap">
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              to="/"
              className="text-gray-500 hover:text-[#D4AF37] transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-3 w-3 text-gray-400 mx-1" />
            <Link
              to="/shop"
              className="text-gray-500 hover:text-[#D4AF37] transition-colors"
            >
              Products
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-3 w-3 text-gray-400 mx-1" />
            <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-xs">
              {loading ? "Loading..." : product.name}
            </span>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden aspect-square sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full">
          {loading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <img
              src={product.image || "/placeholder.svg?height=700&width=600"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          {loading ? (
            <ProductSkeleton />
          ) : (
            <>
              <div className="mb-4 md:mb-6">
                {product.isNew && (
                  <Badge className="border text-center items-center text-[#D4AF37] hover:bg-[#D4AF37] mb-2">
                    NEW
                  </Badge>
                )}

                <h1 className="text-2xl md:text-3xl font-bold mt-2 text-gray-900">
                  {product.name}
                </h1>

                <div className="flex items-center mt-2 md:mt-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({Math.floor(Math.random() * 100) + 50}{" "}
                    reviews)
                  </span>
                </div>
              </div>

              <div className="prose prose-emerald max-w-none mb-4 md:mb-6">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.inStock ? (
                  <Badge
                    variant="outline"
                    className="text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]/10"
                  >
                    <Check className="mr-1 h-3 w-3" /> In Stock
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-200 bg-red-50"
                  >
                    Out of Stock
                  </Badge>
                )}
              </div>

              <Separator className="my-4 md:my-6" />

              <div className="grid gap-4 md:gap-6 mb-6 md:mb-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Size</h3>
                  <div className="flex gap-2">
                    <Button className="rounded-md bg-[#D4AF37] hover:bg-[#C09F2F] text-white">
                      {product.size}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-4 md:space-y-6">
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#D4AF37] hover:bg-[#C09F2F] text-white rounded-lg py-3 md:py-6"
                    disabled={!product.inStock}
                  >
                    ADD TO CART
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-4 md:pt-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs md:text-sm text-gray-700">
                    <Shield className="h-4 w-4 md:h-5 md:w-5 text-[#D4AF37]" />
                    <span>Dermatologist Tested</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs md:text-sm text-gray-700">
                    <Truck className="h-4 w-4 md:h-5 md:w-5 text-[#D4AF37]" />
                    <span>Free Shipping on orders over $50</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for product details
const ProductSkeleton = () => (
  <div className="space-y-4 md:space-y-6">
    <div>
      <Skeleton className="h-4 w-16 mb-2" />
      <Skeleton className="h-8 w-3/4 mb-2" />
      <div className="flex items-center gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-4" />
        ))}
        <Skeleton className="h-4 w-24 ml-2" />
      </div>
    </div>

    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>

    <div className="flex items-center gap-4">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-6 w-20" />
    </div>

    <Skeleton className="h-px w-full" />

    <div>
      <Skeleton className="h-5 w-16 mb-2" />
      <Skeleton className="h-10 w-20" />
    </div>

    <Skeleton className="h-12 w-full mt-6" />

    <div className="pt-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  </div>
);

export default ProductDetail;
