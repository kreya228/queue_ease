import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import TokenCard from "../components/TokenCard";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tokens, setTokens] = useState([]);
  const [services, setServices] = useState([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const fetchData = async () => {
    try {
      const [tokensRes, servicesRes] = await Promise.all([
        api.get("/admin/tokens"),
        api.get("/queue/services"),
      ]);
      setTokens(tokensRes.data);
      setServices(servicesRes.data);
      if (servicesRes.data.length > 0) {
        setSelectedService(servicesRes.data[0]._id);
      }
    } catch (error) {
      toast.error("Failed to load admin data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/service", {
        serviceName: newServiceName,
        description: newServiceDescription,
      });
      toast.success("Service created successfully!");
      setNewServiceName("");
      setNewServiceDescription("");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create service");
    }
  };

  const handleNextToken = async (serviceId) => {
    try {
      await api.put("/admin/next-token", { serviceId });
      toast.success("Successfully progressed to the next token");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process the queue");
    }
  };

  // Debouncing Search Strategy
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTokens = tokens
    .filter((token) => {
      const matchesSearch =
        token.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.tokenNumber.toString().includes(searchTerm);
      const matchesService = selectedService ? token.serviceId?._id === selectedService : true;
      return matchesSearch && matchesService;
    });


  return (
    <div className="container mx-auto p-4 max-w-7xl relative min-h-[calc(100vh-80px)] mt-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-primary-600 dark:text-primary-400">
        Admin Command Center
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="col-span-1 border-r border-gray-200 dark:border-gray-800 pr-8">
          <div className="card shadow-lg hover:shadow-2xl transition p-6 font-sans">
            <h2 className="text-2xl font-bold mb-4">Add Root Service</h2>
            <form onSubmit={handleCreateService} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Details</label>
                <textarea
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  className="input min-h-[100px]"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full py-3">
                Create
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <input
              type="text"
              placeholder="🔍 Search tokens or names..."
              className="input md:max-w-xs transition-shadow duration-300 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="input md:max-w-xs mt-4 md:mt-0 bg-transparent border-gray-300 dark:border-gray-700 hover:border-primary-500 transition-colors cursor-pointer"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">All Supported Types</option>
              {services.map((service) => (
                <option key={service._id} value={service._id} className="dark:bg-dark-bg">
                  {service.serviceName}
                </option>
              ))}
            </select>
            
            {selectedService && (
             <button
               onClick={() => handleNextToken(selectedService)}
               className="btn btn-primary mt-4 md:mt-0 py-3 shadow-lg hover:shadow-primary-500/30 font-semibold px-4 whitespace-nowrap"
             >
               Call Next Token
             </button>
            )}
            
          </div>

          <div className="grid sm:grid-cols-2 gap-4 auto-rows-max">
            {filteredTokens.map((token) => (
              <TokenCard key={token._id} token={token} onCancel={() => {}} />
            ))}
            {filteredTokens.length === 0 && (
              <p className="text-gray-500 col-span-2 text-center mt-10">No specific items found for this filter criteria.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
