import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { EVENTS } from "@/data/mock";

const EventsTeaser = () => {
  return (
    <section id="events-teaser" className="py-24 md:py-32 container mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-12 mb-12 items-end">
        <div className="md:col-span-8">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Афиша</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-balance">
            Что у нас <span className="italic font-normal text-accent">в этом месяце</span>
          </h2>
        </div>
        <div className="md:col-span-4 md:text-right">
          <Link
            to="/app/events"
            className="inline-flex items-center gap-2 font-display font-medium border-b border-foreground/30 hover:border-foreground pb-1"
          >
            Вся афиша <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-card border border-border divide-y divide-border overflow-hidden shadow-soft">
        {EVENTS.map((e) => (
          <Link
            key={e.id}
            to="/app/events"
            className="group grid grid-cols-12 gap-4 items-center p-6 md:p-8 hover:bg-secondary/40 transition-colors"
          >
            <div className="col-span-3 md:col-span-2">
              <div className="font-display text-2xl md:text-3xl font-semibold tabular-nums">{e.date}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{e.time}</div>
            </div>
            <div className="col-span-9 md:col-span-9">
              <div className="font-display text-xl md:text-2xl font-medium">{e.title}</div>
              <div className="text-sm text-muted-foreground mt-1 line-clamp-1">{e.desc}</div>
            </div>
            <div className="hidden md:flex md:col-span-1 justify-end">
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EventsTeaser;
