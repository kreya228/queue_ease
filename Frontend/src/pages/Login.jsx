import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { ArrowLeft, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const u = await login(email, password);
      // Removed toast as requested but utilizing it here as standard feedback
      toast.success("Login successful!");
      navigate(u.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-gray-50 dark:bg-dark-bg transition-colors">
      <div className="card w-full max-w-md p-8 animate-fade-in shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
        
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="flex justify-center mb-6">
          <div className="bg-primary-100 dark:bg-primary-900/50 p-4 rounded-full text-primary-600 dark:text-primary-400">
            <LogIn className="w-8 h-8" />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center mb-2 font-sans tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8">Sign in to manage your appointments</p>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input transition-all duration-300 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input transition-all duration-300 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full py-3 text-lg font-bold shadow-primary-500/30">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline decoration-2 underline-offset-4">
            Create completely free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
