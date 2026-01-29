"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { apiFetch, ApiError } from "@/lib/api";
import type { Deal } from "@/lib/types";
import { Container } from "@/components/Container";
import { DealCard } from "@/components/DealCard";
import { Input } from "@/components/Input";
import { Skeleton } from "@/components/Skeleton";
import { Badge } from "@/components/Badge";

type LockedFilter = "all" | "locked" | "unlocked";

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [locked, setLocked] = useState<LockedFilter>("all");

  const categories = useMemo(() => {
    const s = new Set<string>();
    deals.forEach((d) => s.add(d.category));
    return ["all", ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [deals]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const t = setTimeout(async () => {
      try {
        const qs = new URLSearchParams();
        if (search.trim()) qs.set("search", search.trim());
        if (category !== "all") qs.set("category", category);
        if (locked === "locked") qs.set("locked", "true");
        if (locked === "unlocked") qs.set("locked", "false");

        const data = await apiFetch<Deal[]>(`/deals?${qs.toString()}`, { method: "GET", auth: false });
        if (!cancelled) setDeals(data);
      } catch (e) {
        if (cancelled) return;
        if (e instanceof ApiError) setError(e.message);
        else setError("Failed to load deals");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [search, category, locked]);

  return (
    <Container>
      <div className="py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-2xl font-extrabold tracking-tight">Deals</div>
            <div className="mt-1 text-sm text-white/70">
              Browse partnerships. Locked deals require verification to claim.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge>{deals.length} deals</Badge>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search partners or deals…"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/10"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#0b0b12]">
                {c === "all" ? "All categories" : c}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["all", "unlocked", "locked"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setLocked(v)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                locked === v
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/80 hover:bg-white/15"
              }`}
            >
              {v === "all" ? "All" : v === "locked" ? "Locked" : "Unlocked"}
            </button>
          ))}
        </div>

        {error ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
            {error}
          </div>
        ) : null}

        <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-full">
                      <Skeleton className="h-4 w-32" />
                      <div className="mt-2">
                        <Skeleton className="h-6 w-56" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="mt-4">
                    <Skeleton className="h-4 w-full" />
                    <div className="mt-2">
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                </div>
              ))
            : deals.map((d) => <DealCard key={d._id} deal={d} />)}
        </motion.div>

        {!loading && !error && deals.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            No deals match your filters.
          </div>
        ) : null}
      </div>
    </Container>
  );
}

