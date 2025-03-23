import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";
import Notifications from "./pages/Notifications";
import QueueDetails from "./pages/QueueDetails";
import JoinedQueues from "./pages/JoinedQueues";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import CreateEditQueue from "./pages/CreateEditQueue";
import ManageQueue from "./pages/ManageQueue";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./services/ProtectedRoute";
import AdminRoute from "./services/AdminRoute";
import Footer from "./pages/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Features from "./pages/Features";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Pricing from "./pages/Pricing";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Navbar />
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/features" element={<Features />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />

            {/* Protected Routes (Only for Logged-in Users) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/queue/:id" element={<QueueDetails />} />
              <Route path="/my-queues" element={<JoinedQueues />} />
              <Route path="/notifications" element={<Notifications />} />
            </Route>

            {/* Admin Routes (Only for Admins) */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/queue/create" element={<CreateEditQueue />} />
              <Route
                path="/admin/queue/notifications"
                element={<Notifications />}
              />
              <Route
                path="/admin/queue/edit/:id"
                element={<CreateEditQueue />}
              />
              <Route path="/admin/queue/manage/:id" element={<ManageQueue />} />
              <Route path="/admin/analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
