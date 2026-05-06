"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import ProjectCaseStudy from "./ProjectCaseStudy";
import type { Project } from "./ProjectCaseStudy";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof portfolioData.projects)[0] | null
  >(null);

  const projects = portfolioData.projects;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      {/* Background ambiance */}
      <div className="absolute inset-0 gradient-mesh opacity-60 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#7C3AED]/70 font-mono">
            Portfolio
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Selected Works
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent" />
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-sm leading-relaxed">
            A curated collection of projects spanning deep learning, NLP, and
            healthcare AI — each built from the ground up.
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {/* Large featured card - first project */}
          <ProjectCard
            project={projects[0]}
            isFeatured
            onClick={() => setSelectedProject(projects[0])}
            index={0}
          />

          {/* Two smaller cards stacked */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {projects.slice(1).map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
                index={i + 1}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectCaseStudy
          project={selectedProject as Project}
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Project Card                                                       */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  isFeatured = false,
  onClick,
  index,
}: {
  project: (typeof portfolioData.projects)[0];
  isFeatured?: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.015, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`
        group relative cursor-pointer overflow-hidden rounded-xl glass
        transition-all duration-300
        hover:border-[#7C3AED]/40 hover:glow-sm
        ${isFeatured ? "p-8 md:p-10" : "p-6 md:p-8"}
      `}
    >
      {/* Hover glow accent */}
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7C3AED]/10 via-transparent to-[#7C3AED]/5" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        {/* Top row: number + links */}
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-muted-foreground/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              aria-label="View source code on GitHub"
            >
              <Github className="size-4" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              aria-label="View live demo"
            >
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        {/* Title & subtitle */}
        <div>
          <h3
            className={`font-bold tracking-tight text-foreground transition-colors group-hover:text-[#7C3AED] ${
              isFeatured
                ? "text-2xl sm:text-3xl"
                : "text-xl sm:text-2xl"
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground/70">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p
          className={`leading-relaxed text-muted-foreground/80 ${
            isFeatured ? "text-sm" : "text-sm"
          }`}
        >
          {isFeatured
            ? project.description
            : project.description.length > 160
              ? project.description.slice(0, 160) + "..."
              : project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, isFeatured ? 5 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/8 px-3 py-0.5 text-[11px] font-medium text-[#7C3AED]/90 font-mono"
            >
              {tag}
            </span>
          ))}
          {!isFeatured && project.tags.length > 3 && (
            <span className="rounded-full border border-border bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground font-mono">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* "View Case Study" hint */}
        <div className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground/50 transition-colors group-hover:text-[#7C3AED]/70">
          <span>View case study</span>
          <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
}
