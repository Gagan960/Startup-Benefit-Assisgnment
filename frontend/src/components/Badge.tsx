"use client";

import React from "react";

type Tone = "neutral" | "success" | "warning";

const styles: Record<Tone, string> = {
  neutral: "bg-white/10 text-white/80 ring-1 ring-white/10",
  success: "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20",
  warning: "bg-amber-400/15 text-amber-200 ring-1 ring-amber-300/20",
};

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[tone]}`}>
      {children}
    </span>
  );
}

