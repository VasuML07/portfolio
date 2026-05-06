"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin, Download, Terminal } from "lucide-react";

const terminalLines = [
  { text: "Fetching contact information...", type: "info" as const },
  {
    text: `✓ Email: ${portfolioData.personalInfo.email}`,
    type: "success" as const,
  },
  {
    text: `✓ GitHub: github.com/VasuML07`,
    type: "success" as const,
  },
  {
    text: `✓ LinkedIn: linkedin.com/in/vasu-margana`,
    type: "success" as const,
  },
  { text: "✓ Resume: Available for download", type: "success" as const },
  { text: "", type: "blank" as const },
  {
    text: "Ready for new opportunities. Open to internships and AI engineering roles.",
    type: "message" as const,
  },
  { text: "Send a message →", type: "prompt" as const },
];

const lineVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.35,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function Contact() {
  const [showButtons, setShowButtons] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleAnimationComplete = () => {
    setShowButtons(true);
    setHasAnimated(true);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Let&apos;s Connect
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-xl border border-border/50 bg-card/30 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border/50">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="flex-1 text-center text-xs sm:text-sm font-mono text-muted-foreground">
              vasu@portfolio:~$ contact --all
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-6 font-mono text-sm space-y-1.5 min-h-[280px]">
            {!hasAnimated && (
              <AnimatePresence onExitComplete={handleAnimationComplete}>
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className={`whitespace-nowrap overflow-x-auto ${
                      line.type === "info"
                        ? "text-muted-foreground"
                        : line.type === "success"
                        ? "text-green-400"
                        : line.type === "message"
                        ? "text-foreground/80"
                        : line.type === "prompt"
                        ? "text-primary font-semibold"
                        : "h-4"
                    }`}
                  >
                    {line.type !== "blank" && (
                      <span className="text-muted-foreground/60 mr-1">&gt;</span>
                    )}
                    {line.text}
                    {line.type === "prompt" && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {hasAnimated && (
              <div className="space-y-1.5">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`whitespace-nowrap overflow-x-auto ${
                      line.type === "info"
                        ? "text-muted-foreground"
                        : line.type === "success"
                        ? "text-green-400"
                        : line.type === "message"
                        ? "text-foreground/80"
                        : line.type === "prompt"
                        ? "text-primary font-semibold"
                        : "h-4"
                    }`}
                  >
                    {line.type !== "blank" && (
                      <span className="text-muted-foreground/60 mr-1">&gt;</span>
                    )}
                    {line.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <AnimatePresence>
            {showButtons && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="px-4 sm:px-6 pb-5 pt-1"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  <a
                    href={`mailto:${portfolioData.personalInfo.email}`}
                    className="group flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/50 bg-muted/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 text-xs sm:text-sm font-mono"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate">
                      Email
                    </span>
                  </a>
                  <a
                    href={portfolioData.socials[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/50 bg-muted/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 text-xs sm:text-sm font-mono"
                  >
                    <Github className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate">
                      GitHub
                    </span>
                  </a>
                  <a
                    href={portfolioData.socials[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/50 bg-muted/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 text-xs sm:text-sm font-mono"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    href={portfolioData.personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/50 bg-muted/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 text-xs sm:text-sm font-mono"
                  >
                    <Download className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate">
                      Resume
                    </span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
