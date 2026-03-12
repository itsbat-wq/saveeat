"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  MapPin,
  ChevronDown,
  ShoppingBag,
  Star,
  Leaf,
  Heart,
  Bell,
  User,
  LogOut,
  X,
  Home,
  Clock,
  Bookmark,
  HeartCrack,
  Store
} from "lucide-react";
import { cn, formatCurrency, parseDistance } from "@/lib/utils";
import { MOCK_MERCHANTS } from "@/lib/mock-data";
import MerchantCard from "@/components/marketplace/MerchantCard";
import { useAuth } from "@/lib/auth-context";
import { SortOption, MockMerchant } from "@/types";
import toast from "react-hot-toast";

// ============================================================
// SaveEat - Marketplace Page
// ============================================================

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "distance", label: "Terdekat" },
  { value: "price_low", label: "Harga Terendah" },
  { value: "rating", label: "Rating Tertinggi" },
  { value: "stock", label: "Stok Tersedia" },
];

export default function MarketplacePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("distance");
  const [showFilter, setShowFilter] = useState(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [isMapView, setIsMapView] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleFavoriteToggle = useCallback(
    (merchantId: string, isFavorited: boolean) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (isFavorited) {
          next.add(merchantId);
          toast("Ditambahkan ke favorit", { icon: <Heart className="w-4 h-4 text-red-500 fill-red-500"/> });
        } else {
          next.delete(merchantId);
          toast("Dihapus dari favorit", { icon: <HeartCrack className="w-4 h-4 text-slate-400"/> });
        }
        return next;
      });
    },
    []
  );

  // ── Filter & Sort ─────────────────────────────────
  const filteredMerchants = useMemo(() => {
    let list = [...MOCK_MERCHANTS];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.store_name.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q)) ||
          m.food_types.some((t) => t.toLowerCase().includes(q))
      );
    }

    // only available stock
    if (showOnlyAvailable) {
      list = list.filter(
        (m) =>
          m.mystery_bag?.status === "available" &&
          (m.mystery_bag?.stock_available ?? 0) > 0
      );
    }

    // sort
    switch (sort) {
      case "distance":
        list.sort((a, b) =>
          parseDistance(a.distance_from_campus || "999km") -
          parseDistance(b.distance_from_campus || "999km")
        );
        break;
      case "price_low":
        list.sort(
          (a, b) =>
            (a.mystery_bag?.discount_price ?? Infinity) -
            (b.mystery_bag?.discount_price ?? Infinity)
        );
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "stock":
        list.sort(
          (a, b) =>
            (b.mystery_bag?.stock_available ?? 0) -
            (a.mystery_bag?.stock_available ?? 0)
        );
        break;
    }

    return list;
  }, [search, sort, showOnlyAvailable]);

  const availableCount = MOCK_MERCHANTS.filter(
    (m) =>
      m.mystery_bag?.status === "available" &&
      (m.mystery_bag?.stock_available ?? 0) > 0
  ).length;

  // ── Bottom Nav Items ──────────────────────────────
  const bottomNavItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ShoppingBag, label: "Marketplace", href: "/marketplace", active: true },
    { icon: Clock, label: "Pesanan", href: "/orders" },
    { icon: Bookmark, label: "Favorit", href: "/favorites" },
    { icon: User, label: "Profil", href: "/login" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* MAIN CONTENT ═══════════════════════════════════════ */}
      <div className="pt-16">

      {/* ═══ SEARCH & FILTER BAR ═══════════════════════════ */}
      <div className="sticky top-16 z-40 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kafe, bakery, restoran..."
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-slate-900 transition-all shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Mode, Sort & Filter */}
            <div className="flex gap-2">
              <div className="flex bg-slate-200/50 p-1 rounded-xl">
                <button
                  onClick={() => setIsMapView(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all",
                    !isMapView ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setIsMapView(true)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all",
                    isMapView ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Peta</span>
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all",
                    showFilter 
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 transition-transform",
                      showFilter && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {showFilter && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-white border border-slate-200 shadow-lg overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5">
                          Urutkan
                        </p>
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSort(opt.value);
                              setShowFilter(false);
                            }}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium",
                              sort === opt.value
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-600 hover:bg-slate-50"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                        <div className="h-px bg-slate-100 my-2" />
                        <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showOnlyAvailable}
                            onChange={(e) =>
                              setShowOnlyAvailable(e.target.checked)
                            }
                            className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-slate-700 font-medium">
                            Stok tersedia saja
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-slate-500 text-xs font-medium">
              Menampilkan{" "}
              <span className="text-slate-900 font-bold">
                {filteredMerchants.length}
              </span>{" "}
              merchant ·{" "}
              <span className="text-emerald-600 font-bold">
                {availableCount}
              </span>{" "}
              bag tersedia
            </p>
          </div>
        </div>
      </div>

      {/* ═══ MERCHANT GRID OR MAP ═════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {filteredMerchants.length > 0 ? (
          isMapView ? (
            <div className="w-full h-[60dvh] rounded-3xl overflow-hidden border border-slate-200 relative bg-emerald-50 shadow-inner flex flex-col items-center justify-center">
              {/* Dummy Map Visualizer */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
              <MapPin className="w-16 h-16 text-emerald-500 mb-4 opacity-50" />
              <h3 className="font-heading text-2xl font-bold text-slate-800 relative z-10">Tampilan Peta (Mockup)</h3>
              <p className="text-slate-600 font-medium relative z-10 mt-2 text-center max-w-sm">Fitur peta langsung akan mendeteksi {filteredMerchants.length} merchant di sekitar wilayah Anda melalui integrasi lokasi.</p>
              
              {/* Mock Map Markers logic */}
              {filteredMerchants.slice(0, 5).map((m, i) => (
                <div 
                  key={m.id} 
                  className="absolute z-20 tooltip"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`
                  }}
                >
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div className="bg-white p-2 rounded-lg shadow-lg border border-slate-200 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity mb-2 whitespace-nowrap">
                      {m.store_name}
                    </div>
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce" style={{animationDelay: `${i * 0.2}s`}}>
                      <Store className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMerchants.map((merchant, index) => (
                <MerchantCard
                  key={merchant.id}
                  merchant={merchant}
                  index={index}
                  isFavorited={favorites.has(merchant.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
              Tidak ditemukan
            </h3>
            <p className="text-slate-500 text-sm max-w-sm">
              Coba ubah kata kunci pencarian atau matikan filter yang terlalu spesifik.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setShowOnlyAvailable(false);
              }}
              className="mt-6 px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 hover:text-emerald-600 transition-colors"
            >
              Reset Filter
            </button>
          </motion.div>
        )}
      </main>
      
      </div>

      {/* ═══ MOBILE BOTTOM NAV ═════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 flex items-center justify-around px-2 pb-safe pt-1 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        {bottomNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-[64px]",
              item.active
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
