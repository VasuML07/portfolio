"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";

const sections = [
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "GitHub", id: "stats" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Desktop floating dock */}
      <motion.header
        className="fixed top-5 left-1/2 z-50 hidden md:block"
        style={{ x: "-50%" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <nav
          className={`flex items-center gap-0.5 rounded-full border px-1.5 py-1 transition-all duration-500 ${
            scrolled
              ? "border-border/80 bg-background/70 shadow-lg shadow-black/20 backdrop-blur-2xl"
              : "border-border/40 bg-background/40 backdrop-blur-xl"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium tracking-tight transition-colors hover:text-foreground/80"
          >
            <span className="text-foreground">vasu</span>
            <span className="text-foreground/30">.</span>
          </button>

          <div className="mx-1.5 h-4 w-px bg-border/60" />

          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`relative rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                active === s.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-secondary/80"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          ))}

          <div className="mx-1.5 h-4 w-px bg-border/60" />

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            <Sun size={13} strokeWidth={1.5} className="block dark:hidden" />
            <Moon size={13} strokeWidth={1.5} className="hidden dark:block" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-medium tracking-tight"
          >
            vasu<span className="text-foreground/30">.</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle theme"
            >
              <Sun size={14} strokeWidth={1.5} className="block dark:hidden" />
              <Moon size={14} strokeWidth={1.5} className="hidden dark:block" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={14} strokeWidth={1.5} /> : <Menu size={14} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
          >
            <nav className="flex flex-col items-center gap-8">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`text-2xl font-light tracking-tight transition-colors ${
                    active === s.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
