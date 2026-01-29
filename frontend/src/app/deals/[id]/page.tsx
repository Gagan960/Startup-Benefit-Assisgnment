"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { apiFetch, ApiError } from "@/lib/api";
import type { Deal } from "@/lib/types";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Skeleton } from "@/components/Skeleton";
import { useAuth } from "@/lib/auth";

export default function DealDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [deal, setDeal] = React.useState<Deal | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [claiming, setClaiming] = useState(false);
  const [claimMessage, setClaimMessage] = useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setDeal(null);

    (async () => {
      try {
        const d = await apiFetch<Deal>(`/deals/${params.id}`, { method: "GET", auth: false });
        if (!cancelled) setDeal(d);
      } catch (e) {
        if (cancelled) return;
        if (e instanceof ApiError) setError(e.message);
        else setError("Failed to load deal");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const lockedAndUnverified = useMemo(() => {
    if (!deal) return false;
    if (!deal.isLocked) return false;
    if (!user) return false;
    return !user.isVerified;
  }, [deal, user]);

  async function onClaim() {
    if (!deal) return;
    setClaimMessage(null);

    if (!user) {
      router.push("/login");
      return;
    }

    setClaiming(true);
    try {
      await apiFetch(`/claims`, {
        method: "POST",
        body: JSON.stringify({ dealId: deal._id }),
      });
      setClaimMessage("Claim submitted. Track status in your dashboard.");
    } catch (e) {
      if (e instanceof ApiError) setClaimMessage(e.message);
      else setClaimMessage("Failed to claim deal");
    } finally {
      setClaiming(false);
    }
  }

  return (
    <Container>
      <div className="py-10">
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <Skeleton className="h-5 w-40" />
            <div className="mt-3">
              <Skeleton className="h-9 w-3/4" />
            </div>
            <div className="mt-6 grid gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="mt-8 flex gap-3">
              <Skeleton className="h-11 w-40" />
              <Skeleton className="h-11 w-44" />
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
            {error}
          </div>
        ) : !deal ? null : (
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{deal.category}</Badge>
                <Badge tone={deal.isLocked ? "warning" : "success"}>
                  {deal.isLocked ? "Locked" : "Unlocked"}
                </Badge>
                <Badge>{deal.partnerName}</Badge>
              </div>

              <div className="mt-4 text-3xl font-extrabold tracking-tight">
                {deal.title}
              </div>

              <div className="mt-4 text-sm leading-7 text-white/70 whitespace-pre-wrap">
                {deal.description}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-semibold">Eligibility</div>
                  <div className="mt-2 whitespace-pre-wrap text-sm text-white/70">
                    {deal.eligibility}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-semibold">How to redeem</div>
                  <div className="mt-2 whitespace-pre-wrap text-sm text-white/70">
                    {deal.redemptionInstructions}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-sm font-semibold text-white/80">Claim</div>
              <div className="mt-2 text-sm text-white/70">
                {deal.isLocked
                  ? "Locked deals require a verified account."
                  : "This deal is available to claim."}
              </div>

              <div className="mt-6 grid gap-2">
                <Button
                  onClick={onClaim}
                  disabled={claiming || authLoading || (deal.isLocked && !!user && !user.isVerified)}
                >
                  {claiming ? "Claiming…" : user ? "Claim deal" : "Sign in to claim"}
                </Button>

                <Button href="/dashboard" variant="secondary">
                  View dashboard
                </Button>
              </div>

              {lockedAndUnverified ? (
                <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4 text-xs text-amber-100">
                  Claim disabled: your account is not verified.
                </div>
              ) : null}

              {claimMessage ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/80">
                  {claimMessage}
                </div>
              ) : null}

              {deal.partnerWebsiteUrl ? (
                <a
                  href={deal.partnerWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block text-sm font-semibold text-white/80 hover:text-white"
                >
                  Partner website →
                </a>
              ) : null}
            </motion.div>
          </div>
        )}
      </div>
    </Container>
  );
}

