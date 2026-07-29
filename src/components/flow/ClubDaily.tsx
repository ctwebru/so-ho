import { useState } from "react";
import { Gamepad2, Dice5, BookOpen, Coffee, Users2, Home, Clock, ArrowUpRight } from "lucide-react";
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
  { icon: Dice5, label: "Выбрать любую настольную игру", note: "40+ игр на полке" },
  { icon: BookOpen, label: "Почитать книгу", note: "тихие места у окна" },
  { icon: Coffee, label: "Выпить кофе", note: "спешелти от бариста" },
  { icon: Users2, label: "Встретиться с друзьями", note: "большие столы" },
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
    <section className="container mx-auto px-6 pb-14">
      <div className="rounded-3xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="bg-gradient-moss px-6 md:px-8 py-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-3">
            <Home className="w-5 h-5" strokeWidth={1.75} />
            <span className="font-display text-xl md:text-2xl font-semibold">Клуб открыт ежедневно</span>
          </div>
          <span className="inline-flex items-center gap-2 text-sm text-foreground/75">
            <Clock className="w-4 h-4" /> 08:00 — 20:00
          </span>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">Каждый день вы можете</p>

          <div className="grid md:grid-cols-3 gap-4">
            {/* PS5 */}
            <div className="md:col-span-1 rounded-2xl border border-accent/25 bg-accent/5 p-5 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-3">
                <Gamepad2 className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div className="font-display text-lg font-semibold">Забронировать PS5</div>
              <p className="text-sm text-muted-foreground mt-1">
                300 ₽/час с клубной картой · 450 ₽/час без карты
              </p>
              <Button className="mt-4 w-full" onClick={() => setPsOpen(true)}>
                Забронировать
              </Button>
            </div>

            {/* Everyday items */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
              {ITEMS.map((i) => (
                <div
                  key={i.label}
                  className="rounded-2xl border border-border bg-background p-4 flex items-start gap-3"
                >
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center">
                    <i.icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-sm font-medium leading-snug">{i.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{i.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#rent"
            className="mt-4 rounded-2xl border border-border bg-secondary/40 p-5 flex items-center justify-between gap-4 hover:bg-secondary/70 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Home className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="font-display text-lg font-semibold">Забронировать клуб целиком</div>
                <div className="text-sm text-muted-foreground">Дни рождения, лекции, корпоративы, съёмки</div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
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
              className={`rounded-2xl border p-4 text-left transition-colors ${
                member ? "border-accent bg-accent/10" : "border-border bg-background"
              }`}
            >
              <div className="font-display text-xl font-semibold tabular-nums">300 ₽/ч</div>
              <div className="text-xs text-muted-foreground mt-1">с клубной картой</div>
            </button>
            <button
              type="button"
              onClick={() => setMember(false)}
              className={`rounded-2xl border p-4 text-left transition-colors ${
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
