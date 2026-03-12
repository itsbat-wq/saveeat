"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, Gift, ShoppingBag, Clock, Percent, ArrowLeft, Trash2 } from "lucide-react";
import { MOCK_NOTIFICATIONS_CUSTOMER } from "@/lib/mock-data";
import { formatRelativeTime, cn } from "@/lib/utils";
import Link from "next/link";

// ============================================================
// SaveEat - Customer Notifications Page
// ============================================================

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS_CUSTOMER);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "bag_available":
        return <ShoppingBag className="w-5 h-5 text-emerald-500" />;
      case "order_pickup":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "promo":
        return <Percent className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "bag_available":
        return "bg-emerald-50 border-emerald-100";
      case "order_pickup":
        return "bg-blue-50 border-blue-100";
      case "promo":
        return "bg-orange-50 border-orange-100";
      default:
        return "bg-slate-50 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24 pb-20 md:pb-8">
      {/* ═══ TOP NAVBAR ════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div className="container-custom h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Link href="/marketplace" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors border border-slate-200">
               <ArrowLeft className="w-5 h-5" />
             </Link>
             <h1 className="font-heading text-lg font-bold text-slate-900">Notifikasi</h1>
          </div>
        </div>
      </nav>

      {/* ═══ HEADER & ACTIONS ══════════════════════════════ */}
      <div className="container-custom max-w-2xl mx-auto px-4 sm:px-6 py-6 w-full">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 relative">
                  <Bell className="w-6 h-6 text-blue-500" />
                  {unreadCount > 0 && (
                     <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white ring-2 ring-blue-50"></span>
                  )}
               </div>
               <div>
                  <h2 className="font-heading text-2xl font-extrabold text-slate-900">Pemberitahuan</h2>
                  <p className="text-slate-500 font-medium text-sm">
                     Kamu memiliki {unreadCount} pesan belum dibaca
                  </p>
               </div>
            </div>

            {notifications.length > 0 && (
               <div className="flex items-center gap-2">
                  <button 
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="p-2 sm:px-4 sm:py-2 rounded-xl text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 font-bold text-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                    title="Tandai semua dibaca"
                  >
                     <Check className="w-4 h-4" />
                     <span className="hidden sm:inline">Sudah Dibaca</span>
                  </button>
                  <button 
                    onClick={clearAll}
                    className="p-2 sm:px-4 sm:py-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 font-bold text-xs transition-colors flex items-center gap-2"
                    title="Hapus semua"
                  >
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            )}
         </div>

         {/* ═══ NOTIFICATIONS LIST ═══════════════════════════ */}
         <div className="space-y-4">
            {notifications.length === 0 ? (
               <div className="py-24 flex flex-col items-center justify-center text-center bg-white border border-slate-200 rounded-3xl shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                     <Bell className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">Semuanya bersih!</h3>
                  <p className="text-slate-500 text-sm font-medium">Belum ada notifikasi baru untukmu saat ini.</p>
               </div>
            ) : (
               notifications.map((notif, index) => (
                  <motion.div
                     key={notif.id}
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.05 }}
                     className={cn(
                        "p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-md",
                        notif.is_read 
                           ? "bg-white border-slate-200 shadow-sm" 
                           : "bg-white border-blue-200 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.15)] relative overflow-hidden"
                     )}
                     onClick={() => {
                        setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, is_read: true } : n));
                     }}
                  >
                     {/* Unread indicator line */}
                     {!notif.is_read && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                     )}
                     
                     <div className="flex gap-4">
                        <div className={cn(
                           "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border",
                           getNotificationColor(notif.type)
                        )}>
                           {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-start gap-2 mb-1">
                              <h4 className={cn(
                                 "font-bold text-sm sm:text-base pr-4",
                                 notif.is_read ? "text-slate-700" : "text-slate-900"
                              )}>
                                 {notif.title}
                              </h4>
                              <span className="text-xs font-bold text-slate-400 whitespace-nowrap shrink-0 mt-0.5">
                                 {formatRelativeTime(notif.created_at)}
                              </span>
                           </div>
                           <p className={cn(
                              "text-sm font-medium leading-relaxed",
                              notif.is_read ? "text-slate-500" : "text-slate-600"
                           )}>
                              {notif.message}
                           </p>
                        </div>
                     </div>
                  </motion.div>
               ))
            )}
         </div>
      </div>
    </div>
  );
}
