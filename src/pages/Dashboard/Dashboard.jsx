// import { Users, Wallet, ShoppingCart, DollarSign } from "lucide-react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// import Loader from "../../components/Loader";
// import StatCard from "../../components/StatCards/GradientCard";
// import SummaryPanel from "./SummaryPanel";
// import { useGetDetailsQuery } from "../../features/dashboard/dashboardApiSlice";
// import Cookies from "js-cookie";
// import NoDataMascot from "../../components/Tables/NoDataFound";

// const getGreeting = () => {
//   const h = new Date().getHours();
//   return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
// };

// const Dashboard = () => {
//   const { data, isLoading, isError } = useGetDetailsQuery();

//   if (isLoading) return <Loader />;

//   const dashboard = data?.data;

//   if (!dashboard) return null;

//   const getUserData = () => {
//     try {
//       const userData = Cookies.get("adminUserData");
//       return userData ? JSON.parse(userData) : null;
//     } catch (error) {
//       console.error("Failed to parse user data:", error);
//       return null;
//     }
//   };

//   const userDataObj = getUserData();

//   const { users, investments, orders, disbursements } = dashboard;

//   const investmentStatusData = [
//     {
//       name: "Pending",
//       value: investments?.pending || 0,
//     },
//     {
//       name: "Completed",
//       value: investments?.completed || 0,
//     },
//     {
//       name: "Expired",
//       value: investments?.expired || 0,
//     },
//     {
//       name: "Failed",
//       value: investments?.failed || 0,
//     },
//   ];

//   const networkData = [
//     {
//       name: "BSC",
//       value: orders?.bsc || 0,
//     },
//     {
//       name: "TRON",
//       value: orders?.tron || 0,
//     },
//   ];

//   const remainingLiability =
//     (investments?.totalInvestedUSDT || 0) -
//     (disbursements?.totalDisbursedUSDT || 0);

//   const chartColors = [
//     "#f59e0b", // pending
//     "#22c55e", // completed
//     "#f97316", // expired
//     "#64748b", // failed
//   ];

//   const networkColors = ["#fff", "#3b82f6"];

//   if (isError) {
//     return (
//       <div className="min-h-screenflex items-center justify-center p-4">
//         <Card className="max-w-sm w-full p-8 text-center">
//           <div className="w-12 h-12 rounded-[8px] bg-red-500/10 flex items-center justify-center mx-auto mb-4">
//             <Activity size={22} className="text-red-400" />
//           </div>
//           <p className="text-white text-sm mb-6">
//             {error?.data?.message || "Failed to load dashboard"}
//           </p>
//           <button
//             onClick={refetch}
//             className="w-full bg-main hover:bg-accent text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
//           >
//             <RefreshCw size={13} /> Retry
//           </button>
//         </Card>
//       </div>
//       // <NoDataMascot />
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div>
//         <p className="text-xs font-medium tracking-wider text-gray-400 mb-1">
//           {new Date().toLocaleDateString("en-US", {
//             weekday: "long",
//             month: "long",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </p>

//         <h1 className="text-2xl sm:text-3xl serialHeading font-semibold text-white leading-tight">
//           {getGreeting()}, &nbsp;
//           <span className="text-main">
//             {userDataObj ? userDataObj.data.name || "Admin" : "Admin"}
//           </span>
//         </h1>

//         <p className="text-sm text-gray-400 mt-1">
//           Welcome back to your dashboard
//         </p>
//       </div>

//       {/* KPI Cards */}

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
//         <StatCard
//           icon={Users}
//           title="Total Users"
//           value={users?.total ?? 0}
//           variant="yellow"
//         />

//         <StatCard
//           icon={Wallet}
//           title="Investments"
//           value={investments?.total ?? 0}
//           variant="green"
//         />

//         <StatCard
//           icon={ShoppingCart}
//           title="Orders"
//           value={orders?.total ?? 0}
//           variant="purple"
//         />

//         <StatCard
//           icon={DollarSign}
//           title="Invested USDT"
//           value={investments?.totalInvestedUSDT ?? 0}
//           variant="blue"
//         />
//       </div>

//       {/* Charts */}

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//         <div className="rounded-xl border border-default bg-[#282f35] p-5">
//           <h3 className="text-lg font-semibold text-main mb-5">
//             Investment Status
//           </h3>

//           <div className="h-[260px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={investmentStatusData}
//                   dataKey="value"
//                   nameKey="name"
//                   innerRadius={55}
//                   outerRadius={90}
//                   paddingAngle={3}
//                 >
//                   {investmentStatusData.map((_, index) => (
//                     <Cell
//                       key={index}
//                       fill={chartColors[index % chartColors.length]}
//                     />
//                   ))}
//                 </Pie>

//                 <Tooltip />
//                 <Legend
//                   wrapperStyle={{
//                     fontSize: "12px",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="rounded-xl border border-default bg-[#282f35] p-5">
//           <h3 className="text-lg font-semibold text-main mb-5">
//             Order Network Distribution
//           </h3>

//           <div className="h-[320px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//   data={networkData}
//   dataKey="value"
//   nameKey="name"
//   innerRadius={55}
//   outerRadius={90}
//   paddingAngle={3}
// >
//                   {networkData.map((_, index) => (
//                     <Cell
//                       key={index}
//                       fill={networkColors[index % networkColors.length]}
//                     />
//                   ))}
//                 </Pie>

//                 <Tooltip />
//                 <Legend
//   wrapperStyle={{
//     fontSize: "12px",
//   }}
// />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Summary Panels */}

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//         <SummaryPanel
//           title="User Summary"
//           items={[
//             {
//               label: "Active Users",
//               value: users?.active ?? 0,
//             },
//             {
//               label: "Inactive Users",
//               value: users?.inactive ?? 0,
//             },
//             {
//               label: "Blocked Users",
//               value: users?.blocked ?? 0,
//             },
//           ]}
//         />

//         <SummaryPanel
//           title="Order Summary"
//           items={[
//             {
//               label: "Active Orders",
//               value: orders?.active ?? 0,
//             },
//             {
//               label: "Completed Orders",
//               value: orders?.completed ?? 0,
//             },
//             {
//               label: "BSC Orders",
//               value: orders?.bsc ?? 0,
//             },
//             {
//               label: "TRON Orders",
//               value: orders?.tron ?? 0,
//             },
//           ]}
//         />
//       </div>

//       {/* Financial Overview */}

//       <div className="rounded-xl border border-default bg-[#282f35] p-5">
//         <h3 className="text-lg font-semibold text-main mb-5">
//           Financial Overview
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//           <div>
//             <p className="text-sm text-gray-400">Total Invested</p>

//             <p className="text-2xl font-bold text-white mt-1">
//               {(investments?.totalInvestedUSDT || 0).toLocaleString()} USDT
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-400">Total Disbursed</p>

//             <p className="text-2xl font-bold text-white mt-1">
//               {(disbursements?.totalDisbursedUSDT || 0).toLocaleString()} USDT
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-400">Transactions</p>

//             <p className="text-2xl font-bold text-white mt-1">
//               {(disbursements?.totalTransactions || 0).toLocaleString()}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-400">Remaining Liability</p>

//             <p className="text-2xl font-bold text-main mt-1">
//               {remainingLiability.toLocaleString()} USDT
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { CalendarDays, ShieldCheck } from "lucide-react";
import Cookies from "js-cookie";

const getGreeting = () => {
  const h = new Date().getHours();

  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";

  return "Good Evening";
};

const Dashboard = () => {
  const getUserData = () => {
    try {
      const userData = Cookies.get("adminUserData");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const user = getUserData();

  return (
    <div className="p-6">
      <div className="rounded-2xl border border-default bg-[#282f35] p-8">
        <p className="text-xs tracking-wider text-gray-400 mb-2 flex items-center gap-2">
          <CalendarDays size={14} />
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h1 className="text-3xl serialHeading font-semibold text-white">
          {getGreeting()},
          <span className="text-main ml-2">
            {user?.data?.name || "Admin"}
          </span>
        </h1>

        <p className="text-gray-400 mt-3">
          Welcome back to the administration dashboard.
        </p>

        <div className="mt-8 flex items-center gap-3 rounded-xl border border-main/20 bg-main/5 p-4">
          <ShieldCheck className="text-main" size={22} />

          <div>
            <p className="text-white font-medium">
              System Status
            </p>

            <p className="text-sm text-gray-400">
              All administrative services are operational.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;