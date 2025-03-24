import { Button } from "@/components/ui/button";
import { useCart } from "@/features/useCart";
import { type ProductType } from "@/types/product.t";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const { AddCart } = useCart();

  const navigate = useNavigate();

  const handleAddToCart = () => {
    AddCart({ ...product, quantity: 1 });

    navigate("/cart");
  };

  return (
    <div className="group">
      <div className="relative w-full h-[300px] overflow-hidden rounded-md mb-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleAddToCart}
            className="bg-white text-[#2d4a3e] hover:bg-[#2d4a3e] hover:text-white transition-colors"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      <h3 className="text-sm font-medium">{product.name}</h3>
      <p className="text-sm text-muted-foreground">${product.price}</p>
    </div>
  );
};

export default Product;
