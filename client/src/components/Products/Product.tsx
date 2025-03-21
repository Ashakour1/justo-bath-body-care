import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

type ProductType = {
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

const Product = ({ product }: { product: ProductType }) => {
  return (
    <Card
      key={product.id}
      className="overflow-hidden group transition-all duration-300 hover:shadow-lg bg-white border border-gray-100 rounded-xl"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent z-10" />
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-[#D4AF37] z-20 font-light px-3 py-1 rounded text-white text-xs">
            New
          </div>
        )}
      </div>

      {/* Product Details */}
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg text-[#8A7B52]">
              {product.name}
            </h3>
            <p className="text-sm text-gray-400">{product.category}</p>
          </div>
          <span className="font-light text-[#D4AF37]">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-3">
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center mt-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-[#D4AF37]"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs ml-1 text-gray-400">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Button Section */}
      <CardFooter className="p-5 pt-0">
        <Button
          className="w-full relative overflow-hidden border border-[#D4AF37] text-[#D4AF37] 
  transition-all duration-300 bg-white 
  hover:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]
  after:absolute after:inset-0 after:bg-[#D4AF37] 
  after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out 
  hover:after:scale-x-100 after:-z-10"
        >
          <ShoppingCart className="mr-2 h-4 w-4 relative z-10" />
          <span className="relative z-10">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
