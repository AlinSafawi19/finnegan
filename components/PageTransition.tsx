"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

const WIDEN_EASE = [0.22, 1, 0.36, 1] as const;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="page-transition-root w-full min-w-0 overflow-x-clip">
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="page-transition-root w-full min-w-0 overflow-x-clip"
        style={{ transformOrigin: "50% 0%" }}
        initial={{ scaleX: 0.92, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0.92, opacity: 0 }}
        transition={{
          duration: 0.42,
          ease: WIDEN_EASE,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
