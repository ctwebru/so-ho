import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import Plans from "@/components/flow/Plans";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wifi, Coffee, Volume2, MapPin, Clock, Plug } from "lucide-react";
import heroImg from "@/assets/real/cowork-view.png";

const features = [
  { icon: MapPin, title: "15 рабочих мест", text: "Столы у окна, мягкая зона и места для долгой работы." },
  { icon: Volume2, title: "Две skype-комнаты", text: "Для созвонов и интервью — по слотам, без очередей." },
  { icon: Wifi, title: "Быстрый Wi-Fi", text: "Стабильный интернет и розетки у каждого места." },
  { icon: Coffee, title: "Кофе рядом", text: "Кофейня в этом же зале: заказ доносят к столу." },
  { icon: Clock, title: "08:00 — 20:00", text: "Каждый день, без выходных и предварительной записи." },
  { icon: Plug, title: "Гибкие тарифы", text: "От двух часов до закреплённого стола на месяц." },
];

const Cowork = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Коворкинг SO-HO! с зелёными стенами" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/90" />
          </div>
          <div className="relative container mx-auto px-6 pb-16 pt-32">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 mb-6">/ Коворкинг</p>
            <h1 className="font-display text-primary-foreground text-5xl md:text-7xl font-semibold leading-[0.95] text-balance max-w-3xl">
              Работа <span className="italic font-normal text-highlight">в пяти минутах</span> от дома
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/75 max-w-xl leading-relaxed">
              15 мест, две skype-комнаты и кофейня в том же зале. Приходи на пару часов или закрепи стол за собой.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/app/seats">Карта мест</Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <a href="#plans">Тарифы</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-widest text-accent font-medium italic">/ что внутри</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
                Тихо, светло и по-соседски
              </h2>
              <p className="mt-5 text-muted-foreground text-lg max-w-2xl">
                Без пропусков и корпоративной стерильности: обычный зал с деревом, зеленью и людьми,
                которые живут в этом же квартале.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-3xl border border-border bg-card p-8">
                <div className="w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <Plans />
      </main>
      <Footer />
    </div>
  );
};

export default Cowork;
