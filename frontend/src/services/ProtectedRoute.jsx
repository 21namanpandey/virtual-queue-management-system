import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "./auth";

const ProtectedRoute = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRole = await getUserRole();
        setRole(userRole);
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return role ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
