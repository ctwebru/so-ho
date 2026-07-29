import { Coffee, Gamepad2, Dice5, Users2, type LucideIcon } from "lucide-react";

export type ScheduleKind =
  | "console"
  | "board_5"
  | "board_12"
  | "board_duo"
  | "board_16";

export type ScheduleSlot = {
  start: string; // "08:00"
  end: string; // "17:00"
  kind: ScheduleKind;
  title: string;
  note?: string;
};

export const KIND_META: Record<
  ScheduleKind,
  { label: string; icon: LucideIcon; tone: string }
> = {
  quiet: {
    label: "Тихий клуб",
    icon: Coffee,
    tone: "bg-secondary text-secondary-foreground border-border",
  },
  console: {
    label: "Игры в приставку",
    icon: Gamepad2,
    tone: "bg-accent/10 text-accent border-accent/20",
  },
  board_5: {
    label: "Настолки 5+",
    icon: Dice5,
    tone: "bg-highlight/15 text-foreground border-highlight/30",
  },
  board_12: {
    label: "Настолки 12+",
    icon: Dice5,
    tone: "bg-highlight/25 text-foreground border-highlight/40",
  },
  board_duo: {
    label: "Настолки для двоих",
    icon: Users2,
    tone: "bg-primary/10 text-primary border-primary/20",
  },
  board_16: {
    label: "Настолки 16+",
    icon: Dice5,
    tone: "bg-primary/15 text-primary border-primary/25",
  },
};

export const WEEK_DAYS = [
  { id: 1, short: "Пн", full: "Понедельник" },
  { id: 2, short: "Вт", full: "Вторник" },
  { id: 3, short: "Ср", full: "Среда" },
  { id: 4, short: "Чт", full: "Четверг" },
  { id: 5, short: "Пт", full: "Пятница" },
  { id: 6, short: "Сб", full: "Суббота" },
  { id: 7, short: "Вс", full: "Воскресенье" },
] as const;

export type WeekDayId = (typeof WEEK_DAYS)[number]["id"];

const quiet: ScheduleSlot = {
  start: "08:00",
  end: "17:00",
  kind: "quiet",
  title: "Тихий клуб",
  note: "Работа, чтение, встречи один-на-один",
};

export const WEEKLY_SCHEDULE: Record<WeekDayId, ScheduleSlot[]> = {
  1: [quiet, { start: "17:00", end: "20:00", kind: "console", title: "Игры в приставку" }],
  2: [quiet, { start: "17:00", end: "20:00", kind: "console", title: "Игры в приставку" }],
  3: [
    quiet,
    { start: "18:00", end: "19:30", kind: "board_5", title: "Настолки 5+", note: "для семей с детьми" },
    { start: "19:30", end: "21:00", kind: "board_12", title: "Настолки 12+" },
  ],
  4: [quiet, { start: "18:00", end: "19:00", kind: "board_duo", title: "Настолки для двоих" }],
  5: [quiet, { start: "17:00", end: "20:00", kind: "console", title: "Игры в приставку" }],
  6: [quiet, { start: "19:00", end: "21:00", kind: "board_16", title: "Настолки 16+" }],
  7: [quiet, { start: "17:00", end: "20:00", kind: "console", title: "Игры в приставку" }],
};

// JS Date.getDay(): 0=Sun..6=Sat  → map to our 1..7 (Mon..Sun)
export const todayId = (): WeekDayId => {
  const d = new Date().getDay();
  return (d === 0 ? 7 : d) as WeekDayId;
};
