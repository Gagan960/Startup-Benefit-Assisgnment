"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Container } from "@/components/Container";
import { Skeleton } from "@/components/Skeleton";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <Container>
        <div className="py-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <Skeleton className="h-6 w-44" />
            <div className="mt-4 grid gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return <>{children}</>;
}

