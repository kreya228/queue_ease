import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { LogOut, User, Moon, Sun, LayoutDashboard, QrCode } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="glass sticky top-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <QrCode className="w-8 h-8 text-primary-600 dark:text-primary-500" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-green-400">
          QueueEase
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to={user.role === "admin" ? "/admin" : "/dashboard"}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-secondary flex items-center gap-2 !py-1.5 !px-3"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn btn-secondary !py-1.5 text-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary !py-1.5 text-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
