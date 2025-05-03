"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Product from "./Product";
import type { ProductType } from "@/types/product.t";

// Define the categories with updated link paths
const categories = [
  {
    id: "Perfumes",
    name: "Perfumes",
    description: "Explore a wide range of fragrances.",
    link: "/Shop/Perfumes",
  },
  {
    id: "Rituals",
    name: "Rituals ...",
    description: "Indulge in luxury with our rituals.",
    link: "/Shop/Rituals",
  },
  {
    id: "Justo cosmetics",
    name: "Justo Cosmetics",
    description: "High-quality cosmetics for you.",
    link: "/Shop/Justo cosmetics",
  },
  {
    id: "Bath and body Works",
    name: "Bath & Body Works",
    description: "Pamper your body with our selection.",
    link: "/Shop/Bath and body Works",
  },
];

type ProductCategoriesProps = {};

export default function ProductCategories({}: ProductCategoriesProps) {
  const [categoryProducts, setCategoryProducts] = useState<
    Record<string, ProductType[]>
  >({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  // Fetch products for all categories
  useEffect(() => {
    const fetchAllCategoryProducts = async () => {
      // Initialize loading state for all categories
      const initialLoadingState: Record<string, boolean> = {};
      categories.forEach((category) => {
        initialLoadingState[category.id] = true;
      });
      setLoading(initialLoadingState);

      // Fetch products for each category
      const fetchPromises = categories.map(async (category) => {
        try {
          const response = await fetch(
            `https://justo-bath-body-care-siem.vercel.app/api/products?category=${category.id}`
          );
          const data: ProductType[] = await response.json();
          return { categoryId: category.id, products: data };
        } catch (error) {
          console.error(`Error fetching products for ${category.id}:`, error);
          return { categoryId: category.id, products: [] };
        }
      });

      // Wait for all fetches to complete
      const results = await Promise.all(fetchPromises);

      // Update state with products for each category
      const newCategoryProducts: Record<string, ProductType[]> = {};
      const newLoadingState: Record<string, boolean> = {};

      results.forEach((result) => {
        newCategoryProducts[result.categoryId] = result.products;
        newLoadingState[result.categoryId] = false;
      });

      setCategoryProducts(newCategoryProducts);
      setLoading(newLoadingState);
    };

    fetchAllCategoryProducts();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-[#D4AF37] mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium products organized by
            category
          </p>
        </div>

        <div className="space-y-20">
          {categories.map((category) => (
            <section
              key={category.id}
              className="scroll-mt-16"
              id={category.id}
            >
              {/* Category Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-left text-[#D4AF37] mb-3">
                  {category.name}
                </h3>
                <div className="w-24 h-1 bg-[#D4AF37] mb-4"></div>
                {category.description && (
                  <p className="text-left text-sm text-gray-600 max-w-3xl">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Products for this category */}
              <div>
                {loading[category.id] ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
                  </div>
                ) : categoryProducts[category.id]?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {categoryProducts[category.id]
                      .slice(0, 4)
                      .map((product) => (
                        <Product key={product.id} product={product} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No products found in this category.
                    </p>
                  </div>
                )}
              </div>

              {/* View All button for this category with updated link */}
              <div className="mt-8 text-center">
                <Link to={category.link}>
                  <Button
                    variant="outline"
                    className="border-[#D4AF37] text-white bg-[#D4AF37] hover:bg-[#D4AF37] hover:text-white px-8 py-2 text-lg"
                  >
                    View All {category.name}
                  </Button>
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
