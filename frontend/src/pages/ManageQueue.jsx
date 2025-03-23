import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchQueueDetails,
  toggleQueueStatus,
  moveToNextInQueue,
} from "../services/queueService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageQueue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [queueDetails, setQueueDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [servedUsers, setServedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const loadQueueDetails = async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setLoading(true);
    }

    try {
      const response = await fetchQueueDetails(id);
      if (response.success) {
        setQueueDetails(response.data.queue);
        setUsers(response.data.joinedUsers || []);
        setServedUsers(response.data.servedUsers || []);
        setError("");
      } else {
        setError("Failed to load queue details.");
        if (isInitialLoad) {
          toast.error("Failed to load queue details.");
        }
      }
    } catch (err) {
      setError("An error occurred while fetching queue details.");
      if (isInitialLoad) {
        toast.error("An error occurred while fetching queue details.");
      }
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadQueueDetails(true);

    const interval = setInterval(() => loadQueueDetails(false), 5000);

    return () => clearInterval(interval);
  }, [id]);

  const handleToggleQueueStatus = async () => {
    setProcessing(true);
    try {
      const response = await toggleQueueStatus(id);
      if (response.success) {
        setQueueDetails((prev) => ({
          ...prev,
          status: response.data.status,
        }));
        toast.success(
          `Queue ${
            response.data.status === "active" ? "resumed" : "paused"
          } successfully!`
        );
      } else {
        toast.error("Failed to update queue status.");
      }
    } catch (err) {
      toast.error("An error occurred while updating queue status.");
    } finally {
      setProcessing(false);
    }
  };

  const handleNextPerson = async () => {
    if (users.length === 0) {
      toast.warning("Queue is empty! No users left.");
      return;
    }

    setProcessing(true);
    try {
      const response = await moveToNextInQueue(id);
      if (response.success) {
        setQueueDetails((prev) => ({
          ...prev,
          currentNumber: prev.currentNumber + 1,
          currentSize: Math.max(prev.currentSize - 1, 0),
        }));

        setUsers((prevUsers) => prevUsers.slice(1));

        toast.success("Moved to the next person!");
      } else {
        toast.error("Failed to move to the next person.");
      }
    } catch (err) {
      toast.error("An error occurred while processing the next person.");
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const timeString = `${formattedHours}:${minutes} ${ampm}`;

    if (isToday) {
      return `Today at ${timeString}`;
    } else {
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      return `${month} ${day} at ${timeString}`;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!queueDetails) return <p>No queue details found.</p>;

  return (
    <div className="min-h-screen bg-[#C9F7FD] p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 py-2 px-4 border rounded-md bg-black text-white hover:bg-gray-700"
        >
          <span>←</span> Back to Dashboard
        </button>

        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-black">
              {queueDetails.name}
            </h1>
            <p className="text-gray-500">Queue Management</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/admin/queue/edit/${id}`)}
              className="py-2 px-4 border rounded-md bg-white hover:bg-gray-100 text-gray-700"
              disabled={processing}
            >
              Edit Queue
            </button>
            <button
              onClick={handleToggleQueueStatus}
              className={`py-2 px-4 rounded-md text-white ${
                queueDetails.status === "active" ? "bg-red-500" : "bg-green-500"
              }`}
              disabled={processing}
            >
              {processing
                ? "Processing..."
                : queueDetails.status === "active"
                ? "Pause Queue"
                : "Resume Queue"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg bg-white p-6">
            <h3 className="text-lg font-bold text-black">Current Status</h3>
            <p className="text-gray-500 text-sm">Current Number</p>
            <p className="text-3xl font-bold text-black">
              {queueDetails.currentNumber}
            </p>
            <p className="text-gray-500 text-sm">Next Number</p>
            <p className="text-3xl font-bold text-black">
              {queueDetails.currentNumber + 1}
            </p>
            <button
              onClick={handleNextPerson}
              className="mt-4 w-full py-2 px-4 rounded-md bg-black text-white hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={processing || users.length === 0}
            >
              {processing ? "Processing..." : "Next Person"}
            </button>
          </div>

          <div className="border rounded-lg bg-white p-6">
            <h3 className="text-lg font-bold text-black">Queue Size</h3>
            <p className="text-3xl font-bold text-black">
              {queueDetails.currentSize}
            </p>
            <p className="text-gray-500 text-sm">People waiting</p>
          </div>

          <div className="border rounded-lg bg-white p-6">
            <h3 className="text-lg font-bold text-black">Wait Time</h3>
            <p className="text-3xl font-bold text-black">
              {queueDetails.estimatedTimePerPerson} mins
            </p>
            <p className="text-gray-500 text-sm">Per person</p>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-md">
          <h3 className="text-lg font-bold text-black mb-4">Users in Queue</h3>
          {users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user, index) => (
                <div
                  key={user.userId._id}
                  className="flex justify-between items-center p-4 border rounded-lg bg-[#E0FBFF]"
                >
                  <div>
                    <p className="font-semibold text-black">
                      {user.userId.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      Email: {user.userId.email}
                    </p>
                    <p className="text-sm text-gray-700">
                      Phone: {user.userId.phone || "N/A"}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    Position: {index + 1}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No users have joined this queue yet.
            </p>
          )}
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-md">
          <h3 className="text-lg font-bold text-black mb-4">Served Users</h3>
          {servedUsers.length > 0 ? (
            <div className="space-y-4">
              {servedUsers.map((user) => (
                <div
                  key={user.userId._id}
                  className="flex justify-between items-center p-4 border rounded-lg bg-[#F0F0F0]"
                >
                  <div className="flex-grow">
                    <p className="font-semibold text-black">
                      {user.userId.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      Email: {user.userId.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs uppercase font-medium text-gray-500">
                      Served
                    </span>
                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                      {formatDate(user.leftAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No users have been served yet.</p>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageQueue;
