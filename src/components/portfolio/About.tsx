"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const { about, education, timeline } = portfolioData;

  return (
    <section id="about" className="px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            About
          </p>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
            Background
          </h2>
        </motion.div>

        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {about.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-[1.75] text-muted-foreground sm:text-[15px]"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div
          className="mt-14 rounded-lg border border-border p-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
            Education
          </p>
          <h3 className="text-base font-medium">{education.degree}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {education.institution}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {education.field} · {education.year}
          </p>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Timeline
          </p>
          <div className="relative space-y-0">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            {timeline.map((entry, i) => (
              <motion.div
                key={i}
                className="relative flex gap-4 py-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border border-border bg-background" />
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="shrink-0 font-mono text-xs text-muted-foreground/60">
                      {entry.year}
                    </span>
                    <span className="text-sm font-medium">{entry.title}</span>
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
