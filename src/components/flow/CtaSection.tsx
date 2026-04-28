import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 container mx-auto px-6">
      <div className="rounded-3xl bg-gradient-forest p-10 md:p-16 text-primary-foreground shadow-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_30%,hsl(var(--highlight)/0.5),transparent_50%)]" />
        <div className="relative grid md:grid-cols-2 gap-10 items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-highlight mb-4">/ Готов?</p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-balance">
              Заходи в кабинет<br />
              <span className="italic font-normal">и начинай.</span>
            </h2>
            <p className="mt-6 text-primary-foreground/70 max-w-md">
              Тарифы, доступ, кофе и события — всё в одном месте. Telegram-first, без лишних кликов.
            </p>
          </div>
          <div className="md:text-right">
            <Button variant="hero" size="xl" asChild>
              <Link to="/app">
                Открыть кабинет <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
