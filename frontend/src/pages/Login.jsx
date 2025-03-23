import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { role } = JSON.parse(storedUser);
      window.location.href =
        role === "admin" ? "/admin/dashboard" : "/dashboard";
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ email, password });

      if (response.success) {
        window.location.href =
          response.role === "admin" ? "/admin/dashboard" : "/dashboard";
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col  items-center min-h-screen"
      style={{ backgroundColor: "#C9F7FD" }}
    >
      <div className="flex mt-10 flex-col items-center justify-center w-full max-w-md p-4 space-y-12">
        <div className="text-center space-y-4">
          <Link to="/" className="text-4xl font-bold tracking-tight text-black">
            Q-Manager
          </Link>
          <p className="text-lg text-muted-foreground">
            Streamline your queues, simplify your life
          </p>
        </div>

        <div
          className="p-6 rounded-lg shadow-lg w-full max-w-md border"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h2
            className="text-2xl font-bold mb-4 text-center"
            style={{ color: "#1B1924" }}
          >
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium"
                style={{ color: "#131123" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                style={{ backgroundColor: "#e0fbff" }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium"
                style={{ color: "#131123" }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                style={{ backgroundColor: "#e0fbff" }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              style={{ backgroundColor: "#1B1924" }}
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm" style={{ color: "#131123" }}>
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="py-1 px-2 rounded-md border text-gray-900 hover:bg-gray-100 focus:outline-none"
              style={{ borderColor: "#1B1924", color: "#1B1924" }}
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
