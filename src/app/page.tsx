"use client";

import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import CodingProfiles from "@/components/portfolio/CodingProfiles";
import Experiments from "@/components/portfolio/Experiments";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Experiments />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
