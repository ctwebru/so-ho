import { Coffee, Laptop, Users, MapPin, Clock, Wifi } from "lucide-react";

const answers = [
  {
    icon: Coffee,
    q: "Просто выпить кофе",
    a: "Заходите как в обычную кофейню: спешелти-зерно, десерты, кофе с собой. Ничего покупать заранее и никуда записываться не нужно.",
  },
  {
    icon: Laptop,
    q: "Поработать пару часов",
    a: "В том же зале — коворкинг: столы, розетки, тишина и две skype-комнаты. Платите за время: от пары часов до постоянного места.",
  },
  {
    icon: Users,
    q: "Провести вечер не дома",
    a: "Вечером зал становится соседским клубом: настолки, PS5, мастер-классы, мягкий фитнес. Можно прийти одному — тут знакомятся.",
  },
];

const FirstTime = () => {
  return (
    <section id="first-time" className="border-y border-border bg-secondary/30">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4 italic">/ вы здесь впервые</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
            SO-HO! — это кофейня, в которой ещё можно поработать и провести вечер
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Одно небольшое помещение в жилом квартале Flora&amp;Fauna. Днём — кофе и работа,
            вечером — занятия и игры для соседей. Заходить можно без записи, членства и предварительных заказов.
          </p>
        </div>

        <div className="mt-12 grid gap-px md:grid-cols-3 bg-border rounded-3xl overflow-hidden">
          {answers.map((x) => (
            <div key={x.q} className="bg-background p-7 md:p-8">
              <x.icon className="w-5 h-5 text-accent" />
              <h3 className="mt-5 font-display text-xl font-semibold">{x.q}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{x.a}</p>
            </div>
          ))}
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            Новосибирск, Дачное шоссе, 22/3
          </li>
          <li className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            Ежедневно 08:00 — 20:00
          </li>
          <li className="inline-flex items-center gap-2">
            <Wifi className="w-4 h-4 text-accent" />
            Wi-Fi, розетки, оплата картой
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FirstTime;
