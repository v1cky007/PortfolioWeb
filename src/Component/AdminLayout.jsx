import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { isAuthorized, isSessionValid, clearAuthorization } from "@/lib/security";
import logo from "@/assets/logo.png";

const NAV_ITEMS = [
  { path: "/v1cky", label: "Dashboard", icon: LayoutDashboard },
  { path: "/v1cky/posts", label: "Blog Posts", icon: FileText },
  { path: "/v1cky/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorizedState] = useState(false);

  useEffect(() => {
    const auth = isAuthorized() && isSessionValid();
    setAuthorizedState(auth);
    if (!auth) {
      navigate("/gate", { replace: true });
    }
  }, [navigate, location]);

  const handleLogout = () => {
    clearAuthorization();
    navigate("/gate", { replace: true });
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#111118] border-r border-white/5 fixed inset-y-0 left-0 z-40">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="font-bold text-sm">Dashboard</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.path === "/v1cky"
                ? location.pathname === "/v1cky"
                : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#BF00FF]/10 text-[#BF00FF]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#111118] border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-7 h-7 rounded-full" />
          <span className="font-bold text-sm">Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-white"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#111118] border-r border-white/5">
            <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="font-bold text-sm">Panel</span>
            </div>
            <nav className="px-3 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.path === "/v1cky"
                    ? location.pathname === "/v1cky"
                    : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-[#BF00FF]/10 text-[#BF00FF]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-3 py-4 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
