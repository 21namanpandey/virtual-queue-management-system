import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { getUserRole, logout } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await getUserRole();
        setUserRole(role);
      } catch (error) {
        // console.error("Error setting user role:", error);
      }
    };

    fetchUserRole();

    window.addEventListener("storage", fetchUserRole);

    return () => {
      window.removeEventListener("storage", fetchUserRole);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserRole(null);
    navigate("/login");
  };

  return (
    <nav
      className="border-b"
      style={{ backgroundColor: "#C9F7FD", borderColor: "#1B1924" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold"
              style={{ color: "#1B1924" }}
            >
              Q-Manager
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {userRole === "admin" ? (
              <>
                <Link
                  to="/admin/profile"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Profile
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/analytics"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Analytics
                </Link>
                <Link
                  to="/admin/queue/create"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Create Queue
                </Link>
                <Link
                  to="/admin/queue/notifications"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Notifications
                </Link>
                <Link
                  to="/chat"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Chat
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 rounded-md text-white"
                  style={{ backgroundColor: "#1B1924" }}
                >
                  Logout
                </button>
              </>
            ) : userRole === "user" ? (
              <>
                <Link
                  to="/profile"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-queues"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Joined Queues
                </Link>
                <Link
                  to="/notifications"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Notifications
                </Link>
                <Link
                  to="/chat"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Chat
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 rounded-md text-white"
                  style={{ backgroundColor: "#1B1924" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/chat"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Chat
                </Link>
                <Link
                  to="/help"
                  className="font-medium hover:underline"
                  style={{ color: "#1B1924" }}
                >
                  Help
                </Link>
                <Link to="/login">
                  <button
                    className="border px-4 py-2 rounded-md"
                    style={{
                      color: "#1B1924",
                      borderColor: "#1B1924",
                      backgroundColor: "#e0fbff",
                    }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: "#1B1924" }}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded-md"
              style={{ color: "#1B1924" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {userRole === "admin" ? (
              <>
                <Link
                  to="/admin/profile"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Profile
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/analytics"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Analytics
                </Link>
                <Link
                  to="/admin/queue/create"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Create Queue
                </Link>
                <Link
                  to="/admin/queue/notifications"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Notifications
                </Link>
                <Link
                  to="/chat"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Chat
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Logout
                </button>
              </>
            ) : userRole === "user" ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-queues"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Joined Queues
                </Link>
                <Link
                  to="/notifications"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Notifications
                </Link>
                <Link
                  to="/chat"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Chat
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/chat"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Chat
                </Link>
                <Link
                  to="/help"
                  className="block px-3 py-2 font-medium"
                  style={{ color: "#1B1924", backgroundColor: "#e0fbff" }}
                >
                  Help
                </Link>
                <Link to="/login">
                  <button
                    className="block w-full border px-4 py-2 rounded-md"
                    style={{
                      color: "#1B1924",
                      borderColor: "#1B1924",
                      backgroundColor: "#e0fbff",
                    }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    className="block w-full px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: "#1B1924" }}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
