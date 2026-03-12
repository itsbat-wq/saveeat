"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  DollarSign,
  Package,
  TrendingUp,
  Plus,
  Clock,
  User,
  ChevronRight,
  Coffee,
  Bell
} from "lucide-react";
import { cn, formatCurrency, formatRelativeTime, getOrderStatusConfig } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import {
  MOCK_ORDERS,
  MOCK_MYSTERY_BAGS,
  MOCK_MERCHANT_ANALYTICS,
} from "@/lib/mock-data";

// ============================================================
// SaveEat - Merchant Dashboard Home
// Light Mode Version
// ============================================================

export default function MerchantDashboard() {
  const { user } = useAuth();

  // Merchant's orders
  const merchantOrders = MOCK_ORDERS.filter(
    (o) => o.merchant_id === "merchant-001"
  ).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const todaySold = 5;
  const todayRevenue = 75000;
  const remainingStock = MOCK_MYSTERY_BAGS[0]?.stock_available ?? 0;

  const stats = [
    {
      label: "Bag Terjual Hari Ini",
      value: todaySold,
      icon: ShoppingBag,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      label: "Pendapatan Hari Ini",
      value: formatCurrency(todayRevenue),
      icon: DollarSign,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      label: "Sisa Stok",
      value: remainingStock,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
  ];

  // Get greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Selamat pagi" : hour < 17 ? "Selamat sore" : "Selamat malam";

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* ═══ WELCOME BANNER ════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 relative overflow-hidden bg-white border border-slate-200 shadow-sm rounded-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{greeting}</p>
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
            {user?.name || "Pemilik Toko"} <Coffee className="w-6 h-6 text-orange-400" />
          </h1>
          <p className="text-slate-600 text-base mt-2 max-w-xl leading-relaxed">
            Berikut ringkasan performa tokomu hari ini.
          </p>
        </div>
      </motion.div>

      {/* ═══ STAT CARDS ════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={cn("bg-white p-5 rounded-2xl shadow-sm border transition-shadow hover:shadow-md", stat.border)}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm",
                  stat.bg,
                  stat.border
                )}
              >
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500 bg-emerald-50 p-0.5 rounded-md" />
            </div>
            <p className={cn("text-3xl font-heading font-extrabold tracking-tight", stat.color)}>
              {stat.value}
            </p>
            <p className="text-slate-500 text-sm font-medium mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ═══ LIVE ORDER FEED ═══════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-500" /> Pesanan Terbaru
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ml-1 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </h2>
          <Link
            href="/merchant/orders"
            className="px-4 py-2 rounded-lg bg-slate-50 text-slate-600 font-semibold hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1 text-sm border border-slate-200"
          >
            Semua <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {merchantOrders.slice(0, 5).map((order, i) => {
            const status = getOrderStatusConfig(order.status);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className={cn(
                  "p-5 rounded-2xl bg-white border border-slate-200",
                  "hover:bg-slate-50 hover:border-emerald-300",
                  "transition-all cursor-pointer shadow-sm",
                  i === 0 && order.status === "pending" && "border-l-4 border-l-orange-500 border-orange-200 bg-orange-50/30"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700 shadow-inner">
                      {order.user?.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="text-slate-900 text-base font-bold">
                        {order.user?.name || `Pelanggan #${order.id.slice(-3)}`}
                      </p>
                      <p className="text-slate-500 text-sm font-medium mt-0.5">
                        {order.quantity} bag ·{" "}
                        {formatRelativeTime(order.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5">
                    <span className="text-slate-900 font-extrabold text-lg">
                      {formatCurrency(order.total_price)}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold tracking-wide border",
                        status.label === "Selesai" && "bg-emerald-50 text-emerald-700 border-emerald-200",
                        status.label === "Menunggu" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                        status.label === "Dikonfirmasi" && "bg-blue-50 text-blue-700 border-blue-200",
                        status.label === "Dibatalkan" && "bg-red-50 text-red-700 border-red-200"
                      )}
                    >
                      {status.icon} {status.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ═══ FLOATING CTA ══════════════════════════════════ */}
      <Link href="/merchant/bags">
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 md:bottom-10 right-6 z-40 flex items-center gap-2 px-6 py-4 rounded-full bg-orange-500 text-white font-bold shadow-lg hover:bg-orange-600 hover:shadow-xl cursor-pointer transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Publikasikan Mystery Bag</span>
          <span className="sm:hidden">Buat Bag</span>
        </motion.div>
      </Link>
    </div>
  );
}
