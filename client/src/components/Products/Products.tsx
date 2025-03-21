import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; // For toast notifications
import { useParams } from "react-router-dom";
import Product from "./Product";

interface ProductType {
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
}

export default function ProductsPage() {
  const { isNew, category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchingProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/products?isNew=true"
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchingProducts();
  }, [isNew, category]); // Re-fetch when parameters change

  // Function to handle adding a product to the cart
  const handleAddToCart = (product: ProductType) => {
    const cartItem = {
      id: parseInt(product.id), // Ensure the ID is a number
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: product.size,
      quantity: 1, // Default quantity is 1
    };

    // Show a toast notification
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      duration: 2000,
    });
  };

  return (
    <div className="max-w-[1200px] py-10 mx-auto">
      <h1 className="text-3xl font-serif font-medium tracking-tighter text-[#8A7B52]">
        Our Products
      </h1>
      <div className="py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
