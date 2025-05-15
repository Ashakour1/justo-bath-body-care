"use client";

import Product from "@/components/Products/Product";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import type { ProductType } from "@/types/product.t";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://justo-bath-body-care-siem.vercel.app/api/products?new=true"
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Scroll products horizontally
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate visible products based on viewport width
  const [visibleProducts, setVisibleProducts] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleProducts(1);
      } else if (window.innerWidth < 1024) {
        setVisibleProducts(2);
      } else if (window.innerWidth < 1280) {
        setVisibleProducts(3);
      } else {
        setVisibleProducts(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto carousel functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleProducts >= products.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, products.length - visibleProducts)
        : prevIndex - 1
    );
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2d4a3e]"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl font-semibold">No Products Found</h1>
        </div>
      ) : (
        <main className="max-w-[1300px] mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-1">
              <p className="font-medium text-sm text-gray-600">
                SHOP ALL PRODUCTS
              </p>
              <h1 className="text-2xl font-semibold">NEW IN</h1>
            </div>
            <Link to="/shop">
              <Button
                variant="outline"
                className="border border-black rounded-none hover:bg-black hover:text-white transition-colors"
              >
                SHOP ALL PRODUCTS
              </Button>
            </Link>
          </div>
          <div
            className="relative w-full "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / visibleProducts)
                  }%)`,
                }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0"
                    style={{ width: `${100 / visibleProducts}%` }}
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-md border border-gray-200 z-10 w-10 h-10"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-md border border-gray-200 z-10 w-10 h-10"
              onClick={nextSlide}
              disabled={currentIndex + visibleProducts >= products.length}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>

            {/* Pagination dots */}
            {/* <div className="flex justify-center mt-6 gap-1.5">
              {Array.from({
                length: Math.ceil(products.length / visibleProducts),
              }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / visibleProducts) === index
                      ? "bg-[#2d4a3e] w-4"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index * visibleProducts)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div> */}
          </div>
        </main>
      )}
    </>
  );
};

export default Products;
