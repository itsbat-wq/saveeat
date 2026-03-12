"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BarChart3,
  Star,
  Settings,
  Bell,
  LogOut,
  Leaf,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { MOCK_NOTIFICATIONS_MERCHANT } from "@/lib/mock-data";
import toast from "react-hot-toast";

// ============================================================
// SaveEat - Merchant Dashboard Layout
// Light Mode Version
// ============================================================

const NAV_ITEMS = [
  { label: "Dashboard", href: "/merchant", icon: LayoutDashboard },
  { label: "Mystery Bag", href: "/merchant/bags", icon: Package },
  { label: "Pesanan", href: "/merchant/orders", icon: ClipboardList },
  { label: "Analitik", href: "/merchant/analytics", icon: BarChart3 },
];

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = MOCK_NOTIFICATIONS_MERCHANT.filter(
    (n) => !n.is_read
  ).length;

  // Redirect if not merchant
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?role=merchant");
    }
  }, [isAuthenticated, router]);

  function isActive(href: string) {
    if (href === "/merchant") return pathname === "/merchant";
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ═══ DESKTOP SIDEBAR ═══════════════════════════════ */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-heading font-extrabold text-slate-900 tracking-tight">
                Save<span className="text-emerald-500">Eat</span>
              </span>
              <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase -mt-0.5">
                Merchant Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 mb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Menu Utama</p>
          </div>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200",
                isActive(item.href)
                  ? "bg-emerald-50 text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive(item.href) ? "text-emerald-600" : "text-slate-400")} />
              {item.label}
            </Link>
          ))}
          
          <div className="px-3 mt-6 mb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lainnya</p>
          </div>
           {/* Setting & Profile later for phase 3, we can add a settings button here just in case */}
           <Link
              href="/merchant/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200",
                isActive('/merchant/settings')
                  ? "bg-emerald-50 text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Settings className={cn("w-5 h-5", isActive('/merchant/settings') ? "text-emerald-600" : "text-slate-400")} />
              Pengaturan
            </Link>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
          {/* Notification bell */}
          <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-xl font-medium text-slate-600 hover:bg-white hover:text-slate-900 transition-all group">
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
              )}
            </div>
            Notifikasi
            {unreadCount > 0 && (
              <span className="ml-auto px-1.5 py-0.5 rounded-md bg-red-100 text-[10px] font-bold text-red-700">
                {unreadCount} baru
              </span>
            )}
          </button>

          {/* User info */}
          {user && (
            <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm mt-2 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700 shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="relative flex-1 min-w-0">
                <p className="text-sm text-slate-900 font-bold truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium truncate">
                  {user.email}
                </p>
              </div>
              <button
                onClick={() => {
                  logout();
                  toast.success("Berhasil logout");
                  router.push("/");
                }}
                className="relative p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ═══ MOBILE HEADER ═════════════════════════════════ */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-sm">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-heading font-extrabold text-slate-900">
            Save<span className="text-emerald-500">Eat</span>
          </span>
        </Link>

        <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center relative text-slate-500 hover:text-slate-900">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
          )}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-[280px] z-[70] bg-white border-r border-slate-200 shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
                <span className="font-heading font-bold text-slate-900 text-lg">
                  Menu Utama
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="py-4 px-3 flex-1 overflow-y-auto space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200",
                      isActive(item.href)
                        ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive(item.href) ? "text-emerald-600" : "text-slate-400")} />
                    {item.label}
                  </Link>
                ))}
                
                 <div className="h-px bg-slate-100 my-4 mx-2" />
                 <Link
                    href="/merchant/settings"
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200",
                      isActive('/merchant/settings')
                        ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Settings className={cn("w-5 h-5", isActive('/merchant/settings') ? "text-emerald-600" : "text-slate-400")} />
                    Pengaturan
                  </Link>

              </nav>
              
              {/* Profile in mobile sidebar */}
              <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50">
                 {user && (
                  <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700 shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 font-bold truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        toast.success("Berhasil logout");
                        router.push("/");
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ MAIN CONTENT ══════════════════════════════════ */}
      <main className="flex-1 md:ml-64 min-h-screen pt-16 md:pt-0 pb-20 md:pb-0 overflow-x-hidden">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>

      {/* ═══ MOBILE BOTTOM NAV ═════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-slate-200 flex items-center justify-around px-2 pb-safe pt-1 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-[64px]",
              isActive(item.href)
                ? "text-emerald-500"
                : "text-slate-400 hover:text-slate-700"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
