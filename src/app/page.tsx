"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Store, Leaf, Globe, Zap, CheckCircle, Star,
  Search, Smartphone, PartyPopper, Package, Bell, Wind, Coins,
  Wheat, Briefcase, Recycle, Timer, Map, BarChart, Trophy, Plus,
  Users
} from "lucide-react";
import dynamic from "next/dynamic";
import { cn, formatNumber } from "@/lib/utils";
import MerchantCard from "@/components/marketplace/MerchantCard";
import { MOCK_MERCHANTS } from "@/lib/mock-data";
import { MockMerchant } from "@/types";

// ─── Lazy-load 3D scene (no SSR) ───────────────────────────
const HeroScene3D = dynamic(
  () => import("@/components/landing/HeroScene3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-40 rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />
      </div>
    ),
  }
);

// ─── Animated counter ──────────────────────────────────────
function AnimatedCounter({ end, duration = 2.5, prefix = "", suffix = "", decimals = 0 }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1000 / duration, 1);
      setCount(parseFloat((end * ease(p)).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : formatNumber(Math.floor(count))}
      {suffix}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// LANDING PAGE
// ═══════════════════════════════════════════════════════════
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const howRef = useRef(null);
  const impactRef = useRef(null);
  const merchantRef = useRef(null);
  const featRef = useRef(null);
  const previewRef = useRef(null);

  const howInView = useInView(howRef, { once: true, margin: "-80px" });
  const impactInView = useInView(impactRef, { once: true, margin: "-80px" });
  const featInView = useInView(featRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  }, []);

  const navLinks = [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Cara Kerja", href: "#how" },
    { label: "SDG Impact", href: "#impact" },
    { label: "Merchant", href: "#merchant" },
  ];

  const tickerItems = [
    "1.204 kg makanan diselamatkan",
    "2.450+ bag terjual",
    "3.010 kg CO₂ dicegah",
    "Rating rata-rata 4.7/5.0",
    "500+ merchant bergabung",
    "Hemat hingga 70% setiap hari",
    "Platform Food Rescue #1",
  ];
  const tickerDoubled = [...tickerItems, ...tickerItems];

  const howGroups = [
    {
      title: "Untuk Mahasiswa",
      iconRef: <ShoppingBag className="w-5 h-5 text-orange-500" />,
      borderCls: "border-orange-500/25 bg-orange-50",
      items: [
        { iconRef: <Search className="w-5 h-5" />, n: "01", title: "Cari Mystery Bag", desc: "Browse marketplace, filter berdasarkan jarak, harga, atau rating.", color: "border-emerald-200 bg-emerald-50 text-emerald-600" },
        { iconRef: <ShoppingBag className="w-5 h-5" />, n: "02", title: "Pesan & Bayar", desc: "Pilih jumlah bag dan konfirmasi. Proses cepat dalam hitungan detik.", color: "border-blue-200 bg-blue-50 text-blue-600" },
        { iconRef: <Smartphone className="w-5 h-5" />, n: "03", title: "Dapat QR Code", desc: "QR Code unik langsung dikirim. Tunjukkan ke merchant saat pickup!", color: "border-purple-200 bg-purple-50 text-purple-600" },
        { iconRef: <PartyPopper className="w-5 h-5" />, n: "04", title: "Pickup & Nikmati!", desc: "Ambil mystery bag, beri rating, kumpulkan badge achievement!", color: "border-orange-200 bg-orange-50 text-orange-600" },
      ],
    },
    {
      title: "Untuk Merchant",
      iconRef: <Store className="w-5 h-5 text-emerald-500" />,
      borderCls: "border-emerald-500/25 bg-emerald-50",
      items: [
        { iconRef: <Store className="w-5 h-5" />, n: "01", title: "Daftar & Setup Toko", desc: "Buat profil toko, unggah foto, dan atur jam operasional.", color: "border-emerald-200 bg-emerald-50 text-emerald-600" },
        { iconRef: <Package className="w-5 h-5" />, n: "02", title: "Publikasikan Bag", desc: "Atur jumlah, harga diskon, dan jam pickup. Langsung tampil di marketplace!", color: "border-blue-200 bg-blue-50 text-blue-600" },
        { iconRef: <Bell className="w-5 h-5" />, n: "03", title: "Terima Pesanan", desc: "Notifikasi real-time setiap pesanan masuk. Konfirmasi dengan mudah.", color: "border-purple-200 bg-purple-50 text-purple-600" },
        { iconRef: <CheckCircle className="w-5 h-5" />, n: "04", title: "Scan & Selesai!", desc: "Scan QR mahasiswa, tandai picked up, cek laporan pendapatanmu.", color: "border-orange-200 bg-orange-50 text-orange-600" },
      ],
    },
  ];

  const impactStats = [
    { value: 1204, suffix: " kg", label: "Makanan Diselamatkan", iconRef: <Leaf className="w-6 h-6"/>, color: "text-emerald-500", glow: "rgba(16,185,129,0.15)" },
    { value: 3010, suffix: " kg", label: "CO₂ Dicegah", iconRef: <Wind className="w-6 h-6"/>, color: "text-blue-500", glow: "rgba(59,130,246,0.15)" },
    { value: 45, prefix: "Rp ", suffix: " Jt", label: "Uang Dihemat", iconRef: <Coins className="w-6 h-6"/>, color: "text-yellow-500", glow: "rgba(234,179,8,0.15)" },
    { value: 2450, suffix: "+", label: "Mystery Bag Terjual", iconRef: <ShoppingBag className="w-6 h-6"/>, color: "text-orange-500", glow: "rgba(249,115,22,0.15)" },
  ];

  const sdgs = [
    { num: "2", title: "Tanpa Kelaparan", desc: "Akses makanan berkualitas terjangkau bagi mahasiswa.", color: "bg-yellow-500", iconRef: <Wheat className="w-8 h-8"/> },
    { num: "8", title: "Pekerjaan & Ekonomi", desc: "Membantu UMKM kuliner meminimalisir kerugian operasional.", color: "bg-red-500", iconRef: <Briefcase className="w-8 h-8"/> },
    { num: "12", title: "Konsumsi Bertanggung Jawab", desc: "Mengurangi food waste di tingkat ritel melalui model inovatif.", color: "bg-orange-500", iconRef: <Recycle className="w-8 h-8"/> },
    { num: "13", title: "Penanganan Iklim", desc: "Mencegah emisi metana dari sampah makanan organik di TPA.", color: "bg-green-600", iconRef: <Globe className="w-8 h-8"/> },
  ];

  const features = [
    { iconRef: <Timer className="w-6 h-6 text-emerald-500" />, title: "Real-time Updates", desc: "Stok dan pesanan update otomatis via Supabase." },
    { iconRef: <Map className="w-6 h-6 text-blue-500" />, title: "Map View", desc: "Temukan kafe terdekat lewat peta interaktif." },
    { iconRef: <BarChart className="w-6 h-6 text-purple-500" />, title: "Merchant Analytics", desc: "Dashboard laporan penjualan dengan grafik interaktif." },
    { iconRef: <Trophy className="w-6 h-6 text-yellow-500" />, title: "Gamifikasi Badge", desc: "Kumpulkan achievement Eco Starter, Food Hero." },
    { iconRef: <Smartphone className="w-6 h-6 text-orange-500" />, title: "QR Scan Pickup", desc: "Verifikasi pesanan lewat scan kamera dengan sangat cepat." },
    { iconRef: <Bell className="w-6 h-6 text-red-500" />, title: "Notifikasi Push", desc: "Alert pesanan baru, stok tersedia, dan promo spesial setiap saat." },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ═══ TICKER ════════════════════════════════════════════ */}
      <div className="pt-16 relative overflow-hidden bg-emerald-50 border-b border-emerald-100 py-2">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: "ticker 35s linear infinite" }}>
          {tickerDoubled.map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-xs text-emerald-700 font-medium shrink-0">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500"/> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ HERO ══════════════════════════════════════════════ */}
      <section onMouseMove={onMouseMove} className="relative min-h-[100dvh] bg-slate-50 flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-mesh-green opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — Copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="w-fit">
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-slate-900"
              >
                Penyelamat<br />
                <span className="text-emerald-500">Makanan.</span><br />
                Penyelamat<br />
                <span className="text-orange-500">Dompet.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-lg"
              >
                Beli Mystery Bag dari kafe terdekat dengan{" "}
                <span className="text-emerald-600 font-semibold">diskon hingga 70%</span>.
                Makan enak, hemat uang kos, dan selamatkan bumi!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link href="/marketplace">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 text-white font-bold shadow-md hover:shadow-lg hover:bg-orange-600 transition-all w-full sm:w-auto"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Cari Mystery Bag Sekarang
                  </motion.button>
                </Link>
                <Link href="/login?role=merchant">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold hover:bg-slate-100 transition-all w-full sm:w-auto bg-white"
                  >
                    <Store className="w-5 h-5" />
                    Daftar Sebagai Merchant
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="flex flex-wrap gap-6"
              >
                {[
                  { iconRef: <Store className="w-5 h-5 text-slate-400"/>, v: "500+", l: "Merchant aktif" },
                  { iconRef: <Users className="w-5 h-5 text-slate-400"/>, v: "8.000+", l: "Mahasiswa" },
                  { iconRef: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 border-none"/>, v: "4.8", l: "Rating rata-rata" },
                ].map((s) => (
                  <div key={s.l} className="flex items-center gap-2">
                    {s.iconRef}
                    <div>
                      <div className="text-slate-900 font-bold text-sm leading-none">{s.v}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{s.l}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* SDG badges removed as requested */}
            </motion.div>

            {/* RIGHT — 3D Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.3 }}
              className="relative h-[480px] lg:h-[640px] order-first lg:order-last"
            >
              <div
                className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)" }}
              />
              <HeroScene3D mouseX={mouse.x} mouseY={mouse.y} className="w-full h-full" />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute left-0 top-1/4 bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl max-w-[180px] border border-emerald-200 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-emerald-700 font-bold text-sm">Hemat 70%</div>
                    <div className="text-slate-500 text-[10px]">dari harga asli</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.05 }}
                className="absolute right-0 bottom-1/3 bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl max-w-[190px] border border-orange-200 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-orange-700 font-bold text-sm">Zero Waste</div>
                    <div className="text-slate-500 text-[10px]">1 bag = 0.5kg diselamatkan</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["A", "B", "S", "D"].map((l, i) => (
                      <div
                         key={l}
                         className="w-6 h-6 rounded-full border border-white bg-emerald-100 flex items-center justify-center text-[9px] font-bold text-emerald-700"
                         style={{ zIndex: 4 - i }}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                  <span className="text-slate-500 text-xs">
                    <span className="text-slate-900 font-bold">127</span> pesan hari ini
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-emerald-500"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══ HOW IT WORKS ══════════════════════════════════════ */}
      <section id="how" ref={howRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Semudah <span className="text-emerald-500">1-2-3</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Dari buka aplikasi sampai makan enak, cuma butuh beberapa langkah!
            </p>
          </motion.div>

          {/* Groups */}
          <div className="grid md:grid-cols-2 gap-8">
            {howGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + gi * 0.2 }}
                className="bg-slate-50 border border-slate-100 p-6 rounded-3xl"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${group.borderCls} text-xs font-semibold mb-6`}>
                  {group.iconRef}
                  {group.title}
                </div>
                <div className="space-y-4">
                  {group.items.map((item) => (
                     <div key={item.n} className={`flex items-start gap-4 p-4 rounded-2xl border ${item.color}`}>
                       <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-sm shrink-0">
                         {item.iconRef}
                       </div>
                       <div>
                         <p className="text-slate-500 text-[10px] font-mono font-bold">STEP {item.n}</p>
                         <h4 className="text-slate-900 font-bold text-sm mt-0.5">{item.title}</h4>
                         <p className="text-slate-600 text-xs leading-relaxed mt-1">{item.desc}</p>
                       </div>
                     </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SDG IMPACT ═══════════════════════════════════════ */}
      <section id="impact" className="py-24 relative overflow-hidden bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Dampak Nyata untuk <span className="text-emerald-500">Bumi</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {impactStats.map((stat, i) => (
               <motion.div
                 key={stat.label}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-sm"
               >
                 <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-slate-50 ${stat.color}`}>
                   {stat.iconRef}
                 </div>
                 <h3 className="text-3xl font-heading font-black text-slate-900 mb-1">
                   <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                 </h3>
                 <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
               </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sdgs.map((sdg, i) => (
              <motion.div
                key={sdg.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center hover:border-emerald-300 transition-colors"
              >
                <div className={`mx-auto w-14 h-14 rounded-2xl ${sdg.color} text-white flex items-center justify-center mb-4 shadow-sm`}>
                  {sdg.iconRef}
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                  {sdg.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {sdg.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES GRID ════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Fitur <span className="text-orange-500">Unggulan</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Dibangun dengan teknologi terkini untuk pengalaman terbaik.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-slate-50 border border-slate-100 p-6 rounded-2xl group hover:border-orange-200 transition-colors"
              >
                <div className="p-3 bg-white w-fit rounded-xl shadow-sm border border-slate-100 mb-4">
                  {feat.iconRef}
                </div>
                <h3 className="font-heading font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ══════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl relative overflow-hidden bg-emerald-600 shadow-lg"
          >
            <div className="absolute inset-0 bg-mesh-green opacity-20" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                Siap Mulai <span className="text-emerald-200">Menyelamatkan</span> Makanan?
              </h2>
              <p className="text-emerald-50 max-w-xl mx-auto mb-8 text-lg">
                Bergabunglah dengan ribuan mahasiswa dan merchant yang sudah berkontribusi mengurangi food waste.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login?role=student">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 text-white font-bold shadow-md hover:bg-orange-600 transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <ShoppingBag className="w-5 h-5"/> Cari Mystery Bag
                  </motion.div>
                </Link>
                <Link href="/login?role=merchant">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-emerald-700 font-bold hover:bg-slate-50 transition-all cursor-pointer shadow-sm w-full sm:w-auto"
                  >
                    <Store className="w-5 h-5"/> Daftarkan Tokoku
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══════════════════════════════════════════ */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo2.png" alt="SaveEat Logo" className="w-8 h-8 object-contain" />
              <span className="font-heading font-bold text-slate-900 text-lg">
                Save<span className="text-emerald-500">Eat</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm text-center font-medium">
              © 2024 SaveEat. Menyelamatkan makanan, menghemat uang, menjaga bumi.
            </p>
            <div className="flex gap-6 text-slate-500 text-sm font-medium">
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">Tentang</span>
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">Privasi</span>
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">Kontak</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
