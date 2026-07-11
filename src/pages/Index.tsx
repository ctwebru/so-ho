import Navigation from "@/components/flow/Navigation";
import Hero from "@/components/flow/Hero";
import ConceptShowcase from "@/components/flow/ConceptShowcase";
import Manifesto from "@/components/flow/Manifesto";
import Plans from "@/components/flow/Plans";
import EventsTeaser from "@/components/flow/EventsTeaser";
import ClubTeaser from "@/components/flow/ClubTeaser";
import CtaSection from "@/components/flow/CtaSection";
import Footer from "@/components/flow/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <ConceptShowcase />
        <Manifesto />
        <Plans />
        <ClubTeaser />
        <EventsTeaser />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
