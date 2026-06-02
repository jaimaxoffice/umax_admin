// src/features/userInfo/UserInfo.jsx

import React from "react";
import Loader from "../../components/Loader";

const UserInfo = () => {
  const isLoading = false;

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">User Information</h1>

      <div className="bg-[#282f35] rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="text-white">John Doe</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-white">john@example.com</p>
          </div>

          <div>
            <p className="text-gray-400">Phone</p>
            <p className="text-white">+91 9876543210</p>
          </div>

          <div>
            <p className="text-gray-400">Status</p>
            <p className="text-green-400">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;