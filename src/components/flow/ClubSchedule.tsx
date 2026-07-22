import { useMemo, useState } from "react";
import { CalendarDays, LayoutGrid, Rows3, CalendarRange, ChevronLeft, ChevronRight } from "lucide-react";
import {
  KIND_META,
  WEEKLY_SCHEDULE,
  WEEK_DAYS,
  todayId,
  type WeekDayId,
} from "@/data/clubSchedule";
import { CLUB_EVENTS, type ClubEvent } from "@/data/club";

type Mode = "week" | "day" | "month";

const RU_MONTHS_SHORT = ["ЯНВ", "ФЕВ", "МАР", "АПР", "МАЯ", "ИЮН", "ИЮЛ", "АВГ", "СЕН", "ОКТ", "НОЯ", "ДЕК"];
const RU_MONTHS_FULL = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

// Parse "18 МАЯ" → { day: 18, month: 4 }
const parseEventDate = (s: string): { day: number; month: number } | null => {
  const m = s.trim().match(/^(\d{1,2})\s+([А-ЯЁ]+)$/i);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const monthIdx = RU_MONTHS_SHORT.indexOf(m[2].toUpperCase().slice(0, 3));
  if (monthIdx < 0) return null;
  return { day, month: monthIdx };
};

const jsDowToWeekDayId = (dow: number): WeekDayId => (dow === 0 ? 7 : dow) as WeekDayId;

const ClubSchedule = () => {
  const [mode, setMode] = useState<Mode>("week");
  const [activeDay, setActiveDay] = useState<WeekDayId>(todayId());

  const now = new Date();
  const [monthCursor, setMonthCursor] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // For week view: attach specials by day-of-week (demo scatter as before)
  const specialsByDay = useMemo(() => {
    const map = new Map<WeekDayId, ClubEvent[]>();
    CLUB_EVENTS.forEach((e, i) => {
      const day = (((i * 2) % 7) + 1) as WeekDayId;
      const list = map.get(day) ?? [];
      list.push(e);
      map.set(day, list);
    });
    return map;
  }, []);

  // For month view: bucket real events by date key "YYYY-M-D"
  const eventsByDate = useMemo(() => {
    const map = new Map<string, ClubEvent[]>();
    CLUB_EVENTS.forEach((e) => {
      const parsed = parseEventDate(e.date);
      if (!parsed) return;
      const year = parsed.month < now.getMonth() ? now.getFullYear() + 1 : now.getFullYear();
      const key = `${year}-${parsed.month}-${parsed.day}`;
      const list = map.get(key) ?? [];
      list.push(e);
      map.set(key, list);
    });
    return map;
  }, [now]);

  const today = todayId();

  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="grid md:grid-cols-12 gap-8 mb-8 items-end">
        <div className="md:col-span-7">
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
        <div className="md:col-span-5 md:justify-self-end inline-flex rounded-full border border-border bg-card p-1 text-sm flex-wrap">
          <ModeBtn active={mode === "month"} onClick={() => setMode("month")} icon={<CalendarRange className="w-3.5 h-3.5" />}>
            Месяц
          </ModeBtn>
          <ModeBtn active={mode === "week"} onClick={() => setMode("week")} icon={<LayoutGrid className="w-3.5 h-3.5" />}>
            Неделя
          </ModeBtn>
          <ModeBtn active={mode === "day"} onClick={() => setMode("day")} icon={<Rows3 className="w-3.5 h-3.5" />}>
            День
          </ModeBtn>
        </div>
      </div>

      {/* MONTH VIEW */}
      {mode === "month" && (
        <MonthView
          cursor={monthCursor}
          onCursor={setMonthCursor}
          eventsByDate={eventsByDate}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      )}

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

const ModeBtn = ({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {icon} {children}
  </button>
);

const DayList = ({
  day,
  specials,
}: {
  day: WeekDayId;
  specials: ClubEvent[];
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

const MonthView = ({
  cursor,
  onCursor,
  eventsByDate,
  selectedDate,
  onSelectDate,
}: {
  cursor: Date;
  onCursor: (d: Date) => void;
  eventsByDate: Map<string, ClubEvent[]>;
  selectedDate: Date | null;
  onSelectDate: (d: Date | null) => void;
}) => {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build 6-week grid (Mon-first)
  const firstOfMonth = new Date(year, month, 1);
  const firstOffset = (firstOfMonth.getDay() + 6) % 7; // 0=Mon
  const gridStart = new Date(year, month, 1 - firstOffset);

  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }

  const shiftMonth = (delta: number) => {
    onCursor(new Date(year, month + delta, 1));
    onSelectDate(null);
  };

  const eventsForDate = (d: Date) =>
    eventsByDate.get(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`) ?? [];

  const selectedEvents = selectedDate ? eventsForDate(selectedDate) : [];
  const selectedDow = selectedDate ? jsDowToWeekDayId(selectedDate.getDay()) : null;
  const selectedSlots = selectedDow ? WEEKLY_SCHEDULE[selectedDow] : [];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-soft">
        {/* Month header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-border">
          <button
            onClick={() => shiftMonth(-1)}
            className="w-9 h-9 rounded-full border border-border inline-flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Предыдущий месяц"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <div className="font-display text-xl md:text-2xl font-semibold">
              {RU_MONTHS_FULL[month]} {year}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
              программа месяца
            </div>
          </div>
          <button
            onClick={() => shiftMonth(1)}
            className="w-9 h-9 rounded-full border border-border inline-flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Следующий месяц"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-7 border-b border-border bg-secondary/30">
          {WEEK_DAYS.map((d) => (
            <div
              key={d.id}
              className="p-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              {d.short}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 auto-rows-fr">
          {days.map((d, i) => {
            const inMonth = d.getMonth() === month;
            const isToday = d.getTime() === today.getTime();
            const isSelected =
              selectedDate && d.toDateString() === selectedDate.toDateString();
            const dow = jsDowToWeekDayId(d.getDay());
            const slots = WEEKLY_SCHEDULE[dow];
            const evts = eventsForDate(d);

            // Uniques kinds for dot bar
            const kinds = Array.from(new Set(slots.map((s) => s.kind)));

            return (
              <button
                key={i}
                onClick={() => onSelectDate(isSelected ? null : d)}
                className={`text-left border-r border-b border-border p-1.5 md:p-2 min-h-[64px] md:min-h-[96px] transition-colors relative
                  ${(i + 1) % 7 === 0 ? "border-r-0" : ""}
                  ${i >= 35 ? "border-b-0" : ""}
                  ${inMonth ? "bg-card hover:bg-secondary/40" : "bg-secondary/20 text-muted-foreground/60"}
                  ${isToday ? "ring-1 ring-inset ring-accent" : ""}
                  ${isSelected ? "bg-accent/10" : ""}
                `}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs tabular-nums font-medium
                      ${isToday ? "bg-accent text-accent-foreground" : ""}
                    `}
                  >
                    {d.getDate()}
                  </span>
                  {evts.length > 0 && (
                    <span className="text-[9px] uppercase tracking-widest text-accent hidden md:inline">
                      {evts.length} соб.
                    </span>
                  )}
                </div>

                {/* Kind dots */}
                {inMonth && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {kinds.map((k) => {
                      const meta = KIND_META[k];
                      return (
                        <span
                          key={k}
                          className={`w-1.5 h-1.5 rounded-full border ${meta.tone}`}
                          title={meta.label}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Event chips (desktop) */}
                {inMonth && evts.length > 0 && (
                  <div className="hidden md:block mt-1.5 space-y-0.5">
                    {evts.slice(0, 2).map((e) => (
                      <div
                        key={e.id}
                        className="text-[10px] leading-tight px-1.5 py-0.5 rounded border border-dashed border-accent/40 text-accent truncate"
                      >
                        {e.time} · {e.title}
                      </div>
                    ))}
                    {evts.length > 2 && (
                      <div className="text-[9px] text-muted-foreground">
                        +{evts.length - 2}
                      </div>
                    )}
                  </div>
                )}

                {/* Event dot (mobile) */}
                {inMonth && evts.length > 0 && (
                  <div className="md:hidden absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day details */}
      {selectedDate && selectedDow && (
        <div className="rounded-3xl border border-accent/40 bg-accent/5 p-5 md:p-6">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="font-display text-xl md:text-2xl font-semibold">
                {selectedDate.getDate()} {RU_MONTHS_FULL[selectedDate.getMonth()].toLowerCase()}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-0.5">
                {WEEK_DAYS.find((w) => w.id === selectedDow)?.full}
              </div>
            </div>
            <button
              onClick={() => onSelectDate(null)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              закрыть
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {selectedSlots.map((s, i) => {
              const meta = KIND_META[s.kind];
              const Icon = meta.icon;
              return (
                <div key={i} className={`rounded-2xl border p-3 ${meta.tone}`}>
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
                    <div className="text-[11px] opacity-70 mt-1">{s.note}</div>
                  )}
                </div>
              );
            })}
            {selectedEvents.map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border border-dashed border-accent/40 bg-background p-3"
              >
                <div className="text-[10px] uppercase tracking-widest text-accent flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" /> событие · {e.time}
                </div>
                <div className="font-display text-sm font-medium mt-1">
                  {e.title}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {e.host} · {e.price} ₽
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubSchedule;
