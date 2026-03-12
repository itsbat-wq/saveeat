"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, ShoppingBag, Clock, Zap } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { MerchantWithBag, MockMerchant } from "@/types";
import CountdownTimer from "@/components/shared/CountdownTimer";

// ============================================================
// SaveEat - MerchantCard Component
// Light mode card with countdown, stock urgency & hover effects
// ============================================================

interface MerchantCardProps {
  merchant: MockMerchant | MerchantWithBag;
  index?: number;
  onFavoriteToggle?: (merchantId: string, isFavorited: boolean) => void;
  isFavorited?: boolean;
  className?: string;
}

export default function MerchantCard({
  merchant,
  index = 0,
  onFavoriteToggle,
  isFavorited = false,
  className,
}: MerchantCardProps) {
  const [favorited, setFavorited] = useState(isFavorited);
  const [imgError, setImgError] = useState(false);

  const bag = merchant.mystery_bag;
  const isAvailable = bag?.status === "available" && (bag?.stock_available ?? 0) > 0;
  const isSoldOut = bag?.status === "sold_out" || (bag?.stock_available ?? 0) === 0;
  const stock = bag?.stock_available ?? 0;

  // Stock urgency level
  const stockUrgency =
    stock === 0
      ? "sold_out"
      : stock <= 2
      ? "critical"
      : stock <= 4
      ? "warning"
      : "normal";

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const next = !favorited;
    setFavorited(next);
    onFavoriteToggle?.(merchant.id, next);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group relative", className)}
    >
      <Link href={`/marketplace/${merchant.id}`} className="block h-full">
        {/* ── Card Shell ──────────────────────────────────── */}
        <div
          className={cn(
            "relative h-full rounded-2xl overflow-hidden cursor-pointer",
            "border transition-all duration-300",
            "bg-white shadow-sm",
            isAvailable
              ? "border-slate-200 hover:border-emerald-300"
              : "border-slate-100",
            "hover:shadow-lg",
            "hover:-translate-y-1 hover:scale-[1.01]",
            isSoldOut && "opacity-80"
          )}
        >
          {/* ── Store Image ──────────────────────────────── */}
          <div className="relative h-44 overflow-hidden bg-slate-100">
            {/* Image */}
            {merchant.store_image_url && !imgError ? (
              <Image
                src={merchant.store_image_url}
                alt={merchant.store_name}
                fill
                className={cn(
                  "object-cover transition-transform duration-700",
                  "group-hover:scale-105",
                  isSoldOut && "grayscale"
                )}
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-slate-300" />
              </div>
            )}

            {/* Gradient overlay bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none" />

            {/* ── Top-right: Favorite button ────────────── */}
            <button
              onClick={handleFavorite}
              aria-label={favorited ? "Hapus dari favorit" : "Tambah ke favorit"}
              className={cn(
                "absolute top-3 right-3 z-10",
                "w-8 h-8 rounded-full flex items-center justify-center",
                "transition-all duration-200 shadow-sm",
                "border border-white/80",
                favorited
                  ? "bg-white"
                  : "bg-white/90 hover:bg-white"
              )}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-all duration-200",
                  favorited
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-slate-400 hover:text-red-500"
                )}
              />
            </button>

            {/* ── Top-left: Discount badge ──────────────── */}
            {bag && isAvailable && (
              <div className="absolute top-3 left-3 z-10">
                <div
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1 rounded-full",
                    "bg-orange-500 text-white text-[10px] font-bold tracking-wide",
                    "shadow-sm"
                  )}
                >
                  <Zap className="w-3 h-3" />
                  HEMAT {bag.discount_percentage}%
                </div>
              </div>
            )}

            {/* ── Sold Out Overlay ─────────────────────── */}
            {isSoldOut && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div
                  className={cn(
                    "px-4 py-2 rounded-xl",
                    "bg-white/95 backdrop-blur-sm",
                    "border border-slate-200",
                    "text-slate-600 font-bold text-sm uppercase tracking-widest shadow-sm"
                  )}
                >
                  Habis Terjual
                </div>
              </div>
            )}

            {/* ── Bottom-left: Distance ─────────────────── */}
            {merchant.distance_from_campus && (
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1">
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full",
                    "bg-white/95 backdrop-blur-sm",
                    "border border-slate-200 shadow-sm",
                    "text-slate-700 text-xs font-semibold"
                  )}
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  {merchant.distance_from_campus}
                </div>
              </div>
            )}
          </div>

          {/* ── Card Body ────────────────────────────────── */}
          <div className="p-4 space-y-3">

            {/* Store name + rating row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-slate-900 text-base leading-tight line-clamp-1 group-hover:text-emerald-600 transition-colors duration-200">
                  {merchant.store_name}
                </h3>
                {merchant.operating_hours && (
                  <p className="text-slate-500 text-xs mt-1 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {merchant.operating_hours}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 shrink-0 bg-yellow-50 px-1.5 py-0.5 rounded-md border border-yellow-100">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                <span className="text-yellow-700 text-xs font-bold">
                  {merchant.rating.toFixed(1)}
                </span>
                <span className="text-yellow-600/70 text-[10px] font-medium hidden sm:inline-block">
                  ({merchant.total_reviews})
                </span>
              </div>
            </div>

            {/* Tags row */}
            {"tags" in merchant && Array.isArray((merchant as MockMerchant).tags) && (
              <div className="flex flex-wrap gap-1.5">
                {(merchant as MockMerchant).tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Price section */}
            {bag ? (
              <div className="space-y-3">
                {/* Prices */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    {/* Discounted price */}
                    <span className="text-emerald-600 text-xl font-extrabold font-heading leading-none">
                      {formatCurrency(bag.discount_price)}
                    </span>
                    {/* Original price crossed */}
                    <span className="text-slate-400 text-xs font-medium line-through">
                      {formatCurrency(bag.original_price)}
                    </span>
                  </div>

                  {/* Stock indicator */}
                  {isAvailable && (
                    <div
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border",
                        stockUrgency === "critical" && "text-red-700 bg-red-50 border-red-200 animate-pulse",
                        stockUrgency === "warning" && "text-orange-700 bg-orange-50 border-orange-200",
                        stockUrgency === "normal" && "text-emerald-700 bg-emerald-50 border-emerald-200"
                      )}
                    >
                      {/* Pulse dot */}
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          stockUrgency === "critical" && "bg-red-500",
                          stockUrgency === "warning" && "bg-orange-500",
                          stockUrgency === "normal" && "bg-emerald-500"
                        )}
                      />
                      {stock <= 1 ? "Sisa 1!" : `Sisa ${stock}`}
                    </div>
                  )}
                </div>

                {/* Countdown timer */}
                {isAvailable && bag.pickup_end_time && (
                  <CountdownTimer
                    pickupEndTime={bag.pickup_end_time}
                    pickupStartTime={bag.pickup_start_time}
                    variant="inline"
                    size="xs"
                    showLabel={true}
                    showIcon={true}
                  />
                )}
              </div>
            ) : (
              <div className="text-slate-500 text-sm font-medium">Tidak ada bag aktif</div>
            )}

            {/* CTA button */}
            {isAvailable ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "w-full mt-1 py-2.5 rounded-xl text-sm font-bold text-center",
                  "bg-emerald-500 text-white",
                  "shadow-sm hover:shadow-md hover:bg-emerald-600",
                  "transition-all duration-300",
                  "flex items-center justify-center gap-2"
                )}
              >
                <ShoppingBag className="w-4 h-4" />
                Pesan Sekarang
              </motion.div>
            ) : (
              <div
                className={cn(
                  "w-full mt-1 py-2.5 rounded-xl text-sm font-bold text-center",
                  "bg-slate-100 text-slate-400 border border-slate-200",
                  "cursor-not-allowed"
                )}
              >
                {isSoldOut ? "Habis Terjual" : "Tidak Tersedia"}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
