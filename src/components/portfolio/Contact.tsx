"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const links = [
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${portfolioData.email}`,
    detail: portfolioData.email,
  },
  {
    icon: Github,
    label: "GitHub",
    href: portfolioData.github,
    detail: "github.com/VasuML07",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: portfolioData.linkedin,
    detail: "linkedin.com/in/vasu-margana",
  },
  {
    icon: FileText,
    label: "Resume",
    href: portfolioData.resumeUrl,
    detail: "Google Drive PDF",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            Contact
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Open to internships, research collaborations, or interesting
            conversations about ML and engineering.
          </p>
        </motion.div>

        <div className="space-y-2">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={
                link.label !== "Email"
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group flex items-center gap-4 rounded-xl border border-border/40 bg-card/20 p-4 transition-all hover:border-border/70 hover:bg-card/40"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground/50 transition-colors group-hover:text-foreground/70">
                <link.icon size={16} strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium">{link.label}</p>
                <p className="truncate font-mono text-[12px] text-muted-foreground/50">
                  {link.detail}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="shrink-0 text-muted-foreground/20 transition-colors group-hover:text-muted-foreground/50"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
