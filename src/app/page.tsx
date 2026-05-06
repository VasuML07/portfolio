"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/portfolio/Hero";
import Navigation from "@/components/portfolio/Navigation";
import CommandPalette from "@/components/portfolio/CommandPalette";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import CodingProfiles from "@/components/portfolio/CodingProfiles";
import Lab from "@/components/portfolio/Lab";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import GlobalUI from "@/components/portfolio/GlobalUI";

export default function Home() {
  return (
    <GlobalUI>
      <Navigation />
      <CommandPalette />
      <main className="relative min-h-screen">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Lab />
        <Contact />
      </main>
      <Footer />
    </GlobalUI>
  );
}
