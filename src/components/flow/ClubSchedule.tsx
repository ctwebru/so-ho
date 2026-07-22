import { useMemo, useState } from "react";
import { CalendarDays, LayoutGrid, Rows3 } from "lucide-react";
import {
  KIND_META,
  WEEKLY_SCHEDULE,
  WEEK_DAYS,
  todayId,
  type WeekDayId,
} from "@/data/clubSchedule";
import { CLUB_EVENTS } from "@/data/club";

type Mode = "week" | "day";

const ClubSchedule = () => {
  const [mode, setMode] = useState<Mode>("week");
  const [activeDay, setActiveDay] = useState<WeekDayId>(todayId());

  // Special events keyed by day-of-week (parsed from "18 МАЯ" strings would need real dates;
  // for now attach them as extra chips to the two nearest weekdays for demo purposes).
  const specialsByDay = useMemo(() => {
    const map = new Map<WeekDayId, typeof CLUB_EVENTS>();
    CLUB_EVENTS.forEach((e, i) => {
      const day = (((i * 2) % 7) + 1) as WeekDayId;
      const list = map.get(day) ?? [];
      list.push(e);
      map.set(day, list);
    });
    return map;
  }, []);

  const today = todayId();

  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="grid md:grid-cols-12 gap-8 mb-8 items-end">
        <div className="md:col-span-8">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">
            / Расписание
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            Что у нас каждый день
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            С 08:00 до 17:00 — тихий клуб для работы и встреч. Вечером — игры,
            настолки и мастер-классы. Расписание регулярно пополняется.
          </p>
        </div>
        <div className="md:col-span-4 md:justify-self-end inline-flex rounded-full border border-border bg-card p-1 text-sm">
          <button
            onClick={() => setMode("week")}
            className={`px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors ${
              mode === "week"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Неделя
          </button>
          <button
            onClick={() => setMode("day")}
            className={`px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors ${
              mode === "day"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Rows3 className="w-3.5 h-3.5" /> День
          </button>
        </div>
      </div>

      {/* WEEK VIEW — desktop grid */}
      {mode === "week" && (
        <div className="hidden md:block rounded-3xl border border-border bg-card overflow-hidden shadow-soft">
          <div className="grid grid-cols-7 divide-x divide-border">
            {WEEK_DAYS.map((d) => (
              <div
                key={d.id}
                className={`p-4 text-center ${
                  d.id === today ? "bg-accent/10" : "bg-secondary/30"
                }`}
              >
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {d.short}
                </div>
                <div className="font-display text-lg font-semibold mt-0.5">
                  {d.full}
                </div>
                {d.id === today && (
                  <div className="text-[10px] uppercase tracking-widest text-accent mt-1">
                    сегодня
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 divide-x divide-border min-h-[420px]">
            {WEEK_DAYS.map((d) => {
              const slots = WEEKLY_SCHEDULE[d.id];
              const specials = specialsByDay.get(d.id) ?? [];
              return (
                <div
                  key={d.id}
                  className={`p-3 space-y-2 ${
                    d.id === today ? "bg-accent/5" : ""
                  }`}
                >
                  {slots.map((s, i) => {
                    const meta = KIND_META[s.kind];
                    const Icon = meta.icon;
                    return (
                      <div
                        key={i}
                        className={`rounded-2xl border p-3 ${meta.tone}`}
                      >
                        <div className="text-[11px] uppercase tracking-widest tabular-nums opacity-80">
                          {s.start}–{s.end}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                          <div className="font-display text-sm font-semibold leading-tight">
                            {s.title}
                          </div>
                        </div>
                        {s.note && (
                          <div className="text-[11px] opacity-70 mt-1 leading-snug">
                            {s.note}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {specials.map((e) => (
                    <div
                      key={e.id}
                      className="rounded-2xl border border-dashed border-accent/40 bg-background p-3"
                    >
                      <div className="text-[10px] uppercase tracking-widest text-accent flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" /> событие · {e.time}
                      </div>
                      <div className="font-display text-sm font-medium leading-tight mt-1">
                        {e.title}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WEEK VIEW — mobile: day chips + list */}
      {mode === "week" && (
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-6 px-6 snap-x">
            {WEEK_DAYS.map((d) => {
              const active = d.id === activeDay;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDay(d.id)}
                  className={`snap-start shrink-0 w-14 py-2.5 rounded-2xl border text-center transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-widest opacity-80">
                    {d.short}
                  </div>
                  {d.id === today && (
                    <div
                      className={`text-[9px] mt-0.5 ${
                        active ? "text-primary-foreground" : "text-accent"
                      }`}
                    >
                      сегодня
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <DayList day={activeDay} specials={specialsByDay.get(activeDay) ?? []} />
        </div>
      )}

      {/* DAY VIEW */}
      {mode === "day" && (
        <div className="space-y-4">
          {WEEK_DAYS.map((d) => (
            <div
              key={d.id}
              className={`rounded-3xl border p-5 md:p-6 ${
                d.id === today
                  ? "border-accent/40 bg-accent/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <div className="font-display text-xl md:text-2xl font-semibold">
                  {d.full}
                </div>
                {d.id === today && (
                  <div className="text-[10px] uppercase tracking-widest text-accent">
                    сегодня
                  </div>
                )}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {WEEKLY_SCHEDULE[d.id].map((s, i) => {
                  const meta = KIND_META[s.kind];
                  const Icon = meta.icon;
                  return (
                    <div
                      key={i}
                      className={`rounded-2xl border p-3 ${meta.tone}`}
                    >
                      <div className="text-[11px] uppercase tracking-widest tabular-nums opacity-80">
                        {s.start}–{s.end}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                        <div className="font-display text-sm font-semibold">
                          {s.title}
                        </div>
                      </div>
                      {s.note && (
                        <div className="text-[11px] opacity-70 mt-1">
                          {s.note}
                        </div>
                      )}
                    </div>
                  );
                })}
                {(specialsByDay.get(d.id) ?? []).map((e) => (
                  <div
                    key={e.id}
                    className="rounded-2xl border border-dashed border-accent/40 bg-background p-3"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-accent flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" /> {e.date} · {e.time}
                    </div>
                    <div className="font-display text-sm font-medium mt-1">
                      {e.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-2 text-xs">
        {Object.entries(KIND_META).map(([k, m]) => {
          const Icon = m.icon;
          return (
            <span
              key={k}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${m.tone}`}
            >
              <Icon className="w-3 h-3" strokeWidth={2} /> {m.label}
            </span>
          );
        })}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-dashed border-accent/40 text-accent">
          <CalendarDays className="w-3 h-3" /> Разовое событие
        </span>
      </div>
    </section>
  );
};

const DayList = ({
  day,
  specials,
}: {
  day: WeekDayId;
  specials: typeof CLUB_EVENTS;
}) => {
  const slots = WEEKLY_SCHEDULE[day];
  return (
    <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-soft divide-y divide-border">
      {slots.map((s, i) => {
        const meta = KIND_META[s.kind];
        const Icon = meta.icon;
        return (
          <div key={i} className="p-4 flex items-start gap-4">
            <div className="w-20 shrink-0">
              <div className="font-display text-base font-semibold tabular-nums">
                {s.start}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                до {s.end}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-widest ${meta.tone}`}
                >
                  <Icon className="w-3 h-3" strokeWidth={2} /> {meta.label}
                </span>
              </div>
              <div className="font-display text-base font-medium mt-1.5">
                {s.title}
              </div>
              {s.note && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  {s.note}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {specials.map((e) => (
        <div key={e.id} className="p-4 flex items-start gap-4 bg-accent/5">
          <div className="w-20 shrink-0">
            <div className="font-display text-base font-semibold tabular-nums">
              {e.time}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-accent">
              {e.date}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-dashed border-accent/40 text-accent text-[10px] uppercase tracking-widest">
              <CalendarDays className="w-3 h-3" /> событие
            </div>
            <div className="font-display text-base font-medium mt-1.5">
              {e.title}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {e.host} · {e.price} ₽
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubSchedule;
