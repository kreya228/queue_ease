import { Clock, CheckCircle2, XCircle } from "lucide-react";

const TokenCard = ({ token, onCancel }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400";
      case "serving":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "waiting":
        return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case "serving":
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 dark:border-blue-400"></div>;
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="card p-6 border-l-4 border-l-primary-500 hover:scale-[1.02] transition-transform animate-fade-in relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-8xl font-black text-primary-500">#{token.tokenNumber}</span>
      </div>
      
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            {token.serviceId?.serviceName || "Service"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Booked at: {new Date(token.createdAt).toLocaleString()}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide flex items-center gap-2 ${getStatusColor(token.status)}`}>
          {getStatusIcon(token.status)}
          <span>{token.status}</span>
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between z-10 relative">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Token Number</p>
          <p className="text-4xl font-black text-primary-600 dark:text-primary-400 mt-1">
            {token.tokenNumber}
          </p>
        </div>
        
        {token.status === "waiting" && (
          <button
            onClick={() => onCancel(token._id)}
            className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors decoration-red-500/30 hover:underline underline-offset-4"
          >
            Cancel Token
          </button>
        )}
      </div>
    </div>
  );
};

export default TokenCard;
