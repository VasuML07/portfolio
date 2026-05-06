"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const { email, github, linkedin, resumeUrl } = portfolioData;

  return (
    <section id="contact" className="px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
            Get in touch
          </h2>
        </motion.div>

        <motion.p
          className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Open to internships, research collaborations, or interesting conversations about ML and engineering. The fastest way to reach me is email.
        </motion.p>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <a
            href={`mailto:${email}`}
            className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-muted-foreground/20"
          >
            <Mail size={16} strokeWidth={1.5} className="text-muted-foreground/60" />
            <div className="min-w-0 flex-1">
              <p className="text-sm">Email</p>
              <p className="truncate font-mono text-xs text-muted-foreground">{email}</p>
            </div>
            <ArrowUpRight size={14} strokeWidth={1.5} className="shrink-0 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground" />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-muted-foreground/20"
          >
            <Github size={16} strokeWidth={1.5} className="text-muted-foreground/60" />
            <div className="min-w-0 flex-1">
              <p className="text-sm">GitHub</p>
              <p className="truncate font-mono text-xs text-muted-foreground">github.com/VasuML07</p>
            </div>
            <ArrowUpRight size={14} strokeWidth={1.5} className="shrink-0 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground" />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-muted-foreground/20"
          >
            <Linkedin size={16} strokeWidth={1.5} className="text-muted-foreground/60" />
            <div className="min-w-0 flex-1">
              <p className="text-sm">LinkedIn</p>
              <p className="truncate font-mono text-xs text-muted-foreground">linkedin.com/in/vasu-margana</p>
            </div>
            <ArrowUpRight size={14} strokeWidth={1.5} className="shrink-0 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground" />
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-muted-foreground/20"
          >
            <FileText size={16} strokeWidth={1.5} className="text-muted-foreground/60" />
            <div className="min-w-0 flex-1">
              <p className="text-sm">Resume</p>
              <p className="text-xs text-muted-foreground">Google Drive PDF</p>
            </div>
            <ArrowUpRight size={14} strokeWidth={1.5} className="shrink-0 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
