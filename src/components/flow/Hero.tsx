import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "@/assets/real/cowork-view.png";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Интерьер SO-HO! — коворкинг с зелёными стенами и деревянной мебелью"
          className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/40 to-primary/90" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-20 pt-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/10 backdrop-blur-md border border-background/20 text-primary-foreground/90 text-xs uppercase tracking-[0.25em] mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
            Coffee · Work · Meet
          </div>

          <h1 className="font-display text-primary-foreground text-7xl md:text-9xl lg:text-[12rem] font-bold leading-[0.85] tracking-tight text-balance animate-fade-up">
            SO-HO<span className="text-highlight">!</span>
          </h1>

          <p className="mt-6 font-display text-2xl md:text-4xl text-primary-foreground/90 tracking-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <span className="text-highlight">Coffee.</span> Work. Meet.
          </p>

          <p className="mt-8 text-lg md:text-xl text-primary-foreground/75 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Кофейня, коворкинг и соседский клуб под одной крышей.
            Приходи за кофе — оставайся жить.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/app">Открыть кабинет</Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#concept">Узнать о SO-HO!</a>
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
