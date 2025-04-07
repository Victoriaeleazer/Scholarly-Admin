import React from "react";
import { Admin } from "../../../interfaces/Admin";

type AdminDetailModalProps = {
  admin: Admin;
  onClose: () => void;
};

const AdminDetailModal: React.FC<AdminDetailModalProps> = ({ admin, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-tertiary p-6 rounded-lg w-1/2 text-white">
        <h2 className="text-2xl font-semibold mb-4">Admin Details</h2>
        <div>
          <div className="flex items-center space-x-4">
            <img
              src={admin.profilePicUrl || "/images/no_profile.webp"}
              alt={admin.firstName}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-2xl">{admin.firstName} {admin.lastName}</h2>
              <p className="text-lg">{admin.role}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl">Email</h3>
            <p>{admin.email}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl">Phone Number</h3>
            <p>{admin.phoneNumber}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl">Additional Info</h3>
            <p>{admin.additionalInfo || "No additional info."}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminDetailModal;
