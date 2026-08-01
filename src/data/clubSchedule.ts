import { Gamepad2, Dice5, Users2, type LucideIcon } from "lucide-react";

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
  capacity: number; // максимум человек
  booked: number; // уже записались
  booking?: boolean; // требуется запись
};

export const KIND_META: Record<
  ScheduleKind,
  { label: string; icon: LucideIcon; tone: string; age?: string }
> = {
  console: {
    label: "Игры в приставку",
    icon: Gamepad2,
    tone: "bg-accent/10 text-accent border-accent/20",
  },
  board_5: {
    label: "Настолки",
    icon: Dice5,
    tone: "bg-highlight/15 text-foreground border-highlight/30",
    age: "5+",
  },
  board_12: {
    label: "Настолки",
    icon: Dice5,
    tone: "bg-highlight/25 text-foreground border-highlight/40",
    age: "12+",
  },
  board_duo: {
    label: "Настолки для двоих",
    icon: Users2,
    tone: "bg-primary/10 text-primary border-primary/20",
  },
  board_16: {
    label: "Настолки",
    icon: Dice5,
    tone: "bg-primary/15 text-primary border-primary/25",
    age: "16+",
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

export const WEEKLY_SCHEDULE: Record<WeekDayId, ScheduleSlot[]> = {
  1: [{ start: "17:00", end: "20:00", kind: "console", title: "Игры в приставку" }],
  2: [{ start: "17:00", end: "20:00", kind: "console", title: "Игры в приставку" }],
  3: [
    { start: "18:00", end: "19:30", kind: "board_5", title: "Настолки", note: "для семей с детьми" },
    { start: "19:30", end: "21:00", kind: "board_12", title: "Настолки" },
  ],
  4: [{ start: "18:00", end: "19:00", kind: "board_duo", title: "Настолки для двоих" }],
  5: [{ start: "17:00", end: "20:00", kind: "console", title: "Игры в приставку" }],
  6: [{ start: "19:00", end: "21:00", kind: "board_16", title: "Настолки" }],
  7: [{ start: "17:00", end: "20:00", kind: "console", title: "Игры в приставку" }],
};

// JS Date.getDay(): 0=Sun..6=Sat  → map to our 1..7 (Mon..Sun)
export const todayId = (): WeekDayId => {
  const d = new Date().getDay();
  return (d === 0 ? 7 : d) as WeekDayId;
};
