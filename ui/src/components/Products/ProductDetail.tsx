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
  const { AddCart } = useCart();
  useEffect(() => {
    // Fetch product details using the id from the URL
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://justo-bath-body-care-siem.vercel.app/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Check if the product is already in the cart

    AddCart({ ...product, quantity: 1 });
    // console.log("Product added to cart:", product);
    toast.success("Product added to cart!");
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
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
            <span className="text-gray-900 font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 min-h-[700px]">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden h-[700px] flex items-center justify-center">
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
        <div className="flex flex-col h-[700px]">
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
                <div className="mb-6">
                  {product.isNew && (
                    <Badge className="border text-center items-center text-[#D4AF37] hover:bg-[#D4AF37] mb-2">
                      NEW
                    </Badge>
                  )}

                  <h1 className="text-3xl font-bold mt-2 text-gray-900">
                    {product.name}
                  </h1>

                  <div className="flex items-center mt-3">
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

                <div className="prose prose-emerald max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description ||
                      "This premium skincare product is formulated with natural ingredients to nourish and rejuvenate your skin. Our unique blend of botanical extracts and vitamins helps improve skin texture and appearance."}
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.inStock ? (
                    <Badge
                      variant="outline"
                      className="text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]50"
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

                <Separator className="my-6" />

                <div className="grid gap-6 mb-8">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Size</h3>
                    <div className="flex gap-2">
                      {
                        <Button
                          className={cn(
                            "rounded-md",

                            "bg-[#D4AF37] hover:bg-[#D4AF37]"
                          )}
                        >
                          {product.size}
                        </Button>
                      }
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-auto space-y-6">
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#D4AF37] hover:bg-[#D4AF37] text-white rounded-lg py-6"
                disabled={!product.inStock || loading}
              >
                ADD TO CART
              </Button>
              {/*  */}
            </div>
            {/* 
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Shield className="h-5 w-5 text-[#D4AF37]" />
                <span>Dermatologist Tested</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Truck className="h-5 w-5 text-emerald-600" />
                <span>Free Shipping on orders over $50</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
