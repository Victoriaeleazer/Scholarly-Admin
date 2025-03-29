import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/login");
  };

  return (
    <div>
      <button
        onClick={() => setShowLogoutModal(true)}
        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md transition hover:bg-red-600"
      >
        Logout
      </button>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all scale-95 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Are you sure you want to log out?
            </h2>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500 text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
