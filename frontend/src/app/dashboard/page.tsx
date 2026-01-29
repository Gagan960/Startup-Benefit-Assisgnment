"use client";

import React from "react";
import { motion } from "framer-motion";
import { Protected } from "@/components/Protected";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { Skeleton } from "@/components/Skeleton";
import { apiFetch, ApiError } from "@/lib/api";
import type { Claim } from "@/lib/types";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/Button";

export default function DashboardPage() {
  const { user } = useAuth();
  const [claims, setClaims] = React.useState<Claim[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await apiFetch<Claim[]>("/claims/my", { method: "GET" });
        if (!cancelled) setClaims(data);
      } catch (e) {
        if (cancelled) return;
        if (e instanceof ApiError) setError(e.message);
        else setError("Failed to load claims");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Protected>
      <Container>
        <div className="py-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-2xl font-extrabold tracking-tight">Dashboard</div>
              <div className="mt-1 text-sm text-white/70">
                Your claimed deals and status tracking.
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={user?.isVerified ? "success" : "warning"}>
                {user?.isVerified ? "Verified" : "Unverified"}
              </Badge>
              <Badge>{claims.length} claims</Badge>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white/80">Profile</div>
              <div className="mt-4 grid gap-2 text-sm text-white/70">
                <div>
                  <span className="text-white/50">Username</span>
                  <div className="font-semibold text-white">{user?.username}</div>
                </div>
                <div>
                  <span className="text-white/50">Email</span>
                  <div className="font-semibold text-white">{user?.email}</div>
                </div>
              </div>
              <div className="mt-6">
                <Button href="/deals" variant="secondary">
                  Explore more deals
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/80">Claimed deals</div>
              </div>

              {error ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
                  {error}
                </div>
              ) : null}

              <div className="mt-4 grid gap-3">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-full">
                            <Skeleton className="h-4 w-40" />
                            <div className="mt-2">
                              <Skeleton className="h-5 w-3/4" />
                            </div>
                          </div>
                          <Skeleton className="h-6 w-24" />
                        </div>
                      </div>
                    ))
                  : claims.map((c) => (
                      <motion.div
                        key={c._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-white/70">
                              {c.deal.partnerName}
                            </div>
                            <div className="mt-1 text-base font-extrabold">
                              {c.deal.title}
                            </div>
                            <div className="mt-2 text-sm text-white/60">
                              {c.deal.category}
                            </div>
                          </div>
                          <Badge tone={c.status === "approved" ? "success" : "neutral"}>
                            {c.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
              </div>

              {!loading && !error && claims.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                  You haven’t claimed any deals yet.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Protected>
  );
}

