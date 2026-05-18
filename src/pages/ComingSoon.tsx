import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Clock, Globe } from "lucide-react";
import heroImg from "@/assets/real/cowork-view.png";
import Logo from "@/components/flow/Logo";

const ComingSoon = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Интерьер SO-HO!"
          className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary/95" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 container mx-auto px-6 pt-8 flex items-center justify-between">
        <Logo size="md" withSignal={false} variant="inverted" />
        <a
          href="mailto:hello@so-ho.ru"
          className="hidden md:inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
        >
          <Mail className="w-4 h-4" />
          hello@so-ho.ru
        </a>
      </header>

      {/* Content */}
      <main className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center py-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/10 backdrop-blur-md border border-background/20 text-primary-foreground/90 text-xs uppercase tracking-[0.25em] mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
            Скоро открытие
          </div>

          <h1 className="font-display text-primary-foreground text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tight animate-fade-up">
            Мы готовим<br />
            <span className="italic font-normal text-highlight">кое-что тёплое.</span>
          </h1>

          <p
            className="mt-10 text-lg md:text-2xl text-primary-foreground/85 max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            SO-HO! — кофейня, коворкинг и соседский клуб в одном пространстве.
            Мы ещё не открылись, но уже совсем скоро встретимся за чашкой кофе на
            Дачном шоссе.
          </p>

          <div className="mt-12 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <Link
              to="/preview"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-highlight text-primary font-display font-medium hover:scale-105 transition-transform"
            >
              Познакомиться поближе
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <a
              href="mailto:hello@so-ho.ru"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-background/10 backdrop-blur-md border border-background/30 text-primary-foreground font-display font-medium hover:bg-background/20 transition-colors"
            >
              Написать нам
            </a>
          </div>

          {/* Info strip */}
          <div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-start gap-3 text-primary-foreground/90">
              <MapPin className="w-5 h-5 mt-0.5 text-highlight shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-1">Где нас искать</div>
                <div className="font-display">Дачное шоссе, 22/3<br />Новосибирск</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-primary-foreground/90">
              <Clock className="w-5 h-5 mt-0.5 text-highlight shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-1">График</div>
                <div className="font-display">Ежедневно<br />08:00 — 20:00</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-primary-foreground/90">
              <Globe className="w-5 h-5 mt-0.5 text-highlight shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-1">Контакты</div>
                <div className="font-display">
                  <a href="mailto:hello@so-ho.ru" className="hover:text-highlight transition-colors">hello@so-ho.ru</a>
                  <br />
                  so-ho.ru
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 container mx-auto px-6 pb-8 text-xs text-primary-foreground/50">
        © 2026 SO-HO! · Coffee. Work. Meet.
      </footer>
    </div>
  );
};

export default ComingSoon;
