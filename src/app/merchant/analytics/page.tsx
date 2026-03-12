"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Star,
  Leaf,
  ChevronRight,
  Globe
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import {
  MOCK_MERCHANT_ANALYTICS,
  MOCK_REVIEWS,
} from "@/lib/mock-data";

// ============================================================
// SaveEat - Merchant: Analytics & Reports
// Light Mode Version
// ============================================================

type Range = "7d" | "30d";

export default function MerchantAnalyticsPage() {
  const [range, setRange] = useState<Range>("7d");
  const analytics = MOCK_MERCHANT_ANALYTICS;
  const data = range === "7d" ? analytics.weekly_data : analytics.monthly_data;

  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const maxBags = Math.max(...data.map((d) => d.bags_sold));

  // Reviews
  const merchantReviews = MOCK_REVIEWS.filter(
    (r) => r.merchant_id === "merchant-001"
  );

  const stats = [
    {
      label: "Total Bag Terjual",
      value: analytics.total_bags_sold.toString(),
      icon: ShoppingBag,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "Total Pendapatan",
      value: formatCurrency(analytics.total_revenue),
      icon: DollarSign,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      label: "Rata² Harian",
      value: analytics.average_daily_sales.toFixed(1) + " bag",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "Rating Rata²",
      value: analytics.average_rating.toFixed(1),
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="flex items-center gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
           <BarChart3 className="w-6 h-6 text-slate-700" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
            Analitik & Laporan
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-0.5">
            Pantau performa tokomu secara real-time.
          </p>
        </div>
      </div>

      {/* ═══ STAT CARDS ════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={cn("bg-white p-5 rounded-2xl shadow-sm border transition-all hover:shadow-md", stat.border)}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-4 border shadow-sm",
                stat.bg,
                stat.border
              )}
            >
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <p className={cn("text-2xl font-heading font-extrabold tracking-tight", stat.color)}>
              {stat.value}
            </p>
            <p className="text-slate-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ═══ SALES CHART ═══════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl"
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <h2 className="font-heading text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-500 bg-blue-50 p-1 rounded-md" /> Penjualan
          </h2>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
            {(["7d", "30d"] as Range[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-bold transition-all",
                  range === r
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                {r === "7d" ? "7 Hari" : "30 Hari"}
              </button>
            ))}
          </div>
        </div>

        {/* CSS Bar Chart */}
        <div className="flex items-end gap-2 h-64 mt-4">
          {data.map((d, i) => {
            const h = (d.revenue / maxRevenue) * 100;
            return (
              <div
                key={d.date}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.4 + i * 0.03, duration: 0.5 }}
                  className="w-full rounded-t-lg bg-emerald-500 hover:bg-emerald-400 transition-colors relative group cursor-pointer shadow-sm border border-emerald-600/20 border-b-0"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-10 hidden md:block border border-slate-700">
                    {formatCurrency(d.revenue)}
                  </div>
                </motion.div>
                {/* Label */}
                {(range === "7d" || i % 5 === 0) && (
                  <span className="text-[9px] md:text-[10px] font-bold text-slate-400">
                    {d.date.split("-").slice(1).join("/")}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Bags sold mini-bars */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-slate-600 text-sm font-bold mb-4 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-orange-500" /> Bag Terjual per Hari
          </p>
          <div className="flex items-end gap-2 h-20">
            {data.map((d, i) => {
              const h = (d.bags_sold / maxBags) * 100;
              return (
                <div key={d.date} className="flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.6 + i * 0.03, duration: 0.4 }}
                    className="w-full rounded-t-md bg-orange-400 hover:bg-orange-300 transition-colors relative group cursor-pointer shadow-sm border border-orange-500/20 border-b-0"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10 hidden md:block">
                      {d.bags_sold}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ═══ REVIEWS SUMMARY ═══════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl"
      >
        <h2 className="font-heading text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2 pb-4 border-b border-slate-100">
           <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> Ulasan Terbaru
        </h2>
        <div className="space-y-4">
          {merchantReviews.slice(0, 4).map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-xs font-bold text-emerald-800 shadow-sm">
                  {review.user?.name?.charAt(0) || "?"}
                </div>
                <span className="text-slate-900 text-sm font-bold">
                  {review.user?.name || "Anonim"}
                </span>
                <div className="flex items-center gap-0.5 ml-auto bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3 h-3",
                        i < review.rating
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-slate-200"
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══ IMPACT CARD ═══════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 md:p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-200 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-100">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
             <Globe className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-heading text-xl font-extrabold text-emerald-800">
            Dampak Lingkungan Tokomu
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
            <p className="text-3xl font-heading font-extrabold text-emerald-600">
              171 <span className="text-lg">kg</span>
            </p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1.5">Makanan Diselamatkan</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
            <p className="text-3xl font-heading font-extrabold text-emerald-600">
              420 <span className="text-lg">kg</span>
            </p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1.5">CO₂ Dicegah</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
            <p className="text-3xl font-heading font-extrabold text-emerald-600">
              342
            </p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1.5">Mahasiswa Terbantu</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
