"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Terminal, Box, Layers, GitBranch, Zap, Rocket, Activity, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export type Project = (typeof portfolioData.projects)[0];

/* ------------------------------------------------------------------ */
/* Animated Counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const isNumeric = !isNaN(numericPart);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isNumeric) {
      const timer = setTimeout(() => setDisplay(value), delay * 1000 + 600);
      return () => clearTimeout(timer);
    }

    const duration = 1200;
    const startTime = Date.now() + delay * 1000;

    function tick() {
      const elapsed = Date.now() - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Number.isInteger(numericPart)
        ? Math.round(numericPart * eased)
        : parseFloat((numericPart * eased).toFixed(1));
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, isNumeric, numericPart, suffix, delay]);

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-bold tabular-nums text-[#7C3AED] sm:text-3xl">
        {display}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section wrapper                                                    */
/* ------------------------------------------------------------------ */

function CaseStudySection({
  icon: Icon,
  label,
  children,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + delay * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-[#7C3AED]/10 text-[#7C3AED]">
          <Icon className="size-3.5" />
        </div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">
          {label}
        </h4>
      </div>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Divider                                                            */
/* ------------------------------------------------------------------ */

function Divider() {
  return (
    <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ProjectCaseStudy({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when project changes
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open, project.id]);

  // ESC to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 top-0 left-0 z-50 flex h-full w-full max-w-none translate-x-0 translate-y-0 items-start justify-center overflow-hidden rounded-none border-0 bg-background/95 p-0 backdrop-blur-xl sm:max-w-none [&>button]:hidden"
      >
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="fixed right-4 top-4 z-[60] flex size-10 items-center justify-center rounded-full glass transition-all hover:scale-110 hover:glow-sm"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="h-full w-full overflow-y-auto"
        >
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-10"
              >
                {/* ============ 1. HERO ============ */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#7C3AED]/60">
                    Case Study
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    {project.title}
                  </h2>
                  <p className="font-mono text-sm text-muted-foreground">
                    {project.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/8 px-3 py-1 text-xs font-medium text-[#7C3AED]/90 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <Divider />

                {/* ============ 2. METRICS BAR ============ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="glass rounded-xl p-6 sm:p-8"
                >
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
                    {project.caseStudy.metrics.map((metric, i) => (
                      <AnimatedCounter
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        delay={i * 0.12}
                      />
                    ))}
                  </div>
                </motion.div>

                <Divider />

                {/* ============ 3. PROBLEM STATEMENT ============ */}
                <CaseStudySection icon={Terminal} label="The Problem" delay={1}>
                  <p className="text-sm leading-relaxed text-muted-foreground/90">
                    {project.caseStudy.problem}
                  </p>
                </CaseStudySection>

                <Divider />

                {/* ============ 4. WHY IT MATTERS ============ */}
                <CaseStudySection icon={Activity} label="Why It Matters" delay={2}>
                  <p className="text-sm leading-relaxed text-muted-foreground/90">
                    {project.caseStudy.whyItMatters}
                  </p>
                </CaseStudySection>

                <Divider />

                {/* ============ 5. SYSTEM ARCHITECTURE ============ */}
                <CaseStudySection icon={Box} label="Architecture" delay={3}>
                  <div className="relative rounded-lg border border-[#7C3AED]/15 bg-black/40 p-4 sm:p-5">
                    {/* Fake code header dots */}
                    <div className="mb-3 flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-red-500/60" />
                      <span className="size-2.5 rounded-full bg-yellow-500/60" />
                      <span className="size-2.5 rounded-full bg-green-500/60" />
                      <span className="ml-2 font-mono text-[10px] text-muted-foreground/40">
                        architecture
                      </span>
                    </div>
                    <p className="font-mono text-xs leading-relaxed text-emerald-400/80 sm:text-sm">
                      {project.caseStudy.architecture}
                    </p>
                  </div>
                </CaseStudySection>

                <Divider />

                {/* ============ 6. TECH STACK ============ */}
                <CaseStudySection icon={Layers} label="Tech Stack" delay={4}>
                  <div className="flex flex-wrap gap-2">
                    {project.caseStudy.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/80 font-mono"
                      >
                        <span className="size-1.5 rounded-full bg-[#7C3AED]" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </CaseStudySection>

                <Divider />

                {/* ============ 7. TRADEOFFS ============ */}
                <CaseStudySection icon={GitBranch} label="Tradeoffs" delay={5}>
                  <p className="text-sm leading-relaxed text-muted-foreground/90">
                    {project.caseStudy.tradeoffs}
                  </p>
                </CaseStudySection>

                <Divider />

                {/* ============ 8. CHALLENGES ============ */}
                <CaseStudySection icon={Terminal} label="Challenges" delay={6}>
                  <p className="text-sm leading-relaxed text-muted-foreground/90">
                    {project.caseStudy.challenges}
                  </p>
                </CaseStudySection>

                <Divider />

                {/* ============ 9. OPTIMIZATIONS ============ */}
                <CaseStudySection icon={Zap} label="Optimizations" delay={7}>
                  <p className="text-sm leading-relaxed text-muted-foreground/90">
                    {project.caseStudy.optimizations}
                  </p>
                </CaseStudySection>

                <Divider />

                {/* ============ 10. DEPLOYMENT ============ */}
                <CaseStudySection icon={Rocket} label="Deployment" delay={8}>
                  <p className="text-sm leading-relaxed text-muted-foreground/90">
                    {project.caseStudy.deployment}
                  </p>
                </CaseStudySection>

                <Divider />

                {/* ============ 11. ACTION BUTTONS ============ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="flex flex-col gap-3 pt-4 sm:flex-row"
                >
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white/5 px-5 py-3 text-sm font-medium transition-all hover:border-[#7C3AED]/40 hover:glow-sm"
                  >
                    <Github className="size-4" />
                    <span>View on GitHub</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-5 py-3 text-sm font-medium text-white transition-all hover:bg-[#6D28D9] hover:glow-sm"
                  >
                    <ExternalLink className="size-4" />
                    <span>Live Demo</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </motion.div>

                {/* Bottom spacer */}
                <div className="h-8" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
