"use client";

import { motion, useAnimation } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const controls = useAnimation();

  React.useEffect(() => {
    // Avoid rare cases where exit/initial states keep opacity at 0 until a repaint.
    controls.set({ opacity: 1, y: 0 });
    // Trigger a small, fast transition on navigation.
    controls.start({
      opacity: [0.92, 1],
      y: [6, 0],
      transition: { duration: 0.14, ease: "easeOut" },
    });
  }, [pathname, controls]);

  return (
    <motion.div key={pathname} initial={false} animate={controls} className="min-h-screen">
      {children}
    </motion.div>
  );
}

