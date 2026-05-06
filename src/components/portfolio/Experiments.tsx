"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Experiments() {
  return (
    <section id="experiments" className="px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Experiments
          </p>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
            Research &amp; explorations
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Small projects and visualizations built to understand specific concepts better. These are works in progress.
          </p>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-2">
          {portfolioData.experiments.map((exp, i) => (
            <motion.div
              key={exp.title}
              className="group rounded-lg border border-border p-4 transition-colors hover:border-muted-foreground/20"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <h3 className="text-sm font-medium transition-colors group-hover:text-primary">{exp.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{exp.description}</p>
              <div className="mt-3 flex gap-1.5">
                {exp.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
