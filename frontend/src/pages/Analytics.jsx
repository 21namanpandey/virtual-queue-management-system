import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalytics } from "../services/queueService";

const Analytics = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAnalytics = async () => {
      setLoading(true);
      const response = await fetchAnalytics();
      if (response.success) {
        setAnalytics(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    getAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#C9F7FD",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 py-2 w-fit px-4 border rounded-md bg-black text-white hover:bg-gray-700"
        >
          <span>←</span> Back to Dashboard
        </button>

        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Analytics</h1>
        <p style={{ color: "#6b7280" }}>Monitor queue performance and trends</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #000000",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
              Total Users Served
            </h3>
            <p
              style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0" }}
            >
              {analytics.totalUsersServed}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #000000",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
              Total Active Queues
            </h3>
            <p
              style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0" }}
            >
              {analytics.totalActiveQueues}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #000000",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
              Average Wait Time
            </h3>
            <p
              style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0" }}
            >
              {analytics.averageWaitTime} min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
