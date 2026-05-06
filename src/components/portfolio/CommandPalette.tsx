"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  FolderOpen,
  Cpu,
  BarChart3,
  FlaskConical,
  Mail,
  Github,
  Linkedin,
  Download,
  Moon,
  Sun,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  hero: Home,
  about: User,
  projects: FolderOpen,
  skills: Cpu,
  stats: BarChart3,
  lab: FlaskConical,
  contact: Mail,
};

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mountedRef = useRef(false);

  // Ensure we track client-side mount without triggering a cascading re-render
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      mountedRef.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // CMD+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setOpen(false);
    // Small delay so the dialog close animation can start
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, []);

  const openExternal = useCallback((url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false);
  }, [theme, setTheme]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command Palette"
      description="Search for commands, navigate sections, or access links."
      className="overflow-hidden rounded-xl border border-white/10 bg-background/80 p-0 shadow-2xl backdrop-blur-2xl sm:max-w-xl [&>div]:rounded-xl"
    >
      {/* Animated wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 border-b border-white/5 px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <CommandInput
            placeholder="Type a command or search..."
            className="border-0 bg-transparent text-sm focus:ring-0"
          />
        </div>

        <CommandList className="max-h-[340px] px-2 py-2">
          <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
            No results found.
          </CommandEmpty>

          {/* Navigation Group */}
          <CommandGroup heading="Navigation">
            {portfolioData.navItems.map((item) => {
              const Icon = iconMap[item.id];
              return (
                <CommandItem
                  key={item.id}
                  onSelect={() => scrollToSection(item.id)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
                >
                  {Icon && (
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>{item.label}</span>
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator className="my-1 bg-border/30" />

          {/* Social Group */}
          <CommandGroup heading="Social">
            {portfolioData.socials.map((social) => {
              const Icon = socialIconMap[social.name];
              return (
                <CommandItem
                  key={social.name}
                  onSelect={() => openExternal(social.url)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
                >
                  {Icon && (
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>{social.name}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground/60">
                    ↗
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator className="my-1 bg-border/30" />

          {/* Actions Group */}
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() =>
                openExternal(portfolioData.personalInfo.resumeUrl)
              }
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
            >
              <Download className="h-4 w-4 text-muted-foreground" />
              <span>Download Resume</span>
              <span className="ml-auto text-[10px] text-muted-foreground/60">
                ↗
              </span>
            </CommandItem>

            <CommandItem
              onSelect={toggleTheme}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
            >
              {theme && (
                <>
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>Toggle Theme</span>
                  <CommandShortcut>⌘T</CommandShortcut>
                </>
              )}
            </CommandItem>
          </CommandGroup>
        </CommandList>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-white/5 px-4 py-2">
          <span className="text-[11px] text-muted-foreground/60">
            Navigate with ↑↓ · Select with ↵
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
            <kbd className="rounded border border-border/50 bg-muted/50 px-1 py-px font-mono text-[10px]">
              esc
            </kbd>
            to close
          </span>
        </div>
      </motion.div>
    </CommandDialog>
  );
}
