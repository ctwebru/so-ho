import { Link } from "react-router-dom";
import { useAppState } from "@/state/AppState";
import { ArrowUpRight, CreditCard, QrCode, MapPin, Coffee, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, activePlan, planExpires, selectedSeat, registeredEvents, orders } = useAppState();

  const tiles = [
    { to: "/app/access", icon: QrCode, label: "Доступ", value: activePlan ? "Активен" : "Не активен" },
    { to: "/app/seats", icon: MapPin, label: "Место", value: selectedSeat ? `№${selectedSeat}` : "Не выбрано" },
    { to: "/app/cafe", icon: Coffee, label: "Заказы", value: `${orders.length}` },
    { to: "/app/events", icon: CalendarDays, label: "События", value: `${registeredEvents.length}` },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="rounded-3xl bg-gradient-forest p-8 md:p-10 text-primary-foreground shadow-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--highlight)/0.4),transparent_50%)]" />
        <div className="relative grid md:grid-cols-2 gap-6 items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-3">
              Добро пожаловать
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight">
              Привет, {user.name.split(" ")[0]}.<br />
              <span className="italic font-normal text-highlight">Хорошего flow.</span>
            </h2>
          </div>
          <div className="md:text-right">
            <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-2">Тариф</div>
            <div className="font-display text-2xl font-semibold mb-1">
              {activePlan ? activePlan.toUpperCase() : "Не активен"}
            </div>
            {planExpires && (
              <div className="text-sm text-primary-foreground/70">до {planExpires}</div>
            )}
            {!activePlan && (
              <Button variant="hero" className="mt-4" asChild>
                <Link to="/app/plans">Выбрать тариф</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Quick tiles */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group rounded-2xl bg-card border border-border p-5 hover:shadow-soft hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <t.icon className="w-5 h-5 text-accent" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition" />
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{t.label}</div>
            <div className="font-display text-xl font-semibold">{t.value}</div>
          </Link>
        ))}
      </section>

      {/* Recent orders */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-semibold">Последние заказы</h3>
          <Link to="/app/cafe" className="text-sm text-accent hover:underline flex items-center gap-1">
            В кофейню <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-secondary/40 border border-dashed border-border p-10 text-center text-muted-foreground">
            Пока нет заказов. Загляни в кофейню.
          </div>
        ) : (
          <div className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden">
            {orders.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Coffee className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{o.items}</div>
                  <div className="text-xs text-muted-foreground">№{o.id} · {o.at}</div>
                </div>
                <div className="font-display tabular-nums">{o.total} ₽</div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  o.status === "Готов" ? "bg-highlight/30 text-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
