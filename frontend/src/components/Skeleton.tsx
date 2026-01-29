"use client";

import { motion } from "framer-motion";
import React from "react";

export function Skeleton({ className }: { className: string }) {
  return (
    <motion.div
      className={`rounded-xl bg-white/10 ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.55, 0.9, 0.55] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

