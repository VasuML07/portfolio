"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (!isLoading) return;
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Vasu
              <span className="text-primary">.</span>
            </h1>
          </motion.div>

          {/* Loading Bar */}
          <div className="w-48 h-0.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3,
              }}
              className="h-full rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/80"
            />
          </div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-4 font-mono text-xs text-muted-foreground"
          >
            Loading experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
