import React, { useState, useEffect } from "react";
import { Plus, Users, Settings, BarChart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchQueues, fetchAnalytics } from "../services/queueService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [queues, setQueues] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const queueResponse = await fetchQueues();
      const analyticsResponse = await fetchAnalytics();

      if (queueResponse.success) setQueues(queueResponse.data);
      if (analyticsResponse.success) setAnalytics(analyticsResponse.data);

      setLoading(false);
    };

    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredQueues = queues.filter(
    (queue) =>
      queue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      queue.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#C9F7FD] px-4 py-6">
      <div className="max-w-6xl w-full space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-700">Manage queues efficiently</p>
          </div>
          <button
            onClick={() => navigate("/admin/queue/create")}
            className="flex items-center gap-2 py-2 px-4 rounded-md bg-black text-white hover:bg-gray-800 transition-all"
          >
            <Plus className="h-5 w-5" />
            Create New Queue
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="p-4 rounded-lg shadow-md border border-gray-300 bg-white">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Total Users Served
              </h2>
            </div>
            <p className="text-3xl font-bold mt-2 text-black">
              {analytics ? analytics.totalUsersServed : "Loading..."}
            </p>
          </div>

          <div className="p-4 rounded-lg shadow-md border border-gray-300 bg-white">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Active Queues
              </h2>
            </div>
            <p className="text-3xl font-bold mt-2 text-black">
              {analytics ? analytics.totalActiveQueues : "Loading..."}
            </p>
          </div>

          <div className="p-4 rounded-lg shadow-md border border-gray-300 bg-white">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Average Wait Time
              </h2>
            </div>
            <p className="text-3xl font-bold mt-2 text-black">
              {analytics ? `${analytics.averageWaitTime} min` : "Loading..."}
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-lg font-bold text-gray-900">Active Queues</h2>

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

          {loading ? (
            <p className="text-lg text-gray-700">Loading queues...</p>
          ) : filteredQueues.length === 0 ? (
            <p className="text-lg text-gray-700">No queues found</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredQueues.map((queue) => (
                <div
                  key={queue._id}
                  className="p-6 rounded-xl shadow-md border transition-transform hover:scale-105 bg-white hover:shadow-lg"
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
                      <p className="text-gray-900">
                        <span className="font-semibold">Users in Queue:</span>{" "}
                        {queue.currentSize}
                      </p>
                      <p className="text-gray-900">
                        <span className="font-semibold">Max Size:</span>{" "}
                        {queue.maxSize}
                      </p>
                      <p className="text-gray-900">
                        <span className="font-semibold">
                          Estimated Wait Time:
                        </span>
                        {queue.currentSize > 0
                          ? ` ${
                              queue.estimatedTimePerPerson * queue.currentSize
                            } min`
                          : " 0 min"}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/admin/queue/manage/${queue._id}`)
                      }
                      className="w-full py-2 rounded-lg bg-black text-white font-semibold transition-all hover:bg-gray-700"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
