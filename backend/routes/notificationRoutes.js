import express from "express";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications); 
router.patch("/:id", protect, markAsRead); 
router.delete("/:id", protect, deleteNotification); 
router.delete("/", protect, deleteAllNotifications);

export default router;
