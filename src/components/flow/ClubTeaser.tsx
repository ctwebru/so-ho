import { Link } from "react-router-dom";
import { ArrowUpRight, Users } from "lucide-react";
import { CLUB_CATEGORIES, CLUB_EVENTS } from "@/data/club";

const ClubTeaser = () => {
  const next = CLUB_EVENTS.slice(0, 3);

  return (
    <section id="club-teaser" className="py-24 md:py-32 container mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-12 mb-14 items-end">
        <div className="md:col-span-8">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Соседский клуб</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-balance">
            Место, где случается <span className="italic font-normal text-accent">жизнь после работы</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
            Мастер-классы, игровые вечера, детские субботы и аренда пространства
            под ваши идеи. Всё — по-соседски, без пафоса.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right">
          <Link
            to="/club"
            className="inline-flex items-center gap-2 font-display font-medium border-b border-foreground/30 hover:border-foreground pb-1"
          >
            В соседский клуб <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {CLUB_CATEGORIES.map((c) => (
          <Link
            key={c.id}
            to={`/club#${c.id}`}
            className="rounded-3xl bg-card border border-border p-6 hover:shadow-soft hover:-translate-y-0.5 transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
              <c.icon className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div className="font-display text-xl font-semibold mb-2">{c.title}</div>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-3xl bg-gradient-forest text-primary-foreground p-8 md:p-10 shadow-deep relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-highlight/20 blur-3xl" />
        <div className="relative grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-3">
              Ближайшие встречи
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
              Три повода зайти <span className="italic font-normal text-highlight">на этой неделе</span>
            </h3>
            <Link
              to="/club"
              className="mt-6 inline-flex items-center gap-2 text-highlight hover:underline"
            >
              Смотреть афишу целиком <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="md:col-span-7 space-y-2">
            {next.map((e) => (
              <Link
                key={e.id}
                to="/club"
                className="flex items-center gap-4 p-4 rounded-2xl bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="text-center shrink-0 w-16">
                  <div className="font-display text-lg font-semibold">{e.date}</div>
                  <div className="text-[10px] uppercase tracking-widest text-primary-foreground/60">{e.time}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-lg leading-tight truncate">{e.title}</div>
                  <div className="text-xs text-primary-foreground/60 flex items-center gap-2 mt-1">
                    <Users className="w-3 h-3" /> осталось {e.seatsLeft} мест
                  </div>
                </div>
                <div className="font-display tabular-nums shrink-0">{e.price} ₽</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubTeaser;
