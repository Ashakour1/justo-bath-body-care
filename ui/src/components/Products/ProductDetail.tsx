"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/features/useCart";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

// Define product type for better type safety
type Product = {
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
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({
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
  const [error, setError] = useState<string | null>(null);
  const { AddCart } = useCart();

  useEffect(() => {
    // Fetch product details using the id from the URL
    const fetchProductDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://justo-bath-body-care-siem.vercel.app/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch product (${response.status})`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!product.id || !product.inStock) return;

    AddCart({ ...product, quantity: 1 });
    toast.success("Product added to cart!");
  };

  // Generate star rating component
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-3 h-3 sm:w-4 sm:h-4",
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        )}
      />
    ));
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12 max-w-6xl">
      {/* Breadcrumb - hidden on smallest screens */}
      <nav
        className="mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm hidden sm:block"
        aria-label="Breadcrumb"
      >
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
            <ChevronRight
              className="h-3 w-3 text-gray-400 mx-1"
              aria-hidden="true"
            />
            <Link
              to="/shop"
              className="text-gray-500 hover:text-[#D4AF37] transition-colors"
            >
              Products
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight
              className="h-3 w-3 text-gray-400 mx-1"
              aria-hidden="true"
            />
            <span className="text-gray-900 font-medium truncate max-w-[150px]">
              {product.name || "Product Details"}
            </span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden h-[520px] flex items-center justify-center">
          {loading ? (
            <div className="animate-pulse bg-gray-200 w-full h-full"></div>
          ) : (
            <img
              src={product.image || "/placeholder.svg?height=700&width=600"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col h-auto md:h-[500px]">
          <div className="flex-grow">
            {loading ? (
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              </div>
            ) : (
              <>
                <div className="mb-4 sm:mb-6">
                  {product.isNew && (
                    <Badge className="border text-center items-center text-[#D4AF37] hover:bg-[#D4AF37] mb-2">
                      NEW
                    </Badge>
                  )}

                  <h1 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900">
                    {product.name}
                  </h1>

                  <div className="flex items-center mt-2 sm:mt-3">
                    <div
                      className="flex"
                      aria-label={`Rating: ${product.rating} out of 5 stars`}
                    >
                      {renderStars(product.rating)}
                    </div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-600">
                      {product.rating.toFixed(1)} (
                      {Math.floor(Math.random() * 100) + 50} reviews)
                    </span>
                  </div>
                </div>

                <div className="prose prose-emerald max-w-none mb-4 sm:mb-6">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
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

                <Separator className="my-4 sm:my-6" />

                <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button className="rounded-md bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white">
                        {product.size}
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-auto space-y-4 sm:space-y-6">
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="w-full flex-1 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white rounded-lg py-4 sm:py-6 text-sm sm:text-base font-medium"
                disabled={!product.inStock || loading}
              >
                {loading ? "LOADING..." : "ADD TO CART"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile back to products button - only visible on small screens */}
      <div className="mt-8 sm:hidden">
        <Link to="/shop">
          <Button variant="outline" className="w-full">
            <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
