import { Card } from "@/components/ui/card";
import { QrCode, Calendar, Clock } from "lucide-react";

const Access = ({ active }: { active: boolean }) => {
  return (
    <section id="access" className="py-24 md:py-32 container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Мой доступ</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Покажи экран<br />
            <span className="italic font-normal text-accent">— и проходи.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Один экран — твой пропуск. Администратор видит активный тариф и срок действия.
            Без турникетов и QR-сканеров.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="w-4 h-4 text-accent" /> Активный тариф всегда под рукой
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="w-4 h-4 text-accent" /> История посещений
            </div>
          </div>
        </div>

        <Card className="rounded-3xl bg-gradient-forest p-10 text-primary-foreground shadow-deep border-0 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--highlight)/0.4),transparent_50%)]" />
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Flow Pass</p>
                <p className="font-display text-2xl mt-1">Анна Морозова</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                active ? "bg-highlight text-highlight-foreground" : "bg-background/10 text-primary-foreground/70"
              }`}>
                {active ? "Активен" : "Не активен"}
              </div>
            </div>

            <div className="aspect-square max-w-[240px] mx-auto bg-background/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-background/20">
              <QrCode className="w-32 h-32 text-primary-foreground/90" strokeWidth={1} />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-background/20">
              <div>
                <p className="text-xs text-primary-foreground/60 mb-1">Тариф</p>
                <p className="font-display font-semibold">{active ? "Flex · месяц" : "—"}</p>
              </div>
              <div>
                <p className="text-xs text-primary-foreground/60 mb-1">Действует до</p>
                <p className="font-display font-semibold">{active ? "28 мая 2026" : "—"}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Access;
