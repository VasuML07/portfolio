"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const BentoGrid = () => {
  const projects = portfolioData.projects;

  return (
    <section id="projects" className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Selected <span className="text-blue-500">Works</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            A collection of projects that showcase my technical expertise in AI,
            machine learning, and software development.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`bg-black border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 ${
                project.colSpan || ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Project Image */}
              <div className="mb-4">
                <div
                  className={`w-full ${
                    project.colSpan === "md:col-span-2"
                      ? "h-48"
                      : "h-44"
                  } rounded-lg mb-4 border border-white/5 overflow-hidden flex items-center justify-center`}
                  style={{
                    background: `linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 50%, rgba(59,130,246,0.05) 100%)`,
                  }}
                >
                  <div className="text-center p-4">
                    <div className="text-3xl mb-2">
                      {project.title.includes("Neural") ? (
                        <span className="text-blue-500/60">&#x1F9E0;</span>
                      ) : project.title.includes("Fake") ? (
                        <span className="text-blue-500/60">&#x1F50D;</span>
                      ) : (
                        <span className="text-blue-500/60">&#x1F3E5;</span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-white/30">
                      {project.title}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-light mb-2 text-blue-500">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 rounded-full text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <Github size={16} />
                  Code
                </motion.a>
                {project.liveUrl && project.liveUrl !== "#" && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
