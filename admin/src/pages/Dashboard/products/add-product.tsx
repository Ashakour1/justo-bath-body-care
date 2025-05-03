"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

type ProductType = {
  _id?: string;
  name: string;
  price: string;
  category: string;
  rating: string;
  size: string;
  description: string;
  isNew: boolean;
  inStock: boolean;
  image?: File | null;
  imageUrl?: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://justo-bath-body-care-siem.vercel.app/api";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ProductType>({
    name: "",
    price: "",
    category: "",
    rating: "",
    size: "",
    description: "",
    isNew: false,
    inStock: false,
    image: null,
  });

  

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/products/${id}`);

      setFormData({
        name: data.name || "",
        price: data.price || "",
        category: data.category || "",
        rating: data.rating || "",
        size: data.size || "",
        description: data.description || "",
        isNew: data.isNew || false,
        inStock: data.inStock || false,
        imageUrl: data.imageUrl || "",
      });

      if (data.imageUrl) {
        setImagePreview(data.imageUrl);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("isNew", formData.isNew.toString());
    formDataToSend.append("inStock", formData.inStock.toString());

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (id) {
        await axios.put(`${API_BASE_URL}/products/${id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/products/`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created successfully");
      }
      navigate("/dashboard/products");
    } catch (error: any) {
      console.error("Submission error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="flex flex-col items-start mb-6">
        <button
          onClick={() => navigate("/dashboard/products")}
          className="mr-2 h-9 w-9 flex items-center justify-center rounded-md hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </button>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">
            {id ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-gray-600">
            {id
              ? "Update the product details below."
              : "Fill in the details below to add a new product to your store."}
          </p>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium text-gray-700">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block font-medium text-gray-700"
              >
                Price (ksh)
              </label>
              <input
                id="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="Perfumes">Perfumes</option>
                <option value="Rituals">Rituals</option>
                <option value="Justo cosmetics">Justo cosmetics</option>
                <option value="Bath and body Works">Bath and body works</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="size" className="block font-medium text-gray-700">
                Size
              </label>
              <select
                id="size"
                value={formData.size}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="">Select a size</option>
                <option value="20ml">20ml</option>
                <option value="250">250</option>
                <option value="275">275</option>
                <option value="295ml">295ml</option>
                <option value="300ml">300ml</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="rating"
                className="block font-medium text-gray-700"
              >
                Rating (0-5)
              </label>
              <input
                id="rating"
                type="number"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="5"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-start space-x-2">
                <input
                  id="isNew"
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                  className="h-4 w-4 mt-1 text-black focus:ring-black border-gray-300 rounded"
                />
                <div>
                  <label
                    htmlFor="isNew"
                    className="block font-medium text-gray-700"
                  >
                    New Arrival
                  </label>
                  <p className="text-sm text-gray-500">
                    Mark this product as a new arrival
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 md:col-start-2">
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-start space-x-2">
                <input
                  id="inStock"
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="h-4 w-4 mt-1 text-black focus:ring-black border-gray-300 rounded"
                />
                <div>
                  <label
                    htmlFor="inStock"
                    className="block font-medium text-gray-700"
                  >
                    In Stock
                  </label>
                  <p className="text-sm text-gray-500">
                    Is this product currently in stock?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-700">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </button>
              <input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="text-sm text-gray-500">
                JPG, PNG or GIF, max 5MB
              </span>
            </div>
            {imageFile && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {imageFile.name}
              </p>
            )}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-40 w-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="w-full flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {id ? "Updating..." : "Creating..."}
                </span>
              ) : id ? (
                "Update Product"
              ) : (
                "Save Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
