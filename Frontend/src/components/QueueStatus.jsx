import { useEffect, useState } from "react";
import api from "../services/api";

const QueueStatus = ({ serviceId }) => {
  const [statusData, setStatusData] = useState({
    waitingCount: 0,
    currentToken: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;
    const fetchStatus = async () => {
      try {
        if (!serviceId) return;
        const { data } = await api.get(`/queue/status?serviceId=${serviceId}`);
        setStatusData(data);
      } catch (error) {
        console.error("Failed to fetch queue status", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    interval = setInterval(fetchStatus, 5000); 

    return () => clearInterval(interval);
  }, [serviceId]);

  if (loading || !serviceId) return null;

  return (
    <div className="card bg-gradient-to-br from-primary-900 to-primary-700 text-white border-0 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <svg
          className="w-32 h-32"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      </div>

      <div className="p-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-primary-100 uppercase tracking-wider text-sm font-semibold mb-2">Live Status</p>
          <h2 className="text-3xl font-bold font-sans">Queue Updates</h2>
          <p className="text-primary-200 mt-2 flex items-center gap-2 justify-center md:justify-start">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Real-time tracking active
          </p>
        </div>

        <div className="flex gap-4 sm:gap-8 bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
          <div className="text-center px-4 border-r border-white/20">
            <p className="text-sm text-primary-200 mb-1">Serving Now</p>
            <p className="text-5xl font-black">{statusData.currentToken || "--"}</p>
          </div>
          <div className="text-center px-4">
            <p className="text-sm text-primary-200 mb-1">Waiting List</p>
            <p className="text-5xl font-black text-yellow-300">{statusData.waitingCount}</p>
            <p className="text-xs text-primary-200 mt-1">Est. wait: {statusData.waitingCount * 5} mins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueStatus;
