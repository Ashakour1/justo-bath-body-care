// import { products } from "@/data/products-data";
import Product from "@/components/Products/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product.t";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://justo-bath-body-care-siem.vercel.app/api/products?new=true"
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // const getLatestProducts = (products: ProductType[]) => {
  //   return products
  //     .sort((a, b) => new Date(b.createdAt).getTime - new Date(a.created ?? ""))
  //     .slice(0, 4);
  // };
  return (
    <>
      {products.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl font-semibold">No Products Found</h1>
        </div>
      ) : (
        <main className="container mx-auto py-4">
          <div className="flex items-center justify-between ">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">SHOP ALL PRODUCTS</p>
              <h1 className="text-2xl font-semibold">NEW IN</h1>
            </div>
            <Link to="/shop" className="text-sm font-medium">
              <button className="border border-black px-4 py-2">
                SHOP ALL PRODUCTS
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
            {products.slice(0, 5).map((item, index) => (
              <Product key={index} product={item} />
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default Products;
