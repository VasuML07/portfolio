import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vasu Margana | AI Engineer & Software Developer",
  description:
    "Portfolio of Vasu Margana — AI Engineer specializing in Machine Learning, Deep Learning, Neural Networks, and NLP. Building intelligent systems engineered for the future.",
  keywords: [
    "Vasu Margana", "Portfolio", "AI Engineer", "Machine Learning",
    "Deep Learning", "Neural Networks", "NLP", "Python Developer",
    "Software Developer", "AI Research", "Healthcare AI",
  ],
  authors: [{ name: "Vasu Margana" }],
  openGraph: {
    title: "Vasu Margana | AI Engineer",
    description: "I build intelligent systems and interfaces engineered for the future.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasu Margana | AI Engineer",
    description: "I build intelligent systems and interfaces engineered for the future.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
