"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Github, ExternalLink, X, ChevronDown } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-16"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            Projects
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected work
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Each project is an exercise in understanding — built to learn
            something specific about ML, systems, or software engineering.
          </p>
        </motion.div>

        <div className="space-y-0">
          {portfolioData.projects.map((project, i) => (
            <ProjectCaseStudy
              key={project.id}
              project={project}
              index={i}
              isExpanded={expanded === project.id}
              onToggle={() =>
                setExpanded(expanded === project.id ? null : project.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectData {
  id: string;
  title: string;
  summary: string;
  repo: string;
  live: string | null;
  stack: string[];
  writeup: {
    problem: string;
    architecture: string;
    challenges: string;
    tradeoffs: string;
    deployment: string | null;
  };
}

function ProjectCaseStudy({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: ProjectData;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { writeup } = project;

  return (
    <motion.div
      className="border-b border-border/60"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
    >
      {/* Collapsed header */}
      <button
        onClick={onToggle}
        className="group flex w-full items-start gap-5 py-7 text-left sm:items-center"
      >
        <span className="shrink-0 pt-0.5 font-mono text-xs text-muted-foreground/30 sm:pt-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-medium tracking-tight transition-colors group-hover:text-foreground/80 sm:text-lg">
                {project.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground max-w-2xl">
                {project.summary}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 items-center gap-1.5 rounded-full border border-border/60 px-3 text-[11px] text-muted-foreground transition-all hover:border-border hover:text-foreground"
                aria-label="View source"
              >
                <Github size={12} strokeWidth={1.5} />
                Source
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-8 items-center gap-1.5 rounded-full border border-border/60 px-3 text-[11px] text-muted-foreground transition-all hover:border-border hover:text-foreground"
                  aria-label="View live"
                >
                  <ExternalLink size={12} strokeWidth={1.5} />
                  Live
                </a>
              )}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-md bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <motion.div
          className="shrink-0 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/60"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} strokeWidth={1.5} />
        </motion.div>
      </button>

      {/* Expanded case study */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-10 pr-4 sm:pl-14">
              <div className="rounded-xl border border-border/50 bg-card/50 p-6 sm:p-8">
                <div className="space-y-8">
                  <CaseSection
                    label="Problem"
                    content={writeup.problem}
                  />
                  <CaseSection
                    label="Architecture"
                    content={writeup.architecture}
                  />
                  <CaseSection
                    label="Challenges"
                    content={writeup.challenges}
                  />
                  <CaseSection
                    label="Tradeoffs"
                    content={writeup.tradeoffs}
                  />
                  {writeup.deployment && (
                    <CaseSection
                      label="Deployment"
                      content={writeup.deployment}
                    />
                  )}
                </div>
                <div className="mt-8 flex gap-3 border-t border-border/50 pt-6">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-4 py-2 text-[12px] font-medium text-muted-foreground transition-all hover:text-foreground"
                  >
                    <Github size={13} strokeWidth={1.5} />
                    View Source
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[12px] font-medium text-background transition-all hover:bg-foreground/90"
                    >
                      <ExternalLink size={13} strokeWidth={1.5} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CaseSection({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <div>
      <h4 className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
        {label}
      </h4>
      <p className="text-[14px] leading-[1.8] text-muted-foreground">
        {content}
      </p>
    </div>
  );
}
