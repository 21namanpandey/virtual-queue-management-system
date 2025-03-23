import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    maxSize: {
      type: Number,
      required: true,
    },
    currentSize: {
      type: Number,
      default: 0,
    },
    estimatedTimePerPerson: {
      type: Number,
      required: true,
    },
    currentNumber: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "paused"],
      default: "active",
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    usersJoined: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Queue = mongoose.model("Queue", queueSchema);
export default Queue;
