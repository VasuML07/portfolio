"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  FolderOpen,
  Cpu,
  BarChart3,
  FlaskConical,
  Mail,
  Menu,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useActiveSection } from "@/hooks/useScroll";
import { portfolioData } from "@/data/portfolio";

const sectionIds = [
  "hero",
  "about",
  "projects",
  "skills",
  "stats",
  "lab",
  "contact",
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  hero: Home,
  about: User,
  projects: FolderOpen,
  skills: Cpu,
  stats: BarChart3,
  lab: FlaskConical,
  contact: Mail,
};

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* ── Mobile Hamburger Button ── */}
      <button
        className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-background/60 backdrop-blur-xl shadow-lg md:hidden transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {mobileOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
              className="absolute top-6 left-6 text-2xl font-bold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Vasu<span className="text-primary">.</span>
            </motion.a>

            {/* Close hint */}
            <motion.p
              className="absolute bottom-8 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Press{" "}
              <kbd className="rounded border border-muted-foreground/30 bg-muted px-1.5 py-0.5 text-[10px] font-mono">
                ESC
              </kbd>{" "}
              to close
            </motion.p>

            {/* Nav Links */}
            <nav className="flex flex-col items-center gap-2">
              {portfolioData.navItems.map((item, i) => {
                const Icon = iconMap[item.id];
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group relative flex w-64 items-center gap-4 rounded-xl px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-accent/60 hover:text-foreground"
                    }`}
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    transition={{
                      delay: 0.05 * i,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {Icon && (
                      <Icon
                        className={`h-5 w-5 shrink-0 transition-colors ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                    )}
                    <span className="text-lg font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="mobile-active"
                        className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <kbd className="ml-auto text-[10px] font-mono text-muted-foreground/60">
                      {item.shortcut}
                    </kbd>
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop Floating Dock ── */}
      <motion.nav
        className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 md:flex"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-background/60 px-3 py-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:shadow-primary/5">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            className="mr-2 px-2 text-sm font-bold tracking-tight transition-opacity hover:opacity-80 focus-visible:outline-none"
          >
            Vasu<span className="text-primary">.</span>
          </a>

          {/* Separator */}
          <div className="mr-1 h-4 w-px bg-border/50" />

          {/* Nav Items */}
          <div className="flex items-center gap-0.5">
            {portfolioData.navItems.map((item) => {
              const Icon = iconMap[item.id];
              const isActive = activeSection === item.id;

              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Navigate to ${item.label}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {Icon && (
                        <Icon
                          className={`h-[18px] w-[18px] transition-colors duration-200 ${
                            isActive
                              ? "text-primary"
                              : "group-hover:text-foreground"
                          }`}
                        />
                      )}

                      {/* Active glow dot */}
                      {isActive && (
                        <motion.span
                          layoutId="dock-active-glow"
                          className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(var(--primary),0.6)]"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover background */}
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent/50 opacity-0 transition-opacity group-hover:opacity-100"
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={12}
                    className="rounded-lg border border-white/10 bg-popover/90 px-3 py-1.5 text-xs backdrop-blur-sm"
                  >
                    <span className="font-medium">{item.label}</span>
                    <kbd className="ml-2 rounded border border-border bg-muted px-1 py-px font-mono text-[10px] text-muted-foreground">
                      {item.shortcut}
                    </kbd>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* ESC key handler for mobile menu */}
      <MobileEscHandler onClose={() => setMobileOpen(false)} />
    </>
  );
}

/** Sub-component to keep the effect clean and outside the main render */
function MobileEscHandler({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return null;
}
