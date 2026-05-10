import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAppState } from "@/state/AppState";
import {
  ArrowUpRight,
  Coffee,
  CalendarDays,
  MapPin,
  Sparkles,
  Sun,
  Cloud,
  Moon,
  Users,
  Quote,
  Flame,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENTS, MENU } from "@/data/mock";

const QUOTES = [
  { t: "Сделай меньше — сделай лучше.", a: "Дитер Рамс" },
  { t: "Тишина — это тоже музыка, просто без нот.", a: "Майлз Дэвис" },
  { t: "Простота — высшая форма изысканности.", a: "Леонардо да Винчи" },
  { t: "Лучшее место для идеи — стол, на котором уже стоит чашка.", a: "SO-HO!" },
];

const greetingFor = (h: number) => {
  if (h < 6) return { text: "Доброй ночи", icon: Moon, mood: "Тихо. Идеально для глубокой работы." };
  if (h < 12) return { text: "Доброе утро", icon: Sun, mood: "Свежий кофе уже на стойке." };
  if (h < 18) return { text: "Добрый день", icon: Sun, mood: "Самое продуктивное окно дня." };
  if (h < 23) return { text: "Добрый вечер", icon: Cloud, mood: "Время медленных проектов." };
  return { text: "Доброй ночи", icon: Moon, mood: "Космически тихо." };
};

const Dashboard = () => {
  const { user, activePlan, planExpires, selectedSeat, registeredEvents, orders, addOrder } = useAppState();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const greeting = greetingFor(now.getHours());
  const Icon = greeting.icon;
  const timeStr = now.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("ru", { weekday: "long", day: "numeric", month: "long" });

  const quote = useMemo(() => QUOTES[new Date().getDate() % QUOTES.length], []);
  const recommended = useMemo(() => MENU[new Date().getDate() % MENU.length], []);
  const upcomingEvent = EVENTS[0];

  // "Сейчас в Flow" — псевдоданные, обновляются каждые 30с
  const liveSeats = useMemo(() => 8 + (now.getMinutes() % 5), [now]);
  const totalSeats = 15;
  const occupancy = Math.round((liveSeats / totalSeats) * 100);

  const monthProgress = Math.round((now.getDate() / 30) * 100);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* HERO STRIP — приветствие, время, настроение */}
      <section className="rounded-3xl bg-gradient-forest p-8 md:p-10 text-primary-foreground shadow-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--highlight)/0.5),transparent_55%)]" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-highlight/10 blur-3xl animate-float-soft" />

        <div className="relative grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 text-primary-foreground/70 text-xs uppercase tracking-widest mb-5">
              <Icon className="w-4 h-4 text-highlight" />
              {dateStr} · {timeStr}
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-balance">
              {greeting.text}, {user.name.split(" ")[0]}.<br />
              <span className="italic font-normal text-highlight">Кофе уже горячий.</span>
            </h2>
            <p className="mt-5 text-primary-foreground/75 max-w-md">{greeting.mood}</p>
          </div>

          <div className="md:col-span-4 md:text-right space-y-3">
            <div className="text-xs uppercase tracking-widest text-primary-foreground/60">Твой тариф</div>
            <div className="font-display text-3xl font-semibold">
              {activePlan ? activePlan.toUpperCase() : "Не активен"}
            </div>
            {planExpires ? (
              <div className="text-sm text-primary-foreground/70">действует до {planExpires}</div>
            ) : (
              <Button variant="hero" asChild>
                <Link to="/app/plans">Выбрать тариф</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* LIVE STATUS + быстрые действия */}
      <section className="grid md:grid-cols-12 gap-4">
        {/* Сейчас в Flow */}
        <div className="md:col-span-7 rounded-3xl bg-card border border-border p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 animate-shimmer" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-highlight animate-pulse-ring" />
                <span className="absolute inset-0 rounded-full bg-highlight" />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Сейчас в SO-HO!</div>
            </div>
            <Link to="/app/seats" className="text-xs text-accent hover:underline flex items-center gap-1">
              К карте мест <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex items-end gap-6 mb-6">
            <div>
              <div className="font-display text-6xl font-semibold tabular-nums">{liveSeats}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">из {totalSeats} мест занято</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm mb-2">
                <Users className="w-4 h-4 text-accent" />
                <span className="font-medium">{occupancy}% загрузка</span>
                <span className="text-muted-foreground">· {occupancy < 60 ? "тихо и просторно" : occupancy < 85 ? "уютно живо" : "почти полный зал"}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-gradient-moss transition-all duration-1000"
                  style={{ width: `${occupancy}%` }}
                />
              </div>
            </div>
          </div>

          {/* мини-сетка мест */}
          <div className="grid grid-cols-15 gap-1.5" style={{ gridTemplateColumns: "repeat(15, minmax(0,1fr))" }}>
            {Array.from({ length: totalSeats }).map((_, i) => {
              const taken = i < liveSeats;
              const mine = selectedSeat === i + 1;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-md transition-all ${
                    mine
                      ? "bg-accent ring-2 ring-accent/40"
                      : taken
                      ? "bg-primary/70"
                      : "bg-secondary"
                  }`}
                  title={`Место №${i + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Быстрые действия */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          <Link
            to="/app/access"
            className="group rounded-3xl bg-primary text-primary-foreground p-5 flex flex-col justify-between min-h-[150px] hover:shadow-deep transition-all relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-highlight/20 blur-2xl group-hover:bg-highlight/40 transition" />
            <Sparkles className="w-5 h-5 text-highlight relative" />
            <div className="relative">
              <div className="font-display text-xl font-semibold">Мой пропуск</div>
              <div className="text-xs text-primary-foreground/60 mt-1">Показать QR на входе</div>
            </div>
          </Link>

          <Link
            to="/app/cafe"
            className="group rounded-3xl bg-card border border-border p-5 flex flex-col justify-between min-h-[150px] hover:shadow-soft hover:-translate-y-0.5 transition-all"
          >
            <Coffee className="w-5 h-5 text-accent" />
            <div>
              <div className="font-display text-xl font-semibold">Заказать кофе</div>
              <div className="text-xs text-muted-foreground mt-1">К столу или на вынос</div>
            </div>
          </Link>

          <Link
            to="/app/seats"
            className="group rounded-3xl bg-card border border-border p-5 flex flex-col justify-between min-h-[150px] hover:shadow-soft hover:-translate-y-0.5 transition-all"
          >
            <MapPin className="w-5 h-5 text-accent" />
            <div>
              <div className="font-display text-xl font-semibold">
                {selectedSeat ? `Место №${selectedSeat}` : "Выбрать место"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {selectedSeat ? "Сегодня твоё" : "Свободно сейчас"}
              </div>
            </div>
          </Link>

          <Link
            to="/app/events"
            className="group rounded-3xl bg-card border border-border p-5 flex flex-col justify-between min-h-[150px] hover:shadow-soft hover:-translate-y-0.5 transition-all"
          >
            <CalendarDays className="w-5 h-5 text-accent" />
            <div>
              <div className="font-display text-xl font-semibold">{registeredEvents.length} событий</div>
              <div className="text-xs text-muted-foreground mt-1">Ты зарегистрирован</div>
            </div>
          </Link>
        </div>
      </section>

      {/* MIDDLE ROW — рекомендация бариста + ближайшее событие */}
      <section className="grid md:grid-cols-12 gap-4">
        <div className="md:col-span-5 rounded-3xl bg-gradient-moss p-6 md:p-8 text-foreground shadow-soft relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-background/30 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest mb-4">
              <Flame className="w-4 h-4" />
              Бариста рекомендует
            </div>
            <div className="font-display text-3xl md:text-4xl font-semibold leading-tight">{recommended.name}</div>
            <div className="mt-2 text-foreground/70">Сегодня особенно хорошо. Зерно из новой обжарки.</div>
            <div className="mt-6 flex items-center justify-between">
              <div className="font-display text-2xl tabular-nums">{recommended.price} ₽</div>
              <Button
                variant="default"
                onClick={() => addOrder(recommended.name, recommended.price)}
              >
                Заказать
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 rounded-3xl bg-card border border-border p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Ближайшее в клубе</div>
            <Link to="/app/events" className="text-xs text-accent hover:underline flex items-center gap-1">
              Вся афиша <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-start gap-6 flex-1">
            <div className="text-center shrink-0">
              <div className="font-display text-3xl font-semibold tabular-nums">{upcomingEvent.date}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{upcomingEvent.time}</div>
            </div>
            <div className="flex-1">
              <div className="font-display text-2xl font-semibold leading-tight">{upcomingEvent.title}</div>
              <p className="mt-2 text-muted-foreground">{upcomingEvent.desc}</p>
              <div className="mt-5 flex gap-3">
                <Button variant="default" asChild>
                  <Link to="/app/events">Записаться</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/app/events">Афиша</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE + MONTH PROGRESS */}
      <section className="grid md:grid-cols-12 gap-4">
        <div className="md:col-span-7 rounded-3xl bg-secondary/50 p-6 md:p-10 relative">
          <Quote className="w-8 h-8 text-accent/50 mb-4" />
          <p className="font-display text-2xl md:text-3xl leading-snug text-balance">
            «{quote.t}»
          </p>
          <div className="mt-4 text-sm text-muted-foreground">— {quote.a}</div>
        </div>

        <div className="md:col-span-5 rounded-3xl bg-card border border-border p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-4">
            <Zap className="w-4 h-4 text-accent" /> Твой месяц
          </div>
          <div className="font-display text-5xl font-semibold tabular-nums">{monthProgress}%</div>
          <div className="text-sm text-muted-foreground mt-1">прошло — самое время взять день в SO-HO!</div>
          <div className="mt-5 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-gradient-forest transition-all duration-1000"
              style={{ width: `${monthProgress}%` }}
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="font-display text-xl font-semibold">{orders.length}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">заказов</div>
            </div>
            <div>
              <div className="font-display text-xl font-semibold">{registeredEvents.length}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">событий</div>
            </div>
            <div>
              <div className="font-display text-xl font-semibold">{activePlan ? "✓" : "—"}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">доступ</div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ORDERS */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-semibold">Последние заказы</h3>
          <Link to="/app/cafe" className="text-sm text-accent hover:underline flex items-center gap-1">
            В кофейню <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-secondary/40 border border-dashed border-border p-10 text-center text-muted-foreground">
            Тут будут твои заказы. Загляни в кофейню — мы сегодня варим вкусное.
          </div>
        ) : (
          <div className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden">
            {orders.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center gap-4 p-4 hover:bg-secondary/40 transition">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Coffee className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{o.items}</div>
                  <div className="text-xs text-muted-foreground">№{o.id} · {o.at}</div>
                </div>
                <div className="font-display tabular-nums">{o.total} ₽</div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    o.status === "Готов" ? "bg-highlight/40 text-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
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
