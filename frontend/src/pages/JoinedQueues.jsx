import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchJoinedQueues,
  leaveQueue,
  fetchQueueHistory,
  deleteQueueHistory,
  deleteAllQueueHistory,
} from "../services/queueService";
import { Clock, Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinedQueues = () => {
  const navigate = useNavigate();
  const [joinedQueues, setJoinedQueues] = useState([]);
  const [queueHistory, setQueueHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [selectedQueueId, setSelectedQueueId] = useState(null);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [processingAction, setProcessingAction] = useState(false);

  useEffect(() => {
    const getJoinedQueues = async () => {
      try {
        const joinedResponse = await fetchJoinedQueues();
        const historyResponse = await fetchQueueHistory();

        setJoinedQueues(joinedResponse?.data || []);
        setQueueHistory(
          (historyResponse?.data || []).sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
        );
      } catch (err) {
        console.error("Error fetching queues:", err);
        setError(err.message || "An error occurred while fetching queues");
      } finally {
        setLoading(false);
      }
    };

    getJoinedQueues();
    const interval = setInterval(getJoinedQueues, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLeaveQueueClick = (queueId) => {
    setSelectedQueueId(queueId);
    setShowLeaveModal(true);
  };

  const confirmLeaveQueue = async () => {
    setProcessingAction(true);
    try {
      const response = await leaveQueue(selectedQueueId);
      if (response.success) {
        setJoinedQueues((prev) =>
          prev.filter((queue) => queue._id !== selectedQueueId)
        );
        toast.success("Successfully left the queue.");
      } else {
        toast.error(response.message || "Failed to leave the queue.");
      }
    } catch (error) {
      console.error("Error leaving queue:", error);
      toast.error("An error occurred while leaving the queue.");
    } finally {
      setShowLeaveModal(false);
      setSelectedQueueId(null);
      setProcessingAction(false);
    }
  };

  const handleDeleteHistoryClick = (historyId) => {
    setSelectedHistoryId(historyId);
    setShowDeleteModal(true);
  };

  const confirmDeleteHistory = async () => {
    setProcessingAction(true);
    try {
      const response = await deleteQueueHistory(selectedHistoryId);
      if (response.success) {
        setQueueHistory((prev) =>
          prev.filter((history) => history._id !== selectedHistoryId)
        );
        toast.success("Queue history deleted successfully.");
      } else {
        toast.error(response.message || "Failed to delete queue history.");
      }
    } catch (error) {
      console.error("Error deleting queue history:", error);
      toast.error("An error occurred while deleting queue history.");
    } finally {
      setShowDeleteModal(false);
      setSelectedHistoryId(null);
      setProcessingAction(false);
    }
  };

  const handleDeleteAllHistoryClick = () => {
    setShowDeleteAllModal(true);
  };

  const confirmDeleteAllHistory = async () => {
    setProcessingAction(true);
    try {
      const response = await deleteAllQueueHistory();
      if (response.success) {
        setQueueHistory([]);
        toast.success("All queue history deleted successfully.");
      } else {
        toast.error(response.message || "Failed to delete all queue history.");
      }
    } catch (error) {
      console.error("Error deleting all queue history:", error);
      toast.error("An error occurred while deleting all queue history.");
    } finally {
      setShowDeleteAllModal(false);
      setProcessingAction(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return "N/A";
    }

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

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#C9F7FD] p-6">
      <div className="w-full max-w-4xl space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-4 rounded-md text-white flex items-center gap-2 bg-[#1B1924] hover:bg-[#131123]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">My Queues</h1>
          <p className="text-lg text-gray-700">
            Manage your active queue positions
          </p>
        </div>

        {loading ? (
          <p className="text-lg text-gray-700 text-center">
            Loading joined queues...
          </p>
        ) : error ? (
          <p className="text-lg text-red-500 text-center">{error}</p>
        ) : joinedQueues.length > 0 ? (
          <div className="space-y-6">
            {joinedQueues.map((queue, index) => (
              <div
                key={queue._id || index}
                className="p-6 rounded-lg shadow-md border bg-white"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-900 whitespace-normal break-words">
                  {queue.name}
                </h2>
                <div className="grid gap-6 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-gray-600">Your Number</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {queue.yourNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">People Ahead</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {queue.peopleAhead || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Est. Wait Time</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {queue.estimatedWaitTime || "Calculating..."}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => navigate(`/queue/${queue._id}`)}
                    className="py-2 px-4 rounded-md text-white bg-gray-900 hover:bg-gray-800"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleLeaveQueueClick(queue._id)}
                    className="py-2 px-4 rounded-md border text-red-600 hover:bg-red-100"
                  >
                    Leave Queue
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-lg shadow-md border bg-white text-center">
            <p className="text-lg text-gray-700">
              You haven't joined any queues yet.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="py-2 px-4 mt-4 rounded-md text-white bg-gray-900 hover:bg-gray-800"
            >
              Browse Available Queues
            </button>
          </div>
        )}

        <div className="p-6 rounded-lg shadow-lg border bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Queue History
            </h2>
            {queueHistory.length > 0 && (
              <button
                onClick={handleDeleteAllHistoryClick}
                className="flex cursor-pointer items-center gap-2 text-red-600 font-semibold hover:underline"
              >
                <Trash2 className="h-5 w-5" />
                Delete All
              </button>
            )}
          </div>

          {queueHistory.length === 0 ? (
            <p className="text-gray-600">No queue history available.</p>
          ) : (
            <div className="space-y-4">
              {queueHistory.map((history) => (
                <div
                  key={history._id}
                  className="flex flex-wrap items-center justify-between p-4 rounded-lg border"
                  style={{ backgroundColor: "#e0fbff", borderColor: "#1B1924" }}
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-base font-medium truncate text-gray-900">
                      {history.queueName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1 text-sm text-gray-700">
                        {formatDate(history.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-600" />{" "}
                        {history.waitTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <div
                      className={`px-3 py-1 border text-sm font-bold rounded-full ${
                        history.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {history.status}
                    </div>
                    <button
                      onClick={() => handleDeleteHistoryClick(history._id)}
                      className="text-red-600 cursor-pointer hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showLeaveModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-[#C9F7FD] p-6 rounded-lg border shadow-lg w-96">
            <h2 className="text-xl font-bold text-center text-black flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Confirm Leave Queue
            </h2>
            <p className="text-gray-700 text-center my-4">
              Are you sure you want to leave this queue? You will lose your
              spot.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="px-4 py-2 border bg-gray-300 rounded-md hover:bg-gray-400"
                disabled={processingAction}
              >
                Cancel
              </button>
              <button
                onClick={confirmLeaveQueue}
                className="px-4 py-2 border border-black rounded-md text-white bg-red-600 hover:bg-red-700"
                disabled={processingAction}
              >
                {processingAction ? "Processing..." : "Leave Queue"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-[#C9F7FD] p-6 rounded-lg border shadow-lg w-96">
            <h2 className="text-xl font-bold text-center text-black flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Confirm Delete
            </h2>
            <p className="text-gray-700 text-center my-4">
              Are you sure you want to delete this history record?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border bg-gray-300 rounded-md hover:bg-gray-400"
                disabled={processingAction}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteHistory}
                className="px-4 py-2 border border-black rounded-md text-white bg-red-600 hover:bg-red-700"
                disabled={processingAction}
              >
                {processingAction ? "Processing..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteAllModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-[#C9F7FD] p-6 rounded-lg border shadow-lg w-96">
            <h2 className="text-xl font-bold text-center text-black flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Confirm Delete All
            </h2>
            <p className="text-gray-700 text-center my-4">
              Are you sure you want to delete all history records? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowDeleteAllModal(false)}
                className="px-4 py-2 border bg-gray-300 rounded-md hover:bg-gray-400"
                disabled={processingAction}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAllHistory}
                className="px-4 py-2 border border-black rounded-md text-white bg-red-600 hover:bg-red-700"
                disabled={processingAction}
              >
                {processingAction ? "Processing..." : "Delete All"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default JoinedQueues;
