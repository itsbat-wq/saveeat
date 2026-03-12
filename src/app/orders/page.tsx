"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  Clock,
  MapPin,
  X,
  Leaf,
  Home,
  Bookmark,
  User,
  ChevronRight,
  QrCode,
  CheckCircle2
} from "lucide-react";
import {
  cn,
  formatCurrency,
  formatDateTime,
  formatRelativeTime,
  getOrderStatusConfig,
} from "@/lib/utils";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { Order } from "@/types";
import toast from "react-hot-toast";

// ============================================================
// SaveEat - Order History Page (Customer)
// Light Mode Version
// ============================================================

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // Filter customer orders only
  const customerOrders = MOCK_ORDERS.filter((o) =>
    o.id.startsWith("order-0")
  ).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  function handleReviewSubmit() {
    if (reviewRating === 0) {
      toast.error("Pilih rating terlebih dahulu");
      return;
    }
    toast.success("Review berhasil dikirim!");
    setShowReview(false);
    setReviewRating(0);
    setReviewComment("");
  }

  const bottomNavItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
    { icon: Clock, label: "Pesanan", href: "/orders", active: true },
    { icon: Bookmark, label: "Favorit", href: "/favorites" },
    { icon: User, label: "Profil", href: "/login" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ═══ TOP BAR ════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/marketplace"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-heading font-bold text-slate-900 text-lg">
              Pesanan Saya
            </h1>
          </div>
          <span className="text-slate-500 text-sm font-medium">
            {customerOrders.length} pesanan
          </span>
        </div>
      </nav>

      {/* ═══ ORDER LIST ═════════════════════════════════════ */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-28 md:pb-8">
        {customerOrders.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium mb-4">Belum ada pesanan</p>
            <Link href="/marketplace" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors shadow-sm">
              <ShoppingBag className="w-4 h-4" /> Cari Mystery Bag
            </Link>
          </div>
        ) : (
          customerOrders.map((order, index) => {
            const status = getOrderStatusConfig(order.status);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-start gap-4">
                  {/* Store avatar */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    {order.merchant?.store_image_url ? (
                      <img
                        src={order.merchant.store_image_url}
                        alt={order.merchant.store_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-slate-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-slate-900 font-bold text-base truncate">
                        {order.merchant?.store_name || "Merchant"}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide border",
                          status.label === "Selesai" && "bg-emerald-50 text-emerald-700 border-emerald-200",
                          status.label === "Menunggu" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                          status.label === "Dikonfirmasi" && "bg-blue-50 text-blue-700 border-blue-200",
                          status.label === "Dibatalkan" && "bg-red-50 text-red-700 border-red-200"
                        )}
                      >
                        {status.icon} {status.label}
                      </span>
                      <span className="text-slate-500 text-xs font-medium">
                        {formatRelativeTime(order.created_at)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <span className="text-slate-600 text-xs font-semibold">
                        {order.quantity} bag
                      </span>
                      <span className="text-slate-900 font-bold text-sm">
                        {formatCurrency(order.total_price)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 mt-4">
                  {order.status === "confirmed" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                        setShowQR(true);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-700 text-sm font-bold border border-blue-200 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <QrCode className="w-4 h-4" /> Lihat QR
                    </button>
                  )}
                  {order.status === "picked_up" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                        setShowReview(true);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-orange-50 text-orange-700 text-sm font-bold border border-orange-200 hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Star className="w-4 h-4 fill-orange-500 text-orange-500" /> Beri Rating
                    </button>
                  )}
                  {order.status === "pending" && (
                    <span className="flex-1 py-2 rounded-xl bg-slate-50 text-slate-500 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> Menunggu konfirmasi merchant
                    </span>
                  )}
                  {order.status === "cancelled" && (
                    <span className="flex-1 py-2 rounded-xl bg-slate-50 text-slate-500 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-2">
                       Pesanan dibatalkan
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </main>

      {/* ═══ QR CODE MODAL ═════════════════════════════════ */}
      <AnimatePresence>
        {showQR && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-3xl max-w-sm w-full text-center shadow-xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-slate-900 text-xl flex items-center gap-2">
                  <QrCode className="w-6 h-6 text-blue-500" /> QR Pesanan
                </h3>
                <button
                  onClick={() => setShowQR(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm inline-block mb-6">
                <QRCode
                  value={selectedOrder.qr_code_data}
                  size={200}
                  level="M"
                />
              </div>

              <p className="text-slate-600 text-sm font-medium">
                Tunjukkan QR Code ini ke <br/>
                <span className="text-slate-900 font-bold text-lg mt-1 block">
                  {selectedOrder.merchant?.store_name}
                </span>
              </p>
              <p className="text-slate-400 font-mono text-xs mt-3 bg-slate-50 py-1.5 rounded-md border border-slate-100">
                ID: {selectedOrder.id}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ REVIEW MODAL ══════════════════════════════════ */}
      <AnimatePresence>
        {showReview && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowReview(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-3xl max-w-sm w-full shadow-xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-bold text-slate-900 text-xl flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Beri Rating
                </h3>
                <button
                  onClick={() => setShowReview(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Bagaimana pengalamanmu berbelanja di <strong className="text-slate-900 font-bold">{selectedOrder.merchant?.store_name}</strong>?
              </p>

              {/* Star rating */}
              <div className="flex items-center justify-center gap-3 mb-6 bg-slate-50 py-4 rounded-2xl border border-slate-100">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={cn(
                        "w-10 h-10 transition-colors",
                        star <= reviewRating
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                          : "text-slate-200 fill-slate-100 hover:fill-yellow-100 hover:text-yellow-200"
                      )}
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Ceritakan pengalamanmu (opsional)..."
                rows={3}
                className="w-full p-4 rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none text-sm mb-5 shadow-sm"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReviewSubmit}
                className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Kirim Review
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
