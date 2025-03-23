import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword,
  logoutUser,
  editProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", protect, getProfile);
router.put("/profile/edit", protect, editProfile);

export default router;
