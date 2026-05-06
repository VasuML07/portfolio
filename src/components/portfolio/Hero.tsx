"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import ParticleField from "./ParticleField";

// ─── Animation Variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const subtextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 1.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ─── Magnetic Button ─────────────────────────────────────────────
function MagneticButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────
export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleField />

      {/* Subtle radial glow at center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-xs tracking-wide text-muted-foreground sm:text-sm">
            {portfolioData.personalInfo.availability}
          </span>
        </motion.div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-light tracking-tight text-foreground"
        >
          <motion.span
            variants={fadeUpVariants}
            className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
          >
            I build intelligent systems
          </motion.span>
          <motion.span
            variants={fadeUpVariants}
            className="mt-1 block text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
          >
            and interfaces engineered
          </motion.span>
          <motion.span
            variants={fadeUpVariants}
            className="mt-1 block text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
          >
            for the future.
          </motion.span>
        </motion.h1>

        <motion.p
          variants={subtextVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {portfolioData.personalInfo.heroSubtext}
        </motion.p>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            size="lg"
            className="rounded-full px-8"
            onClick={() => scrollTo("projects")}
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            variant="outline"
            size="lg"
            className="rounded-full px-8"
            onClick={() =>
              window.open(portfolioData.personalInfo.resumeUrl, "_blank")
            }
          >
            View Resume
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            size="lg"
            className="rounded-full px-8"
            onClick={() => scrollTo("contact")}
          >
            Contact
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <button
          onClick={() => scrollTo("about")}
          className="group flex flex-col items-center gap-1.5"
          aria-label="Scroll to About section"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70" />
          </motion.div>
        </button>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
}
