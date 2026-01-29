"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed";

const styles: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-white/90 shadow-[0_10px_30px_rgba(255,255,255,0.15)]",
  secondary:
    "bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15",
  ghost: "bg-transparent text-white hover:bg-white/10",
};

export function Button({
  children,
  href,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
  className,
}: Props) {
  const inner = (
    <motion.span
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={`${base} ${styles[variant]} ${className || ""}`}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (disabled) return <span aria-disabled="true">{inner}</span>;
    return <Link href={href}>{inner}</Link>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}

