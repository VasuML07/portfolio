"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import {
  Mountain,
  BrainCircuit,
  ArrowUpDown,
  Type,
  FlaskConical,
  Loader2,
} from "lucide-react";

const labIcons: Record<string, React.ElementType> = {
  Mountain,
  BrainCircuit,
  ArrowUpDown,
  Type,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Lab() {
  const { lab } = portfolioData;

  return (
    <section id="lab" className="relative py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.03] text-white/40 text-xs font-medium mb-6">
            <FlaskConical size={14} />
            Experimental Zone
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            The Lab
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experiments, visualizations, and interactive explorations
          </p>
        </motion.div>

        {/* Lab Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {lab.map((experiment) => {
            const Icon = labIcons[experiment.icon] || FlaskConical;

            return (
              <motion.div
                key={experiment.id}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-xl p-6 md:p-8
                           bg-white/[0.02] backdrop-blur-md
                           border border-white/[0.06]
                           hover:border-white/[0.12]
                           transition-all duration-500 cursor-pointer
                           overflow-hidden"
              >
                {/* Subtle top accent gradient */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
                  }}
                />

                {/* Glow on hover */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full
                             opacity-0 group-hover:opacity-100 transition-opacity duration-700
                             pointer-events-none blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
                  }}
                />

                {/* Status badge */}
                <div className="absolute top-5 right-5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px]
                               font-semibold tracking-wider uppercase rounded-full
                               border bg-white/[0.03] text-white/30
                               border-white/[0.06]"
                  >
                    <Loader2 size={10} className="animate-spin opacity-50" />
                    Coming Soon
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl mb-5 flex items-center justify-center
                             bg-white/[0.03] border border-white/[0.06]
                             group-hover:border-white/[0.1] group-hover:bg-white/[0.05]
                             transition-all duration-500"
                >
                  <Icon
                    size={26}
                    className="text-white/30 group-hover:text-purple-400/80 transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white/90 mb-3
                               group-hover:text-white transition-colors duration-300">
                  {experiment.title}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed mb-5
                              group-hover:text-white/55 transition-colors duration-300">
                  {experiment.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {experiment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-md
                                 bg-white/[0.04] text-white/40
                                 border border-white/[0.05]
                                 group-hover:bg-white/[0.06] group-hover:text-white/55
                                 group-hover:border-white/[0.08]
                                 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom hover line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full
                          border border-white/[0.04] bg-white/[0.01]">
            <motion.span
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-2 w-2"
            >
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-purple-500/60 opacity-75"
                style={{
                  animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500/80" />
            </motion.span>
            <span className="text-white/25 text-sm">
              More experiments coming soon...
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
