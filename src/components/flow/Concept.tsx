import workspaceImg from "@/assets/workspace.jpg";
import coffeeImg from "@/assets/coffee.jpg";
import communityImg from "@/assets/community.jpg";

const items = [
  {
    no: "01",
    title: "Коворкинг",
    desc: "10–15 мест, две skype-комнаты и свободная зона. Тихая концентрация и быстрый Wi-Fi.",
    img: workspaceImg,
  },
  {
    no: "02",
    title: "Мини-кофейня",
    desc: "Сезонные напитки и десерты. Закажи онлайн — заберём к твоему столу.",
    img: coffeeImg,
  },
  {
    no: "03",
    title: "Соседский клуб",
    desc: "Лекции, ужины, кинопоказы. Пространство, где знакомятся и возвращаются.",
    img: communityImg,
  },
];

const Concept = () => {
  return (
    <section id="concept" className="py-24 md:py-40 container mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-12 mb-20">
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

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <article
            key={item.no}
            className="group relative overflow-hidden rounded-3xl bg-card shadow-soft hover:shadow-deep transition-all duration-500"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute top-6 left-6 text-primary-foreground/80 font-display text-sm">
              {item.no}
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Concept;
