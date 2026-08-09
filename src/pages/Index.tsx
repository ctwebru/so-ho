import Navigation from "@/components/flow/Navigation";
import Hero from "@/components/flow/Hero";
import HubSections from "@/components/flow/HubSections";
import AboutTeaser from "@/components/flow/AboutTeaser";
import CtaSection from "@/components/flow/CtaSection";
import Footer from "@/components/flow/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <HubSections />
        <AboutTeaser />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
