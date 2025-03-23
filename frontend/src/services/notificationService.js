import API from "./api";

export const getNotifications = async () => {
  try {
    const response = await API.get("/notifications");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch notifications",
    };
  }
};

export const markAsRead = async (id) => {
  try {
    const response = await API.patch(`/notifications/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to mark as read",
    };
  }
};

export const deleteNotification = async (id) => {
  try {
    await API.delete(`/notifications/${id}`);
    return { success: true, id };
  } catch (error) {
    console.error("Error deleting notification:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete notification",
    };
  }
};

export const deleteAllNotifications = async () => {
  try {
    const response = await API.delete("/notifications");
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Error deleting all notifications:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to delete all notifications",
    };
  }
};
