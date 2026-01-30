"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { useAuth } from "@/lib/auth";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`text-sm font-semibold transition ${
        active ? "text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const { user, loading, signout } = useAuth();

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/70">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="h-8 w-8 rounded-xl bg-gradient-to-br from-fuchsia-400 via-indigo-400 to-cyan-300"
              whileHover={{ rotate: 6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            />
            <span className="text-sm font-extrabold tracking-tight text-white">
              Startup Benefits
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <NavLink href="/deals" label="Deals" />
            <NavLink href="/dashboard" label="Dashboard" />
          </div>

          <div className="flex items-center gap-2">
            {loading ? (
              <div className="h-9 w-28 animate-pulse rounded-xl bg-white/10" />
            ) : user ? (
              <>
                <span className="hidden text-sm text-white/70 sm:block">
                  {user.username}
                  {user.isVerified ? " • verified" : ""}
                </span>
                <Button variant="secondary" onClick={signout}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" href="/login">
                  Sign in
                </Button>
                <Button href="/signup">Create account</Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

