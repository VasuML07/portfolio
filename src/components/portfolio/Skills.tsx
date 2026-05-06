"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-16"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            Skills
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Technology ecosystem
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Organized by domain. No percentages — tools are learned through use,
            not completion.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {portfolioData.skills.map((group, i) => (
            <motion.div
              key={group.category}
              className="group rounded-xl border border-border/50 bg-card/30 p-6 transition-colors hover:border-border/80"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease }}
            >
              <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border/40 px-3 py-1.5 text-[13px] text-muted-foreground transition-all hover:border-border/80 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
