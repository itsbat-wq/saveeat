"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { XCircle, Timer, AlertTriangle, AlertCircle, MapPin } from "lucide-react";

// ============================================================
// SaveEat - CountdownTimer Component
// Real-time countdown with urgency animations & FOMO effect
// ============================================================

interface CountdownTimerProps {
  pickupEndTime: string; // "HH:MM" format
  pickupStartTime?: string; // "HH:MM" format
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "inline" | "card" | "badge" | "hero";
  showLabel?: boolean;
  showIcon?: boolean;
  onExpired?: () => void;
  className?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isExpired: boolean;
  urgencyLevel: "normal" | "warning" | "critical" | "expired";
}

// -------------------------------------------------------
// Calculate Time Left
// -------------------------------------------------------
function calculateTimeLeft(pickupEndTime: string): TimeLeft {
  const now = new Date();
  const [hours, minutes] = pickupEndTime.split(":").map(Number);

  const pickupEnd = new Date();
  pickupEnd.setHours(hours, minutes, 0, 0);

  // If pickup end already passed today, push to tomorrow
  if (pickupEnd.getTime() <= now.getTime()) {
    pickupEnd.setDate(pickupEnd.getDate() + 1);
  }

  const totalMs = pickupEnd.getTime() - now.getTime();

  if (totalMs <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isExpired: true,
      urgencyLevel: "expired",
    };
  }

  const totalSecs = Math.floor(totalMs / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;

  let urgencyLevel: TimeLeft["urgencyLevel"] = "normal";
  const totalMins = Math.floor(totalMs / 60000);
  if (totalMins <= 10) urgencyLevel = "critical";
  else if (totalMins <= 30) urgencyLevel = "warning";

  return { hours: h, minutes: m, seconds: s, totalMs, isExpired: false, urgencyLevel };
}

// -------------------------------------------------------
// Pad number to 2 digits
// -------------------------------------------------------
const pad = (n: number) => String(n).padStart(2, "0");

// -------------------------------------------------------
// Size Configs
// -------------------------------------------------------
const sizeConfig = {
  xs: {
    digit: "text-sm font-bold",
    label: "text-[10px]",
    separator: "text-sm",
    wrapper: "gap-0.5",
  },
  sm: {
    digit: "text-base font-bold",
    label: "text-[10px]",
    separator: "text-base",
    wrapper: "gap-1",
  },
  md: {
    digit: "text-xl font-bold",
    label: "text-xs",
    separator: "text-xl",
    wrapper: "gap-1",
  },
  lg: {
    digit: "text-3xl font-bold",
    label: "text-xs",
    separator: "text-3xl",
    wrapper: "gap-2",
  },
  xl: {
    digit: "text-5xl font-extrabold",
    label: "text-sm",
    separator: "text-5xl",
    wrapper: "gap-3",
  },
};

// -------------------------------------------------------
// Urgency Color Classes
// -------------------------------------------------------
function getUrgencyClasses(level: TimeLeft["urgencyLevel"]) {
  switch (level) {
    case "critical":
      return {
        text: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        glow: "shadow-[0_0_15px_rgba(239,68,68,0.2)]",
        pulse: "animate-pulse",
        separatorClass: "text-red-600",
      };
    case "warning":
      return {
        text: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
        glow: "shadow-[0_0_15px_rgba(249,115,22,0.15)]",
        pulse: "",
        separatorClass: "text-orange-600",
      };
    case "expired":
      return {
        text: "text-slate-500",
        bg: "bg-slate-100",
        border: "border-slate-200",
        glow: "",
        pulse: "",
        separatorClass: "text-slate-500",
      };
    default:
      return {
        text: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        glow: "shadow-[0_0_15px_rgba(16,185,129,0.1)]",
        pulse: "",
        separatorClass: "text-emerald-700",
      };
  }
}

// -------------------------------------------------------
// Digit Block (card variant)
// -------------------------------------------------------
function DigitBlock({
  value,
  label,
  size,
  urgency,
}: {
  value: number;
  label: string;
  size: keyof typeof sizeConfig;
  urgency: ReturnType<typeof getUrgencyClasses>;
}) {
  const cfg = sizeConfig[size];

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl px-2 py-1 min-w-[2.5rem]",
          "bg-white border text-center shadow-sm",
          urgency.border,
          urgency.glow
        )}
      >
        <span
          className={cn(
            cfg.digit,
            urgency.text,
            "tabular-nums tracking-wide font-heading",
            urgency.pulse
          )}
        >
          {pad(value)}
        </span>
      </div>
      {label && (
        <span className={cn(cfg.label, "text-slate-500 uppercase tracking-widest font-medium")}>
          {label}
        </span>
      )}
    </div>
  );
}

// -------------------------------------------------------
// Main Component
// -------------------------------------------------------
export default function CountdownTimer({
  pickupEndTime,
  pickupStartTime,
  size = "md",
  variant = "inline",
  showLabel = true,
  showIcon = true,
  onExpired,
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(pickupEndTime)
  );
  const [hasMounted, setHasMounted] = useState(false);

  // Recalculate every second
  const tick = useCallback(() => {
    const newTime = calculateTimeLeft(pickupEndTime);
    setTimeLeft(newTime);
    if (newTime.isExpired && onExpired) {
      onExpired();
    }
  }, [pickupEndTime, onExpired]);

  useEffect(() => {
    setHasMounted(true);
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const urgency = getUrgencyClasses(timeLeft.urgencyLevel);
  const cfg = sizeConfig[size];

  // Don't render timer string server-side to avoid hydration mismatch
  if (!hasMounted) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="animate-pulse h-5 w-24 rounded bg-slate-200" />
      </div>
    );
  }

  // -------------------------------------------------------
  // EXPIRED State
  // -------------------------------------------------------
  if (timeLeft.isExpired) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 text-slate-500",
          className
        )}
      >
        <XCircle className="w-4 h-4"/>
        <span className="text-sm font-semibold">Pickup Ditutup</span>
      </div>
    );
  }

  // -------------------------------------------------------
  // BADGE Variant (compact single-line)
  // -------------------------------------------------------
  if (variant === "badge") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
          "border text-xs font-semibold",
          urgency.bg,
          urgency.border,
          urgency.text,
          urgency.pulse,
          className
        )}
      >
        {showIcon && <Timer className="w-3.5 h-3.5"/>}
        <span className="tabular-nums tracking-wide">
          {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  // -------------------------------------------------------
  // INLINE Variant (single line with text)
  // -------------------------------------------------------
  if (variant === "inline") {
    return (
      <div
        className={cn("flex items-center gap-2", className)}
      >
        {showIcon && (
          <Timer
            className={cn(
              "w-4 h-4",
              timeLeft.urgencyLevel === "critical" ? "animate-bounce text-red-500" : "text-emerald-600"
            )}
          />
        )}
        {showLabel && (
          <span className="text-slate-500 text-sm">Pickup ditutup dalam</span>
        )}
        <span
          className={cn(
            cfg.digit,
            urgency.text,
            "tabular-nums tracking-wide font-heading",
            urgency.pulse
          )}
        >
          {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>
        {timeLeft.urgencyLevel === "critical" && (
          <span className="text-red-600 text-xs font-semibold animate-pulse">
            SEGERA!
          </span>
        )}
        {timeLeft.urgencyLevel === "warning" && (
          <span className="text-orange-600 text-xs font-semibold">Hampir habis!</span>
        )}
      </div>
    );
  }

  // -------------------------------------------------------
  // CARD Variant (block with separated digits)
  // -------------------------------------------------------
  if (variant === "card") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {showLabel && (
          <div className="flex items-center gap-1.5">
            {showIcon && (
              <Timer
                className={cn(
                  "w-4 h-4",
                  timeLeft.urgencyLevel === "critical" ? "animate-bounce text-red-500" : "text-slate-500"
                )}
              />
            )}
            <span className="text-slate-500 text-xs font-medium">
              {pickupStartTime
                ? `Pickup: ${pickupStartTime} – ${pickupEndTime}`
                : `Ditutup pukul ${pickupEndTime}`}
            </span>
          </div>
        )}

        <div className={cn("flex items-end", cfg.wrapper)}>
          <DigitBlock value={timeLeft.hours} label="JAM" size={size} urgency={urgency} />
          <span
            className={cn(
              cfg.separator,
              urgency.separatorClass,
              "pb-4 font-bold",
              urgency.pulse
            )}
          >
            :
          </span>
          <DigitBlock value={timeLeft.minutes} label="MENIT" size={size} urgency={urgency} />
          <span
            className={cn(
              cfg.separator,
              urgency.separatorClass,
              "pb-4 font-bold",
              urgency.pulse
            )}
          >
            :
          </span>
          <DigitBlock value={timeLeft.seconds} label="DETIK" size={size} urgency={urgency} />
        </div>

        {/* Urgency message */}
        {timeLeft.urgencyLevel === "critical" && (
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
              "bg-red-50 border border-red-200",
              "animate-pulse"
            )}
          >
            <AlertTriangle className="w-4 h-4 text-red-600"/>
            <span className="text-red-600 text-xs font-semibold">
              Kurang dari 10 menit! Segera pickup!
            </span>
          </div>
        )}
        {timeLeft.urgencyLevel === "warning" && (
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
              "bg-orange-50 border border-orange-200"
            )}
          >
            <AlertCircle className="w-4 h-4 text-orange-600"/>
            <span className="text-orange-600 text-xs font-semibold">
              Hampir habis! Jangan sampai ketinggalan.
            </span>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------
  // HERO Variant (large display for detail page)
  // -------------------------------------------------------
  if (variant === "hero") {
    return (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        {showLabel && (
          <div className="flex items-center gap-2">
            {showIcon && (
              <Timer
                className={cn(
                  "w-5 h-5",
                  timeLeft.urgencyLevel === "critical" ? "animate-bounce text-red-500" : "text-emerald-700"
                )}
              />
            )}
            <span className="text-slate-600 text-sm font-medium uppercase tracking-wider">
              Pickup Ditutup Dalam
            </span>
          </div>
        )}

        {/* Big digit blocks */}
        <div className={cn("flex items-end", cfg.wrapper)}>
          <DigitBlock value={timeLeft.hours} label="JAM" size={size} urgency={urgency} />
          <span
            className={cn(
              cfg.separator,
              urgency.separatorClass,
              "pb-6 font-extrabold leading-none",
              urgency.pulse
            )}
          >
            :
          </span>
          <DigitBlock value={timeLeft.minutes} label="MENIT" size={size} urgency={urgency} />
          <span
            className={cn(
              cfg.separator,
              urgency.separatorClass,
              "pb-6 font-extrabold leading-none",
              urgency.pulse
            )}
          >
            :
          </span>
          <DigitBlock value={timeLeft.seconds} label="DETIK" size={size} urgency={urgency} />
        </div>

        {/* Pickup time window */}
        {pickupStartTime && (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin className="w-4 h-4"/>
            <span>
              Ambil antara pukul{" "}
              <span className="text-slate-900 font-semibold">{pickupStartTime}</span>
              {" – "}
              <span className="text-slate-900 font-semibold">{pickupEndTime}</span>
            </span>
          </div>
        )}

        {/* FOMO urgency banners */}
        {timeLeft.urgencyLevel === "critical" && (
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl w-full justify-center",
              "bg-red-50 border border-red-200",
              "animate-pulse"
            )}
          >
            <AlertTriangle className="w-4 h-4 text-red-600"/>
            <span className="text-red-700 text-sm font-bold">
              KURANG DARI 10 MENIT! Segera pickup sebelum berakhir!
            </span>
          </div>
        )}
        {timeLeft.urgencyLevel === "warning" && (
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl w-full justify-center",
              "bg-orange-50 border border-orange-200"
            )}
          >
            <AlertCircle className="w-4 h-4 text-orange-600"/>
            <span className="text-orange-700 text-sm font-semibold">
              Hampir habis! Jangan sampai ketinggalan Mystery Bag ini.
            </span>
          </div>
        )}
      </div>
    );
  }

  return null;
}
