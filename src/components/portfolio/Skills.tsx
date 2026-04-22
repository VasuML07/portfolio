"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code,
  Layers,
  TerminalSquare,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: BrainCircuit,
  code: Code,
  layers: Layers,
  terminal: TerminalSquare,
};

const Skills = () => {
  const skillCategories = portfolioData.skills;

  return (
    <section id="skills" className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Technical <span className="text-blue-500">Arsenal</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Tools, technologies, and concepts I work with to build AI-powered
            solutions.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] || Code;
            return (
              <motion.div
                key={category.category}
                className="bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1 + skillIndex * 0.05,
                      }}
                    >
                      <span className="text-blue-500 text-xs flex-shrink-0">
                        &#x203A;
                      </span>
                      <span className="text-white/70 text-sm font-mono">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
