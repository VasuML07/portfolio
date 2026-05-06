"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import {
  BrainCircuit,
  Code,
  Layers,
  TerminalSquare,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  BrainCircuit,
  Code,
  Layers,
  TerminalSquare,
};

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const { categories, constellation } = portfolioData.skills;

  const categoryColorMap = useCallback(
    (catId: string) => {
      const cat = categories.find((c) => c.id === catId);
      return cat ? cat.color : "#7C3AED";
    },
    [categories]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      setHoveredNode(null);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const CONNECTION_DIST = 0.22;
    const MOUSE_RADIUS = 120;

    const draw = () => {
      const w = container.getBoundingClientRect().width;
      const h = container.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      timeRef.current += 0.003;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw connections
      for (let i = 0; i < constellation.length; i++) {
        for (let j = i + 1; j < constellation.length; j++) {
          const a = constellation[i];
          const b = constellation[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const ax = a.x * w;
            const ay = a.y * h;
            const bx = b.x * w;
            const by = b.y * h;

            const midX = (ax + bx) / 2;
            const midY = (ay + by) / 2;
            const mouseDist = Math.sqrt(
              (mx - midX) ** 2 + (my - midY) ** 2
            );

            const baseAlpha = 1 - dist / CONNECTION_DIST;
            const mouseBoost = Math.max(
              0,
              1 - mouseDist / MOUSE_RADIUS
            );
            const alpha = baseAlpha * 0.12 + mouseBoost * 0.35;

            const colorA = categoryColorMap(a.category);
            const colorB = categoryColorMap(b.category);

            const gradient = ctx.createLinearGradient(ax, ay, bx, by);
            gradient.addColorStop(0, colorA);
            gradient.addColorStop(1, colorB);

            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1 + mouseBoost * 1.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Check hovered node
      let newHovered: string | null = null;

      // Draw nodes
      constellation.forEach((node) => {
        const nx = node.x * w;
        const ny = node.y * h;

        // Floating animation
        const floatX =
          Math.sin(timeRef.current * 1.2 + node.x * 10) * 3;
        const floatY =
          Math.cos(timeRef.current * 0.8 + node.y * 10) * 3;

        const px = nx + floatX;
        const py = ny + floatY;

        const mouseDist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
        const isNearMouse = mouseDist < MOUSE_RADIUS;
        const mouseFactor = isNearMouse
          ? 1 - mouseDist / MOUSE_RADIUS
          : 0;

        // Detect hover on node itself
        const nodeRadius = (node.size / 2) * (0.8 + mouseFactor * 0.4);
        if (
          Math.sqrt((mx - px) ** 2 + (my - py) ** 2) <
          nodeRadius + 8
        ) {
          newHovered = node.name;
          setTooltipPos({ x: mx, y: py - nodeRadius - 14 });
        }

        const color = categoryColorMap(node.category);
        const baseSize = node.size * 0.8;
        const size = baseSize + mouseFactor * baseSize * 0.4;
        const radius = size / 2;

        // Outer glow
        if (mouseFactor > 0.1) {
          const glowRadius = radius * (1.8 + mouseFactor);
          const glow = ctx.createRadialGradient(
            px, py, radius * 0.5,
            px, py, glowRadius
          );
          glow.addColorStop(0, color + "40");
          glow.addColorStop(0.5, color + "15");
          glow.addColorStop(1, color + "00");
          ctx.beginPath();
          ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.globalAlpha = mouseFactor * 0.8;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Ambient glow
        const ambientGlow = ctx.createRadialGradient(
          px, py, 0,
          px, py, radius * 2
        );
        ambientGlow.addColorStop(0, color + "25");
        ambientGlow.addColorStop(1, color + "00");
        ctx.beginPath();
        ctx.arc(px, py, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = ambientGlow;
        ctx.fill();

        // Node circle
        const grad = ctx.createRadialGradient(
          px - radius * 0.3, py - radius * 0.3, 0,
          px, py, radius
        );
        grad.addColorStop(0, color);
        grad.addColorStop(1, color + "AA");
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.7 + mouseFactor * 0.3;
        ctx.fill();

        // Inner bright spot
        ctx.beginPath();
        ctx.arc(px - radius * 0.2, py - radius * 0.2, radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fill();
        ctx.globalAlpha = 1;

        // Border ring
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.3 + mouseFactor * 0.7;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      setHoveredNode(newHovered);
      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [constellation, categoryColorMap]);

  return (
    <section id="skills" className="relative py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Technology Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            An interconnected web of technologies, frameworks, and concepts
            that power every project I build.
          </p>
        </motion.div>

        {/* Constellation Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          ref={containerRef}
          className="relative w-full aspect-[16/10] md:aspect-[2/1] rounded-2xl overflow-hidden
                     border border-white/5 bg-black/30 backdrop-blur-sm mb-16"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Tooltip */}
          {hoveredNode && (
            <div
              className="absolute pointer-events-none z-10 px-3 py-1.5 rounded-lg
                         bg-black/80 backdrop-blur-md border border-white/10
                         text-white text-sm font-medium whitespace-nowrap
                         shadow-lg shadow-black/30 transition-all duration-100"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              {hoveredNode}
            </div>
          )}
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.icon] || Code;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-xl p-5 md:p-6
                           bg-white/[0.03] backdrop-blur-md
                           border border-white/[0.06]
                           hover:border-white/15 transition-all duration-500"
                style={
                  {
                    "--cat-color": category.color,
                    boxShadow: `0 0 0px var(--cat-color)`,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${category.color}20, 0 0 60px ${category.color}08`;
                  (
                    e.currentTarget as HTMLElement
                  ).style.borderColor = `${category.color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0px var(--cat-color)`;
                  (
                    e.currentTarget as HTMLElement
                  ).style.borderColor = `rgba(255,255,255,0.06)`;
                }}
              >
                {/* Category color accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
                    opacity: 0.6,
                  }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <Icon
                      size={20}
                      style={{ color: category.color }}
                    />
                  </div>
                  <h3 className="font-semibold text-white/90 text-sm">
                    {category.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-md font-medium
                                 bg-white/[0.04] text-white/60
                                 border border-white/[0.06]
                                 transition-colors duration-300
                                 group-hover:text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
