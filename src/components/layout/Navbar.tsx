"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (pathname === "/") {
        const sections = ["how", "impact", "merchant"];
        let current = "";
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            // A simple scroll spy logic
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
              current = section;
            }
          }
        }
        setActiveSection(current);
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { label: "Marketplace", href: "/marketplace", id: "marketplace" },
    { label: "Cara Kerja", href: "/#how", id: "how" },
    { label: "SDG Impact", href: "/#impact", id: "impact" },
    { label: "Merchant", href: "/#merchant", id: "merchant" },
    { label: "Maps", href: "/maps", id: "maps" },
  ];

  const getIsActive = (id: string, href: string) => {
    if (id === "marketplace") return pathname.startsWith("/marketplace");
    if (id === "maps") return pathname.startsWith("/maps");
    if (pathname === "/") return activeSection === id;
    if (pathname !== "/" && href.startsWith("/#")) return false; 
    return false;
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || pathname !== "/"
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/saveeatlogo.png" alt="SaveEat Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-heading font-bold text-slate-900 hidden sm:block">
              Save<span className="text-emerald-500">Eat</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center h-full gap-2 relative">
            {navLinks.map((l) => {
              const active = getIsActive(l.id, l.href);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={cn(
                    "relative flex items-center h-full px-4 text-sm font-semibold transition-colors",
                    active ? "text-emerald-600" : "text-slate-600 hover:text-emerald-500"
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.div
                      layoutId="navIndicatorDesktop"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-500 rounded-t-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <Link href="/orders" className="text-sm text-slate-500 font-medium hover:text-emerald-600 transition-colors">Pesanan</Link>
                <Link href="/favorites" className="text-sm text-slate-500 font-medium hover:text-emerald-600 transition-colors">Favorit</Link>
                <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
                </button>
                <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
                    {user.name.charAt(0)}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      toast.success("Berhasil logout");
                    }}
                    className="ml-2 p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-600 hover:text-slate-900 text-sm font-medium px-3 py-2 transition-colors">Masuk</Link>
                <Link
                  href="/marketplace"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" /> Cari Mystery Bag
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-600"
            aria-label="Menu"
          >
            <div className="space-y-1.5 px-2 w-full flex flex-col items-center">
              <span className={cn("block w-5 h-0.5 bg-current transition-all", mobileOpen && "rotate-45 translate-y-2")} />
              <span className={cn("block w-5 h-0.5 bg-current transition-all", mobileOpen && "opacity-0")} />
              <span className={cn("block w-5 h-0.5 bg-current transition-all", mobileOpen && "-rotate-45 -translate-y-2")} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 border-t"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((l) => (
                <Link 
                  key={l.label} 
                  href={l.href} 
                  onClick={() => setMobileOpen(false)} 
                  className={cn(
                    "block px-3 py-2.5 rounded-xl text-sm transition-colors relative",
                    getIsActive(l.id, l.href) ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 font-medium hover:bg-slate-50"
                  )}
                >
                  {l.label}
                  {getIsActive(l.id, l.href) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-emerald-500 rounded-r-full" />
                  )}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-slate-100">
                {!isAuthenticated ? (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="py-2.5 text-center rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">Masuk</Link>
                    <Link href="/marketplace" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 py-2.5 text-center rounded-xl bg-orange-500 text-white text-sm font-bold shadow-sm">
                      <ShoppingBag className="w-4 h-4"/> Cari Mystery Bag
                    </Link>
                  </>
                ) : (
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="py-2 text-center rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
