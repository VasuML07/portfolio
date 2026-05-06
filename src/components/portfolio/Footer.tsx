export default function Footer() {
  return (
    <footer className="border-t border-border/40 px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-muted-foreground/40">
          &copy; {new Date().getFullYear()} Vasu Margana
        </p>
        <p className="text-xs text-muted-foreground/25">
          Built with Next.js, Tailwind CSS &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
