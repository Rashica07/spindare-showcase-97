import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import LearningTicker from "@/components/LearningTicker";
import ProjectSection from "@/components/ProjectSection";
import GitHubActivity from "@/components/GitHubActivity";
import SpindarePreview from "@/components/SpindarePreview";
import LaunchProgress from "@/components/LaunchProgress";
import TestimonialsSection from "@/components/TestimonialsSection";
import ShippingLog from "@/components/ShippingLog";
import TerminalConsole from "@/components/TerminalConsole";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStack />
      <LearningTicker />
      <ProjectSection />
      <GitHubActivity />
      <SpindarePreview />
      <section id="launch">
        <LaunchProgress />
      </section>
      <TestimonialsSection />
      <section id="blog">
        <ShippingLog />
      </section>
      <TerminalConsole />
      <ContactSection />
      <Footer />
      <SpotifyNowPlaying />
    </main>
  );
}
