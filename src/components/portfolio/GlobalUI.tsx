"use client";

import { useEffect, useState, useCallback, useRef, useSyncExternalStore, ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScroll";
import LoadingScreen from "./LoadingScreen";

function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50 origin-left"
      style={{ scaleX: progress / 100 }}
    />
  );
}

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isVisibleRef = useRef(false);
  const isPointerFine = useMediaQuery("(pointer: fine)");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const outerX = useSpring(cursorX, springConfig);
  const outerY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    },
    [cursorX, cursorY]
  );

  const handleMouseEnterInteractive = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeaveInteractive = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isVisibleRef.current = false;
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Observe interactive elements for hover scaling
    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const attachHoverListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };

    attachHoverListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [
    isPointerFine,
    handleMouseMove,
    handleMouseEnterInteractive,
    handleMouseLeaveInteractive,
    handleMouseLeave,
  ]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Outer circle — follows with spring delay */}
      <motion.div
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          x: outerX,
          y: outerY,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="rounded-full border-2 border-primary/70"
          style={{
            width: 32,
            height: 32,
            transform: "translate(-50%, -50%)",
          }}
        />
      </motion.div>

      {/* Inner dot — follows instantly */}
      <motion.div
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.15 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="rounded-full bg-primary"
          style={{
            width: 6,
            height: 6,
            transform: "translate(-50%, -50%)",
          }}
        />
      </motion.div>
    </>
  );
}

export default function GlobalUI({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      {children}
    </>
  );
}
