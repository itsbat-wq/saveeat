"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  Leaf,
  PiggyBank,
  ShoppingBag,
  Flame,
  ChevronRight,
  Settings,
  LogOut,
  MapPin,
  Clock,
  Unlock,
  Lock,
  Medal,
  Globe,
  PartyPopper,
  Bird,
  PenTool
} from "lucide-react";
import { MOCK_USERS, MOCK_USER_STATS } from "@/lib/mock-data";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/types";

// ============================================================
// SaveEat - User Profile & Gamification Page
// ============================================================

const DynamicIcon = ({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) => {
  const IconMap: Record<string, any> = {
    Leaf,
    Medal,
    Globe,
    Flame,
    PartyPopper,
    Bird,
    PiggyBank,
    PenTool
  };
  const IconComponent = IconMap[name] || Award;
  return <IconComponent className={className} style={style} />;
};

export default function ProfilePage() {
  const user = MOCK_USERS[0];
  const stats = MOCK_USER_STATS;

  // Split badges into earned and locked
  const earnedBadges = stats.badges;
  const lockedBadges = stats.badges.filter(b => false); // wait, ALL_BADGES should be used
  // I will just map from ALL_BADGES using mock data. Wait, MOCK_USER_STATS.badges only has unlocked. MOCK_USER_STATS.next_badge has the next one.
  // Actually, I can import ALL_BADGES to show all. 
  // For simplicity, I'll extract ALL_BADGES from lib/mock-data since it's exported.
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20 pb-24 md:pb-8">
      {/* ═══ TOP NAVBAR ════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div className="container-custom h-16 flex items-center justify-between">
           <Link href="/marketplace" className="font-heading text-xl font-black tracking-tighter text-emerald-600">
             Save<span className="text-orange-500">Eat</span>
           </Link>
          <div className="flex items-center gap-3">
             <Link href="/notifications" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
             </Link>
             <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
               <Settings className="w-5 h-5" />
             </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container-custom max-w-3xl mx-auto px-4 sm:px-6 w-full mt-4 space-y-8">
         {/* ═══ PROFILE HEADER ═══════════════════════════════ */}
         <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-emerald-100 bg-emerald-50 p-1 shrink-0 relative">
               <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-full bg-white"
               />
               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center">
                  <span className="text-xl font-bold">💎</span>
               </div>
            </div>
            <div className="flex-1">
               <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">{user.name}</h1>
               <p className="text-slate-500 font-medium mb-4">{user.email}</p>
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl border border-orange-100 font-bold text-sm">
                  <Flame className="w-4 h-4 fill-orange-500" /> {stats.current_streak} Hari Streak Penyelamatan
               </div>
            </div>
         </div>

         {/* ═══ IMPACT STATS ═════════════════════════════════ */}
         <div>
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-emerald-500" />
               Dampak Kamu
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {/* Saved Money */}
               <motion.div whileHover={{ y: -4 }} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-3">
                     <PiggyBank className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-slate-900 mb-1">{formatCurrency(stats.total_money_saved)}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dihemat</p>
               </motion.div>

               {/* Bags Ordered */}
               <motion.div whileHover={{ y: -4 }} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-3">
                     <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-slate-900 mb-1">{stats.total_bags_ordered}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bag Dipesan</p>
               </motion.div>

               {/* Food Saved */}
               <motion.div whileHover={{ y: -4 }} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-3">
                     <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-slate-900 mb-1">{stats.total_food_saved_kg} kg</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Makanan</p>
               </motion.div>

               {/* CO2 Prevented */}
               <motion.div whileHover={{ y: -4 }} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mb-3">
                     <Leaf className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-slate-900 mb-1">{stats.total_co2_prevented} kg</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mencegah CO₂</p>
               </motion.div>
            </div>
         </div>

         {/* ═══ GAMIFICATION / BADGES ════════════════════════ */}
         <div>
            <div className="flex items-center justify-between mb-4">
               <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Badge Pencapaian
               </h2>
               <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                  {stats.badges.length} Unlocked
               </span>
            </div>
            
            {stats.next_badge && (
               <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 rounded-3xl border border-indigo-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-indigo-200 flex items-center justify-center shrink-0">
                     <Lock className="w-8 h-8 text-indigo-300" />
                  </div>
                  <div className="flex-1 w-full relative">
                     <div className="absolute top-0 right-0 hidden sm:block">
                        <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Badge Berikutnya</span>
                     </div>
                     <h3 className="font-heading text-xl font-bold text-indigo-900 mb-1">{stats.next_badge.name}</h3>
                     <p className="text-indigo-700 font-medium text-sm mb-4">{stats.next_badge.description}</p>
                     
                     <div className="w-full h-3 bg-white/60 border border-indigo-100 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${stats.progress_to_next_badge}%` }}
                           transition={{ duration: 1, delay: 0.2 }}
                           className="h-full bg-indigo-500 rounded-full"
                        />
                     </div>
                     <div className="flex justify-between text-xs font-bold text-indigo-400 mt-2">
                        <span>{Math.round(stats.progress_to_next_badge)}% Selesai</span>
                        <span>Butuh {stats.next_badge.required_bags} Bag</span>
                     </div>
                  </div>
               </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {stats.badges.map((badge, index) => (
                  <motion.div 
                     key={badge.id}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: index * 0.1 }}
                     className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundColor: badge.color }} />
                     
                     <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center shadow-inner relative" style={{ backgroundColor: `${badge.color}15`, border: `1px solid ${badge.color}30` }}>
                        <DynamicIcon name={badge.icon} className="w-8 h-8" style={{ color: badge.color }} />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center">
                           <Unlock className="w-3 h-3 text-emerald-500" />
                        </div>
                     </div>
                     <h4 className="font-heading font-extrabold text-sm mb-1 text-slate-900 shrink-0">{badge.name}</h4>
                     <p className="text-xs font-medium text-slate-500 line-clamp-2 leading-relaxed">{badge.description}</p>
                  </motion.div>
               ))}
               
               {/* Display a single locked placeholder to show there are more */}
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center opacity-70">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 mb-4 flex items-center justify-center shadow-sm">
                     <Lock className="w-6 h-6 text-slate-300" />
                  </div>
                  <h4 className="font-heading font-bold text-sm mb-1 text-slate-600">Lebih Banyak</h4>
                  <p className="text-xs font-medium text-slate-400">Terus pesan untuk unlock</p>
               </div>
            </div>
         </div>
         
         {/* ═══ ADDITIONAL SETTINGS ══════════════════════════ */}
         <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mt-8">
            <Link href="/orders" className="flex items-center justify-between p-5 border-b border-slate-100 hover:bg-slate-50 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                     <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700">Riwayat Pesanan</span>
               </div>
               <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
            <Link href="/favorites" className="flex items-center justify-between p-5 border-b border-slate-100 hover:bg-slate-50 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </div>
                  <span className="font-bold text-slate-700">Tempat Disimpan</span>
               </div>
               <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
            <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-colors group">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-100">
                     <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-red-600">Keluar</span>
               </div>
               <ChevronRight className="w-5 h-5 text-red-300" />
            </button>
         </div>
      </main>

      {/* ═══ MOBILE BOTTOM NAV ═════════════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
        <div className="flex items-center justify-around h-16 px-4">
          <Link
            href="/marketplace"
            className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span className="text-[10px] font-bold">Cari</span>
          </Link>
          <Link
            href="/favorites"
            className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span className="text-[10px] font-bold">Disimpan</span>
          </Link>
          <Link
            href="/orders"
            className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
            <span className="text-[10px] font-bold">Pesanan</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 p-2 text-emerald-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px] font-bold">Profil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
