"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Search, Filter } from "lucide-react";
import { MOCK_FAVORITES } from "@/lib/mock-data";
import MerchantCard from "@/components/marketplace/MerchantCard";
import Link from "next/link";
import { getStaggerDelay } from "@/lib/utils";

// ============================================================
// SaveEat - Customer Favorites Page
// ============================================================

export default function FavoritesPage() {
  const favorites = MOCK_FAVORITES;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24 pb-20 md:pb-8">
      {/* ═══ TOP NAVBAR (Customer) ═════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div className="container-custom h-16 flex items-center justify-between">
          <Link href="/marketplace" className="font-heading text-xl font-black tracking-tighter text-emerald-600">
            Save<span className="text-orange-500">Eat</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/marketplace"
              className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
            >
              Cari Makanan
            </Link>
            <Link
              href="/favorites"
              className="text-sm font-bold text-emerald-600 transition-colors flex items-center gap-1.5 border-b-2 border-emerald-500 py-5"
            >
              <Heart className="w-4 h-4 fill-emerald-600" /> Disimpan
            </Link>
            <Link
              href="/orders"
              className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
            >
              Pesanan
            </Link>
          </div>

          <div className="flex items-center gap-3">
             <Link href="/notifications" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative">
               <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
             </Link>
            <Link href="/profile">
              <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-emerald-500 hover:ring-offset-2 transition-all p-0.5">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ariel"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HEADER ════════════════════════════════════════ */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container-custom max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                 <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center border border-rose-100">
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                 </div>
                 Disimpan
              </h1>
              <p className="text-slate-500 mt-2 text-base font-medium max-w-xl">
                Toko dan cafe favorit yang sudah kamu simpan. Pantau ketersediaan Mystery Bag mereka dengan mudah.
              </p>
            </div>
            
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm tracking-wide self-start md:self-auto hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm"
             >
                <Filter className="w-4 h-4" /> Filter
             </motion.button>
          </div>
        </div>
      </div>

      {/* ═══ FAVORITES GRID ════════════════════════════════ */}
      <main className="flex-1 container-custom max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
         {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white border border-slate-200 rounded-3xl shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Belum ada favorit</h3>
              <p className="text-slate-500 max-w-md mx-auto font-medium">
                Kamu belum menyimpan toko apa pun. Coba jelajahi marketplace dan simpan toko favoritmu.
              </p>
              <Link 
                href="/marketplace"
                className="mt-6 inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold tracking-wide hover:bg-emerald-600 transition-colors shadow-sm"
              >
                <Search className="w-4 h-4" />
                Cari Makanan
              </Link>
            </div>
         ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((fav, index) => {
                  if (!fav.merchant) return null;
                  return (
                    <motion.div
                      key={fav.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <MerchantCard merchant={fav.merchant} />
                    </motion.div>
                  );
                })}
              </div>
         )}
      </main>
      
      {/* ═══ MOBILE BOTTOM NAV ═════════════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
        <div className="flex items-center justify-around h-16 px-4">
          <Link
            href="/marketplace"
            className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-bold">Cari</span>
          </Link>
          <Link
            href="/favorites"
            className="flex flex-col items-center gap-1 p-2 text-emerald-600 transition-colors"
          >
            <Heart className="w-5 h-5 fill-emerald-600" />
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
            className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px] font-bold">Profil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
