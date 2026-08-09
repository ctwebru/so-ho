import Navigation from "@/components/flow/Navigation";
import Hero from "@/components/flow/Hero";
import Footer from "@/components/flow/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
