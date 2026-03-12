"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Plus,
  Minus,
  Rocket,
  Trash2,
  Edit2,
  Check,
  ClipboardList
} from "lucide-react";
import { cn, formatCurrency, calculateDiscountPrice } from "@/lib/utils";
import toast from "react-hot-toast";

// ============================================================
// SaveEat - Merchant: Upload & Manage Mystery Bag
// Light Mode Version
// ============================================================

interface BagHistory {
  id: string;
  date: string;
  quantity: number;
  sold: number;
  remaining: number;
  status: "published" | "expired" | "draft";
}

const HISTORY: BagHistory[] = [
  { id: "h1", date: "2024-03-10", quantity: 5, sold: 5, remaining: 0, status: "expired" },
  { id: "h2", date: "2024-03-09", quantity: 4, sold: 4, remaining: 0, status: "expired" },
  { id: "h3", date: "2024-03-08", quantity: 6, sold: 5, remaining: 1, status: "expired" },
  { id: "h4", date: "2024-03-07", quantity: 3, sold: 3, remaining: 0, status: "expired" },
  { id: "h5", date: "2024-03-06", quantity: 5, sold: 4, remaining: 1, status: "expired" },
];

export default function MerchantBagsPage() {
  const [quantity, setQuantity] = useState(3);
  const [originalPrice, setOriginalPrice] = useState(45000);
  const [discountPct, setDiscountPct] = useState(67);
  const [pickupStart, setPickupStart] = useState("20:00");
  const [pickupEnd, setPickupEnd] = useState("21:00");
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const discountPrice = calculateDiscountPrice(originalPrice, discountPct);

  async function handlePublish() {
    setIsPublishing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsPublishing(false);
    setPublished(true);
    toast.success("Mystery Bag berhasil dipublikasikan!");
    setTimeout(() => setPublished(false), 3000);
  }

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="flex items-center gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
           <Package className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
            Mystery Bag
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-0.5">
            Buat dan kelola Mystery Bag untuk dijual ke pelanggan.
          </p>
        </div>
      </div>

      {/* ═══ FORM ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl"
      >
        <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
          <Plus className="w-5 h-5 text-orange-500 bg-orange-50 p-0.5 rounded-md" />
          Publikasikan Mystery Bag Baru
        </h2>

        {/* Quantity */}
        <div>
          <label className="text-slate-700 text-sm font-bold mb-3 block">
            Jumlah Bag
          </label>
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200 inline-flex shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-sm hover:shadow transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-3xl font-heading font-extrabold text-slate-900 w-16 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(20, quantity + 1))}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-sm hover:shadow transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Original Price */}
        <div>
          <label className="text-slate-700 text-sm font-bold mb-3 block">
            Harga Asli per Bag
          </label>
          <div className="relative max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
              Rp
            </span>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
              min={5000}
              step={5000}
            />
          </div>
        </div>

        {/* Discount Slider */}
        <div className="max-w-xl">
          <div className="flex items-center justify-between mb-3">
            <label className="text-slate-700 text-sm font-bold">
              Tingkat Diskon
            </label>
            <span className="text-orange-500 font-extrabold text-lg px-3 py-1 bg-orange-50 rounded-lg border border-orange-100">
              {discountPct}%
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={80}
            value={discountPct}
            onChange={(e) => setDiscountPct(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none flex cursor-pointer bg-slate-200 shadow-inner"
            style={{
              background: `linear-gradient(to right, #f97316 ${((discountPct - 50) / 30) * 100}%, #e2e8f0 ${((discountPct - 50) / 30) * 100}%)`,
            }}
          />
          <style dangerouslySetInnerHTML={{__html: `
            input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 24px;
              width: 24px;
              border-radius: 50%;
              background: #fff;
              border: 3px solid #f97316;
              cursor: pointer;
              margin-top: -10px;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
            }
          `}} />
          <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 px-1">
            <span>50%</span>
            <span>80%</span>
          </div>
        </div>

        {/* Discount Price Display */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 text-center max-w-sm shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.8) 0%, transparent 70%)" }} />
          <p className="text-emerald-700 font-bold uppercase tracking-wider text-xs mb-2">Harga Jual Akhir</p>
          <p className="text-4xl font-heading font-extrabold text-emerald-600 drop-shadow-sm">
            {formatCurrency(discountPrice)}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 text-slate-600 text-xs font-semibold shadow-sm border border-emerald-100">
             dari <span className="line-through decoration-slate-400 font-bold">{formatCurrency(originalPrice)}</span>
          </div>
        </div>

        {/* Pickup Time */}
        <div className="grid grid-cols-2 gap-4 max-w-sm">
          <div>
            <label className="text-slate-700 text-sm font-bold mb-2 block">
              Mulai Pickup
            </label>
            <input
              type="time"
              value={pickupStart}
              onChange={(e) => setPickupStart(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="text-slate-700 text-sm font-bold mb-2 block">
              Selesai Pickup
            </label>
            <input
              type="time"
              value={pickupEnd}
              onChange={(e) => setPickupEnd(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Publish Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePublish}
          disabled={isPublishing || published}
          className={cn(
            "w-full max-w-sm py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2",
            "transition-all shadow-md mt-4",
            published
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-orange-500 hover:bg-orange-600",
             isPublishing && "opacity-80"
          )}
        >
          {isPublishing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memproses...
            </>
          ) : published ? (
            <>
              <Check className="w-5 h-5" />
              Berhasil Dipublikasikan!
            </>
          ) : (
            <>
              <Rocket className="w-5 h-5" />
              Publikasikan
            </>
          )}
        </motion.button>
      </motion.div>

      {/* ═══ HISTORY TABLE ═════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden"
      >
        <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-500 bg-blue-50 p-0.5 rounded-md" /> Riwayat Bag
        </h2>

        <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="font-bold text-slate-500 py-3 pr-4 uppercase tracking-wider text-[11px]">
                  Tanggal
                </th>
                <th className="font-bold text-center text-slate-500 py-3 px-4 uppercase tracking-wider text-[11px]">
                  Jumlah
                </th>
                <th className="font-bold text-center text-slate-500 py-3 px-4 uppercase tracking-wider text-[11px]">
                  Terjual
                </th>
                <th className="font-bold text-center text-slate-500 py-3 px-4 uppercase tracking-wider text-[11px]">
                  Sisa
                </th>
                <th className="font-bold text-right text-slate-500 py-3 pl-4 uppercase tracking-wider text-[11px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HISTORY.map((h) => (
                <tr
                  key={h.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-4 pr-4 font-bold text-slate-900">{h.date}</td>
                  <td className="py-4 px-4 text-center font-medium text-slate-600">
                    {h.quantity}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-emerald-600">
                    {h.sold}
                  </td>
                  <td className="py-4 px-4 text-center font-medium text-slate-600">
                    {h.remaining}
                  </td>
                  <td className="py-4 pl-4 text-right">
                     <span className={cn(
                        "inline-flex px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border shadow-sm",
                        h.status === "expired" ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                     )}>
                        {h.status === "expired" ? "Selesai" : h.status}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
