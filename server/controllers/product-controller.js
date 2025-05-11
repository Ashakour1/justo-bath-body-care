import asyncHandler from "express-async-handler";
import prisma from "../db/prisma.js";
import cloudinary from "../config/cloudinary.js";

export const getProducts = asyncHandler(async (req, res) => {
  // const qisNew = req.query.new;

  const { isNew, category } = req.query;

  try {
    let products;

    if (isNew) {
      products = (await prisma.product.findMany()).sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (category) {
      products = await prisma.product.findMany({
        where: {
          category,
        },
      });
    } else {
      products = await prisma.product.findMany();
    }

    res.status(200).json(products);
  } catch (error) {
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
        transformation: [{ width: 400, height: 400, crop: "limit" }],
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
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
  const { name, description, price, category, rating, size, isNew, quantity } =
    req.body;

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
