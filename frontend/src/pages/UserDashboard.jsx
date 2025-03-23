import React, { useState, useEffect } from "react";
import { Clock, Users, Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchQueues,
  fetchJoinedQueues,
  joinQueue,
} from "../services/queueService";

const UserDashboard = () => {
  const [queues, setQueues] = useState([]);
  const [joinedQueues, setJoinedQueues] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningQueueId, setJoiningQueueId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  const getQueues = async () => {
    try {
      const [queueResponse, joinedResponse] = await Promise.all([
        fetchQueues(),
        fetchJoinedQueues(),
      ]);

      if (queueResponse.success) {
        setQueues(queueResponse.data);
      } else {
        setError(queueResponse.message || "Failed to fetch queues");
      }

      if (joinedResponse.success) {
        setJoinedQueues(new Set(joinedResponse.data.map((q) => q._id)));
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQueues(); 

    const interval = setInterval(() => {
      getQueues(); 
    }, 5000);

    return () => clearInterval(interval); 
  }, []);

  const handleJoinQueue = async (queueId) => {
    setJoiningQueueId(queueId);
    try {
      const response = await joinQueue(queueId);
      if (response.success) {
        toast.success("Successfully joined the queue!");
        setJoinedQueues((prev) => new Set([...prev, queueId]));
        setQueues((prevQueues) =>
          prevQueues.map((q) =>
            q._id === queueId ? { ...q, currentSize: q.currentSize + 1 } : q
          )
        );
      } else {
        toast.error(response.message || "Failed to join the queue.");
      }
    } catch (error) {
      toast.error("An error occurred while joining the queue.");
    } finally {
      setJoiningQueueId(null);
    }
  };

  const filteredQueues = queues.filter(
    (queue) =>
      queue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      queue.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6 bg-[#C9F7FD]">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-6xl p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              User Dashboard
            </h1>
            <p className="text-lg text-gray-700">
              Manage your queues effortlessly
            </p>
          </div>

          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search queues..."
              className="w-full p-3 pl-10 rounded-md border border-gray-400 focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-lg text-gray-700">Loading queues...</p>
      ) : error ? (
        <p className="text-lg text-red-500">{error}</p>
      ) : filteredQueues.length === 0 ? (
        <p className="text-lg text-gray-700">No queues found</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {filteredQueues.map((queue) => (
            <div
              key={queue._id}
              className="p-6 rounded-xl shadow-md border border-gray-300 transition-transform hover:scale-105 bg-white hover:shadow-lg"
              style={{
                borderColor: queue.status === "active" ? "green" : "red",
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      queue.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {queue.status.charAt(0).toUpperCase() +
                      queue.status.slice(1)}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 truncate max-w-[80%]">
                    {queue.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-700 bg-[#daf4f7] p-2 rounded-md line-clamp-3">
                  {queue.description}
                </p>

                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-900">
                      {queue.currentSize} / {queue.maxSize} people in queue
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-900">
                      Wait time: ~{queue.estimatedTimePerPerson} mins
                    </span>
                  </div>
                </div>

                <button
                  className={`w-full py-2 rounded-lg text-white font-semibold transition-all ${
                    joinedQueues.has(queue._id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-700"
                  }`}
                  onClick={() => handleJoinQueue(queue._id)}
                  disabled={
                    joiningQueueId === queue._id || joinedQueues.has(queue._id)
                  }
                >
                  {joiningQueueId === queue._id
                    ? "Joining..."
                    : joinedQueues.has(queue._id)
                    ? "Already Joined"
                    : "Join Queue"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
