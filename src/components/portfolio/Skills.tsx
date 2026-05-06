"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Skills
          </p>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Technology</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Organized by domain. No percentages — tools are learned through use, not completion.
          </p>
        </motion.div>
        <div className="grid gap-8 sm:grid-cols-2">
          {portfolioData.skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground/60">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border px-2.5 py-1 text-[13px] text-muted-foreground transition-colors hover:border-muted-foreground/20 hover:text-foreground"
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
