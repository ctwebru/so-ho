import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-flow.jpg";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Интерьер пространства Flow с зелёными стенами и деревянной мебелью"
          className="w-full h-full object-cover animate-slow-zoom"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/40 to-primary/90" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-20 pt-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/10 backdrop-blur-md border border-background/20 text-primary-foreground/90 text-xs uppercase tracking-widest mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
            Lifestyle Space · Открыто
          </div>

          <h1 className="font-display text-primary-foreground text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight text-balance animate-fade-up">
            Место,<br />
            где случается <em className="font-normal italic text-highlight">flow</em>.
          </h1>

          <p className="mt-8 text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Коворкинг, мини-кофейня и соседский клуб под одной крышей.
            Приходи работать — оставайся жить.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#plans">Выбрать тариф</a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#concept">Узнать о Flow</a>
            </Button>
          </div>
        </div>

        <a
          href="#concept"
          className="hidden md:flex absolute bottom-10 right-10 w-14 h-14 rounded-full border border-background/30 items-center justify-center text-primary-foreground hover:bg-background/10 transition-colors"
          aria-label="Прокрутить вниз"
        >
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
