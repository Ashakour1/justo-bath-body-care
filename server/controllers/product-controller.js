import asyncHandler from "express-async-handler";
import prisma from "../db/prisma.js";
import cloudinary from "../config/cloudinary.js";
export const getProducts = asyncHandler(async (req, res) => {
  const { isNew, category, sub_category } = req.query;

  try {
    let products;

    if (isNew) {
      products = await prisma.product.findMany({
        orderBy: { order: "asc" },
      });
    } else {
      const filters = {};
      if (category)
        filters.category = { equals: category, mode: "insensitive" };
      if (sub_category)
        filters.sub_category = { equals: sub_category, mode: "insensitive" };

      products = await prisma.product.findMany({
        where: filters,
        orderBy: { order: "asc" },
      });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Product fetch error:", error);
    res.status(500).json({ message: error.message });
  }
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      sub_category,
      rating,
      size,
      isNew,
      inStock,
      quantity,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !rating ||
      !size ||
      !quantity
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    // const parsedRating = parseFloat(rating);
    // if (isNaN(parsedRating)) {
    //   return res.status(400).json({ message: "Rating must be a valid number" });
    // }

    // // Ensure isNew is a boolean (optional)
    // const parsedIsNew = isNew === "true" || isNew === true;

    const productExists = await prisma.product.findFirst({
      where: {
        name,
      },
    });

    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    let result = null;

    if (req.file) {
      const encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        quality: "auto:best", // Cloudinary will pick best possible quality
        fetch_format: "auto", // Cloudinary will optimize format (WebP, AVIF)
        folder: "products", // Optional: specify a folder in Cloudinary
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        sub_category,
        rating: parseFloat(rating),
        size,
        quantity: parseInt(quantity),
        image: result?.secure_url,
        isNew: isNew === "true" || isNew === true,
        inStock: inStock === "true" || inStock === true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    category,
    rating,
    size,
    isNew,
    quantity,
    sub_category,
  } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not exists" });
    }

    const { name, description, price, category, rating, size, isNew } =
      req.body;

    let result = null;

    if (req.file) {
      const encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 400, height: 400, crop: "limit" }],
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        sub_category: sub_category,
        rating: parseFloat(rating),
        size,
        quantity: parseInt(quantity),
        image: result?.secure_url,
        isNew: isNew === "true" || isNew === true,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @desc    Reorder products
 * @route   PUT /api/products/reorder
 * @access  Private/Admin
 */
export const reorderProducts = asyncHandler(async (req, res) => {
  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    // Use Prisma transaction to ensure all updates succeed or fail together
    await prisma.$transaction(
      products.map((product) =>
        prisma.product.update({
          where: { id: product.id },
          data: { order: product.order },
        })
      )
    );

    res.status(200).json({ message: "Product order updated successfully" });
  } catch (error) {
    console.error("Reorder products error:", error);
    res.status(500).json({ message: error.message });
  }
});
