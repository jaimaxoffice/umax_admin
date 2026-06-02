import Loader from "../../components/Loader";
import StatCard from "../../components/StatCards/StatsCard";
import {
  Users,
  UserCheck,
  ShieldX,
  UserPlus,
} from "lucide-react";

const UserSummary = () => {
  const isLoading = false;

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        User Summary
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={12450}
          icon={Users}
          variant="blue"
          trend="up"
          trendValue="8.2%"
        />

        <StatCard
          title="Active Users"
          value={8720}
          icon={UserCheck}
          variant="green"
          trend="up"
          trendValue="5.4%"
        />

        <StatCard
          title="Blocked Users"
          value={245}
          icon={ShieldX}
          variant="red"
        />

        <StatCard
          title="New Users"
          value={120}
          icon={UserPlus}
          variant="lime"
          trend="up"
          trendValue="12.8%"
        />
      </div>
    </div>
  );
};

export default UserSummary;