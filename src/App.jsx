import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/UserManagement";
import UserInfo from "./pages/UserInfo/UserInfo";
import AdminUser from "./pages/AdminManagement/AdminManagement";
import UserSummary from "./pages/Users/UserSummary";

import AppLayout from "./layout/AppLayout";
import NoAccess from "./components/NoAccess";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";
import TeamInvestment from "./pages/Investments/TeamInvestments";
import BonusTransaction from "./pages/BonusTransaction/BonusTransaction";
import OrderManagement from "./pages/Orders/OrderManagement";

const PermissionRoute = ({ element, permission, permissions }) => {
  if (!permission || permissions?.includes(permission)) {
    return element;
  }

  return <NoAccess />;
};

// ─────────────────────────────────────────────
// ADMIN ROUTES
// ─────────────────────────────────────────────

const ADMIN_ROUTES = [
  { path: "/", element: <Dashboard /> },
  { path: "/user-management", element: <Users /> },
  // { path: "/user-info", element: <UserInfo /> },
  // { path: "/admin-users", element: <AdminUser /> },
  // { path: "/user-summary", element: <UserSummary /> },
  { path: "/team-investments", element: <TeamInvestment /> },
  { path: "/bonus-transaction", element: <BonusTransaction /> },
  { path: "/orders", element: <OrderManagement /> },
];

// ─────────────────────────────────────────────
// SUB ADMIN ROUTES
// ─────────────────────────────────────────────

const SUB_ADMIN_ROUTES = [
  { path: "/", element: <Dashboard /> },

  {
    path: "/user-management",
    element: <Users />,
    permission: "USER MANAGEMENT",
  },

  // {
  //   path: "/user-info",
  //   element: <UserInfo />,
  //   permission: "USER INFO",
  // },

  // {
  //   path: "/admin-users",
  //   element: <AdminUser />,
  //   permission: "ADMIN USERS",
  // },

  // {
  //   path: "/user-summary",
  //   element: <UserSummary />,
  //   permission: "USER SUMMARY",
  // },
  {
    path: "/team-investments",
    element: <TeamInvestment />,
    permission: "INVESTMENTS",
  },
  {
    path: "/bonus-transaction",
    element: <TeamInvestment />,
    permission: "BONUS TRANSACTION",
  },
];

export default function App() {
  const adminToken = Cookies.get("adminToken");

  const stored = Cookies.get("adminUserData");
  const parsed = stored ? JSON.parse(stored) : {};

  const { role = 0, permissions = [] } = parsed?.data || {};

  const renderRoutes = (routes, checkPermissions = false) =>
    routes.map(({ path, element, permission }) => (
      <Route
        key={path}
        path={path}
        element={
          checkPermissions ? (
            <PermissionRoute
              element={element}
              permission={permission}
              permissions={permissions}
            />
          ) : (
            element
          )
        }
      />
    ));

  const getRoutesByRole = () => {
    switch (role) {
      case 0:
        return renderRoutes(ADMIN_ROUTES);

      case 1:
        return renderRoutes(SUB_ADMIN_ROUTES, true);

      default:
        return null;
    }
  };

  const privateRoutes = getRoutesByRole();

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Routes */}
      {adminToken && privateRoutes && (
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>{privateRoutes}</Route>
        </Route>
      )}

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to={adminToken && stored ? "/" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}