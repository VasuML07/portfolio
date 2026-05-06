"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Github, X } from "lucide-react";

export default function Projects() {
  const [selected, setSelected] = useState<(typeof portfolioData.projects)[number] | null>(null);

  return (
    <section id="projects" className="px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Projects
          </p>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
            Selected work
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Each project is an exercise in understanding — built to learn something specific about ML, systems, or software engineering.
          </p>
        </motion.div>

        <div className="space-y-0">
          {portfolioData.projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <CaseStudy project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectRow({ project, index, onClick }: { project: (typeof portfolioData.projects)[number]; index: number; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="group flex w-full items-baseline gap-4 border-b border-border py-5 text-left transition-colors hover:border-muted-foreground/20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <span className="shrink-0 font-mono text-xs text-muted-foreground/40">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-medium transition-colors group-hover:text-primary sm:text-base">
            {project.title}
          </h3>
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground/40 transition-colors hover:text-muted-foreground"
              aria-label="View source"
            >
              <Github size={15} strokeWidth={1.5} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground/40 transition-colors hover:text-muted-foreground"
                aria-label="View live"
              >
                <ExternalLink size={15} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t} className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

function CaseStudy({ project, onClose }: { project: (typeof portfolioData.projects)[number]; onClose: () => void }) {
  const { writeup } = project;
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-sm px-4 py-16 sm:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.article
        className="relative w-full max-w-2xl rounded-xl border border-border bg-card p-6 sm:p-8"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground/40 transition-colors hover:text-muted-foreground" aria-label="Close">
          <X size={18} strokeWidth={1.5} />
        </button>
        <h2 className="pr-8 text-xl font-medium tracking-tight sm:text-2xl">{project.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t} className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{t}</span>
          ))}
        </div>
        <div className="mt-8 space-y-6">
          <Section label="Why this project"><p className="text-sm leading-relaxed text-muted-foreground">{writeup.why}</p></Section>
          <Section label="Architecture"><p className="text-sm leading-relaxed text-muted-foreground">{writeup.architecture}</p></Section>
          <Section label="Challenges"><p className="text-sm leading-relaxed text-muted-foreground">{writeup.challenges}</p></Section>
          <Section label="Tradeoffs"><p className="text-sm leading-relaxed text-muted-foreground">{writeup.tradeoffs}</p></Section>
        </div>
        <div className="mt-8 flex gap-3 border-t border-border pt-6">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-muted-foreground/30">
            <Github size={14} strokeWidth={1.5} /> Source
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90">
              <ExternalLink size={14} strokeWidth={1.5} /> Live Demo
            </a>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground/60">{label}</h4>
      {children}
    </div>
  );
}
