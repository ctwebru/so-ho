import { useState } from "react";
import { Gamepad2, Dice5, BookOpen, Puzzle, Users2, Home, ArrowUpRight, Check } from "lucide-react";
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
  { icon: BookOpen, title: "Книги и рисование", note: "букшеринг, бумага и карандаши" },
  { icon: Puzzle, title: "Паззл недели", note: "собираем всем клубом, стол у окна" },
  { icon: Users2, title: "Встречи", note: "большие столы для своих" },
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
    <section className="container mx-auto px-6 pb-16">
      <div className="relative rounded-[2.5rem] border-2 border-accent/30 bg-secondary/50 paper p-7 md:p-10 overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-accent/10" />

        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">Клуб открыт ежедневно</h2>
            <p className="font-hand text-accent text-2xl mt-1">Ждём вас с восьми утра до восьми вечера</p>
          </div>
          <div className="shrink-0 self-start md:self-auto rounded-full bg-primary text-primary-foreground px-6 py-2 font-display font-semibold tabular-nums">
            08:00 — 20:00
          </div>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
          {/* PS5 — акцентная позиция */}
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 rounded-3xl bg-card border-2 border-primary/80 p-6 flex flex-col justify-between tilt-1 hover:rotate-0 transition-transform duration-300">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-accent/20 text-primary flex items-center justify-center mb-4">
                <Gamepad2 className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <div className="font-display text-2xl font-semibold">PlayStation 5</div>
              <p className="font-hand text-accent text-xl mt-1">два геймпада и большой экран</p>
              <div className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between border-b border-border pb-1">
                  <span className="text-muted-foreground">с клубной картой</span>
                  <span className="font-semibold tabular-nums">300 ₽/ч</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">без карты</span>
                  <span className="font-semibold tabular-nums">450 ₽/ч</span>
                </div>
              </div>
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

          <a href="#rent" className="flex gap-4 items-start group">
            <div className="w-11 h-11 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Home className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <div className="font-display text-lg font-semibold leading-tight inline-flex items-center gap-1">
                Клуб целиком
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">дни рождения, лекции, съёмки</p>
            </div>
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
