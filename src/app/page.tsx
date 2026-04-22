import Background from "@/components/portfolio/Background";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import BentoGrid from "@/components/portfolio/BentoGrid";
import Education from "@/components/portfolio/Education";
import Skills from "@/components/portfolio/Skills";
import CodingProfiles from "@/components/portfolio/CodingProfiles";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Background />
      <Navbar />
      <Hero />
      <About />
      <BentoGrid />
      <Education />
      <Skills />
      <CodingProfiles />
      <Footer />
    </main>
  );
}
