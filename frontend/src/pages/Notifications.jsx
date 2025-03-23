import { useEffect, useState } from "react";
import { Bell, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../services/notificationService";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === now.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await getNotifications();
    if (data.success !== false) {
      setNotifications(data);
    }
  };

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((notif) =>
        notif._id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    toast.success("Notification deleted successfully!");
  };

  const handleDeleteAll = async () => {
    setShowDeleteAllModal(true);
  };

  const confirmDeleteAll = async () => {
    setShowDeleteAllModal(false);
    await deleteAllNotifications();
    setNotifications([]);
    toast.success("All notifications deleted!");
  };

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isRead === b.isRead) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.isRead - b.isRead;
  });

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-[#C9F7FD]">
      <div className="w-full max-w-4xl p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#1B1924]">
            Notifications
          </h1>
          <p className="text-lg text-gray-700">
            Stay updated with your queue status
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-lg w-full border bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <Bell className="h-6 w-6 text-blue-500" />
              Recent Notifications
            </h2>
            {notifications.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="flex items-center gap-2 text-red-600 font-semibold hover:underline"
              >
                <Trash2 className="h-5 w-5" />
                Delete All
              </button>
            )}
          </div>

          <div className="space-y-6">
            {sortedNotifications.length > 0 ? (
              sortedNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-6 border rounded-xl transition-all duration-200 relative flex flex-col
                    ${
                      !notification.isRead
                        ? "bg-[#E0FBFF] border-blue-400 shadow-md"
                        : "bg-gray-100 opacity-80"
                    }`}
                >
                  <div className="sm:hidden text-sm font-medium text-gray-700 mb-2">
                    {formatDate(notification.createdAt)} -{" "}
                    {formatTime(notification.createdAt)}
                  </div>

                  <div className="w-full space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {notification.title}
                      </h3>
                      <span className="hidden sm:block text-sm font-medium text-gray-700">
                        {formatDate(notification.createdAt)} -{" "}
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-normal break-words">
                      {notification.message}
                    </p>

                    <div className="flex flex-row sm:justify-end gap-4 text-sm font-medium mt-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="text-red-500 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg">
                No new notifications
              </p>
            )}
          </div>
        </div>
      </div>

      {showDeleteAllModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center">
          <div className="bg-[#C9F7FD] p-6 rounded-lg border shadow-lg w-96">
            <h2 className="text-xl font-bold text-black text-center">
              Confirm Delete All
            </h2>
            <p className="text-gray-700 text-center">
              Are you sure you want to delete all notifications?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowDeleteAllModal(false)}
                className="px-4 py-2 border bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAll}
                className="px-4 py-2 border border-black rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Notifications;
