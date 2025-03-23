import mongoose from "mongoose";

const UserQueueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
    },
    status: {
      type: String,
      enum: ["Joined", "Completed", "Cancelled"],
      default: "Joined",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    leftAt: {
      type: Date,
    },
    waitTime: {
      type: Number, // Time in minutes
      default: null,
    },
  },
  { timestamps: true }
);

const UserQueue = mongoose.model("UserQueue", UserQueueSchema);
export default UserQueue;
