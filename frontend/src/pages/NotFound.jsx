import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: "#C9F7FD" }}
    >
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold" style={{ color: "#1B1924" }}>
            404
          </h1>
          <h2 className="text-2xl font-semibold" style={{ color: "#1B1924" }}>
            Page Not Found
          </h2>
          <p className="text-sm" style={{ color: "#131123" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ backgroundColor: "#1B1924" }}
        >
          <Home className="h-5 w-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
