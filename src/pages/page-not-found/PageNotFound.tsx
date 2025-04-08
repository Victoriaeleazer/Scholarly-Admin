import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Bell,
  Lock,
  User,
  Shield,
  ChevronLeft,
} from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import { getAdminUserData } from "../../services/user-storage";
import { Admin } from "../../interfaces/Admin";
import LogoutButton from "../../components/LogoutButton";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<Admin | null>(null); // Fix: Use Admin type for user
  const [showProfile, setShowProfile] = useState(false);
  const [adminData, setAdminData] = useState<Admin | null>(null);
  const handleLogout = () => {
    localStorage.removeItem("adminUserData"); // Clear stored admin data
    setAdminData(null); // Reset admin state
    window.location.href = "/login"; // Redirect to login page
  };
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const data = getAdminUserData();
    console.log("Admin Data:", data); // ✅ Debugging
    if (data) {
      setAdminData(data);
      setUser(data); // Make sure `setUser` gets full admin data
    }
  }, []);

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-background text-white">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-tertiary rounded-2xl shadow-md p-4">
        {/* Profile Settings */}
        <div
          className="flex items-center justify-between py-4 border-b border-gray-700 cursor-pointer"
          onClick={() => setShowProfile(true)}
        >
          <div className="flex items-center gap-3">
            <User className="text-purple-400" size={22} />
            <p className="text-lg">Account</p>
          </div>
          <ChevronRight className="text-gray-500" size={22} />
        </div>

        {/* Notification Settings */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Bell className="text-yellow-500 dark:text-yellow-300" size={22} />
            <p className="text-lg text-gray-900 dark:text-gray-200">
              Notifications
            </p>
          </div>

          <Switch.Root
            checked={notifications}
            onCheckedChange={setNotifications}
            className="relative w-12 h-6 rounded-full transition-all
               bg-gray-300 dark:bg-gray-600 data-[state=checked]:bg-yellow-500"
          >
            <Switch.Thumb
              className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform 
                 translate-x-1 data-[state=checked]:translate-x-6"
            />
          </Switch.Root>
        </div>

        {/* Security Settings */}
        <div className="flex items-center justify-between py-4 border-b border-gray-700 cursor-pointer">
          <div className="flex items-center gap-3">
            <Lock className="text-red-400" size={22} />
            <p className="text-lg">Security</p>
          </div>
          <ChevronRight className="text-gray-500" size={22} />
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-500 dark:text-blue-300" size={22} />
            <p className="text-lg text-gray-900 dark:text-gray-200">
              Dark Mode
            </p>
          </div>

          <Switch.Root
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className="relative w-12 h-6 rounded-full transition-all
               bg-gray-300 dark:bg-gray-600 data-[state=checked]:bg-blue-500"
          >
            <Switch.Thumb
              className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform 
                 translate-x-1 data-[state=checked]:translate-x-6"
            />
          </Switch.Root>
        </div>
      </div>

      {/* Profile Page */}
      <div
        className={`absolute inset-0 bg-white dark:bg-gray-900 transition-transform transform ${
          showProfile ? "translate-x-0" : "translate-x-full"
        } duration-300`}
      >
        {/* Back Button */}
        <button
          onClick={() => setShowProfile(false)}
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-300"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Profile Content */}
        <div className="flex flex-col items-center justify-center h-full px-6">
          {/* Profile Picture */}
          <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold">
            {user ? user.fullName.charAt(0).toUpperCase() : "U"}
          </div>

          {/* User Details */}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            {user ? user.fullName : "Loading..."}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {user ? user.email : "Loading..."}
          </p>

          {/* Logout Button */}
    {/* Logout Button */}

      <LogoutButton />


        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
