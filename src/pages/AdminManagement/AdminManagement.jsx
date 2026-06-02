// src/features/adminManagement/AdminManagement.jsx

import React from "react";
import Loader from "../../components/Loader";

const AdminManagement = () => {
  const isLoading = false;

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Management</h1>

        <button className="px-4 py-2 bg-[#b9fd5c] text-black rounded-lg font-medium">
          Add Admin
        </button>
      </div>

      <div className="bg-[#282f35] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#1f2429]">
            <tr>
              <th className="text-left p-4 text-white">Name</th>
              <th className="text-left p-4 text-white">Email</th>
              <th className="text-left p-4 text-white">Role</th>
              <th className="text-left p-4 text-white">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-[#3a434c]">
              <td className="p-4 text-white">Super Admin</td>
              <td className="p-4 text-gray-300">admin@example.com</td>
              <td className="p-4 text-white">Super Admin</td>
              <td className="p-4 text-green-400">Active</td>
            </tr>

            <tr className="border-t border-[#3a434c]">
              <td className="p-4 text-white">Operations Admin</td>
              <td className="p-4 text-gray-300">ops@example.com</td>
              <td className="p-4 text-white">Manager</td>
              <td className="p-4 text-green-400">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManagement;