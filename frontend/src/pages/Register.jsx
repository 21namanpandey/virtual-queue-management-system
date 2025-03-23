import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name || !email || !password || !phone) {
      setError("Please fill out all fields.");
      return;
    }

    if (role === "admin" && !secretCode) {
      setError("Secret code is required for admin registration.");
      return;
    }

    try {
      const response = await register({
        name,
        email,
        password,
        phone,
        role,
        secretCode,
      });
      if (response.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#C9F7FD]">
      <div className="w-full max-w-md p-4 space-y-12 slide-in">
        <div className="text-center space-y-4">
          <Link to="/" className="text-4xl font-bold tracking-tight text-black">
            Q-Manager
          </Link>{" "}
          <p className="text-lg text-muted-foreground">
            Streamline your queues, simplify your life
          </p>
        </div>

        <div className="bg-[#ffffff] p-6 rounded-lg border shadow-lg w-full">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#1B1924" }}
          >
            Register
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">
              Registration successful! Redirecting to login...
            </p>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium"
                style={{ color: "#131123" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                style={{ backgroundColor: "#e0fbff" }}
              />
            </div>

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

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium"
                style={{ color: "#131123" }}
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter your phone number"
                className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                style={{ backgroundColor: "#e0fbff" }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium"
                style={{ color: "#131123" }}
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                style={{ backgroundColor: "#e0fbff" }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {role === "admin" && (
              <div className="mb-4">
                <label
                  htmlFor="secretCode"
                  className="block text-sm font-medium"
                  style={{ color: "#131123" }}
                >
                  Secret Code
                </label>
                <input
                  type="password"
                  id="secretCode"
                  placeholder="123123"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                  style={{ backgroundColor: "#e0fbff" }}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md border text-white border-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              style={{ backgroundColor: "#1B1924" }}
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-sm" style={{ color: "#131123" }}>
            Already have an account?{" "}
            <a
              href="/login"
              className="py-1 px-2 rounded-md border text-gray-900 hover:bg-gray-100 focus:outline-none"
              style={{ borderColor: "#1B1924", color: "#1B1924" }}
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
