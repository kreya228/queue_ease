import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import TokenCard from "../components/TokenCard";
import QueueStatus from "../components/QueueStatus";
import Pagination from "../components/Pagination";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { PlusCircle, Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tokens, setTokens] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tokensPerPage = 3;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tokensRes, servicesRes] = await Promise.all([
        api.get("/token"),
        api.get("/queue/services"),
      ]);
      setTokens(tokensRes.data);
      setServices(servicesRes.data);
      if (servicesRes.data.length > 0) {
        setSelectedService(servicesRes.data[0]._id);
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const bookToken = async () => {
    if (!selectedService) return;
    try {
      await api.post("/token/book", { serviceId: selectedService });
      toast.success("Token booked successfully!");
      fetchData(); // Refresh tokens
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book token");
    }
  };

  const cancelToken = async (tokenId) => {
    try {
      await api.put(`/token/cancel/${tokenId}`);
      toast.success("Token cancelled");
      setTokens(tokens.map((t) => (t._id === tokenId ? { ...t, status: "cancelled" } : t)));
    } catch (error) {
      toast.error("Failed to cancel token");
    }
  };

  // Pagination Logic
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = tokens.slice(indexOfFirstToken, indexOfLastToken);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold mb-2 dark:text-white text-gray-900">
          Hello, {user?.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Manage your queue tokens from your personal dashboard.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6 border-t-4 border-t-primary-500 shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PlusCircle className="text-primary-500 w-6 h-6" />
              Book New Token
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Select Service</label>
                <select
                  className="input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.7em] bg-no-repeat bg-[right_1rem_center]"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.serviceName}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  {services.find((s) => s._id === selectedService)?.description}
                </p>
              </div>
              <button onClick={bookToken} className="btn btn-primary w-full py-3 shadow-lg hover:shadow-primary-500/30">
                Generate Token
              </button>
            </div>
          </div>
          
          <QueueStatus serviceId={selectedService} />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            My Active Tokens
            <span className="bg-primary-100 text-primary-700 text-sm py-1 px-3 rounded-full font-bold">
              {tokens.length}
            </span>
          </h2>
          
          {tokens.length === 0 ? (
            <div className="card p-12 text-center border-dashed border-2 border-gray-300 dark:border-gray-700">
              <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <PlusCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Tokens Yet</h3>
              <p className="text-gray-500">You haven't booked any tokens. Select a service and click generate to join the queue.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                {currentTokens.map((token) => (
                  <TokenCard key={token._id} token={token} onCancel={cancelToken} />
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Pagination
                  totalElements={tokens.length}
                  elementsPerPage={tokensPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
