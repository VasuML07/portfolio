"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            About <span className="text-blue-500">Me</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Building practical AI systems and scalable software with a focus on
            real-world impact.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-black border border-white/10 rounded-xl p-8 h-full">
              <h3 className="text-xl font-light text-white mb-4">
                Who I Am
              </h3>
              <p className="text-white/60 leading-relaxed mb-6">
                A passionate AI & Software Developer with a strong foundation in
                machine learning, deep learning, and neural networks. I love
                building projects from scratch to truly understand the mathematics
                and mechanics behind AI models.
              </p>
              <p className="text-white/60 leading-relaxed mb-6">
                My work spans from building neural networks with just NumPy to
                deploying NLP-powered applications for real-world problem solving.
                I&apos;m currently pursuing B.Tech in CSE with specialization in
                AI/ML at VIT-AP University, Amaravati.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-mono">
                  AI/ML
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-mono">
                  Deep Learning
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-mono">
                  NLP
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-mono">
                  Python
                </span>
              </div>
            </div>
          </motion.div>

          {/* Code Block Style Config */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden h-full">
              {/* Window Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-white/30 font-mono">
                  vasu.config.ts
                </span>
              </div>
              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <pre className="text-white/80">
                  <span className="text-blue-400">export const</span>{" "}
                  <span className="text-green-400">developer</span>{" "}
                  <span className="text-white/50">=</span> {"{"}
                  {"\n"}
                  {"  "}
                  <span className="text-blue-400">name</span>:{" "}
                  <span className="text-amber-300">
                    &quot;Vasu Margana&quot;
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-blue-400">role</span>:{" "}
                  <span className="text-amber-300">
                    &quot;AI &amp; Software Developer&quot;
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-blue-400">education</span>:{" "}
                  <span className="text-amber-300">
                    &quot;B.Tech CSE (AI/ML)&quot;
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-blue-400">university</span>:{" "}
                  <span className="text-amber-300">
                    &quot;VIT-AP University&quot;
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-blue-400">focus</span>: [
                  <span className="text-amber-300">&quot;ML&quot;</span>,{" "}
                  <span className="text-amber-300">&quot;DL&quot;</span>,{" "}
                  <span className="text-amber-300">&quot;NLP&quot;</span>],{"\n"}
                  {"  "}
                  <span className="text-blue-400">passion</span>:{" "}
                  <span className="text-amber-300">
                    &quot;Building AI from scratch&quot;
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="text-blue-400">status</span>:{" "}
                  <span className="text-green-400">
                    &quot;Open to Opportunities&quot;
                  </span>
                  {"\n"}
                  {"}"};
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
