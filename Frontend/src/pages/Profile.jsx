import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { User, Mail, Shield, Calendar } from "lucide-react";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-primary-600 dark:from-white dark:to-primary-400">
        My Profile
      </h1>

      <div className="card shadow-2xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-500 to-green-400"></div>
        
        <div className="px-8 pb-8 flex flex-col items-center -mt-16">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-dark-card bg-white dark:bg-gray-800 flex items-center justify-center mb-6 shadow-lg">
            <span className="text-6xl font-bold text-primary-500">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-1 dark:text-white">{user.name}</h2>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-8 border border-primary-200 dark:border-primary-800/50">
            <Shield className="w-4 h-4" />
            {user.role === 'admin' ? 'Administrator' : 'Standard User'}
          </div>

          <div className="w-full space-y-4">
            <div className="glass p-4 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Full Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
              </div>
            </div>

            <div className="glass p-4 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="p-3 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email Address</p>
                <p className="font-semibold text-gray-900 dark:text-white">{user.email}</p>
              </div>
            </div>

            <div className="glass p-4 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Account Created</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
