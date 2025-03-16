import express from "express";
import {
  createOrder,
  getOrders,
  deleteOrder,
  getOrder,
  updateOrder,
} from "../controllers/orders-controller.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/", getOrders);
orderRouter.delete("/:orderId", deleteOrder);
orderRouter.get("/:id", getOrder);
orderRouter.put("/:id", updateOrder);

export default orderRouter;
