import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useCheckPermissionsQuery } from "../api/umaxApiSlice";
import {
  LayoutDashboard,
  Wallet,
  Users,
  ShieldCheck,
  ArrowDownToLine,
  CircleDollarSign,
  UserSearch,
  UserCog,
  History,
  ScanLine,
  CreditCard,
  ShoppingBag,
  FileCheck,
  FileText,
  BarChart3,
  TrendingUp,
  ClipboardList,
  PieChart,
  Clock,
  Coins,
  BadgeDollarSign,
  Package,
  ScrollText,
  Megaphone,
  Bell,
  Video,
  BookOpenCheck,
  Share2,
  Scale,
  UsersRound,
  UserX,
  Gem,
  Trash2,
  Settings,
  Search,
  Menu,
  X,
  WalletCards,
  Receipt,
  Banknote,
  HandCoins,
  UserPen,
  MessageCircleMore,
  Headset,
  LogOut,
  GalleryVerticalEnd,
  Loader2,
  Pickaxe,
  Blinds,
  Scroll,
  Handshake,
  ArrowLeftRight,
  Landmark,
  Boxes,
} from "lucide-react";

// ─── ADMIN (role === 0) ───
const ADMIN_SECTIONS = [
  {
    label: "DASHBOARDS",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/" },
      {
        label: "User Management",
        icon: Users,
        path: "/user-management",
        permission: "USER MANAGEMENT",
      },
      
    ],
  },
  // {
  //   label: "USERS",
  //   items: [
  //     {
  //       label: "user-info",
  //       icon: UserSearch,
  //       path: "/user-info",
  //       permission: "USER INFO",
  //     },
  //     {
  //       label: "Admin-Users",
  //       icon: UserCog,
  //       path: "/admin-users",
  //       permission: "ADMIN USERS",
  //     },
  //     {
  //       label: "User-Summary",
  //       icon: UserPen,
  //       path: "/user-summary",
  //       permission: "USER SUMMARY",
  //     },
  //   ],
  // },
  {
    label: "INVESTMENT",
    items: [
      {
        label: "Team-Investments",
        icon: TrendingUp,
        path: "/team-investments",
        permission: "TEAM INVESTMENTS",
      },
      
    ],
  },
  {
    label: "BONUS",
    items: [
      {
        label: "Bonus Transaction",
        icon: Clock,
        path: "/bonus-transaction",
        permission: "BONUS TRANSACTION",
      },
      // {
      //   label: "Bonus Coin History",
      //   icon: Coins,
      //   path: "/bonus-coin-history",
      //   permission: "BONUS COIN HISTORY",
      // },
      
    ],
  },
  {
    label: "ORDERS",
    items: [
      {
        label: "Orders Management",
        icon: Boxes,
        path: "/orders",
        permission: "ORDER MANAGEMENT",
      },
      
    ],
  },
  
];

function getSectionsByRole(role, permissions = []) {
  const normalizedPermissions = permissions.map((p) => p.toUpperCase());

  if (role === 0) {
    // Admin gets everything
    return ADMIN_SECTIONS;
  }

  if (role === 1) {
    // Sub Admin gets only assigned permissions
    return ADMIN_SECTIONS
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          if (!item.permission) return true;

          return normalizedPermissions.includes(
            item.permission.toUpperCase(),
          );
        }),
      }))
      .filter((section) => section.items.length > 0);
  }

  return [];
}

const ROLE_LABELS = {
  0: "Admin",
  2: "Sub Admin",
};

function getRoleLabel(role) {
  return ROLE_LABELS[role] || "User";
}

// ─── Highlight Text ─────────────────────────────────────────
function HighlightText({ text, query }) {
  if (!query.trim()) return <span>{text}</span>;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-white font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

// ─── Section Label ──────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-[10px] tracking-widest text-gray-400 px-2 mb-1.5 mt-3 font-semibold uppercase select-none">
      {children}
    </p>
  );
}

// ─── Nav Item ───────────────────────────────────────────────
function NavItem({ item, open, activePath, navigate, searchQuery = "" }) {
  const IconComponent = item.icon;
  const active = activePath === item.path;

  const handleClick = useCallback(() => {
    navigate(item.path);
  }, [navigate, item.path]);

  if (!open) {
    return (
      <button
        onClick={handleClick}
        title={item.label}
        className="w-full flex justify-center mb-1 group cursor-pointer"
      >
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
            active
              ? "bg-main text-white shadow-lg shadow-[#b9fd5c]/25"
              : "text-white group-hover:bg-accent-soft group-hover:text-[#000000]"
          }`}
        >
          <IconComponent
            size={20}
            strokeWidth={active ? 2.5 : 1.8}
            className="transition-all duration-200"
          />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`group w-full flex items-center gap-2.5 px-2.5 py-3 rounded-xs mb-1.5 text-[12.5px] transition-all duration-200 cursor-pointer ${
        active
          ? "bg-main text-white font-semibold shadow-sm shadow-[#b9fd5c]/20"
          : "hover:bg-[#252d38] text-white hover:text-white font-semibold"
      }`}
    >
      <span
        className={`shrink-0 transition-all duration-200 ${
          active ? "text-white" : "text-white group-hover:text-accent"
        }`}
      >
        <IconComponent
          size={20}
          strokeWidth={active ? 2.5 : 1.8}
          className="transition-all duration-200"
        />
      </span>
      <span className="flex-1 text-left truncate leading-tight">
        <HighlightText text={item.label} query={searchQuery} />
      </span>
    </button>
  );
}

// ─── Logout Button (Simple - triggers callback) ─────────────
function LogoutButton({ onClick, expanded }) {
  if (!expanded) {
    return (
      <button
        onClick={onClick}
        title="Logout"
        className="w-full flex justify-center cursor-pointer"
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 text-red-400 hover:bg-red-500/20 hover:text-red-300">
          <LogOut size={20} strokeWidth={1.8} />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20
                 hover:border-red-500/40 transition-all duration-200 cursor-pointer"
    >
      <LogOut size={16} />
      <span>Logout</span>
    </button>
  );
}

// ─── Loading State ──────────────────────────────────────────
function LoadingState({ expanded }) {
  if (!expanded) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 size={20} className="text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 px-3">
      <Loader2 size={24} className="text-accent animate-spin mb-2" />
      <p className="text-gray-400 text-xs">Loading menu...</p>
    </div>
  );
}

// ─── Error State ────────────────────────────────────────────
function ErrorState({ expanded, onRetry }) {
  if (!expanded) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center">
          <X size={16} className="text-red-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 px-3">
      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
        <X size={20} className="text-red-400" />
      </div>
      <p className="text-red-400 text-xs font-medium mb-0.5">
        Failed to load menu
      </p>
      <p className="text-gray-500 text-[10px] text-center mb-2">
        Unable to fetch permissions
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-[10px] text-accent hover:text-accent-soft transition-colors underline underline-offset-2 cursor-pointer"
        >
          Try again
        </button>
      )}
    </div>
  );
}

// ─── Mobile Header ──────────────────────────────────────────
function MobileHeader({ onMenuToggle, userName, role }) {
  const roleLabel = getRoleLabel(role);

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a] border-b border-[#1a1a1a]">
      <div className="flex items-center justify-between px-3 h-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuToggle}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
          >
            <Menu size={16} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#b9fd5c]/20 flex items-center justify-center text-accent font-bold text-xs shrink-0">
              {(userName?.charAt(0) || "A").toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate max-w-24">
                {userName || "User"}
              </p>
              <p className="text-[10px] text-white">{roleLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Overlay ─────────────────────────────────────────
function MobileOverlay({ show, onClose }) {
  if (!show) return null;
  return (
    <div
      className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    />
  );
}

// ─── Sidebar Content ────────────────────────────────────────
function SidebarContent({
  isMobile = false,
  open,
  setOpen,
  searchQuery,
  setSearchQuery,
  filteredSections,
  hasNoResults,
  activePath,
  handleNavigate,
  onLogoutClick,
  name,
  role,
  setMobileOpen,
  isLoading,
  isError,
  refetch,
}) {
  const expanded = open || isMobile;
  const roleLabel = getRoleLabel(role);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") setSearchQuery("");
    },
    [setSearchQuery],
  );

  const totalResults = useMemo(
    () => filteredSections.reduce((acc, s) => acc + s.items.length, 0),
    [filteredSections],
  );

  return (
    <>
      {/* Header */}
      <div className="px-3 pt-2.5 pb-2.5 border-b border-[#1a1a1a]">
        <div className="flex items-center justify-between">
          {expanded && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-12 h-12 rounded-full bg-[#b9fd5c]/20 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                <img src="/jIcon.svg" alt="logo" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-lg font-semibold leading-tight truncate">
                  {name || "User"}
                </p>
                <p className="text-[12px] text-gray-500">{roleLabel}</p>
              </div>
            </div>
          )}

          {!isMobile && (
            <button
              onClick={() => {
                setOpen(!open);
                if (open) setSearchQuery("");
              }}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-700/30 hover:bg-[#1a1a1a] transition-colors shrink-0 cursor-pointer"
            >
              {open ? (
                <X size={14} className="text-gray-400" />
              ) : (
                <Menu size={14} className="text-gray-400" />
              )}
            </button>
          )}

          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-700/30 hover:bg-[#1a1a1a] transition-colors shrink-0 cursor-pointer"
            >
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Search */}
        {expanded && !isLoading && !isError && (
          <div className="mt-2">
            <div
              className={`flex items-center gap-2 bg-[#111111] rounded-lg px-2.5 py-2 text-xs border transition-colors duration-200 ${
                searchQuery
                  ? "border-border-accent/20 ring-1 ring-[#b9fd5c]/20"
                  : "border-[#1a1a1a]"
              }`}
            >
              <Search
                size={13}
                className={searchQuery ? "text-accent" : "text-gray-600"}
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search menu..."
                className="bg-transparent outline-none w-full placeholder:text-gray-600 text-white text-xs"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              ) : (
                <span className="text-[9px] bg-[#1a1a1a] px-1 py-0.5 rounded text-gray-500 whitespace-nowrap select-none">
                  ⌘K
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-1.5 py-1.5 sidebar-scroll">
        {isLoading ? (
          <LoadingState expanded={expanded} />
        ) : isError ? (
          <ErrorState expanded={expanded} onRetry={refetch} />
        ) : (
          <>
            {expanded && searchQuery.trim() && !hasNoResults && (
              <div className="px-2 mb-1.5">
                <p className="text-[10px] text-accent-soft">
                  Found {totalResults} result{totalResults !== 1 ? "s" : ""} for
                  &quot;{searchQuery}&quot;
                </p>
              </div>
            )}

            {hasNoResults && expanded && (
              <div className="flex flex-col items-center justify-center py-8 px-3">
                <div className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center mb-2">
                  <Search size={16} className="text-gray-600" />
                </div>
                <p className="text-gray-400 text-xs font-medium mb-0.5">
                  No results found
                </p>
                <p className="text-gray-500 text-[10px] text-center">
                  No menu items match &quot;{searchQuery}&quot;
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-[10px] text-accent hover:text-accent-soft transition-colors underline underline-offset-2 cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}

            {filteredSections.map((section) => (
              <div key={section.label}>
                {expanded && <SectionLabel>{section.label}</SectionLabel>}
                {section.items.map((item) => (
                  <NavItem
                    key={item.path + item.label}
                    item={item}
                    open={expanded}
                    activePath={activePath}
                    navigate={handleNavigate}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Logout Button */}
      <div className="px-2 py-2 border-t border-[#1a1a1a]">
        <LogoutButton onClick={onLogoutClick} expanded={expanded} />
      </div>
    </>
  );
}

// ─── Main Sidebar Export ────────────────────────────────────
export default function Sidebar({ open, setOpen, onLogoutClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;

  const stored = useMemo(
    () => JSON.parse(Cookies.get("adminUserData") || "{}"),
    [],
  );
  const userData = stored?.data || stored;
  const { role, name = "User" } = userData || {};

  // Fetch permissions from API
  const {
    data: permissionsData,
    isLoading,
    error,
    refetch,
  } = useCheckPermissionsQuery(undefined, {
    skip: role === 0, // Skip API call for Admin and Accountant roles
  });

  // Extract permissions from API response
  const apiPermissions = useMemo(() => {
    if (!permissionsData?.data) return [];
    return permissionsData.data;
  }, [permissionsData]);

  // Determine which permissions to use
  const permissions = useMemo(() => {
    // For roles that don't need API permissions (Admin, Accountant)
    if (role === 0) return [];
    // Use API permissions for other roles
    return apiPermissions;
  }, [role, apiPermissions]);

  const roleSections = useMemo(
    () => getSectionsByRole(role, permissions),
    [role, permissions],
  );

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return roleSections;
    const query = searchQuery.toLowerCase().trim();
    return roleSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.label.toLowerCase().includes(query) ||
            item.path.toLowerCase().includes(query),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery, roleSections]);

  const hasNoResults = searchQuery.trim() && filteredSections.length === 0;

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setSearchQuery("");
      setMobileOpen(false);
    },
    [navigate],
  );

  const handleLogoutClick = useCallback(() => {
    setMobileOpen(false);
    if (onLogoutClick) {
      onLogoutClick();
    }
  }, [onLogoutClick]);

  const sharedProps = {
    searchQuery,
    setSearchQuery,
    filteredSections,
    hasNoResults,
    activePath,
    handleNavigate,
    onLogoutClick: handleLogoutClick,
    name,
    role,
    setMobileOpen,
    isLoading,
    isError: !!error,
    refetch,
  };

  return (
    <>
      <MobileHeader
        onMenuToggle={() => setMobileOpen(true)}
        userName={name}
        role={role}
      />
      <MobileOverlay show={mobileOpen} onClose={() => setMobileOpen(false)} />

      <aside
        className={`lg:hidden fixed top-0 left-0 h-full z-50 flex flex-col bg-[#0a0a0a] text-white
          border-r border-[#1a1a1a] w-56 transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent
          isMobile
          open={true}
          setOpen={setOpen}
          {...sharedProps}
        />
      </aside>

      <aside
        className={`hidden lg:flex h-screen flex-col bg-[#0a0a0a] text-white
          border-r border-[#1a1a1a] transition-all duration-300 p-0
          ${open ? "w-60" : "w-18"}`}
      >
        <SidebarContent open={open} setOpen={setOpen} {...sharedProps} />
      </aside>
    </>
  );
}
