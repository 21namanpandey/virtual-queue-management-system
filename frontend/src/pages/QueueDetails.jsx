import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Users, AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchJoinedQueues,
  leaveQueue,
  fetchQueueHistory,
} from "../services/queueService";

const QueueDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [queueDetails, setQueueDetails] = useState(null);
  const [queueHistory, setQueueHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const getQueueData = async () => {
      try {
        const joinedResponse = await fetchJoinedQueues();
        const historyResponse = await fetchQueueHistory();

        if (joinedResponse.success) {
          const selectedQueue = joinedResponse.data.find((q) => q._id === id);
          if (selectedQueue) {
            setQueueDetails(selectedQueue);
          } else {
            setError("Queue not found in joined queues.");
          }
        } else {
          setError(joinedResponse.message || "Failed to fetch joined queues.");
        }

        if (historyResponse.success) {
          setQueueHistory(historyResponse.data);
        }
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching queue details."
        );
      } finally {
        setLoading(false);
      }
    };

    getQueueData();
  }, [id]);

  const handleLeaveQueue = () => {
    setShowLeaveModal(true);
  };

  const confirmLeaveQueue = async () => {
    setShowLeaveModal(false);
    setLeaving(true);
    try {
      const response = await leaveQueue(id);
      if (response.success) {
        toast.success("You have successfully left the queue.");
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Failed to leave queue.");
      }
    } catch (error) {
      toast.error("An error occurred while leaving the queue.");
    } finally {
      setLeaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#C9F7FD]">
      <div className="w-full max-w-3xl p-6 space-y-8">
        <button
          className="py-2 px-4 rounded-md text-white flex items-center gap-2 bg-[#1B1924] hover:bg-[#131123]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Queues
        </button>

        {loading ? (
          <p className="text-lg text-gray-700 text-center">
            Loading queue details...
          </p>
        ) : error ? (
          <p className="text-lg text-red-500 text-center">{error}</p>
        ) : (
          queueDetails && (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-[#1B1924] whitespace-normal break-words">
                  {queueDetails.name || "Queue"}
                </h1>
                <p className="text-lg text-[#131123]">
                  Queue #{queueDetails._id || "N/A"}
                </p>
              </div>

              <div className="p-6 rounded-lg shadow-lg w-full border bg-white">
                <h2 className="text-2xl font-bold mb-4 text-[#1B1924]">
                  Your Position
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm text-[#131123]">Your Number</p>
                    <p className="text-3xl font-bold text-[#1B1924]">
                      {queueDetails.yourNumber ?? "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-[#131123]">Current Number</p>
                    <p className="text-3xl font-bold text-[#1B1924]">
                      {queueDetails.currentNumber ?? "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-[#131123]">People Ahead</p>
                    <p className="text-3xl font-bold text-[#1B1924]">
                      {queueDetails.peopleAhead ?? 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-lg shadow-lg w-full border bg-white">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-[#1B1924]">
                    <Clock className="h-5 w-5" />
                    Estimated Wait Time
                  </h2>
                  <p className="text-2xl font-semibold text-[#1B1924]">
                    {queueDetails.estimatedWaitTime ?? "Calculating..."}
                  </p>
                </div>

                <div className="p-6 rounded-lg shadow-lg w-full border bg-white">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-[#1B1924]">
                    <Users className="h-5 w-5" />
                    Queue Status
                  </h2>
                  <p className="text-2xl font-semibold capitalize text-[#1B1924]">
                    {queueDetails.status || "N/A"}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg shadow-lg w-full border border-red-500 bg-white">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  Leave Queue
                </h2>
                <p className="text-gray-700 mb-4">
                  Are you sure you want to leave this queue? You'll lose your
                  current position.
                </p>
                <button
                  className="w-full py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700"
                  onClick={handleLeaveQueue}
                  disabled={leaving}
                >
                  {leaving ? "Leaving..." : "Leave Queue"}
                </button>
              </div>
            </>
          )
        )}
      </div>

      {showLeaveModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center">
          <div className="bg-[#C9F7FD] p-6 rounded-lg border shadow-lg w-96">
            <h2 className="text-xl font-bold text-center text-black">
              Confirm Leave Queue
            </h2>
            <p className="text-gray-700 text-center">
              Are you sure you want to leave this queue? You will lose your
              spot.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="px-4 py-2 border bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmLeaveQueue}
                className="px-4 py-2 border border-black rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Leave Queue
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default QueueDetails;
