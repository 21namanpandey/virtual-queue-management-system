import express from "express";
import {
  createQueue,
  updateQueue,
  deleteQueue,
  getQueues,
  getQueueDetails,
  joinQueue,
  leaveQueue,
  nextInQueue,
  pauseQueue,
  getJoinedQueues,
  getQueueHistory,
  deleteQueueHistory,
  deleteAllQueueHistory,
} from "../controllers/queueController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createQueue);
router.get("/", protect, getQueues);

router.get("/joined", protect, getJoinedQueues);
router.get("/history", protect, getQueueHistory);
router.delete("/history/all", protect, deleteAllQueueHistory);
router.delete("/history/:id", protect, deleteQueueHistory);

router.get("/:id", protect, getQueueDetails);
router.put("/:id", protect, adminOnly, updateQueue);
router.delete("/:id", protect, adminOnly, deleteQueue);

router.post("/:id/join", protect, joinQueue);
router.post("/:id/leave", protect, leaveQueue);

router.patch("/:id/next", protect, adminOnly, nextInQueue);
router.patch("/:id/pause", protect, adminOnly, pauseQueue);

export default router;
