import mongoose from "mongoose";
import Queue from "../models/Queue.js";
import UserQueue from "../models/UserQueue.js";
import Notification from "../models/Notification.js";

// Fetch all queues
export const getQueues = async (req, res) => {
  try {
    const queues = await Queue.find();
    res.status(200).json({ success: true, data: queues });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching queues",
      error: error.message,
    });
  }
};

// Fetch queue details

export const getQueueDetails = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id);
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    const joinedUsers = await UserQueue.find({
      queueId: req.params.id,
      status: "Joined",
    })
      .populate("userId", "name email phone")
      .sort("joinedAt");

    const servedUsers = await UserQueue.find({
      queueId: req.params.id,
      status: "Completed",
    })
      .populate("userId", "name email phone")
      .sort("-leftAt"); // Sort by latest served first

    res
      .status(200)
      .json({ success: true, data: { queue, joinedUsers, servedUsers } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching queue details",
      error: error.message,
    });
  }
};

// Update a queue
export const updateQueue = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid queue ID" });
    }

    const queue = await Queue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    res.status(200).json({ success: true, data: queue });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating queue",
      error: error.message,
    });
  }
};

// Delete a queue
export const deleteQueue = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid queue ID" });
    }

    const queue = await Queue.findByIdAndDelete(req.params.id);
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    await UserQueue.deleteMany({ queueId: req.params.id });

    res
      .status(200)
      .json({ success: true, message: "Queue deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting queue",
      error: error.message,
    });
  }
};

// Get all queues the user has joined
export const getJoinedQueues = async (req, res) => {
  try {
    const userId = req.user.id;

    const userQueues = await UserQueue.find({
      userId,
      status: "Joined",
    }).populate("queueId");

    const formattedQueues = await Promise.all(
      userQueues.map(async (userQueue) => {
        const queue = userQueue.queueId;
        if (!queue) return null;

        const queueUsers = await UserQueue.find({
          queueId: queue._id,
          status: "Joined",
        })
          .sort("joinedAt")
          .select("userId joinedAt");

        const userIndex = queueUsers.findIndex(
          (q) => q.userId.toString() === userId
        );
        const yourNumber = userIndex !== -1 ? userIndex + 1 : null;
        const peopleAhead =
          yourNumber !== null ? yourNumber - queue.currentNumber - 1 : 0;

        const estimatedWaitTime =
          peopleAhead >= 0 ? peopleAhead * queue.estimatedTimePerPerson : null;

        return {
          _id: queue._id,
          name: queue.name,
          currentNumber: queue.currentNumber,
          maxSize: queue.maxSize,
          estimatedTimePerPerson: queue.estimatedTimePerPerson,
          status: queue.status,
          yourNumber: yourNumber || "N/A",
          peopleAhead: peopleAhead >= 0 ? peopleAhead : 0,
          estimatedWaitTime:
            estimatedWaitTime !== null
              ? `${estimatedWaitTime} mins`
              : "Calculating...",
          history: {
            date: userQueue.joinedAt,
            waitTime:
              estimatedWaitTime !== null
                ? `${estimatedWaitTime} mins`
                : "Unknown",
          },
        };
      })
    );

    res
      .status(200)
      .json({ success: true, data: formattedQueues.filter((q) => q !== null) });
  } catch (error) {
    console.error("Error fetching joined queues:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get queue history
// export const getQueueHistory = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const userQueues = await UserQueue.find({
//       userId,
//       status: { $ne: "Joined" },
//     }).populate("queueId");

//     const history = userQueues.map((entry) => ({
//       _id: entry._id,
//       queueName: entry.queueId?.name || "Unknown",
//       date: entry.joinedAt ? new Date(entry.joinedAt).toLocaleString() : "N/A",
//       waitTime: entry.waitTime !== null ? `${entry.waitTime} mins` : "N/A",
//       status: entry.status,
//     }));

//     res.status(200).json({ success: true, data: history });
//   } catch (error) {
//     console.error("Error fetching queue history:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching queue history", error: error.message });
//   }
// };

export const getQueueHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const userQueues = await UserQueue.find({
      userId,
      status: { $ne: "Joined" },
    })
      .populate("queueId")
      .sort({ leftAt: -1 });

    const history = userQueues.map((entry) => ({
      _id: entry._id,
      queueName: entry.queueId?.name || "Unknown",
      date:
        entry.leftAt && !isNaN(new Date(entry.leftAt).getTime())
          ? new Date(entry.leftAt).toISOString()
          : entry.joinedAt && !isNaN(new Date(entry.joinedAt).getTime())
          ? new Date(entry.joinedAt).toISOString()
          : null,
      waitTime: entry.waitTime !== null ? `${entry.waitTime} mins` : "N/A",
      status: entry.status,
    }));

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error("Error fetching queue history:", error);
    res.status(500).json({
      message: "Error fetching queue history",
      error: error.message,
    });
  }
};

// Create a notification
const createNotification = async (userId, title, message) => {
  try {
    await Notification.create({ userId, title, message });
  } catch (error) {
    console.error("Error creating notification:", error.message);
  }
};

// Create a queue
export const createQueue = async (req, res) => {
  try {
    const { name, description, maxSize, estimatedTimePerPerson } = req.body;

    const queue = await Queue.create({
      name,
      description,
      maxSize,
      estimatedTimePerPerson,
      adminId: req.user._id,
    });

    await createNotification(
      req.user._id,
      "Queue Created",
      `Queue ${name} has been created.`
    );

    res.status(201).json({ success: true, data: queue });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating queue",
      error: error.message,
    });
  }
};

// Join a queue
export const joinQueue = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const queue = await Queue.findById(id);
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    if (queue.status !== "active")
      return res.status(400).json({ message: "Queue is paused" });
    if (queue.currentSize >= queue.maxSize)
      return res.status(400).json({ message: "Queue is full" });

    const existingEntry = await UserQueue.findOne({
      userId,
      queueId: id,
      status: "Joined",
    });
    if (existingEntry)
      return res.status(400).json({ message: "Already joined this queue" });

    await UserQueue.create({ userId, queueId: id });

    queue.currentSize += 1;
    await queue.save();

    await createNotification(
      userId,
      "Queue Joined",
      `You have joined the queue ${queue.name}.`
    );

    res
      .status(200)
      .json({ success: true, message: "Joined queue successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error joining queue", error: error.message });
  }
};

// Leave a queue
export const leaveQueue = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const userQueue = await UserQueue.findOne({
      userId,
      queueId: id,
      status: "Joined",
    });
    if (!userQueue)
      return res.status(400).json({ message: "You are not in this queue" });

    const now = new Date();
    const waitTime = Math.round((now - userQueue.joinedAt) / 60000);

    userQueue.status = "Cancelled";
    userQueue.leftAt = now;
    userQueue.waitTime = waitTime;
    await userQueue.save();

    const queue = await Queue.findById(id);
    if (queue) {
      queue.currentSize = Math.max(0, queue.currentSize - 1);
      await queue.save();
    }

    await createNotification(
      userId,
      "Queue Left",
      `You have left the queue ${queue.name}.`
    );

    res.status(200).json({ success: true, message: "Left queue successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error leaving queue", error: error.message });
  }
};

// Move to next in queue
export const nextInQueue = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid queue ID" });

    const queue = await Queue.findById(id);
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    if (queue.currentSize <= 0)
      return res.status(400).json({ message: "No users left in the queue" });

    const userQueueEntry = await UserQueue.findOne({
      queueId: id,
      status: "Joined",
    }).sort("joinedAt");

    if (userQueueEntry) {
      userQueueEntry.status = "Completed";
      userQueueEntry.leftAt = new Date();
      userQueueEntry.waitTime = Math.round(
        (userQueueEntry.leftAt - userQueueEntry.joinedAt) / 60000
      );
      await userQueueEntry.save();

      await createNotification(
        userQueueEntry.userId,
        "Queue Created",
        "Your Turn",
        `Your turn has arrived for queue ${queue.name}.`
      );
    }

    queue.currentNumber += 1;
    queue.currentSize = Math.max(0, queue.currentSize - 1);
    await queue.save();

    res.status(200).json({
      success: true,
      message: "Moved to the next person in the queue",
      data: queue,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing next person", error: error.message });
  }
};

// Pause or resume queue
export const pauseQueue = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid queue ID" });

    const queue = await Queue.findById(id);
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    queue.status = queue.status === "active" ? "paused" : "active";
    await queue.save();

    await createNotification(
      queue.adminId,
      "Queue Status Changed",
      `Queue ${queue.name} is now ${queue.status}.`
    );

    res.status(200).json({
      success: true,
      message: `Queue successfully ${queue.status}`,
      data: queue,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating queue status", error: error.message });
  }
};

// Delete a specific queue history record for a user
export const deleteQueueHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const result = await UserQueue.findOneAndDelete({
      _id: id,
      userId,
      status: { $ne: "Joined" },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Queue history not found or cannot be deleted" });
    }

    res.status(200).json({
      success: true,
      message: "Queue history deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting queue history:", error);
    res.status(500).json({
      message: "Error deleting queue history",
      error: error.message,
    });
  }
};

// Delete all queue history records for a user
export const deleteAllQueueHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Only delete queue history (Completed & Cancelled) and NOT Joined
    const result = await UserQueue.deleteMany({
      userId,
      status: { $ne: "Joined" }, // Excludes active queues
    });

    if (result.deletedCount > 0) {
      return res.json({
        success: true,
        message: "All queue history deleted successfully.",
      });
    } else {
      return res.json({
        success: false,
        message: "No queue history found to delete.",
      });
    }
  } catch (error) {
    console.error("Error deleting all queue history:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting queue history.",
    });
  }
};
