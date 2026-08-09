import { Link } from "react-router-dom";
import { ArrowUpRight, Coffee, Users, Laptop } from "lucide-react";
import coffeeImg from "@/assets/real/coffee-front.png";
import clubImg from "@/assets/real/club-front.png";
import coworkImg from "@/assets/real/cowork-view.png";

const sections = [
  {
    no: "01",
    to: "/coffee",
    eyebrow: "Кофейня",
    title: "Кофе, который держит день",
    desc: "Спешелти-зерно, сезонные напитки и десерты. Заказ онлайн — заберёшь у стойки или принесём к столу.",
    meta: ["08:00 — 20:00", "заказ онлайн", "меню по QR"],
    img: coffeeImg,
    icon: Coffee,
    cta: "Открыть кофейню",
  },
  {
    no: "02",
    to: "/club",
    eyebrow: "Соседский клуб",
    title: "Вечера, игры и соседи рядом",
    desc: "Настолки, PS5, мастер-классы и мягкий фитнес. Приходи один или компанией — по членству или за день.",
    meta: ["расписание занятий", "свободный клуб", "аренда зала"],
    img: clubImg,
    icon: Users,
    cta: "В соседский клуб",
  },
  {
    no: "03",
    to: "/cowork",
    eyebrow: "Коворкинг",
    title: "Работа без дороги в центр",
    desc: "15 мест, две skype-комнаты и тихая зона. Гибкие тарифы — от пары часов до закреплённого стола.",
    meta: ["15 мест", "2 skype-комнаты", "тарифы от 2 часов"],
    img: coworkImg,
    icon: Laptop,
    cta: "О коворкинге",
  },
];

const HubSections = () => {
  return (
    <section id="sections" className="py-20 md:py-32 container mx-auto px-6">
      <div className="mb-12 md:mb-16 max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Три пространства</p>
        <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-balance">
          Выбери, зачем ты <span className="italic font-normal text-accent">сегодня здесь</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((s) => (
          <Link
            key={s.no}
            to={s.to}
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-card border border-border shadow-soft hover:shadow-deep hover:-translate-y-1 transition-all duration-500"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={s.img}
                alt={s.eyebrow}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

            <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/85 backdrop-blur-md text-xs font-display tracking-widest">
              <s.icon className="w-3.5 h-3.5 text-accent" />
              {s.no} · {s.eyebrow}
            </div>

            <div className="p-7 flex flex-col flex-1">
              <h3 className="font-display text-2xl font-semibold leading-tight text-balance">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {s.meta.map((m) => (
                  <li key={m} className="px-3 py-1 rounded-full bg-secondary/60 text-xs text-muted-foreground">
                    {m}
                  </li>
                ))}
              </ul>

              <span className="mt-7 pt-5 border-t border-border inline-flex items-center gap-2 font-display font-medium text-foreground">
                {s.cta}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HubSections;
