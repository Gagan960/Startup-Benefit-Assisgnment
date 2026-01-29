"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import Link from "next/link";

export default function SignupPage() {
  const { signup } = useAuth();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signup({ username, email, password });
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("Failed to create account");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      <div className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <div className="text-2xl font-extrabold tracking-tight">Create account</div>
          <div className="mt-2 text-sm text-white/70">
            Sign up to claim deals. Locked deals require verification.
          </div>

          <form onSubmit={onSubmit} className="mt-8 grid gap-3">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating…" : "Create account"}
            </Button>
          </form>

          {error ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
              {error}
            </div>
          ) : null}

          <div className="mt-6 text-sm text-white/70">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-white hover:underline">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </Container>
  );
}

