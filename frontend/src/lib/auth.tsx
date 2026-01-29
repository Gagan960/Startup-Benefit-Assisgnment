"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { clearToken, getToken, setToken } from "@/lib/storage";
import type { User } from "@/lib/types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  token: string | null;
  signin: (args: { email: string; password: string }) => Promise<void>;
  signup: (args: { username: string; email: string; password: string }) => Promise<void>;
  signout: () => void;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setTokenState] = useState<string | null>(null);

  const refreshMe = useCallback(async () => {
    const t = getToken();
    setTokenState(t);
    if (!t) {
      setUser(null);
      return;
    }
    try {
      const me = await apiFetch<User>("/user/me", { method: "GET" });
      setUser(me);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        clearToken();
        setTokenState(null);
        setUser(null);
      }
      throw e;
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await refreshMe();
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshMe]);

  const signin = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const tokenValue = await apiFetch<string>("/user/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        auth: false,
      });
      setToken(tokenValue);
      setTokenState(tokenValue);
      await refreshMe();
      router.push("/deals");
    },
    [refreshMe, router],
  );

  const signup = useCallback(
    async ({ username, email, password }: { username: string; email: string; password: string }) => {
      await apiFetch<User>("/user/signup", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        auth: false,
      });
      await signin({ email, password });
    },
    [signin],
  );

  const signout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setUser(null);
    router.push("/");
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, token, signin, signup, signout, refreshMe }),
    [user, loading, token, signin, signup, signout, refreshMe],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

