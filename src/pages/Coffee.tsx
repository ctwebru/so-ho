import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import CoffeeImmersive from "./app/CoffeeImmersive";

const Coffee = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <CoffeeImmersive />
      </main>
      <Footer />
    </div>
  );
};

export default Coffee;
