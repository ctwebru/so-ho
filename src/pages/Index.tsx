import { useState } from "react";
import Navigation from "@/components/flow/Navigation";
import Hero from "@/components/flow/Hero";
import Concept from "@/components/flow/Concept";
import Plans from "@/components/flow/Plans";
import SeatMap from "@/components/flow/SeatMap";
import Cafe from "@/components/flow/Cafe";
import Events from "@/components/flow/Events";
import Access from "@/components/flow/Access";
import Footer from "@/components/flow/Footer";

const Index = () => {
  const [accessActive, setAccessActive] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Concept />
        <Plans onPurchase={() => setAccessActive(true)} />
        <Access active={accessActive} />
        <SeatMap />
        <Cafe />
        <Events />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
