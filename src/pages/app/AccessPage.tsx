import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, Calendar, Clock, AlertCircle } from "lucide-react";
import { useAppState } from "@/state/AppState";

const AccessPage = () => {
  const { user, activePlan, planExpires } = useAppState();

  if (!activePlan) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-secondary/30 p-12 text-center max-w-2xl mx-auto">
        <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-display text-2xl font-semibold mb-2">Тариф не активен</h3>
        <p className="text-muted-foreground mb-6">
          Чтобы получить доступ в пространство, выбери тариф.
        </p>
        <Button asChild>
          <Link to="/app/plans">Перейти к тарифам</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
      <Card className="rounded-3xl bg-gradient-forest p-10 text-primary-foreground shadow-deep border-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--highlight)/0.4),transparent_50%)]" />
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Flow Pass</p>
              <p className="font-display text-2xl mt-1">{user.name}</p>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-highlight text-highlight-foreground">
              Активен
            </div>
          </div>

          <div className="aspect-square max-w-[260px] mx-auto bg-background/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-background/20">
            <QrCode className="w-36 h-36 text-primary-foreground/90" strokeWidth={1} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-background/20">
            <div>
              <p className="text-xs text-primary-foreground/60 mb-1">Тариф</p>
              <p className="font-display font-semibold">{activePlan.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs text-primary-foreground/60 mb-1">Действует до</p>
              <p className="font-display font-semibold">{planExpires}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="rounded-2xl bg-card border border-border p-6">
          <h4 className="font-display text-lg font-semibold mb-3">Как пройти</h4>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><span className="font-display text-accent">01</span> Открой этот экран на входе.</li>
            <li className="flex gap-3"><span className="font-display text-accent">02</span> Покажи администратору — он сверит статус.</li>
            <li className="flex gap-3"><span className="font-display text-accent">03</span> Выбери место в разделе «Карта».</li>
          </ol>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 space-y-3 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-4 h-4 text-accent" /> Активный тариф всегда под рукой
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-4 h-4 text-accent" /> История посещений в профиле
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
