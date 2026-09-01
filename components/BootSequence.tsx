"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const bootLines = [
  "Booting PortfolioOS...",
  "Loading shell...",
  "Initializing profile...",
  "Connecting GitHub...",
  "System Ready.",
];

export function BootSequence() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const hasSeenBoot = window.localStorage.getItem("portfolio-shell-seen");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !(hasSeenBoot || prefersReducedMotion);
  });
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const interval = window.setInterval(() => {
      setLineIndex((current) => {
        if (current >= bootLines.length - 1) {
          window.clearInterval(interval);
          window.setTimeout(() => {
            setVisible(false);
            window.localStorage.setItem("portfolio-shell-seen", "true");
          }, 500);
          return current;
        }

        return current + 1;
      });
    }, 420);

    return () => window.clearInterval(interval);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0 z-30 flex items-center justify-center bg-[#050505] text-[#b9f0bf]"
        >
          <div className="w-full max-w-2xl space-y-3 px-8 font-mono text-sm tracking-[0.08em] text-[#d7fbd2]">
            {bootLines.slice(0, lineIndex + 1).map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className="min-h-5"
              >
                {line}
              </motion.div>
            ))}
            {lineIndex < bootLines.length - 1 ? (
              <motion.div
                className="inline-flex items-center gap-2 text-[#86efac]"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <span className="h-2 w-2 rounded-full bg-[#86efac]" />
                loading
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
