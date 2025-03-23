"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Define the type for the product
type ProductType = {
  name: string;
  price: string;
  category: string;
  rating: string;
  size: string;
  description: string;
  isNew: boolean;
  inStock: boolean;
  image: File | null; // Add type for image
};

const ProductForm = () => {
  const { id } = useParams();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `justo-bath-body-care-siem.vercel.app/api/products/${id}`
      );
      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Initialize formData with empty fields and image field
  const [formData, setFormData] = useState<ProductType>({
    name: "",
    price: "",
    category: "",
    rating: "",
    size: "",
    description: "",
    isNew: false,
    inStock: false,
    image: null, // Initialize the image field as null
  });

  const navigate = useNavigate();

  // Handle file input change for image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFormData((prev) => ({ ...prev, image: file })); // Update the image in formData
    }
  };

  // Handle input changes for text fields
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle select changes for dropdown fields
  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { id, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [id]: value }));
  // };

  // Handle checkbox changes for boolean fields
  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, checked } = e.target;
  //   setFormData((prev) => ({ ...prev, [id]: checked }));
  // };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("isNew", formData.isNew.toString());
    formDataToSend.append("inStock", formData.inStock.toString());

    // If an image is selected, append it to the form data
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (id) {
        const { data } = await axios.put(
          `justo-bath-body-care-siem.vercel.app/api/products/${id}`,
          formDataToSend
        );

        toast.success(data.message);
        navigate("/dashboard/products");
      } else {
        const { data } = await axios.post(
          "justo-bath-body-care-siem.vercel.app/api/products/",
          formDataToSend
        );

        toast.success(data.message);
        navigate("/dashboard/products");
      }
    } catch (error) {
      // console.log(error);
      toast.error((error as any).response.data.message);
    }
  };

  return (
    <div className="max-w-3xl  mx-auto py-6 px-4">
      <div className="flex flex-col items-start mb-6">
        <Button variant="ghost" size="icon" className="mr-2 h-9 w-9">
          <ArrowLeft className="h-5 w-5" />
          Back
        </Button>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <p>Fill in the details below to add a new product to your store.</p>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">
                Product Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="font-medium">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="font-medium">
                Category
              </Label>
              <Select
                // id="category"
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="perfumes">perfumes</SelectItem>
                  <SelectItem value="rituals">Rituals</SelectItem>
                  <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                  <SelectItem value="bath-body">Bath and body works</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size" className="font-medium">
                Size
              </Label>
              <Select
                // id="size"
                value={formData.size}
                onValueChange={(value) =>
                  setFormData({ ...formData, size: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                  <SelectItem value="xxl">XXL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="rating" className="font-medium">
                Rating (0-5)
              </Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="5"
              />
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="isNew"
                  checked={formData.isNew}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      isNew: checked as boolean,
                    }))
                  }
                />
                <div>
                  <Label htmlFor="isNew" className="font-medium">
                    New Arrival
                  </Label>
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
                <Checkbox
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      inStock: checked as boolean,
                    }))
                  }
                />

                <div>
                  <Label htmlFor="inStock" className="font-medium">
                    In Stock
                  </Label>
                  <p className="text-sm text-gray-500">
                    Is this product currently in stock?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Product Image</Label>
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="outline"
                className="bg-none flex items-center  border border-gray-300 "
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
              <Input
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
          </div>

          <div
            className="w-full 
          flex space-x-4 pt-4"
          >
            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
            >
              Save Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
