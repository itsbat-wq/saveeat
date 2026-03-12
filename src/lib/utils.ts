import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import { Clock, CheckCircle2, ShoppingBag, XCircle, CircleDot } from 'lucide-react';

// ============================================================
// SaveEat - Utility Functions
// ============================================================

// -------------------------------------------------------
// className merging utility (clsx + tailwind-merge)
// -------------------------------------------------------

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// -------------------------------------------------------
// Currency Formatting
// -------------------------------------------------------

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyShort(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `Rp ${(amount / 1_000_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000_000) {
    return `Rp ${(amount / 1_000_000).toFixed(1)}Jt`;
  }
  if (amount >= 1_000) {
    return `Rp ${(amount / 1_000).toFixed(0)}rb`;
  }
  return `Rp ${amount}`;
}

// -------------------------------------------------------
// Number Formatting
// -------------------------------------------------------

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function formatNumberShort(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}Jt`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}rb`;
  }
  return String(num);
}

// -------------------------------------------------------
// Date & Time Formatting
// -------------------------------------------------------

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return formatDateShort(dateStr);
}

// -------------------------------------------------------
// Countdown / Timer Utilities
// -------------------------------------------------------

export interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  total_ms: number;
  is_expired: boolean;
  formatted: string;
}

export function getCountdownToPickup(pickupEndTime: string): CountdownResult {
  const now = new Date();
  const [hours, minutes] = pickupEndTime.split(':').map(Number);

  const pickupEnd = new Date();
  pickupEnd.setHours(hours, minutes, 0, 0);

  // If pickup time has already passed today, set to next day
  if (pickupEnd.getTime() < now.getTime()) {
    pickupEnd.setDate(pickupEnd.getDate() + 1);
  }

  const totalMs = pickupEnd.getTime() - now.getTime();
  const isExpired = totalMs <= 0;

  if (isExpired) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      total_ms: 0,
      is_expired: true,
      formatted: '00:00:00',
    };
  }

  const totalSecs = Math.floor(totalMs / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatted = `${pad(h)}:${pad(m)}:${pad(s)}`;

  return { hours: h, minutes: m, seconds: s, total_ms: totalMs, is_expired: false, formatted };
}

// -------------------------------------------------------
// Discount / Price Utilities
// -------------------------------------------------------

export function calculateDiscountPrice(
  originalPrice: number,
  discountPercentage: number
): number {
  return Math.round(originalPrice * (1 - discountPercentage / 100));
}

export function calculateDiscountPercentage(
  originalPrice: number,
  discountPrice: number
): number {
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
}

export function calculateCommission(
  price: number,
  rate: number = 0.15
): number {
  return Math.round(price * rate);
}

export function calculateMerchantRevenue(
  price: number,
  commissionRate: number = 0.15
): number {
  return Math.round(price * (1 - commissionRate));
}

// -------------------------------------------------------
// QR Code Utilities
// -------------------------------------------------------

export function generateQRSignature(orderId: string, userId: string): string {
  // Simple deterministic "signature" for demo
  const raw = `${orderId}-${userId}-saveeat`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `SE-${Math.abs(hash).toString(16).toUpperCase().substring(0, 8)}`;
}

export function validateQRData(qrString: string): boolean {
  try {
    const data = JSON.parse(qrString);
    return !!(data.order_id && data.user_id && data.merchant_id && data.signature);
  } catch {
    return false;
  }
}

// -------------------------------------------------------
// String Utilities
// -------------------------------------------------------

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim();
}

export function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

// -------------------------------------------------------
// Array Utilities
// -------------------------------------------------------

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

// -------------------------------------------------------
// Local Storage Utilities
// -------------------------------------------------------

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    // silently fail
  }
}

// -------------------------------------------------------
// Color / UI Utilities
// -------------------------------------------------------

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-yellow-400';
  if (rating >= 4.0) return 'text-yellow-500';
  if (rating >= 3.0) return 'text-orange-400';
  return 'text-red-400';
}

export function getStockUrgencyClass(stock: number): string {
  if (stock === 0) return 'text-brand-danger animate-pulse';
  if (stock <= 2) return 'text-orange-400 animate-pulse';
  if (stock <= 5) return 'text-yellow-400';
  return 'text-brand-success';
}

export function getStockLabel(stock: number): string {
  if (stock === 0) return 'Habis!';
  if (stock === 1) return 'Sisa 1 Bag!';
  return `Sisa ${stock} Bag`;
}

export function getOrderStatusConfig(status: string): {
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
} {
  switch (status) {
    case 'pending':
      return {
        label: 'Menunggu',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        icon: React.createElement(Clock, { className: 'w-3.5 h-3.5' }),
      };
    case 'confirmed':
      return {
        label: 'Dikonfirmasi',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        icon: React.createElement(CheckCircle2, { className: 'w-3.5 h-3.5' }),
      };
    case 'picked_up':
      return {
        label: 'Selesai',
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        icon: React.createElement(ShoppingBag, { className: 'w-3.5 h-3.5' }),
      };
    case 'cancelled':
      return {
        label: 'Dibatalkan',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: React.createElement(XCircle, { className: 'w-3.5 h-3.5' }),
      };
    default:
      return {
        label: status,
        color: 'text-slate-500',
        bgColor: 'bg-slate-100',
        icon: React.createElement(CircleDot, { className: 'w-3.5 h-3.5' }),
      };
  }
}

// -------------------------------------------------------
// Impact Calculation Utilities
// -------------------------------------------------------

export function calculateFoodSavedKg(bags: number): number {
  return parseFloat((bags * 0.5).toFixed(2));
}

export function calculateCO2PreventedKg(bags: number): number {
  return parseFloat((bags * 1.23).toFixed(2));
}

export function calculateMoneySaved(bags: number, avgOriginalPrice = 55000, avgDiscountPrice = 18000): number {
  return bags * (avgOriginalPrice - avgDiscountPrice);
}

// -------------------------------------------------------
// Share Utilities (Web Share API)
// -------------------------------------------------------

export async function shareOrder(storeName: string, amount: number): Promise<boolean> {
  const text = `Aku baru menyelamatkan makanan dari ${storeName} lewat SaveEat!\nHemat ${formatCurrency(amount)} dan bantu kurangi food waste. Yuk join!`;
  const url = 'https://saveeat.id';

  if (navigator.share) {
    try {
      await navigator.share({ title: 'SaveEat - Selamatkan Makanan', text, url });
      return true;
    } catch {
      return false;
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      return true;
    } catch {
      return false;
    }
  }
}

// -------------------------------------------------------
// Validation Utilities
// -------------------------------------------------------

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

export function isValidPhone(phone: string): boolean {
  return /^(\+62|62|0)[0-9]{8,13}$/.test(phone.replace(/\s/g, ''));
}

// -------------------------------------------------------
// Animation Delay Utilities
// -------------------------------------------------------

export function getStaggerDelay(index: number, base = 0.1): string {
  return `${index * base}s`;
}

export function getRandomDelay(min = 0, max = 2): string {
  return `${(Math.random() * (max - min) + min).toFixed(2)}s`;
}

// -------------------------------------------------------
// Distance Utilities
// -------------------------------------------------------

export function parseDistance(distanceStr: string): number {
  const match = distanceStr.match(/^([\d.]+)\s*(m|km)$/i);
  if (!match) return Infinity;
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  return unit === 'km' ? value * 1000 : value;
}

export function sortByDistance(a: string, b: string): number {
  return parseDistance(a) - parseDistance(b);
}


