import asyncHandler from "express-async-handler";
import prisma from "../db/prisma.js";

// get the orders from the database
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      OrderItem: true,
      Shipping: true,
    },
  });

  console.log("Fetched orders:", orders);

  res.json(orders);
});

// get order
export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// create order

export const createOrder = asyncHandler(async (req, res) => {
  const { total, paymentMethod, paymentNumber, orderItem, shipping } = req.body;

  // console.log("Order Items:", orderItem);
  // console.log("Shipping Details:", shipping);

  try {
    const order = await prisma.order.create({
      data: {
        total: parseFloat(total),
        paymentMethod,
        paymentNumber,
        orderItem: {
          create: orderItem.map((item) => ({
            product: {
              connect: {
                id: item.product_id,
              },
            },
            quantity: item.quantity,
          })),
        },
        shipping: {
          create: {
            email: shipping.email, // Ensure these match your model
            phone: shipping.phone,
            name: shipping.name,
            address: shipping.address,
          },
        },
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
});

// delete order
export const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  try {
    // First, delete all related shipping entries
    await prisma.shipping.deleteMany({
      where: { orderId },
    });

    // Then delete all related order items
    await prisma.orderItem.deleteMany({
      where: { orderId },
    });

    // Finally, delete the order itself
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });

    res.status(200).json({
      message: "Order deleted successfully",
      // deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
});

// update order
export const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { total, paymentStatus, paymentMethod, paymentNumber, status } =
    req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        total: parseFloat(total),
        status,
        paymentMethod,
        paymentNumber,
        paymentStatus,
      },
    });

    res.status(200).json({
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
});
