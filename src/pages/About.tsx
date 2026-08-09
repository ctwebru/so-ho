import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import { Link } from "react-router-dom";
import { ArrowUpRight, Coffee, Users, Laptop } from "lucide-react";
import heroImg from "@/assets/real/cowork-view.png";
import img1 from "@/assets/real/coffee-front.png";
import img2 from "@/assets/real/club-reverse.png";
import img3 from "@/assets/real/coffee-side.png";

const principles = [
  {
    no: "01",
    title: "Рядом с домом",
    text: "SO-HO! стоит внутри жилого квартала. Пять минут пешком вместо часа в пробке — это и есть главная фишка.",
  },
  {
    no: "02",
    title: "Три сценария под одной крышей",
    text: "Утро — кофе, день — работа, вечер — соседи и игры. Не нужно выбирать одно место на один повод.",
  },
  {
    no: "03",
    title: "Соседство, а не сервис",
    text: "Мы знаем гостей по именам. Здесь можно прийти одному и не чувствовать себя чужим.",
  },
  {
    no: "04",
    title: "Без пафоса и без правил-стены",
    text: "Простые цены, понятные условия, никакой обязательной подписки, чтобы просто выпить кофе.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Пространство SO-HO! в Новосибирске" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/90" />
          </div>
          <div className="relative container mx-auto px-6 pb-16 pt-32">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 mb-6">/ Концепция</p>
            <h1 className="font-display text-primary-foreground text-5xl md:text-7xl font-semibold leading-[0.95] text-balance max-w-3xl">
              Что такое <span className="text-highlight">SO-HO!</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/75 max-w-xl leading-relaxed">
              Кофейня, коворкинг и соседский клуб в одном месте — на Дачном шоссе, 22/3.
              Пространство квартала, где день можно прожить целиком.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-widest text-accent font-medium italic">/ идея</p>
            </div>
            <div className="md:col-span-8">
              <p className="font-display text-2xl md:text-4xl leading-[1.25] text-balance">
                Мы строим не заведение, а <span className="italic text-accent">третье место</span> —
                между домом и работой. Туда, куда заходят без повода и возвращаются по привычке.
              </p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div key={p.no} className="rounded-3xl border border-border p-8 bg-card">
                <div className="font-display text-4xl font-semibold text-accent tabular-nums">{p.no}</div>
                <h2 className="mt-4 font-display text-2xl font-semibold">{p.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-8 container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[img1, img2, img3].map((src, i) => (
              <div key={i} className="rounded-3xl overflow-hidden aspect-[4/3] shadow-soft">
                <img src={src} alt="Интерьер SO-HO!" loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-28 container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-10">Из чего состоит пространство</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Coffee, title: "Кофейня", text: "Спешелти-кофе, чайные коктейли и десерты с 08:00 до 20:00.", to: "/coffee", cta: "Меню и заказ" },
              { icon: Laptop, title: "Коворкинг", text: "15 мест, две skype-комнаты, гибкие тарифы от пары часов.", to: "/cowork", cta: "О коворкинге" },
              { icon: Users, title: "Соседский клуб", text: "Расписание занятий, свободный клуб и аренда зала целиком.", to: "/club", cta: "В клуб" },
            ].map((s) => (
              <Link key={s.title} to={s.to} className="group rounded-3xl border border-border p-8 bg-card hover:shadow-soft hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                  <s.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-display font-medium border-b border-foreground/30 group-hover:border-foreground pb-1">
                  {s.cta} <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
