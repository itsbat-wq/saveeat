"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Store,
  Leaf,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Chrome,
  Loader2,
  GraduationCap,
  StoreIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/types";
import toast from "react-hot-toast";

// ============================================================
// SaveEat - Login / Register Page
// Dual-role card selection → form → redirect
// ============================================================

type AuthMode = "login" | "register";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") as UserRole | null;

  const { login, loginWithGoogle, register, isLoading } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(
    initialRole
  );
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [error, setError] = useState("");

  // ── Handlers ──────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRole) return;
    setError("");

    if (authMode === "login") {
      const result = await login({ email, password, role: selectedRole });
      if (result.success) {
        toast.success(
          `Selamat datang!`
        );
        router.push(selectedRole === "student" ? "/marketplace" : "/merchant");
      } else {
        setError(result.error || "Login gagal");
        toast.error(result.error || "Login gagal");
      }
    } else {
      const result = await register({
        email,
        password,
        name,
        role: selectedRole,
        store_name: selectedRole === "merchant" ? storeName : undefined,
      });
      if (result.success) {
        toast.success("Akun berhasil dibuat!");
        router.push(selectedRole === "student" ? "/marketplace" : "/merchant");
      } else {
        setError(result.error || "Registrasi gagal");
        toast.error(result.error || "Registrasi gagal");
      }
    }
  }

  async function handleGoogleLogin() {
    if (!selectedRole) return;
    const result = await loginWithGoogle(selectedRole);
    if (result.success) {
      toast.success("Login dengan Google berhasil!");
      router.push(selectedRole === "student" ? "/marketplace" : "/merchant");
    } else {
      toast.error(result.error || "Login dengan Google gagal");
    }
  }

  function handleBack() {
    setSelectedRole(null);
    setError("");
    setEmail("");
    setPassword("");
    setName("");
    setStoreName("");
  }

  // ── Render ────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Ambient gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Link href="/" className="inline-flex items-center gap-2 group mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-slate-900">
              Save<span className="text-emerald-500">Eat</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm mt-2">
            Masuk untuk mulai menyelamatkan makanan & dompetmu
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ═══ ROLE SELECTION ════════════════════════════════ */}
          {!selectedRole && (
            <motion.div
              key="role-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-heading text-2xl text-slate-900 text-center mb-8 font-bold">
                Pilih peranmu
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {/* Student Card */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedRole("student")}
                  className={cn(
                    "relative p-8 rounded-3xl text-left cursor-pointer",
                    "bg-white shadow-sm border border-slate-200",
                    "hover:border-orange-300",
                    "hover:shadow-lg",
                    "transition-all duration-300 group"
                  )}
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
                      <GraduationCap className="w-7 h-7 text-orange-500" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                      Masuk sebagai Pelanggan
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Cari Mystery Bag murah dari kafe terdekat. Hemat hingga
                      70% setiap hari!
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-orange-500 text-sm font-semibold">
                      <span>Login dengan Google atau Email</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </motion.button>

                {/* Merchant Card */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedRole("merchant")}
                  className={cn(
                    "relative p-8 rounded-3xl text-left cursor-pointer",
                    "bg-white shadow-sm border border-slate-200",
                    "hover:border-emerald-300",
                    "hover:shadow-lg",
                    "transition-all duration-300 group"
                  )}
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
                      <StoreIcon className="w-7 h-7 text-emerald-500" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                      Masuk sebagai Pemilik Usaha
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Jual surplus makanan tokomu, kurangi kerugian operasional
                      hingga 100%.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-emerald-500 text-sm font-semibold">
                      <span>Login dengan Email</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ═══ LOGIN / REGISTER FORM ════════════════════════ */}
          {selectedRole && (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto"
            >
              {/* Back button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-6 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali pilih role
              </button>

              {/* Form Card */}
              <div
                className={cn(
                  "p-8 rounded-3xl bg-white shadow-md border border-slate-200",
                )}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      selectedRole === "student"
                        ? "bg-orange-50 border border-orange-100"
                        : "bg-emerald-50 border border-emerald-100"
                    )}
                  >
                    {selectedRole === "student" ? (
                      <ShoppingBag className="w-5 h-5 text-orange-500" />
                    ) : (
                      <Store className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-lg">
                      {authMode === "login" ? "Masuk" : "Daftar"} sebagai{" "}
                      {selectedRole === "student" ? "Pelanggan" : "Pemilik Usaha"}
                    </h3>
                    <p className="text-slate-500 text-xs">
                      {selectedRole === "student"
                        ? "Cari Mystery Bag murah"
                        : "Kelola surplus makananmu"}
                    </p>
                  </div>
                </div>

                {/* Google OAuth (student only) */}
                {selectedRole === "student" && authMode === "login" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className={cn(
                        "w-full flex items-center justify-center gap-3 py-3 rounded-xl",
                        "bg-white border border-slate-300 shadow-sm",
                        "text-slate-700 text-sm font-semibold",
                        "hover:bg-slate-50",
                        "transition-all duration-200",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Chrome className="w-4 h-4" />
                      )}
                      Masuk dengan Google
                    </motion.button>

                    <div className="flex items-center gap-3 my-5">
                      <div className="flex-1 h-px bg-slate-200" />
                      <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">atau</span>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>
                  </>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name (register only) */}
                  {authMode === "register" && (
                    <div>
                      <label className="text-slate-700 text-xs font-bold mb-1.5 block">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Masukkan nama lengkap"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-slate-900 pl-10 transition-all font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {/* Store Name (merchant register only) */}
                  {authMode === "register" && selectedRole === "merchant" && (
                    <div>
                      <label className="text-slate-700 text-xs font-bold mb-1.5 block">
                        Nama Toko
                      </label>
                      <div className="relative">
                        <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          placeholder="Masukkan nama toko"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-slate-900 pl-10 transition-all font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label className="text-slate-700 text-xs font-bold mb-1.5 block">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={
                          selectedRole === "student"
                            ? "student@saveeat.id"
                            : "merchant@saveeat.id"
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-slate-900 pl-10 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-slate-700 text-xs font-bold mb-1.5 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="demo1234"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-slate-900 pl-10 pr-10 transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-semibold"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Demo hint */}
                  <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs">
                    <span className="font-bold mr-1">Demo:</span> 
                    <span className="font-mono bg-white px-1 py-0.5 rounded shadow-sm border border-emerald-100">
                      {selectedRole === "student"
                        ? "student@saveeat.id"
                        : "merchant@saveeat.id"}
                    </span>{" "}
                    / <span className="font-mono bg-white px-1 py-0.5 rounded shadow-sm border border-emerald-100">demo1234</span>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full py-3 rounded-xl text-white font-bold text-sm shadow-md",
                      "flex items-center justify-center gap-2",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "transition-all duration-300",
                      selectedRole === "student"
                        ? "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"
                        : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : authMode === "login" ? (
                      "Masuk"
                    ) : (
                      "Daftar Sekarang"
                    )}
                  </motion.button>
                </form>

                {/* Toggle auth mode */}
                <div className="text-center mt-5">
                  <span className="text-slate-500 text-sm font-medium">
                    {authMode === "login"
                      ? "Belum punya akun? "
                      : "Sudah punya akun? "}
                  </span>
                  <button
                    onClick={() => {
                      setAuthMode(authMode === "login" ? "register" : "login");
                      setError("");
                    }}
                    className={cn(
                      "text-sm font-bold transition-colors underline underline-offset-2",
                      selectedRole === "student"
                        ? "text-orange-500 hover:text-orange-600"
                        : "text-emerald-500 hover:text-emerald-600"
                    )}
                  >
                    {authMode === "login" ? "Daftar di sini" : "Masuk di sini"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-500 text-xs mt-8 font-medium"
        >
          Dengan masuk, kamu setuju dengan{" "}
          <span className="text-slate-700 font-bold hover:text-emerald-600 cursor-pointer transition-colors">
            Syarat & Ketentuan
          </span>{" "}
          dan{" "}
          <span className="text-slate-700 font-bold hover:text-emerald-600 cursor-pointer transition-colors">
            Kebijakan Privasi
          </span>{" "}
          SaveEat.
        </motion.p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="w-8 h-8 text-emerald-500 animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
