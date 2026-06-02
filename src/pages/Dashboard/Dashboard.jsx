// src/features/dashboard/Dashboard.jsx

import React from "react";
// import { useGetDetailsQuery } from "../../features/dashboard/dashboardApiSlice";

import Loader from "../../components/Loader";
import StatCard from "../../components/StatCards/GradientCard";

import {
  Users,
  IndianRupee,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  // const { isLoading } = useGetDetailsQuery();

  const isLoading = false;

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Total Users"
          value="12,450"
          variant="lime"
          trend="up"
          trendValue="12%"
        />

        <StatCard
          icon={IndianRupee}
          title="Revenue"
          value="₹8,50,000"
          variant="green"
          trend="up"
          trendValue="18%"
        />

        <StatCard
          icon={ShoppingCart}
          title="Orders"
          value="3,420"
          variant="blue"
          trend="up"
          trendValue="7%"
        />

        <StatCard
          icon={TrendingUp}
          title="Growth"
          value="18.5%"
          variant="purple"
          trend="up"
          trendValue="4.2%"
        />
      </div>
    </div>
  );
};

export default Dashboard;