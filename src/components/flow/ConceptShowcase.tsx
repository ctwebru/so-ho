import { Link } from "react-router-dom";
import { ArrowUpRight, Coffee, Users, MapPin, CalendarDays } from "lucide-react";
import workspaceImg from "@/assets/real/cowork-view.png";
import coffeeImg from "@/assets/real/coffee-front.png";
import communityImg from "@/assets/real/club-front.png";
import coffeeSideImg from "@/assets/real/coffee-side.png";
import clubReverseImg from "@/assets/real/club-reverse.png";

const blocks = [
  {
    no: "01",
    eyebrow: "Коворкинг",
    title: "Тихая работа в зелёных стенах",
    desc: "10–15 мест, две skype-комнаты и свободная зона. Скоростной Wi-Fi, удобные кресла и аромат свежемолотого кофе вместо офисной скуки.",
    img: workspaceImg,
    bullets: ["Гибкие тарифы от 2 часов", "Skype-комнаты по слотам", "Закреплённые места Fix"],
    cta: { to: "/app/seats", label: "Карта мест" },
    icon: MapPin,
  },
  {
    no: "02",
    eyebrow: "Мини-кофейня",
    title: "Закажи — и продолжай работать",
    desc: "Сезонные напитки, домашние десерты и спешелти зерно. Заказ доходит до твоего стола, пока ты дописываешь абзац.",
    img: coffeeImg,
    bullets: ["Доставка к столу", "Самовывоз за 5 минут", "Скидки резидентам"],
    cta: { to: "/app/cafe", label: "Открыть меню" },
    icon: Coffee,
    reverse: true,
  },
  {
    no: "03",
    eyebrow: "Соседский клуб",
    title: "Знакомства, которые продолжаются",
    desc: "Ужины за длинным столом, кинопоказы, лекции и утренние медитации. Мы делаем повод приходить — даже когда не нужно работать.",
    img: communityImg,
    bullets: ["3–5 событий в месяц", "Бесплатно для резидентов", "Тёплое сообщество"],
    cta: { to: "/app/events", label: "Афиша клуба" },
    icon: CalendarDays,
  },
];

const ConceptShowcase = () => {
  return (
    <section id="concept" className="py-24 md:py-40 container mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-12 mb-24">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Концепция</p>
        </div>
        <div className="md:col-span-8">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-balance leading-tight">
            Три пространства,<br />
            <span className="text-accent italic font-normal">одна атмосфера.</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
            Flow — это lifestyle-пространство нового формата. Здесь работают, пьют отличный кофе
            и собираются с соседями. Всё, что нужно для жизни в одном квартале.
          </p>
        </div>
      </div>

      <div className="space-y-24 md:space-y-40">
        {blocks.map((b) => (
          <article
            key={b.no}
            className={`grid md:grid-cols-12 gap-8 md:gap-12 items-center ${b.reverse ? "" : ""}`}
          >
            <div className={`md:col-span-7 ${b.reverse ? "md:order-2" : ""}`}>
              <div className="group relative overflow-hidden rounded-3xl shadow-deep">
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-xs font-display tracking-widest">
                  {b.no} · {b.eyebrow}
                </div>
              </div>
            </div>

            <div className={`md:col-span-5 ${b.reverse ? "md:order-1 md:pr-8" : "md:pl-4"}`}>
              <div className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-widest mb-4">
                <b.icon className="w-4 h-4" />
                {b.eyebrow}
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-balance">
                {b.title}
              </h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">{b.desc}</p>

              <ul className="mt-6 space-y-2">
                {b.bullets.map((x) => (
                  <li key={x} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {x}
                  </li>
                ))}
              </ul>

              <Link
                to={b.cta.to}
                className="mt-8 inline-flex items-center gap-2 font-display font-medium text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-1"
              >
                {b.cta.label}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Real space gallery */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group relative overflow-hidden rounded-3xl shadow-deep aspect-[4/3]">
          <img src={coffeeSideImg} alt="Барная стойка SO-HO! и проход к коворкингу" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute bottom-6 left-6 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-xs font-display tracking-widest">Кофейня · вход</div>
        </div>
        <div className="group relative overflow-hidden rounded-3xl shadow-deep aspect-[4/3]">
          <img src={clubReverseImg} alt="Зал соседского клуба для лекций и йоги" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute bottom-6 left-6 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-xs font-display tracking-widest">Клуб · трансформер</div>
        </div>
      </div>

      {/* Numbers strip */}
      <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-border pt-16">
        {[
          { n: "15", l: "рабочих мест" },
          { n: "2", l: "skype-комнаты" },
          { n: "120+", l: "резидентов" },
          { n: "4", l: "события в месяц" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-display text-5xl md:text-6xl font-semibold text-accent tabular-nums">{s.n}</div>
            <div className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Inline strap with users icon for community */}
      <div className="mt-24 rounded-3xl bg-secondary/50 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="font-display text-xl font-semibold">Сообщество — главное, что мы строим</div>
            <div className="text-sm text-muted-foreground">Коворкинг — это не про столы. Это про людей, которые рядом.</div>
          </div>
        </div>
        <Link
          to="/app/events"
          className="inline-flex items-center gap-2 font-display font-medium text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-1"
        >
          Стать частью клуба
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default ConceptShowcase;
