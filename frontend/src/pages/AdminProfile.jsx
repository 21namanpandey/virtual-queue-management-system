import React, { useState, useEffect } from "react";
import { Shield, Key, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/auth";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateProfile({ name: admin.name, phone: admin.phone });
      alert("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#C9F7FD] p-6">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1B1924]">Admin Profile</h1>
          <p className="text-lg text-[#131123]">
            Manage your admin account settings
          </p>
        </div>

        <div className="p-6 space-y-6 rounded-md shadow-md bg-white border border-[#1B1924]">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <h2 className="text-lg font-bold text-[#131123]">
              Admin Information
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Admin Name</label>
              <input
                type="text"
                value={admin.name}
                disabled={!editing}
                onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
                className="w-full p-2 border border-[#1B1924] rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                value={admin.phone}
                disabled={!editing}
                onChange={(e) => setAdmin({ ...admin, phone: e.target.value })}
                className="w-full p-2 border border-[#1B1924] rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={admin.email}
                disabled
                className="w-full p-2 border border-[#1B1924] rounded-md bg-gray-200"
              />
            </div>
          </div>
          {editing ? (
            <button
              className="w-full py-2 rounded-md text-white bg-[#1B1924] font-bold cursor-pointer"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="w-full py-2 rounded-md text-white bg-[#1B1924] font-bold cursor-pointer"
              onClick={() => setEditing(true)}
            >
              Update Profile
            </button>
          )}
        </div>

        <div className="p-6 space-y-6 rounded-md shadow-md bg-white border border-[#1B1924]">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <h2 className="text-lg font-bold text-[#131123]">
              Security Settings
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">Change Password</p>
              <button className="px-4 py-2 rounded-md bg-[#e0fbff] border border-[#1B1924] cursor-pointer">
                Update
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Two-Factor Authentication</p>
              <button className="px-4 py-2 rounded-md bg-[#e0fbff] border border-[#1B1924] cursor-pointer">
                Enable
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 rounded-md shadow-md bg-white border border-[#1B1924]">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-bold text-[#131123]">
              Admin Notifications
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">Queue Alerts</p>
              <button
                className="px-4 py-2 rounded-md bg-[#e0fbff] border border-[#1B1924] cursor-pointer"
                onClick={() => navigate(`/notifications`)}
              >
                Configure
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">System Notifications</p>
              <button
                className="px-4 py-2 rounded-md bg-[#e0fbff] border border-[#1B1924] cursor-pointer"
                onClick={() => navigate(`/notifications`)}
              >
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
