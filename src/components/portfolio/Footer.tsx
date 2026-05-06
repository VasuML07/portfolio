export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-xs text-muted-foreground/50">
          &copy; {new Date().getFullYear()} Vasu Margana
        </p>
        <p className="text-xs text-muted-foreground/30">
          Built with Next.js, Tailwind CSS, and Framer Motion
        </p>
      </div>
    </footer>
  );
}
