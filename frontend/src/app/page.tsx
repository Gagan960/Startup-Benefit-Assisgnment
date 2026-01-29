"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="grid-glow">
      <Container>
        <div className="py-20 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80"
              >
                Partnerships • Perks • Verified access
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl"
              >
                Premium SaaS deals for high‑velocity startups.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="mt-4 max-w-xl text-base leading-7 text-white/70"
              >
                Discover partner discounts, claim benefits, and track approval status.
                Locked deals require verification to keep perks high-signal.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Button href="/deals">Explore Deals</Button>
                <Button href="/dashboard" variant="secondary">
                  Go to Dashboard
                </Button>
              </motion.div>

              <div className="mt-10 grid grid-cols-3 gap-3 text-xs text-white/70">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-lg font-extrabold text-white">Fast</div>
                  <div className="mt-1">Claim in one click</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-lg font-extrabold text-white">Trusted</div>
                  <div className="mt-1">Verified-only perks</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-lg font-extrabold text-white">Clear</div>
                  <div className="mt-1">Status tracking</div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/80">
                  Featured partner
                </div>
                <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70">
                  Locked deals supported
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-6">
                <div className="text-lg font-extrabold">Notion • 6 months free</div>
                <div className="mt-2 text-sm text-white/70">
                  Eligibility: incorporated startup, active product development.
                </div>
                <div className="mt-5">
                  <Button href="/deals" variant="secondary">
                    See deal details
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  Browse deals by category and search.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  Claiming a locked deal requires a verified account.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  Track claim status: pending → approved.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
