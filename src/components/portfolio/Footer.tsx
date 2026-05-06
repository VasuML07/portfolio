"use client";

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="py-6 px-4 text-center space-y-1.5">
        <p className="font-mono text-xs text-muted-foreground">
          Built with Next.js, Tailwind CSS &amp; Framer Motion
        </p>
        <p className="font-mono text-xs text-muted-foreground/70">
          © 2025 Vasu Margana. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
