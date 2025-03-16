import express from "express";

import {
  registerUser,
  loginUser,
  getUsers,
} from "../controllers/user-controller.js";
import authMiddleWare from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleWare, getUsers);

export default router;
