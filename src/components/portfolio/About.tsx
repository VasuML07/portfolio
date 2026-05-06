"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import {
  GraduationCap,
  BrainCircuit,
  Shield,
  Heart,
  Trophy,
  Terminal,
  Cpu,
  Sparkles,
} from "lucide-react";

const timelineIcons: Record<string, React.ElementType> = {
  GraduationCap,
  BrainCircuit,
  Shield,
  Heart,
  Trophy,
};

export default function About() {
  const { personalInfo, timeline } = portfolioData;

  return (
    <section id="about" className="relative py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The story behind the code — who I am, what drives me, and where
            I&apos;m headed.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-24">
          {/* Left Column - Who I Am */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} className="text-amber-400" />
              <h3 className="text-2xl font-bold">Who I Am</h3>
            </div>

            <div className="space-y-4 text-white/70 leading-relaxed text-[15px]">
              <p>
                I don&apos;t just use AI frameworks — I build them from scratch.
                There&apos;s something deeply satisfying about implementing
                backpropagation with raw NumPy, watching gradients flow through
                layers I designed myself. That&apos;s where my engineering mindset
                comes from: understanding systems from the ground up.
              </p>
              <p>
                Right now, I&apos;m a B.Tech student at VIT-AP University
                specializing in AI/ML, but my real classroom is the terminal. Every
                project I take on is an excuse to go deeper — whether it&apos;s
                building neural networks without frameworks, deploying NLP systems
                for fraud detection, or training classifiers for healthcare
                diagnostics.
              </p>
              <p className="text-white/80 font-medium">
                I believe the best engineers aren&apos;t defined by the tools they
                use, but by how well they understand what those tools are actually
                doing.
              </p>
            </div>

            {/* Focus Area Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {[
                { label: "AI / ML", color: "#7C3AED" },
                { label: "Deep Learning", color: "#7C3AED" },
                { label: "NLP", color: "#06B6D4" },
                { label: "Python", color: "#F59E0B" },
                { label: "Healthcare AI", color: "#10B981" },
                { label: "Computer Vision", color: "#EC4899" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className="px-3 py-1.5 text-xs font-medium rounded-full
                             border backdrop-blur-sm"
                  style={{
                    color: tag.color,
                    borderColor: `${tag.color}30`,
                    backgroundColor: `${tag.color}08`,
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column - vasu.config.ts */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <div className="rounded-xl overflow-hidden border border-white/[0.06]
                            bg-black/40 backdrop-blur-sm shadow-2xl shadow-black/20">
              {/* Window Title Bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03]
                              border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-white/30 font-mono">
                    vasu.config.ts
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <Terminal size={12} className="text-white/20" />
                </div>
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-sm leading-7 overflow-x-auto">
                <CodeLine num={1}>
                  <KW>const</KW> <Var>vasu</Var> <Op>=</Op> <Obj>{"{"}</Obj>
                </CodeLine>
                <CodeLine num={2} indent={1}>
                  <Key>name</Key>
                  <Op>:</Op>{" "}
                  <Str>&quot;{personalInfo.firstName} {personalInfo.lastName}&quot;</Str>
                  <Punc>,</Punc>
                </CodeLine>
                <CodeLine num={3} indent={1}>
                  <Key>role</Key>
                  <Op>:</Op>{" "}
                  <Str>&quot;{personalInfo.title}&quot;</Str>
                  <Punc>,</Punc>
                </CodeLine>
                <CodeLine num={4} indent={1}>
                  <Key>education</Key>
                  <Op>:</Op>{" "}
                  <Str>&quot;B.Tech CSE @ VIT-AP University&quot;</Str>
                  <Punc>,</Punc>
                </CodeLine>
                <CodeLine num={5} indent={1}>
                  <Key>specialization</Key>
                  <Op>:</Op>{" "}
                  <Str>&quot;AI / Machine Learning&quot;</Str>
                  <Punc>,</Punc>
                </CodeLine>
                <CodeLine num={6} indent={1}>
                  <Key>focus</Key>
                  <Op>:</Op> <Arr>[</Arr>
                </CodeLine>
                <CodeLine num={7} indent={2}>
                  <Str>&quot;Neural Networks from Scratch&quot;</Str>
                  <Punc>,</Punc>
                </CodeLine>
                <CodeLine num={8} indent={2}>
                  <Str>&quot;NLP &amp; Healthcare AI&quot;</Str>
                  <Punc>,</Punc>
                </CodeLine>
                <CodeLine num={9} indent={2}>
                  <Str>&quot;Fraud Detection Systems&quot;</Str>
                </CodeLine>
                <CodeLine num={10} indent={1}>
                  <Arr>]</Arr>
                  <Punc>,</Punc>
                </CodeLine>
                <CodeLine num={11} indent={1}>
                  <Key>passion</Key>
                  <Op>:</Op>{" "}
                  <Str>&quot;Understanding AI from first principles&quot;</Str>
                  <Punc>,</Punc>
                </CodeLine>
                <CodeLine num={12} indent={1}>
                  <Key>status</Key>
                  <Op>:</Op>{" "}
                  <Str>&quot;{personalInfo.availability}&quot;</Str>
                  <Punc>,</Punc>
                </CodeLine>
                <CodeLine num={13}>
                  <Obj>{"}"}</Obj>
                  <Punc>;</Punc>
                </CodeLine>
              </div>
            </div>

            {/* Config file decorative note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 flex items-center gap-2 text-white/25 text-xs"
            >
              <Cpu size={14} />
              <span>Compiled with passion &amp; raw NumPy</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h3 className="text-3xl font-bold tracking-tight">My Journey</h3>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] md:-translate-x-px" />

          <div className="space-y-12 md:space-y-16">
            {timeline.map((entry, index) => {
              const Icon = timelineIcons[entry.icon] || GraduationCap;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${entry.year}-${entry.title}`}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -50 : 50,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="relative flex items-start gap-6 md:gap-0"
                >
                  {/* Desktop: alternating sides */}
                  <div
                    className={`hidden md:flex w-full items-center ${
                      isLeft ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Content card */}
                    <div
                      className={`w-[calc(50%-2rem)] ${
                        isLeft ? "pr-8 text-right" : "pl-8 text-left"
                      }`}
                    >
                      <TimelineCard entry={entry} Icon={Icon} />
                    </div>

                    {/* Center dot */}
                    <div className="relative flex-shrink-0 w-16 flex items-center justify-center">
                      <div className="absolute w-3 h-3 rounded-full bg-white/20 border-2 border-white/10 z-10" />
                      <div className="w-12 h-12 rounded-full bg-black/60 border border-white/[0.08] flex items-center justify-center">
                        <Icon size={20} className="text-white/70" />
                      </div>
                    </div>

                    {/* Empty space for the other side */}
                    <div className="w-[calc(50%-2rem)]" />
                  </div>

                  {/* Mobile: always left */}
                  <div className="flex md:hidden items-start gap-4 w-full">
                    {/* Dot / icon */}
                    <div className="relative flex-shrink-0 flex items-center justify-center">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/20 border-2 border-white/10 z-10" style={{ left: '12px', top: '20px' }} />
                      <div className="w-10 h-10 rounded-full bg-black/60 border border-white/[0.08] flex items-center justify-center mt-1">
                        <Icon size={16} className="text-white/70" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <TimelineCard entry={entry} Icon={Icon} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-components ── */

function TimelineCard({
  entry,
  Icon,
}: {
  entry: (typeof portfolioData.timeline)[number];
  Icon: React.ElementType;
}) {
  return (
    <div
      className="rounded-xl p-4 md:p-5 bg-white/[0.02] backdrop-blur-sm
                 border border-white/[0.05] hover:border-white/[0.1]
                 transition-all duration-300 group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-md bg-white/[0.06] text-white/40 border border-white/[0.08]">
          {entry.year}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={14} className="text-amber-400/80" />
        <h4 className="font-semibold text-white/90 text-sm">
          {entry.title}
        </h4>
      </div>
      <p className="text-white/50 text-xs leading-relaxed">
        {entry.description}
      </p>
    </div>
  );
}

/* ── Syntax highlighting helpers ── */

function CodeLine({
  num,
  indent = 0,
  children,
}: {
  num: number;
  indent?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <span className="select-none w-8 text-right mr-4 text-white/15 text-xs leading-7 shrink-0">
        {num}
      </span>
      <span style={{ paddingLeft: `${indent * 16}px` }} className="whitespace-pre">
        {children}
      </span>
    </div>
  );
}

function KW({ children }: { children: React.ReactNode }) {
  return <span className="text-purple-400">{children}</span>;
}
function Var({ children }: { children: React.ReactNode }) {
  return <span className="text-cyan-300">{children}</span>;
}
function Op({ children }: { children: React.ReactNode }) {
  return <span className="text-white/40">{children}</span>;
}
function Obj({ children }: { children: React.ReactNode }) {
  return <span className="text-white/60">{children}</span>;
}
function Key({ children }: { children: React.ReactNode }) {
  return <span className="text-emerald-400">{children}</span>;
}
function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-amber-300">{children}</span>;
}
function Punc({ children }: { children: React.ReactNode }) {
  return <span className="text-white/30">{children}</span>;
}
function Arr({ children }: { children: React.ReactNode }) {
  return <span className="text-white/40">{children}</span>;
}
