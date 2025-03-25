import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product from "./Product";
import type { ProductType } from "@/types/product.t";

// Define the categories
const categories = [
  {
    id: "perfumes",
    name: "perfumes",
    description: "Explore a wide range of fragrances.",
  },
  {
    id: "rituals",
    name: "rituals",
    description: "Indulge in luxury with our rituals.",
  },
  {
    id: "justocosmetics",
    name: "JustoCosmetics",
    description: "High-quality cosmetics for you.",
  },
  {
    id: "bath-and-body-works",
    name: "Bath & Body Works",
    description: "Pamper your body with our selection.",
  },
];

type ProductCategoriesProps = {};

export default function ProductCategories({}: ProductCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState(
    categories[0].name || ""
  );
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the API based on the active category
  useEffect(() => {
    const fetchProducts = async () => {
      if (!activeCategory) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://justo-bath-body-care-siem.vercel.app/api/products?category=${activeCategory}`
        );
        const data: ProductType[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium text-[#D4AF37] mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium products organized by
            category
          </p>
        </div>

        <Tabs
          defaultValue={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <div className="flex justify-center mb-10">
            <TabsList className="bg-[#e3d39f] p-1.5 rounded-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-6 py-2 rounded-full data-[state=active]:bg-white data-[state=active]:text-[#2d4a3e] data-[state=active]:shadow-sm text-black transition-all duration-300"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              {category.description && (
                <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                  {category.description}
                </p>
              )}

              {/* Render loading state */}
              {loading ? (
                <div className="text-center text-gray-600">
                  Loading products...
                </div>
              ) : (
                // Render products for the current category
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
                </div>
              )}

              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  className="border-[#2d4a3e] text-[#2d4a3e] hover:bg-[#2d4a3e] hover:text-white"
                >
                  View All {category.name}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
