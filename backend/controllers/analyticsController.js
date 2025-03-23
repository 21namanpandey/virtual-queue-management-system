import Queue from "../models/Queue.js";
import Notification from "../models/Notification.js";

// Get analytics
export const getAnalytics = async (req, res) => {
  try {
    const queues = await Queue.find();

    const totalUsersServed = queues.reduce(
      (acc, queue) => acc + queue.currentNumber,
      0
    );
    const totalActiveQueues = queues.filter(
      (queue) => queue.status === "active"
    ).length;
    const averageWaitTime =
      queues.reduce(
        (acc, queue) => acc + queue.estimatedTimePerPerson * queue.currentSize,
        0
      ) / (queues.reduce((acc, queue) => acc + queue.currentSize, 0) || 1);

    const notifications = [];

    if (totalUsersServed > 1000) {
      notifications.push({
        userId: req.user._id,
        title: "Milestone Reached: 1000+ Users Served",
        message: `Congratulations! You have served over ${totalUsersServed} users in total.`,
      });
    }

    if (averageWaitTime > 20) {
      notifications.push({
        userId: req.user._id,
        title: "High Average Wait Time",
        message: `The average wait time across all queues is ${Math.round(
          averageWaitTime
        )} minutes. Consider optimizing queue efficiency.`,
      });
    }

    if (totalActiveQueues === 0) {
      notifications.push({
        userId: req.user._id,
        title: "No Active Queues",
        message:
          "There are currently no active queues. Please check and activate queues if necessary.",
      });
    }

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.status(200).json({
      success: true,
      data: {
        totalUsersServed,
        totalActiveQueues,
        averageWaitTime: Math.round(averageWaitTime),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching analytics",
      error: error.message,
    });
  }
};
