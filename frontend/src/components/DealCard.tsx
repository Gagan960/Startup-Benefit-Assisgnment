"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import type { Deal } from "@/lib/types";
import { Badge } from "@/components/Badge";

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white/70">{deal.partnerName}</div>
            <div className="mt-1 text-lg font-extrabold tracking-tight">{deal.title}</div>
          </div>
          <Badge tone={deal.isLocked ? "warning" : "success"}>
            {deal.isLocked ? "Locked" : "Unlocked"}
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Badge>{deal.category}</Badge>
          {deal.isLocked ? (
            <span className="text-xs text-white/60">Verification required to claim</span>
          ) : (
            <span className="text-xs text-white/60">Claim available</span>
          )}
        </div>

        <p className="mt-4 text-sm leading-6 text-white/70">{deal.shortDescription}</p>

        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`/deals/${deal._id}`}
            className="text-sm font-semibold text-white/90 transition group-hover:text-white"
          >
            View details →
          </Link>
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-fuchsia-400/25 via-indigo-400/20 to-cyan-300/20 ring-1 ring-white/10" />
        </div>
      </div>

      {deal.isLocked ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
      ) : null}
    </motion.div>
  );
}

