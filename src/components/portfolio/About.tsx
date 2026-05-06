"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function About() {
  const { about, education, timeline } = portfolioData;

  return (
    <section id="about" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-16"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            About
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Background
          </h2>
        </motion.div>

        {/* About text */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          {about.map((paragraph, i) => (
            <p
              key={i}
              className="text-[15px] leading-[1.8] text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Education */}
        <motion.div
          className="mt-16 rounded-xl border border-border/50 bg-card/30 p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground/40">
            Education
          </p>
          <h3 className="text-base font-medium">{education.degree}</h3>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {education.institution}
          </p>
          <p className="mt-0.5 text-[14px] text-muted-foreground/70">
            {education.field} · {education.year}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            Timeline
          </p>
          <div className="relative space-y-0">
            <div className="absolute left-[6px] top-2 bottom-2 w-px bg-border/50" />
            {timeline.map((entry, i) => (
              <motion.div
                key={i}
                className="relative flex gap-5 py-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
              >
                <div className="relative z-10 mt-1.5 h-[13px] w-[13px] shrink-0 rounded-full border border-border/60 bg-background" />
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground/40">
                      {entry.year}
                    </span>
                    <span className="text-[14px] font-medium">
                      {entry.title}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
