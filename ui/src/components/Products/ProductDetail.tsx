import { useCart } from "@/features/useCart";
import { ProductType } from "@/types/product.t";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface ProductCart {
  id: string | null;
  name: string;
  image: string;
  price: number;
  sex: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

const ProductDetail = () => {
  const [Product, setProduct] = useState<ProductType | undefined>();
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  //   const [selectedColor, setSelectedColor] = useState<string | undefined>();
  //   const [selectedSize, setSelectedSize] = useState<string | undefined>();

  //   console.log(selectedColor, selectedSize);

  // product detail
  const [productDetail, setProductDetail] = useState<ProductCart>({
    id: null,
    name: "",
    image: "",
    price: 0,
    sex: "",
    quantity: 1,
    selectedColor: "",
    selectedSize: "",
  });

  // get the id from the url
  const { id } = useParams();

  // get the cart store object from the cart object
  const { AddCart, products } = useCart();

  // fetch product information from the server
  const fetchProduct = async () => {
    try {
      setLoading(true); // Start loading

      const { data } = await axios.get(`/api/products/${id}`);
      // const data = await response.json();
      // console.log(data);
      // const { color: color, size: size } = data;
      // console.log(rest);
      setProduct(data);
      setProductDetail({
        id: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        sex: data.sex,
        quantity: 1,
        selectedColor: productDetail.selectedColor,
        selectedSize: productDetail.selectedSize,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setLoading(false);
  };

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!productDetail.selectedColor || !productDetail.selectedSize) {
      alert("Please select color and size");
      return;
    }
    AddCart(productDetail);
    navigate("/cart");
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);
  console.log(products);
  return (
    <main className="max-w-[1180px] mx-auto md:px-4 lg:px-0 px-4 py-10">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-xl ">Loading...</h1>
        </div>
      ) : (
        <div className="flex justify-between px-10 pt-10">
          <div className="flex gap-5 w-[50%]">
            <img src={Product?.image} alt="" className="w-96 h-96" />
            <div className="flex flex-col gap-5 pt-1">
              <div className="w-20 h-20 overflow-hidden">
                <img
                  src={Product?.image}
                  alt="Top View"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-20 h-20 overflow-hidden">
                <img
                  src={Product?.image}
                  alt="Bottom View"
                  className="w-full h-full object-cover object-bottom"
                />
              </div>
              {/* Left Crop */}
              <div className="w-20 h-20 overflow-hidden">
                <img
                  src={Product?.image}
                  alt="Left View"
                  className="w-full h-full object-cover object-left"
                />
              </div>

              {/* Right Crop */}
              <div className="w-20 h-20 overflow-hidden">
                <img
                  src={Product?.image}
                  alt="Right View"
                  className="w-full h-full object-cover object-right"
                />
              </div>
            </div>
          </div>
          <div className="border p-5 w-[50%]">
            <div className="flex flex-col gap-5 max-w-md">
              <h1>
                Name : <strong>{Product?.name}</strong>
              </h1>
              <span>
                Price : <strong>${Product?.price}</strong>{" "}
              </span>
              <p>
                Description : <strong>{Product?.description}</strong>
              </p>

              <p>
                Sex : <strong>{Product?.sex}</strong>
              </p>
            </div>
            <div className="flex flex-col pt-5 pb-4">
              <p>Color</p>
              <div className="flex gap-3">
                {Product?.color.map((color, index) => (
                  <div
                    onClick={() =>
                      setProductDetail((prevDetail) => ({
                        ...prevDetail,
                        selectedColor: color,
                      }))
                    }
                    key={index}
                    className={`w-10 cursor-pointer h-10 rounded ${
                      productDetail.selectedColor === color
                        ? "border-2 border-black"
                        : "hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <p>Size</p>
              <div className="flex gap-3">
                {Product?.size.map((size) => (
                  <div
                    onClick={() =>
                      setProductDetail((prevDetail) => ({
                        ...prevDetail,
                        selectedSize: size,
                      }))
                    }
                    className={`w-10 h-10 flex cursor-pointer border items-center text-center justify-center ${
                      productDetail.selectedSize === size
                        ? "border-2 border-black"
                        : "hover:border-gray-400"
                    } `}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div className="py-4">
              <button
                onClick={handleAddToCart}
                className="px-4 w-full py-2 bg-black text-white"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
