"use client";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ArrowDownUp,
  ShirtIcon,
  Ruler,
  DollarSign,
  X,
  Search,
  RefreshCw,
} from "lucide-react";
import type { ProductType } from "@/types/product.t";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Product from "@/components/Products/Product";

const ProductSubCategory = () => {
  const { category, sub_category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [sortOption, setSortOption] = useState("newest");

  // Filter states
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Product types and sizes based on the image
  // const productTypes = [
  //   "All Types",
  //   "Shower Gel",
  //   "Body Scrub",
  //   "Fragrance",
  //   "Lotion",
  // ];
  const productSizes = ["All Sizes", "50ml", "100ml", "200ml", "300ml"];
  const priceRanges = [
    "All Prices",
    "Under 2000 Ksh",
    "2000-5000 Ksh",
    "5000-8000 Ksh",
    "Over 8000 Ksh",
  ];

  const fetchingProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://justo-bath-body-care-siem.vercel.app/api/products`, {
        params: {
          ...(category && { category }),
          ...(sub_category && { sub_category }),
        },
      });
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchingProducts();
    setSelectedType(null);
    setSelectedSize(null);
    setSelectedPriceRange(null);
    setSortOption("newest");
  }, [category, sub_category]);

  useEffect(() => {
    applyFiltersAndSort();

    // Check if any filters are active
    setHasActiveFilters(
      (!category && selectedType && selectedType !== "All Types") ||
        (selectedSize && selectedSize !== "All Sizes") ||
        (selectedPriceRange && selectedPriceRange !== "All Prices") ||
        sortOption !== "newest"
    );
  }, [
    sortOption,
    selectedType,
    selectedSize,
    selectedPriceRange,
    products,
    category,
  ]);

  const applyFiltersAndSort = () => {
    let result = [...products];

    // Apply type filter only if no category is specified
    if (!category && selectedType && selectedType !== "All Types") {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    // Apply size filter
    if (selectedSize && selectedSize !== "All Sizes") {
      result = result.filter((product) => product.size === selectedSize);
    }

    // Apply price filter
    if (selectedPriceRange && selectedPriceRange !== "All Prices") {
      switch (selectedPriceRange) {
        case "Under 2000 Ksh":
          result = result.filter((product) => product.price < 2000);
          break;
        case "2000-5000 Ksh":
          result = result.filter(
            (product) => product.price >= 2000 && product.price < 5000
          );
          break;
        case "5000-8000 Ksh":
          result = result.filter(
            (product) => product.price >= 5000 && product.price < 8000
          );
          break;
        case "Over 8000 Ksh":
          result = result.filter((product) => product.price >= 8000);
          break;
        default:
          break;
      }
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        // Assuming newer products have higher IDs or there's a date field
        result = result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "price-low-high":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedSize(null);
    setSelectedPriceRange(null);
    setSortOption("newest");
  };

  // Component for the "No Products Found" state
  const NoProductsFound = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-50 rounded-full p-6 mb-6">
        <Search className="h-12 w-12 text-[#D4AF37]" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
      <p className="text-gray-500 max-w-md mb-6">
        {category
          ? `We couldn't find any ${category} products matching your current filters.`
          : "We couldn't find any products matching your current filters."}{" "}
        Try adjusting your filters or browse our full collection.
      </p>

      {hasActiveFilters && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Current Filters:</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {category && (
              <Badge variant="outline" className="px-3 py-1 capitalize">
                Category: {category}
              </Badge>
            )}
            {!category && selectedType && selectedType !== "All Types" && (
              <Badge variant="outline" className="px-3 py-1">
                <ShirtIcon className="h-3 w-3 mr-1" />
                {selectedType}
              </Badge>
            )}
            {selectedSize && selectedSize !== "All Sizes" && (
              <Badge variant="outline" className="px-3 py-1">
                <Ruler className="h-3 w-3 mr-1" />
                {selectedSize}
              </Badge>
            )}
            {selectedPriceRange && selectedPriceRange !== "All Prices" && (
              <Badge variant="outline" className="px-3 py-1">
                <DollarSign className="h-3 w-3 mr-1" />
                {selectedPriceRange}
              </Badge>
            )}
          </div>

          <Button
            onClick={clearFilters}
            className="bg-[#D4AF37] hover:bg-[#c9a633] text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-3">Try these suggestions:</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Try different size options</li>
          <li>• Try a different price range</li>
          {!category && <li>• Try a different product type</li>}
          <li>• Browse all {category || "products"} without filters</li>
          {category && (
            <li>
              <Link to="/" className="text-[#D4AF37] hover:underline">
                • View all product categories
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );

  // Get the display name for the category
  const getCategoryDisplayName = () => {
    if (!category || !sub_category) return "SHOP ALL PRODUCTS";

    // Convert kebab-case or snake_case to Title Case
    return category
      .replace(/-|_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <>
      {loading ? (
        <div className="container mx-auto flex items-center justify-center min-h-screen">
          <h1 className="text-xl">Loading...</h1>
        </div>
      ) : (
        <main className="container mx-auto md:px-4 lg:px-4 px-4 py-10">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <p className="font-medium text-sm">
                  <Link
                    to="/"
                    className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </p>
                <h1 className="text-2xl text-[#D4AF37] font-semibold capitalize">
                  {getCategoryDisplayName()}
                </h1>
                <p className="font-medium text-sm capitalize text-gray-700">
                  Explore Our Collections of{" "}
                  {category ? getCategoryDisplayName() : "Products"}
                </p>
              </div>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap justify-between items-center my-6">
              {/* Left side - Filters */}
              <div className="flex flex-wrap gap-3 mb-3 md:mb-0">
                {/* Product Type Filter - Only show if no category is specified */}

                {/* Size Filter - Always show */}
                <Select
                  value={selectedSize || ""}
                  onValueChange={setSelectedSize}
                >
                  <SelectTrigger className="w-[120px] h-9">
                    <Ruler className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {productSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Price Range Filter - Always show */}
                <Select
                  value={selectedPriceRange || ""}
                  onValueChange={setSelectedPriceRange}
                >
                  <SelectTrigger className="w-[150px] h-9">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="h-9"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Right side - Sort */}
              <div className="flex items-center">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px] h-9">
                    <ArrowDownUp className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low-high">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high-low">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {!category && selectedType && selectedType !== "All Types" && (
                  <Badge variant="secondary" className="px-3 py-1">
                    <ShirtIcon className="h-3 w-3 mr-1" />
                    {selectedType}
                    <button
                      className="ml-2 text-xs"
                      onClick={() => setSelectedType(null)}
                    >
                      ✕
                    </button>
                  </Badge>
                )}
                {selectedSize && selectedSize !== "All Sizes" && (
                  <Badge variant="secondary" className="px-3 py-1">
                    <Ruler className="h-3 w-3 mr-1" />
                    {selectedSize}
                    <button
                      className="ml-2 text-xs"
                      onClick={() => setSelectedSize(null)}
                    >
                      ✕
                    </button>
                  </Badge>
                )}
                {selectedPriceRange && selectedPriceRange !== "All Prices" && (
                  <Badge variant="secondary" className="px-3 py-1">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {selectedPriceRange}
                    <button
                      className="ml-2 text-xs"
                      onClick={() => setSelectedSize(null)}
                    >
                      ✕
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products Count */}
            <div className="text-sm text-gray-500 mb-4">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </div>

            {/* Products Grid or No Results */}
            {filteredProducts.length === 0 ? (
              <NoProductsFound />
            ) : (
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-5 py-5">
                {filteredProducts.map((item, index) => (
                  <Product key={index} product={item} />
                ))}
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default ProductSubCategory;
