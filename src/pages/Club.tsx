import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Users, Clock, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CLUB_CATEGORIES, CLUB_EVENTS, type ClubCategory, type ClubEvent } from "@/data/club";
import ClubSchedule from "@/components/flow/ClubSchedule";

const FILTERS: { id: ClubCategory | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "adults", label: "Взрослым" },
  { id: "kids", label: "Детям" },
  { id: "games", label: "Игры" },
];

const Club = () => {
  const [filter, setFilter] = useState<ClubCategory | "all">("all");
  const [selected, setSelected] = useState<ClubEvent | null>(null);
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regGuests, setRegGuests] = useState(1);
  const [regComment, setRegComment] = useState("");

  const [rentName, setRentName] = useState("");
  const [rentPhone, setRentPhone] = useState("");
  const [rentDate, setRentDate] = useState("");
  const [rentDetails, setRentDetails] = useState("");

  const filtered = useMemo(
    () => (filter === "all" ? CLUB_EVENTS : CLUB_EVENTS.filter((e) => e.category === filter)),
    [filter],
  );

  const submitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      toast.error("Заполни имя и телефон");
      return;
    }
    toast.success("Записали!", {
      description: `${selected?.title} · ${regGuests} чел. Позвоним подтвердить.`,
    });
    setSelected(null);
    setRegName("");
    setRegPhone("");
    setRegGuests(1);
    setRegComment("");
  };

  const submitRent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rentName.trim() || !rentPhone.trim()) {
      toast.error("Заполни имя и телефон");
      return;
    }
    toast.success("Заявка отправлена", {
      description: "Свяжемся в течение дня и обсудим детали.",
    });
    setRentName("");
    setRentPhone("");
    setRentDate("");
    setRentDetails("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16">
        {/* HERO */}
        <section className="container mx-auto px-6 pt-16 md:pt-24 pb-16">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <p className="text-xs uppercase tracking-widest text-accent font-medium mb-5">/ Соседский клуб</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] text-balance">
                Кофе — это только повод.<br />
                <span className="italic font-normal text-accent">Остальное — соседи.</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl">
                Соседский клуб SO-HO! — это про мастер-классы, игровые вечера, детские
                выходные и вашу возможность провести здесь что-то своё.
              </p>
            </div>
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-card border border-border p-5">
                <div className="font-display text-4xl font-semibold tabular-nums">{CLUB_EVENTS.length}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">событий в месяце</div>
              </div>
              <div className="rounded-2xl bg-gradient-moss p-5">
                <div className="font-display text-4xl font-semibold tabular-nums">40+</div>
                <div className="text-xs uppercase tracking-widest text-foreground/70 mt-1">настольных игр</div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="container mx-auto px-6 pb-16">
          <div className="grid md:grid-cols-4 gap-4">
            {CLUB_CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                id={c.id}
                className="scroll-mt-24 rounded-3xl bg-card border border-border p-6 hover:shadow-soft hover:-translate-y-0.5 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div className="font-display text-xl font-semibold mb-2">{c.title}</div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <ClubSchedule />

        {/* AFISHA */}
        <section className="container mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-12 gap-8 mb-8 items-end">
            <div className="md:col-span-8">
              <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Афиша</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                Ближайшие встречи
              </h2>
            </div>
            <div className="md:col-span-4 flex md:justify-end flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    filter === f.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-card border border-border divide-y divide-border overflow-hidden shadow-soft">
            {filtered.length === 0 && (
              <div className="p-10 text-center text-muted-foreground">
                Пока в этой категории пусто. Загляни позже.
              </div>
            )}
            {filtered.map((e) => {
              const cat = CLUB_CATEGORIES.find((c) => c.id === e.category);
              return (
                <article
                  key={e.id}
                  className="grid md:grid-cols-12 gap-6 items-center p-6 md:p-8 hover:bg-secondary/40 transition-colors"
                >
                  <div className="md:col-span-2">
                    <div className="font-display text-2xl md:text-3xl font-semibold tabular-nums">{e.date}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{e.time}</div>
                  </div>
                  <div className="md:col-span-6">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {cat && <cat.icon className="w-3 h-3" strokeWidth={2} />}
                        {cat?.title.split(" ")[0]}
                      </span>
                      {e.ageLabel && (
                        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                          {e.ageLabel}
                        </span>
                      )}
                    </div>
                    <div className="font-display text-xl md:text-2xl font-medium leading-tight">{e.title}</div>
                    <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />осталось {e.seatsLeft}</span>
                      <span>ведёт {e.host}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <div className="font-display text-2xl font-semibold tabular-nums">{e.price} ₽</div>
                    <div className="text-xs text-muted-foreground">за человека</div>
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <Button
                      onClick={() => setSelected(e)}
                      disabled={e.seatsLeft === 0}
                    >
                      {e.seatsLeft === 0 ? "Мест нет" : "Записаться"}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* RENT */}
        <section id="rent" className="scroll-mt-24 py-20 md:py-28 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-6 grid md:grid-cols-12 gap-12">
            <div className="md:col-span-6">
              <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Аренда</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-balance">
                Проведи у нас <span className="italic font-normal text-accent">своё событие</span>
              </h2>
              <p className="mt-6 text-muted-foreground text-lg max-w-xl">
                Уютный зал на 25 гостей, проектор, звук, кухня и бариста. Подходит
                для мастер-классов, лекций, съёмок, дней рождения и рабочих встреч.
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-card border border-border p-5">
                  <div className="font-display text-2xl font-semibold">до 25</div>
                  <div className="text-xs text-muted-foreground mt-1">гостей</div>
                </div>
                <div className="rounded-2xl bg-card border border-border p-5">
                  <div className="font-display text-2xl font-semibold">от 2 ч</div>
                  <div className="text-xs text-muted-foreground mt-1">минимум</div>
                </div>
                <div className="rounded-2xl bg-card border border-border p-5">
                  <div className="font-display text-2xl font-semibold">2 500 ₽</div>
                  <div className="text-xs text-muted-foreground mt-1">час буднего дня</div>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                Дачное шоссе, 22/3 · Новосибирск
              </div>
            </div>

            <form
              onSubmit={submitRent}
              className="md:col-span-6 rounded-3xl bg-card border border-border p-6 md:p-8 shadow-soft"
            >
              <div className="font-display text-2xl font-semibold mb-6">Оставить заявку</div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rent-name">ФИО</Label>
                  <Input id="rent-name" value={rentName} onChange={(e) => setRentName(e.target.value)} placeholder="Как к тебе обращаться" />
                </div>
                <div>
                  <Label htmlFor="rent-phone">Телефон</Label>
                  <Input id="rent-phone" value={rentPhone} onChange={(e) => setRentPhone(e.target.value)} placeholder="+7" inputMode="tel" />
                </div>
                <div>
                  <Label htmlFor="rent-date">Желаемая дата и время</Label>
                  <Input id="rent-date" value={rentDate} onChange={(e) => setRentDate(e.target.value)} placeholder="напр. 25 мая, 18:00–21:00" />
                </div>
                <div>
                  <Label htmlFor="rent-details">Что планируешь провести?</Label>
                  <Textarea
                    id="rent-details"
                    value={rentDetails}
                    onChange={(e) => setRentDetails(e.target.value)}
                    placeholder="Тип события, число гостей, что нужно из оборудования"
                    rows={4}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6 w-full">
                <Send className="w-4 h-4 mr-2" /> Отправить заявку
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Или напиши нам на <a href="mailto:hello@so-ho.ru" className="underline">hello@so-ho.ru</a>
              </p>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-semibold text-balance max-w-2xl mx-auto">
            Хочешь провести <span className="italic font-normal text-accent">свой</span> мастер-класс?
          </h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Мы охотно принимаем гостевых ведущих. Расскажи об идее — обсудим формат и разделим огранизацию.
          </p>
          <a
            href="#rent"
            className="mt-8 inline-flex items-center gap-2 font-display font-medium border-b border-foreground/30 hover:border-foreground pb-1"
          >
            Написать нам <ArrowUpRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <Footer />

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl leading-tight">{selected?.title}</DialogTitle>
            <DialogDescription>
              {selected?.date} · {selected?.time} · {selected?.duration} · {selected?.price} ₽/чел
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitRegistration} className="space-y-4">
            <div>
              <Label htmlFor="reg-name">ФИО</Label>
              <Input id="reg-name" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Как записать" />
            </div>
            <div>
              <Label htmlFor="reg-phone">Телефон</Label>
              <Input id="reg-phone" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} placeholder="+7" inputMode="tel" />
            </div>
            <div>
              <Label htmlFor="reg-guests">Сколько человек</Label>
              <Input
                id="reg-guests"
                type="number"
                min={1}
                max={selected?.seatsLeft ?? 1}
                value={regGuests}
                onChange={(e) => setRegGuests(Math.max(1, Number(e.target.value) || 1))}
              />
              {selected && (
                <p className="text-xs text-muted-foreground mt-1">
                  Свободно {selected.seatsLeft} мест
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="reg-comment">Комментарий</Label>
              <Textarea
                id="reg-comment"
                value={regComment}
                onChange={(e) => setRegComment(e.target.value)}
                placeholder="Особенности, аллергии, пожелания"
                rows={3}
              />
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setSelected(null)}>
                Отмена
              </Button>
              <Button type="submit">Записаться · {(selected?.price ?? 0) * regGuests} ₽</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Club;
