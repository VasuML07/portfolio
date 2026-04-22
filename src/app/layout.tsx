import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vasu Margana | AI & Software Developer",
  description:
    "Portfolio of Vasu Margana – AI & Software Developer specializing in Machine Learning, Deep Learning, and NLP. Building practical AI systems with real-world impact.",
  keywords: [
    "Vasu Margana",
    "Portfolio",
    "AI Developer",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "NLP",
    "Python Developer",
    "Software Developer",
  ],
  authors: [{ name: "Vasu Margana" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
