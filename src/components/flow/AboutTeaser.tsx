import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import aboutImg from "@/assets/real/coffee-side.png";

const AboutTeaser = () => {
  return (
    <section className="py-16 md:py-24 container mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center rounded-3xl bg-secondary/40 p-8 md:p-12">
        <div className="md:col-span-5">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-soft">
            <img src={aboutImg} alt="Интерьер пространства SO-HO!" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4 italic">/ что такое SO-HO!</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
            Одно пространство вместо трёх поездок
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">
            Кофейня, коворкинг и соседский клуб живут под одной крышей в вашем же квартале.
            Это не сеть и не офис — место, куда заходят по дороге и остаются надолго.
          </p>
          <Link
            to="/about"
            className="mt-7 inline-flex items-center gap-2 font-display font-medium border-b border-foreground/30 hover:border-foreground pb-1 transition-colors"
          >
            Узнать о SO-HO!
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
