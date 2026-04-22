"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { personalInfo, socials } = portfolioData;

  return (
    <footer
      id="contact"
      className="py-16 px-6 bg-black border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Get in <span className="text-blue-500">Touch</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            Interested in collaborating, discussing AI projects, or have an
            opportunity in mind? Feel free to reach out!
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a
            href={socials[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-white/70 hover:text-white" />
          </a>
          <a
            href={socials[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-white/70 hover:text-white" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-3 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 text-white/70 hover:text-white" />
          </a>
          {personalInfo.resumeUrl && (
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
              aria-label="Resume"
            >
              <FileText className="w-5 h-5 text-white/70 hover:text-white" />
            </a>
          )}
        </motion.div>

        {/* Email Display */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="font-mono text-sm text-white/40 hover:text-blue-500 transition-colors"
          >
            {personalInfo.email}
          </a>
        </motion.div>

        {/* Divider & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
          <p className="text-white/50 text-sm font-mono">
            &copy; {currentYear} {personalInfo.displayName}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-mono mt-2">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
