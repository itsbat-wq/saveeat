"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Check,
  X,
  QrCode,
  ChevronDown,
  Clock,
  PackageCheck
} from "lucide-react";
import { cn, formatCurrency, formatRelativeTime, getOrderStatusConfig } from "@/lib/utils";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { OrderStatus } from "@/types";
import toast from "react-hot-toast";

// ============================================================
// SaveEat - Merchant: Order Management
// Light Mode Version
// ============================================================

const TABS: { value: string; label: string; icon?: any }[] = [
  { value: "all", label: "Semua" },
  { value: "pending", label: "Pending", icon: Clock },
  { value: "confirmed", label: "Dikonfirmasi", icon: Check },
  { value: "picked_up", label: "Diambil", icon: PackageCheck },
  { value: "cancelled", label: "Batal", icon: X },
];

export default function MerchantOrdersPage() {
  const [tab, setTab] = useState("all");
  const [showScan, setShowScan] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [orders, setOrders] = useState(
    MOCK_ORDERS.filter(
      (o) => o.merchant_id === "merchant-001"
    ).sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  );

  const filteredOrders = useMemo(() => {
    if (tab === "all") return orders;
    return orders.filter((o) => o.status === tab);
  }, [orders, tab]);

  function confirmOrder(orderId: string) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "confirmed" as OrderStatus } : o
      )
    );
    toast.success("Pesanan dikonfirmasi!");
  }

  function markPickedUp(orderId: string) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "picked_up" as OrderStatus } : o
      )
    );
    toast.success("Pesanan sudah diambil!");
  }

  function simulateQRScan() {
    setShowScan(true);
    setTimeout(() => {
      setScanResult("order-001");
      toast.success("QR Code berhasil di-scan!");
      setTimeout(() => {
        setShowScan(false);
        setScanResult(null);
        markPickedUp("order-001");
      }, 1500);
    }, 2000);
  }

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
             <ClipboardList className="w-6 h-6 text-blue-500" />
           </div>
           <div>
            <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
              Kelola Pesanan
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-0.5">
              {filteredOrders.length} pesanan
            </p>
           </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={simulateQRScan}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold shadow-sm transition-colors"
        >
          <QrCode className="w-5 h-5" />
          <span>Scan QR</span>
        </motion.button>
      </div>

      {/* ═══ TABS ══════════════════════════════════════════ */}
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide pb-2">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm border",
              tab === t.value
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {t.icon && <t.icon className="w-4 h-4" />}
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══ ORDERS LIST ═══════════════════════════════════ */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="py-24 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
               <ClipboardList className="w-8 h-8 text-slate-300" />
             </div>
            <p className="text-slate-500 font-bold">Belum ada pesanan di tab ini.</p>
          </div>
        ) : (
          filteredOrders.map((order, i) => {
            const status = getOrderStatusConfig(order.status);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md",
                  order.status === "pending" ? "border-l-4 border-l-yellow-500 border-slate-200" : "border-slate-200"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-800 shrink-0 shadow-inner">
                    {order.user?.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-1 gap-2">
                      <p className="text-slate-900 font-bold text-base truncate">
                        {order.user?.name || `Pelanggan #${order.id.slice(-3)}`}
                      </p>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-slate-50",
                          status.label === "Selesai" && "text-emerald-700 border-emerald-200 bg-emerald-50",
                          status.label === "Menunggu" && "text-yellow-700 border-yellow-200 bg-yellow-50",
                          status.label === "Dikonfirmasi" && "text-blue-700 border-blue-200 bg-blue-50",
                          status.label === "Dibatalkan" && "text-red-700 border-red-200 bg-red-50"
                        )}
                      >
                       {status.icon} {status.label}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
                        <div>
                           <p className="text-slate-500 text-sm font-medium">
                            {order.quantity} bag ·{" "}
                            {formatRelativeTime(order.created_at)}
                           </p>
                           <p className="text-slate-900 font-extrabold text-lg mt-1 block">
                            {formatCurrency(order.total_price)}
                           </p>
                        </div>

                      {/* Actions */}
                      <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        {order.status === "pending" && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => confirmOrder(order.id)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-bold border border-emerald-200 transition-colors shadow-sm"
                          >
                            <Check className="w-4 h-4" />
                            Konfirmasi
                          </motion.button>
                        )}
                        {order.status === "confirmed" && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => markPickedUp(order.id)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold border border-blue-200 transition-colors shadow-sm"
                          >
                            <QrCode className="w-4 h-4" />
                            Tandai Diambil
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* ═══ QR SCAN MODAL ═════════════════════════════════ */}
      <AnimatePresence>
        {showScan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { setShowScan(false); setScanResult(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-slate-100"
            >
               <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-slate-900 text-xl flex items-center gap-2">
                  <QrCode className="w-6 h-6 text-slate-700" /> Scan QR Code
                </h3>
                  <button
                  onClick={() => { setShowScan(false); setScanResult(null); }}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
               </div>

              <div className="w-64 h-64 mx-auto rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center mb-6 relative overflow-hidden">
                {scanResult ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-emerald-600" />
                  </motion.div>
                ) : (
                  <>
                    <QrCode className="w-16 h-16 text-slate-300 animate-pulse" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <p className="absolute bottom-6 text-slate-400 text-sm font-bold tracking-widest uppercase">
                      Memindai...
                    </p>
                  </>
                )}
              </div>

              {scanResult && (
                <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl border border-emerald-200 font-bold text-sm shadow-sm inline-flex items-center gap-2">
                   <Check className="w-4 h-4" /> Order #{scanResult} diverifikasi!
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
