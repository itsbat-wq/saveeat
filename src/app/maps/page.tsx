"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Store,
  Clock,
  Star,
  Navigation,
  ExternalLink,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_MERCHANTS } from "@/lib/mock-data";

// ============================================================
// SaveEat - Maps Page
// Google Maps integration with merchant markers
// ============================================================

export default function MapsPage() {
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const merchants = MOCK_MERCHANTS;

  const filtered = useMemo(() => {
    if (!searchQuery) return merchants;
    return merchants.filter(
      (m) =>
        m.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [merchants, searchQuery]);

  // Build Google Maps embed URL
  // Center on Bandung (ITB area as default campus)
  const centerLat = -6.8915;
  const centerLng = 107.6107;

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15843.5!2d${centerLng}!3d${centerLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid`;

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-emerald-500" />
                Peta Merchant
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Temukan kafe & restoran terdekat dengan Mystery Bag tersedia
              </p>
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari merchant..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-medium text-slate-900 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white" style={{ minHeight: "500px" }}>
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "500px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SaveEat Merchant Map"
            />
          </div>

          {/* Merchant List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {filtered.length} Merchant Ditemukan
            </p>

            {filtered.map((merchant) => (
              <motion.div
                key={merchant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() =>
                  setSelectedMerchant(
                    selectedMerchant === merchant.id ? null : merchant.id
                  )
                }
                className={cn(
                  "p-4 rounded-2xl border bg-white cursor-pointer transition-all",
                  selectedMerchant === merchant.id
                    ? "border-emerald-400 shadow-md ring-1 ring-emerald-200"
                    : "border-slate-200 hover:border-emerald-200 shadow-sm"
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Store Icon */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      selectedMerchant === merchant.id
                        ? "bg-emerald-100"
                        : "bg-slate-100"
                    )}
                  >
                    <Store
                      className={cn(
                        "w-5 h-5",
                        selectedMerchant === merchant.id
                          ? "text-emerald-600"
                          : "text-slate-500"
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-slate-900 text-sm truncate">
                      {merchant.store_name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-slate-700">
                          {merchant.rating}
                        </span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {merchant.distance_from_campus}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{merchant.address}</span>
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{merchant.operating_hours}</span>
                    </div>

                    {/* Expanded Info */}
                    {selectedMerchant === merchant.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-slate-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500">
                            Mystery Bag tersedia
                          </span>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {merchant.mystery_bag.stock_available} bag
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-slate-500">Harga</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs line-through text-slate-400">
                              Rp{" "}
                              {merchant.mystery_bag.original_price.toLocaleString(
                                "id-ID"
                              )}
                            </span>
                            <span className="text-sm font-bold text-emerald-600">
                              Rp{" "}
                              {merchant.mystery_bag.discount_price.toLocaleString(
                                "id-ID"
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={`https://www.google.com/maps/search/${encodeURIComponent(
                              merchant.store_name + " " + merchant.address
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            Navigasi
                          </a>
                          <a
                            href={`/marketplace/${merchant.id}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Detail
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
