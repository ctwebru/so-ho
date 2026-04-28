import Navigation from "@/components/flow/Navigation";
import Hero from "@/components/flow/Hero";
import Concept from "@/components/flow/Concept";
import Plans from "@/components/flow/Plans";
import CtaSection from "@/components/flow/CtaSection";
import Footer from "@/components/flow/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Concept />
        <Plans />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
