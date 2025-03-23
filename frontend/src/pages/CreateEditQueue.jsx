import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createQueue,
  getQueue,
  updateQueue,
  deleteQueue,
} from "../services/queueService";

const CreateEditQueue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [queueData, setQueueData] = useState({
    name: "",
    description: "",
    maxSize: "",
    estimatedTimePerPerson: "",
  });

  const [loading, setLoading] = useState(isEditing);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchQueue = async () => {
        try {
          setLoading(true);
          const response = await getQueue(id);

          if (response.success && response.data?.queue) {
            setQueueData({
              name: response.data.queue.name || "",
              description: response.data.queue.description || "",
              maxSize: response.data.queue.maxSize
                ? String(response.data.queue.maxSize)
                : "",
              estimatedTimePerPerson: response.data.queue.estimatedTimePerPerson
                ? String(response.data.queue.estimatedTimePerPerson)
                : "",
            });
          } else {
            toast.error(response.message || "Failed to load queue data.");
            navigate("/admin/dashboard");
          }
        } catch (error) {
          toast.error("Error fetching queue data.");
        } finally {
          setLoading(false);
        }
      };

      fetchQueue();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueueData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => setShowSaveModal(true);
  const handleDelete = () => setShowDeleteModal(true);

  const confirmSave = async () => {
    setShowSaveModal(false);
    try {
      let response;
      if (isEditing) {
        response = await updateQueue(id, queueData);
      } else {
        response = await createQueue(queueData);
      }

      if (response.success) {
        toast.success(
          isEditing
            ? "Queue updated successfully!"
            : "Queue created successfully!"
        );
        navigate(-1);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error saving queue.");
    }
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    try {
      const response = await deleteQueue(id);
      if (response.success) {
        toast.success("Queue deleted successfully!");
        navigate("/admin/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error deleting queue.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-[#C9F7FD]">
      <div className="max-w-3xl w-full space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 py-2 px-4 border rounded-md bg-black text-white hover:bg-gray-700"
        >
          <span>←</span> Back to Dashboard
        </button>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Queue" : "Create New Queue"}
          </h1>
          <p className="text-gray-600">
            {isEditing
              ? "Modify the details of the existing queue."
              : "Fill in the details to create a new queue."}
          </p>
        </div>

        {loading ? (
          <p className="text-lg text-gray-700 text-center">
            Loading queue details...
          </p>
        ) : (
          <div className="rounded-lg shadow-md p-6 space-y-6 bg-white">
            <h2 className="text-xl font-bold">Queue Details</h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Queue Name
              </label>
              <input
                type="text"
                name="name"
                value={queueData.name}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 bg-[#e0fbff]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={queueData.description}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 bg-[#e0fbff]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Maximum Size
                </label>
                <input
                  type="number"
                  name="maxSize"
                  value={queueData.maxSize}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 bg-[#e0fbff]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Est. Time per Person (minutes)
                </label>
                <input
                  type="number"
                  name="estimatedTimePerPerson"
                  value={queueData.estimatedTimePerPerson}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 bg-[#e0fbff]"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="w-full py-2 px-4 text-white rounded-md bg-black"
              >
                {isEditing ? "Save Changes" : "Create Queue"}
              </button>

              {isEditing && (
                <button
                  onClick={handleDelete}
                  className="w-full py-2 px-4 rounded-md text-white bg-red-600"
                >
                  Delete Queue
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {(showSaveModal || showDeleteModal) && (
        <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-lg transition-opacity">
          <div className="bg-[#C9F7FD] p-6 rounded-lg border shadow-lg animate-fadeIn w-96">
            <h2 className="text-xl font-bold text-center text-black">
              {showSaveModal ? "Confirm Save" : "Confirm Delete"}
            </h2>
            <p className="text-gray-700">
              {showSaveModal
                ? "Do you want to save the changes?"
                : "Are you sure you want to delete this queue?"}
            </p>
            <div className="flex justify-center gap-4 mt-4 ">
              <button
                onClick={() =>
                  showSaveModal
                    ? setShowSaveModal(false)
                    : setShowDeleteModal(false)
                }
                className="px-4 py-2 border bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={showSaveModal ? confirmSave : confirmDelete}
                className={`px-4 py-2 border border-black rounded-md text-white ${
                  showSaveModal
                    ? "bg-black hover:bg-gray-800"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {showSaveModal ? "Save" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEditQueue;
