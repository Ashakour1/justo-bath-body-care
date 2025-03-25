"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/useCart";
import type { ProductType } from "@/types/product.t";
import { ShoppingBag, Star } from "lucide-react";

type ProductProps = {
  product: ProductType;
  index?: number;
};

const Product = ({ product }: ProductProps) => {
  const { AddCart } = useCart();
  // const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    AddCart({ ...product, quantity: 1 });
  };

  // Generate star rating
  const renderStars = () => {
    const rating = product.rating || 4;
    return (
      <div className="flex items-center justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < rating
                ? "fill-[#D4AF37] text-[#D4AF37]"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
        {product.rating && (
          <span className="ml-1 text-gray-700 text-sm">
            {product.rating.toFixed(1)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="group border rounded relative bg-white overflow-hidden transition-all duration-300 mx-2 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative  bg-gray-50 overflow-hidden">
        {product.isNew && (
          <div className="absolute top-3 right-3 z-10 bg-[#D4AF37] text-white text-xs px-2 py-0.5 rounded-sm font-medium">
            New
          </div>
        )}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover w-full h-[230px] transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="pt-5 pb-4 px-2 text-center flex-grow flex flex-col">
        <div className="flex  justify-between">
          <h3 className="text-sm font-medium mb-2 text-gray-900 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          <p className="text-sm font-semibold text-gray-900 mb-2">
            {product.price} Ksh
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex  justify-between">
          <h3 className="text-sm font-medium mb-2 text-gray-900 line-clamp-2 min-h-[2.5rem]">
            {product.size}
          </h3>

          <p className="text-sm font-semibold text-gray-900 mb-2">
            {renderStars()}
          </p>
        </div>

        {/* Always visible Add to Bag button */}
        <div className="mt-auto">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            size="sm"
            className="w-full border-[#D4AF37] text-white bg-[#D4AF37] hover:text-white text-xs font-medium transition-colors duration-300"
          >
            <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
            Add to Bag
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
