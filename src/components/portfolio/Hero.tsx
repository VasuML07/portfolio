"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowDown, Github, FileText, ArrowRight } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Hero() {
  const { hero, github, resumeUrl } = portfolioData;

  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Dot grid */}
      <div className="dot-grid absolute inset-0" />

      {/* Noise overlay */}
      <div className="noise absolute inset-0" />

      {/* Gradient orb */}
      <div
        className="gradient-orb pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-24 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-secondary/40 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[12px] font-medium text-muted-foreground">
              {hero.status}
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="whitespace-pre-line text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-[3.5rem] lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {hero.headline.map((line, i) => (
            <span key={i}>
              {i === 1 ? (
                <span className="text-muted-foreground">{line}</span>
              ) : (
                line
              )}
              {i < hero.headline.length - 1 && "\n"}
            </span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mx-auto mt-7 max-w-xl text-[15px] leading-[1.75] text-muted-foreground sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          {hero.sub}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-5 py-2.5 text-[13px] font-medium transition-all hover:border-border hover:bg-secondary/70"
          >
            <Github size={15} strokeWidth={1.5} />
            GitHub
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-5 py-2.5 text-[13px] font-medium transition-all hover:border-border hover:bg-secondary/70"
          >
            <FileText size={15} strokeWidth={1.5} />
            Resume
          </a>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-medium text-background transition-all hover:bg-foreground/90"
          >
            Contact
            <ArrowRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <button
          onClick={() =>
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center gap-1.5 text-muted-foreground/30 transition-colors hover:text-muted-foreground/60"
          aria-label="Scroll to projects"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={13} strokeWidth={1.5} />
          </motion.div>
        </button>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
