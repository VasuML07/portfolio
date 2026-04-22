"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const Education = () => {
  const educationData = portfolioData.education;

  return (
    <section id="education" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Academic <span className="text-blue-500">Background</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Building a strong academic foundation in computer science and
            artificial intelligence.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
        </motion.div>

        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="bg-black border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2">
                        {edu.degree}
                      </h3>
                      <h4 className="text-xl text-blue-500 font-medium mb-1">
                        {edu.field}
                      </h4>
                      {edu.specialization && (
                        <p className="text-white/70 mb-3">
                          Specialization: {edu.specialization}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {edu.institution}
                        </div>
                        <span className="text-white/20">&#x2022;</span>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {edu.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                {edu.details && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-4 h-4 text-blue-500" />
                      <h5 className="text-white font-medium">About</h5>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                )}

                {/* Coursework Tags */}
                <div className="mt-6">
                  <h5 className="text-white font-medium mb-4">
                    Key Focus Areas
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Machine Learning",
                      "Deep Learning",
                      "Data Structures",
                      "Algorithms",
                      "Neural Networks",
                      "Python Programming",
                      "Linear Algebra",
                      "Probability & Statistics",
                      "NLP",
                      "Computer Science",
                    ].map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 rounded-full text-xs hover:bg-white/10 transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
