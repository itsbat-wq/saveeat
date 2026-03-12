"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Store, 
  MapPin, 
  Clock, 
  Image as ImageIcon, 
  Save, 
  Check, 
  Settings,
  Bell,
  Shield,
  LogOut
} from "lucide-react";
import { MOCK_MERCHANTS } from "@/lib/mock-data";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

// ============================================================
// SaveEat - Merchant Settings Page
// ============================================================

export default function MerchantSettingsPage() {
  const merchant = MOCK_MERCHANTS[0];
  
  const [formData, setFormData] = useState({
    store_name: merchant.store_name,
    store_description: merchant.store_description || "",
    address: merchant.address,
    operating_hours: merchant.operating_hours || "",
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    toast.success("Pengaturan berhasil disimpan!");
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
             <Settings className="w-6 h-6 text-slate-600" />
           </div>
           <div>
            <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
              Pengaturan Toko
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-0.5">
              Kelola profil, lokasi, dan preferensi tokomu
            </p>
           </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
         {/* ═══ SIDEBAR SETTINGS ════════════════════════════ */}
         <div className="w-full md:w-64 shrink-0 space-y-2">
            <button
               onClick={() => setActiveTab("profile")}
               className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left",
                  activeTab === "profile" 
                     ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm" 
                     : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
               )}
            >
               <Store className="w-4 h-4" /> Profil Toko
            </button>
            <button
               onClick={() => setActiveTab("notifications")}
               className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left",
                  activeTab === "notifications" 
                     ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm" 
                     : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
               )}
            >
               <Bell className="w-4 h-4" /> Notifikasi
            </button>
            <button
               onClick={() => setActiveTab("security")}
               className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left",
                  activeTab === "security" 
                     ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm" 
                     : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
               )}
            >
               <Shield className="w-4 h-4" /> Keamanan & Akun
            </button>
            <div className="pt-4 mt-4 border-t border-slate-200">
               <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 border border-red-100 bg-red-50 hover:bg-red-100 transition-all text-left">
                  <LogOut className="w-4 h-4" /> Keluar Akun
               </button>
            </div>
         </div>

         {/* ═══ CONTENT AREA ════════════════════════════════ */}
         <div className="flex-1">
            {activeTab === "profile" && (
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-slate-200 border rounded-2xl shadow-sm overflow-hidden"
               >
                  <div className="p-6 border-b border-slate-100">
                     <h2 className="font-heading text-lg font-bold text-slate-900">Informasi Dasar</h2>
                     <p className="text-slate-500 text-sm mt-1">Detail toko yang akan dilihat oleh pelanggan di aplikasi.</p>
                  </div>
                  
                  <form onSubmit={handleSave} className="p-6 space-y-6">
                     {/* Photo Upload Placeholder */}
                     <div>
                        <label className="text-slate-700 text-sm font-bold mb-3 block">
                           Foto Toko
                        </label>
                        <div className="flex items-center gap-6">
                           <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 relative group cursor-pointer hover:border-emerald-500 transition-colors">
                              {merchant.store_image_url ? (
                                 <>
                                    <img src={merchant.store_image_url} alt="Store" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-slate-900/40 hidden group-hover:flex items-center justify-center">
                                       <ImageIcon className="w-6 h-6 text-white" />
                                    </div>
                                 </>
                              ) : (
                                 <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                              )}
                           </div>
                           <div>
                              <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-sm mb-2">
                                 Ubah Foto
                              </button>
                              <p className="text-xs text-slate-500 font-medium">Format: JPG, PNG. Maksimal 2MB.</p>
                           </div>
                        </div>
                     </div>

                     <div className="grid gap-6 sm:grid-cols-2">
                        {/* Store Name */}
                        <div className="sm:col-span-2">
                           <label htmlFor="store_name" className="text-slate-700 text-sm font-bold mb-2 block">
                              Nama Toko
                           </label>
                           <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                 <Store className="h-4 w-4 text-slate-400" />
                              </div>
                              <input
                                 type="text"
                                 id="store_name"
                                 name="store_name"
                                 value={formData.store_name}
                                 onChange={handleChange}
                                 required
                                 className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
                              />
                           </div>
                        </div>

                        {/* Address */}
                        <div className="sm:col-span-2">
                           <label htmlFor="address" className="text-slate-700 text-sm font-bold mb-2 block">
                              Alamat Lengkap
                           </label>
                           <div className="relative">
                              <div className="absolute top-3.5 left-4 pointer-events-none">
                                 <MapPin className="h-4 w-4 text-slate-400" />
                              </div>
                              <textarea
                                 id="address"
                                 name="address"
                                 value={formData.address}
                                 onChange={handleChange}
                                 required
                                 rows={2}
                                 className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm resize-none"
                              />
                           </div>
                        </div>

                        {/* Operating Hours */}
                        <div className="sm:col-span-2">
                           <label htmlFor="operating_hours" className="text-slate-700 text-sm font-bold mb-2 block">
                              Jam Operasional
                           </label>
                           <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                 <Clock className="h-4 w-4 text-slate-400" />
                              </div>
                              <input
                                 type="text"
                                 id="operating_hours"
                                 name="operating_hours"
                                 value={formData.operating_hours}
                                 onChange={handleChange}
                                 placeholder="Contoh: 08:00 - 21:00"
                                 required
                                 className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
                              />
                           </div>
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                           <label htmlFor="store_description" className="text-slate-700 text-sm font-bold mb-2 block">
                              Deskripsi Singkat
                           </label>
                           <textarea
                              id="store_description"
                              name="store_description"
                              value={formData.store_description}
                              onChange={handleChange}
                              rows={3}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm resize-none"
                           />
                           <p className="text-xs text-slate-500 mt-2 font-medium">Beri tahu pelanggan apa yang spesial dari tokomu, jenis makanan yang kamu jual, dll.</p>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-slate-100 flex justify-end">
                        <motion.button
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           type="submit"
                           disabled={isSaving}
                           className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-sm transition-all disabled:opacity-70 min-w-[140px]"
                        >
                           {isSaving ? (
                              <>
                                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                 Menyimpan...
                              </>
                           ) : (
                              <>
                                 <Save className="w-4 h-4" /> Simpan
                              </>
                           )}
                        </motion.button>
                     </div>
                  </form>
               </motion.div>
            )}

            {/* Empty States for other tabs */}
            {activeTab === "notifications" && (
               <div className="bg-white border-slate-200 border rounded-2xl shadow-sm p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
                     <Bell className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">Preferensi Notifikasi</h3>
                  <p className="text-slate-500 text-sm font-medium">Atur notifikasi apa saja yang ingin kamu terima melalui email atau push notification. Fitur Segera Hadir.</p>
               </div>
            )}
            
            {activeTab === "security" && (
               <div className="bg-white border-slate-200 border rounded-2xl shadow-sm p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
                     <Shield className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">Keamanan</h3>
                  <p className="text-slate-500 text-sm font-medium">Ganti password dan kelola keamanan akunmu. Fitur Segera Hadir.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
