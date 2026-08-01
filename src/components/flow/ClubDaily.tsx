import { useState } from "react";
import {
  Gamepad2,
  Dice5,
  BookOpen,
  Puzzle,
  Users2,
  Home,
  ArrowUpRight,
  Check,
  Palette,
  Swords,
  Baby,
  Coffee,
  CalendarClock,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const ITEMS = [
  { icon: Dice5, title: "Настолки", note: "40+ игр на полке, бери любую" },
  { icon: BookOpen, title: "Библиотека", note: "своя, пополняем каждый месяц" },
  { icon: Palette, title: "Рисование", note: "бумага, карандаши, краски — наши" },
  { icon: Puzzle, title: "Пазл недели", note: "собираем всем клубом, стол у окна" },
  { icon: Users2, title: "Встречи", note: "большие столы для своей компании" },
  { icon: Swords, title: "Турниры", note: "мини-чемпионаты по настолкам" },
  { icon: Baby, title: "С детьми", note: "детские игры и творческий стол" },
  { icon: Coffee, title: "Кофе рядом", note: "бариста в соседнем зале" },
];

const ClubDaily = () => {
  const [psOpen, setPsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(1);
  const [member, setMember] = useState(true);

  const rate = member ? 300 : 450;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Заполни имя и телефон");
      return;
    }
    toast.success("Забронировали PS5", {
      description: `${hours} ч · ${rate * hours} ₽. Позвоним подтвердить.`,
    });
    setPsOpen(false);
    setName("");
    setPhone("");
    setDate("");
    setHours(1);
  };

  return (
    <section id="daily" className="scroll-mt-24 container mx-auto px-6 pb-16">
      <div className="relative rounded-[2.5rem] border-2 border-accent/30 bg-secondary/50 paper p-7 md:p-10 overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-accent/10" />

        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Свободный клуб</h2>
          <div className="shrink-0 self-start md:self-auto rounded-full bg-primary text-primary-foreground px-6 py-2 font-display font-semibold text-sm">
            когда нет занятий и брони
          </div>
        </div>

        {/* Вход */}
        <div className="relative mb-8 rounded-3xl bg-card border-2 border-primary/70 p-5 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
            <div>
              <div className="font-display text-2xl md:text-3xl font-semibold leading-tight">
                Членам клуба — <span className="text-accent">бесплатно</span>
              </div>
              <p className="text-muted-foreground mt-1">
                Когда в клубе нет запланированных занятий и он не забронирован целиком — приходи посидеть,
                поиграть в настолки, почитать или порисовать. Без карты — 150 ₽ за день, без записи.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-2 text-sm">
              {["без записи", "все игры и книги"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1">
                  <Check className="w-3.5 h-3.5 text-accent" /> {t}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground border-t border-border pt-3">
            <CalendarClock className="w-4 h-4 text-accent shrink-0 mt-px" />
            Свободное время зависит от расписания: занятия и брони занимают клуб на несколько часов —
            сверяйтесь с календарём ниже, чтобы выбрать свободное окно.
          </p>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
          {/* PS5 — акцентная позиция */}
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-3 rounded-3xl bg-card border-2 border-accent/50 p-6 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-accent/20 text-primary flex items-center justify-center mb-4">
                <Gamepad2 className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <div className="font-display text-2xl font-semibold">PlayStation 5</div>
              <p className="text-sm text-muted-foreground mt-1">
                Два геймпада и большой экран. Бронь минимум на час.
              </p>
              <div className="mt-4 font-display text-3xl font-semibold tabular-nums">от 300 ₽/ч</div>
            </div>
            <Button className="mt-6 w-full rounded-2xl" onClick={() => setPsOpen(true)}>
              Забронировать приставку
            </Button>
          </div>

          {ITEMS.map((i) => (
            <div key={i.title} className="flex gap-4 items-start">
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-accent/20 text-primary flex items-center justify-center">
                <i.icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="font-display text-lg font-semibold leading-tight">{i.title}</div>
                <p className="text-sm text-muted-foreground mt-0.5">{i.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Аренда клуба целиком */}
        <a
          href="/rent"
          className="relative mt-9 block rounded-3xl bg-primary text-primary-foreground p-6 md:p-7 group"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-primary-foreground/15 flex items-center justify-center">
                <Home className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="font-display text-xl md:text-2xl font-semibold leading-tight">
                  Арендовать клуб целиком
                </div>
                <p className="text-sm opacity-85 mt-1">
                  Бизнес-встречи, лекции, съёмки · до 12 гостей · 1 250 ₽/час
                </p>
              </div>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-primary-foreground text-primary px-5 py-2.5 font-display font-semibold">
              Узнать больше
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </a>
      </div>

      <Dialog open={psOpen} onOpenChange={setPsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Аренда PS5</DialogTitle>
            <DialogDescription>
              Два геймпада, большой экран, подборка игр. Бронь минимум на час.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMember(true)}
              className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                member ? "border-accent bg-accent/10" : "border-border bg-background"
              }`}
            >
              <div className="font-display text-xl font-semibold tabular-nums">300 ₽/ч</div>
              <div className="text-xs text-muted-foreground mt-1">с клубной картой</div>
            </button>
            <button
              type="button"
              onClick={() => setMember(false)}
              className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                !member ? "border-accent bg-accent/10" : "border-border bg-background"
              }`}
            >
              <div className="font-display text-xl font-semibold tabular-nums">450 ₽/ч</div>
              <div className="text-xs text-muted-foreground mt-1">без карты</div>
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="ps-name">Имя</Label>
              <Input id="ps-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к тебе обращаться" />
            </div>
            <div>
              <Label htmlFor="ps-phone">Телефон</Label>
              <Input id="ps-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7" inputMode="tel" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="ps-date">Дата и время</Label>
                <Input id="ps-date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="напр. 25 мая, 18:00" />
              </div>
              <div>
                <Label htmlFor="ps-hours">Часов</Label>
                <Input
                  id="ps-hours"
                  type="number"
                  min={1}
                  max={6}
                  value={hours}
                  onChange={(e) => setHours(Math.min(6, Math.max(1, Number(e.target.value) || 1)))}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setPsOpen(false)}>
                Отмена
              </Button>
              <Button type="submit">Забронировать · {rate * hours} ₽</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ClubDaily;
