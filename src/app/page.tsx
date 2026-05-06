"use client";

import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import EngineeringActivity from "@/components/portfolio/EngineeringActivity";
import About from "@/components/portfolio/About";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <Hero />
        <Projects />
        <Skills />
        <EngineeringActivity />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
