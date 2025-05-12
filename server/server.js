import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product-routes.js";
import userRoutes from "./routes/user-routes.js";
import { errorHandler } from "./middlewares/error-handler.js";
import cors from "cors";
import orderRoutes from "./routes/orders-routes.js";

const app = express();

dotenv.config();

app.use(cors(
  {
    origin: '*'
  }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8000;

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

