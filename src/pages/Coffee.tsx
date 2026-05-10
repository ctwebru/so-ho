import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import CoffeeImmersive from "./app/CoffeeImmersive";

const Coffee = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <CoffeeImmersive />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Coffee;
