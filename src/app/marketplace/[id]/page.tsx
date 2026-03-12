"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  ShoppingBag,
  Heart,
  Share2,
  Minus,
  Plus,
  Check,
  Leaf,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  PartyPopper,
  Info
} from "lucide-react";
import { cn, formatCurrency, generateQRSignature, shareOrder } from "@/lib/utils";
import { MOCK_MERCHANTS, MOCK_MYSTERY_BAGS, MOCK_REVIEWS } from "@/lib/mock-data";
import CountdownTimer from "@/components/shared/CountdownTimer";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";

// ============================================================
// SaveEat - Merchant Detail + Checkout Page
// Light Mode Version
// ============================================================

type Step = "detail" | "payment" | "success";

export default function MerchantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const merchantId = params.id as string;

  const [step, setStep] = useState<Step>("detail");
  const [quantity, setQuantity] = useState(1);
  const [favorited, setFavorited] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Find merchant and bag
  const merchant = MOCK_MERCHANTS.find((m) => m.id === merchantId);
  const bag = MOCK_MYSTERY_BAGS.find((b) => b.merchant_id === merchantId);
  const reviews = MOCK_REVIEWS.filter((r) => r.merchant_id === merchantId);

  if (!merchant || !bag) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
          <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 font-medium text-lg mb-6">Merchant tidak ditemukan</p>
          <Link href="/marketplace" className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors">
            Kembali ke Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = bag.status === "available" && bag.stock_available > 0;
  const totalPrice = bag.discount_price * quantity;
  const maxQty = Math.min(bag.stock_available, 5);

  // QR Data
  const orderId = `order-${Date.now()}`;
  const qrData = JSON.stringify({
    order_id: orderId,
    user_id: user?.id || "guest",
    merchant_id: merchantId,
    mystery_bag_id: bag.id,
    total_price: totalPrice,
    timestamp: new Date().toISOString(),
    signature: generateQRSignature(orderId, user?.id || "guest"),
  });

  async function handlePayment() {
    if (!isAuthenticated) {
      toast.error("Silakan login terlebih dahulu");
      router.push("/login?role=student");
      return;
    }
    setIsProcessing(true);
    // Simulate payment delay
    await new Promise((r) => setTimeout(r, 1500));
    setIsProcessing(false);
    setStep("success");
    toast.success("Pembayaran berhasil!");
  }

  async function handleShare() {
    if (!merchant || !bag) return;
    const shared = await shareOrder(merchant.store_name, bag.original_price - bag.discount_price);
    if (shared) toast.success("Berhasil dibagikan!");
    else toast.success("Link disalin ke clipboard!");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ═══ TOP BAR ════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => (step === "detail" ? router.back() : setStep("detail"))}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === "detail" ? "Marketplace" : "Kembali"}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFavorited(!favorited)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                favorited
                  ? "bg-red-50 text-red-500 border border-red-100"
                  : "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50"
              )}
            >
              <Heart
                className={cn(
                  "w-5 h-5",
                  favorited && "fill-current"
                )}
              />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {/* ═══ STEP 1: DETAIL ════════════════════════════════ */}
        {step === "detail" && (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-32"
          >
            {/* Store header */}
            <div className="glass-card p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Store image */}
                <div className="w-full sm:w-48 h-40 sm:h-48 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
                  {merchant.store_image_url ? (
                    <img
                      src={merchant.store_image_url}
                      alt={merchant.store_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-slate-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <h1 className="font-heading text-3xl font-bold text-slate-900">
                    {merchant.store_name}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm font-medium">
                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-yellow-50 text-yellow-700 border border-yellow-100">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      {merchant.rating.toFixed(1)}
                      <span className="text-yellow-600/70">
                        ({merchant.total_reviews})
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      {merchant.distance_from_campus}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {merchant.operating_hours}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                    {merchant.store_description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {merchant.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            {isAvailable && (
              <div className="glass-card p-8 border-t-4 border-t-emerald-500 bg-white">
                <CountdownTimer
                  pickupEndTime={bag.pickup_end_time}
                  pickupStartTime={bag.pickup_start_time}
                  variant="hero"
                  size="lg"
                />
              </div>
            )}

            {/* Mystery Bag Info */}
            <div className="glass-card p-6 border-slate-200">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                Detail Mystery Bag
              </h2>

              {/* Price */}
              <div className="flex items-center gap-4 mb-5">
                <span className="text-4xl font-extrabold font-heading text-emerald-600">
                  {formatCurrency(bag.discount_price)}
                </span>
                <span className="text-slate-400 text-lg font-medium line-through">
                  {formatCurrency(bag.original_price)}
                </span>
                <span className="px-3 py-1 rounded-md bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200">
                  HEMAT {bag.discount_percentage}%
                </span>
              </div>

              {/* Stock */}
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold border mb-5",
                  bag.stock_available <= 2
                    ? "text-red-700 bg-red-50 border-red-200 animate-pulse"
                    : "text-emerald-700 bg-emerald-50 border-emerald-200"
                )}
              >
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    bag.stock_available <= 2 ? "bg-red-500" : "bg-emerald-500"
                  )}
                />
                Sisa {bag.stock_available} Bag
              </div>

              {/* Quantity selector */}
              {isAvailable && (
                <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                  <span className="text-slate-600 font-semibold text-sm">Jumlah Bag:</span>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-50 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-slate-900 font-bold text-lg w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                      disabled={quantity >= maxQty}
                      className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-50 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-slate-500 font-medium mb-0.5">Subtotal</p>
                    <span className="text-emerald-600 font-bold text-xl">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="glass-card p-6">
                <h2 className="font-heading text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  Ulasan Pembeli
                </h2>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
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
                      <p className="text-slate-600 text-sm font-medium">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sticky CTA */}
            {isAvailable && (
              <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Bayar</p>
                    <p className="text-emerald-600 font-heading text-2xl font-bold mt-0.5">
                      {formatCurrency(totalPrice)}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep("payment")}
                    className="flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-500 text-white font-bold shadow-sm hover:bg-orange-600 hover:shadow-md transition-all text-sm sm:text-base"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Pesan & Bayar
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ═══ STEP 2: PAYMENT CONFIRMATION ══════════════════ */}
        {step === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-lg mx-auto px-4 sm:px-6 py-8 space-y-6"
          >
            <h2 className="font-heading text-2xl font-bold text-slate-900 text-center">
              Konfirmasi Pembayaran
            </h2>

            <div className="glass-card p-6 space-y-5">
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-lg">
                    {merchant.store_name}
                  </p>
                  <p className="text-slate-500 text-sm font-medium">
                    Mystery Bag × {quantity}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Harga Bag</span>
                  <span className="text-slate-900">
                    {quantity} × {formatCurrency(bag.discount_price)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-900 font-semibold">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Biaya layanan (15%)</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded textxs font-bold border border-emerald-100">Termasuk</span>
                </div>
                <div className="h-px bg-slate-200 my-4" />
                <div className="flex justify-between text-lg font-bold items-center">
                  <span className="text-slate-900">Total Bayar</span>
                  <span className="text-emerald-600 text-xl">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex items-start sm:items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xs sm:text-sm text-emerald-800 font-medium leading-relaxed">
                <Leaf className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5 sm:mt-0" />
                <span>
                  Dengan membeli ini, kamu menyelamatkan ~<strong className="text-emerald-700">{(quantity * 0.5).toFixed(1)} kg</strong> makanan dan mencegah ~<strong className="text-emerald-700">{(quantity * 1.23).toFixed(2)} kg</strong> emisi CO₂.
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={isProcessing}
              className={cn(
                "w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 text-base",
                "bg-emerald-500",
                "shadow-sm",
                "hover:bg-emerald-600 hover:shadow-md",
                "transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Bayar {formatCurrency(totalPrice)}
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* ═══ STEP 3: SUCCESS + QR ═════════════════════════ */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto px-4 sm:px-6 py-8 space-y-8 text-center"
          >
            {/* Success animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-24 h-24 mx-auto rounded-full bg-emerald-100 border-4 border-emerald-500/20 flex items-center justify-center shadow-lg"
            >
              <Check className="w-12 h-12 text-emerald-500" />
            </motion.div>

            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
                Pesanan Berhasil! <PartyPopper className="w-8 h-8 text-orange-500" />
              </h2>
              <p className="text-slate-600 text-sm font-medium">
                Tunjukkan QR Code ini ke <strong className="text-slate-900">{merchant.store_name}</strong> saat pickup.
              </p>
            </div>

            {/* QR Code */}
            <div className="glass-card p-8 inline-block mx-auto bg-white border-2 border-emerald-100 shadow-md">
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <QRCode value={qrData} size={220} level="M" />
              </div>
              <p className="text-slate-500 text-xs mt-4 font-mono font-bold bg-slate-50 py-1.5 rounded-md border border-slate-200">
                ID: {orderId}
              </p>
            </div>

            {/* Pickup info */}
            <div className="glass-card p-6 text-left space-y-4 bg-white">
              <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2 pb-3 border-b border-slate-100">
                <MapPin className="w-4 h-4 text-emerald-500" /> Info Pickup
              </h3>
              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between items-start">
                  <span className="text-slate-500 w-28">Toko</span>
                  <span className="text-slate-900 font-bold text-right leading-tight">
                    {merchant.store_name}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-500 w-28">Alamat</span>
                  <span className="text-slate-600 text-right leading-relaxed max-w-[200px]">
                    {merchant.address}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 w-28">Waktu Pickup</span>
                  <span className="text-emerald-600 font-bold px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-100">
                    {bag.pickup_start_time} – {bag.pickup_end_time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 w-28">Jumlah Bag</span>
                  <span className="text-slate-900 font-bold">{quantity}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 w-28">Total Dibayar</span>
                  <span className="text-emerald-600 font-bold text-lg">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="w-full py-3.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold shadow-sm hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Bagikan ke Teman
              </motion.button>

              <div className="flex gap-3">
                <Link href="/orders" className="flex-1 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200 hover:bg-slate-200 transition-colors">
                  Lihat Pesanan
                </Link>
                <Link href="/marketplace" className="flex-1 py-3.5 rounded-xl bg-orange-500 text-white font-bold shadow-sm hover:bg-orange-600 transition-colors">
                  Kembali Belanja
                </Link>
              </div>
            </div>
            
            {/* Note */}
            <p className="text-xs text-slate-400 font-medium">Tunjukkan kode ini sebelum tenggat waktu pickup habis.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
