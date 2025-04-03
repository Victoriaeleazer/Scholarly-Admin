import React, { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import loadingAnimation from "../../../assets/lottie/loading (2).json";
import UnableToLoad from "../../../assets/lottie/error.json";
import AdminDetailModal from "./AdminDetailModal";
import { Admin } from "../../../interfaces/Admin";
import { User } from "iconsax-react"; // Example icon

const StaffPage: React.FC = () => {
  const [staffList, setStaffList] = useState<Admin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "https://scholarly-admin-backend.onrender.com/scholarly/api/v1/admin/getAllAdmins"
        );
        setAdmins(response.data.data);
      } catch (error: any) {
        setError("Error fetching staff data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter((admin) => {
    const roleNormalized = admin.role.trim().toLowerCase(); 
    const filterRoleNormalized = filterRole.trim().toLowerCase(); 
  
    return (
      (admin.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.lastName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterRoleNormalized === '' || roleNormalized === filterRoleNormalized)
    );
  });
  
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
          style={{ width: 200 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex justify-center items-center w-full min-h-screen"
        title="Error"
      >
        <Lottie
          animationData={UnableToLoad}
          loop
          autoplay
          style={{ width: 200 }}
        />
      </div>
    );
  }

  return (
    <div className="text-white w-full min-h-full h-fit overflow-y-scroll scrollbar-thin scholarly-scrollbar purple-scrollbar px-6 py-8 flex flex-col gap-8">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl font-bold text-white">Admins</h1>
        <div className="flex gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name..."
            className="bg-tertiary text-white px-4 py-2 rounded-lg focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Filter Dropdown */}
          <select
            className="bg-tertiary text-white px-4 py-2 rounded-lg focus:outline-none"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="Faculty">Faculty</option>
            <option value="Counselor">Counselor</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-tertiary shadow-md rounded-2xl">
        <table className="w-full h-fit rounded-lg border-separate border-spacing-0 overflow-hidden">
          <thead className="pl-5 py-3 h-[60px] border-b">
            <tr className="text-white text-left text-[14px] font-bold">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 text-center py-2">Role</th>
              <th className="px-4 text-center py-2">Email</th>
              <th className="px-4 text-center py-2">Phone Number</th>
            </tr>
          </thead>
          <tbody className="text-[15px]">
            {filteredAdmins.map((admin) => (
              <tr
                key={admin.id}
                className="border-0 odd:bg-background hover:bg-purple hover:bg-opacity-30 transition-colors ease duration-400 text-white cursor-pointer"
                onClick={() => setSelectedAdmin(admin)}
              >
                <td className="px-4 py-4 flex items-center">
                  <User size="32" color="white" />
                  <img
                    src={admin.profilePicUrl || "/images/no_profile.webp"}
                    alt={admin.firstName || "No profile picture"}
                    className="w-8 h-8 rounded-full border-2 border-purple-500 mr-2"
                  />
                  <p>{`${admin.firstName} ${admin.lastName}`}</p>
                </td>
                <td className="px-4 text-center py-2">{admin.role}</td>
                <td className="px-4 text-center py-2">{admin.email}</td>
                <td className="px-4 text-center py-2">{admin.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAdmin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        >
          <AdminDetailModal
            admin={selectedAdmin}
            onClose={() => setSelectedAdmin(null)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default StaffPage;
