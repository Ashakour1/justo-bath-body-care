import Product from "@/components/Products/Product";
import { ProductType } from "@/types/product.t";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Products = ({}) => {
  const { category, collection } = useParams();

  console.log(category, collection);

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchingProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        category
          ? `https://justo-bath-body-care-siem.vercel.app/api/products`
          : `https://justo-bath-body-care-siem.vercel.app/api/products`,
        {
          params: {
            ...(category && { category }),
            ...(collection && { collection }),
          },
        }
      );
      setProducts(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchingProducts();
  }, [category, collection]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl ">Loading...</h1>
        </div>
      ) : products?.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl font-semibold">No Products Found</h1>
        </div>
      ) : (
        <main className="container mx-auto md:px-4 lg:px-0 px-4 py-10">
          <div>
            <div className="flex items-center justify-between ">
              <div className="flex flex-col gap-2">
                <p className="font-medium text-sm">
                  <Link
                    to="/cart"
                    className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </p>
                <h1 className="text-2xl font-semibold capitalize">
                  {category || "SHOP ALL PRODUCTS"}
                </h1>
                <p className="font-medium text-sm Capitalize text-gray-700">
                  Explore Our Collections of {category || "Products"}
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-4   md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-5 py-5">
              {products.map((item, index) => (
                <Product key={index} product={item} />
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Products;
