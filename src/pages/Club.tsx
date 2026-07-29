import { useMemo, useState } from "react";
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
import ClubDaily from "@/components/flow/ClubDaily";

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
        <section className="container mx-auto px-6 pt-20 md:pt-28 pb-14 text-center">
          <div className="relative inline-block">
            <span className="font-hand text-accent text-2xl md:text-3xl absolute -top-9 md:-top-10 -right-10 md:-right-24 rotate-6 whitespace-nowrap">
              наш общий дом
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[0.95] tracking-tight">
              Соседский
              <br />
              клуб
            </h1>
          </div>
          <p className="mt-8 mx-auto max-w-xl text-lg md:text-xl text-muted-foreground">
            Кофе — это только повод. Остальное — соседи: настолки, мастер-классы,
            детские выходные и место, где можно провести что-то своё.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="rounded-3xl bg-card border-2 border-border px-7 py-4 tilt-1 hover:rotate-0 transition-transform">
              <div className="font-display text-3xl font-semibold tabular-nums">{CLUB_EVENTS.length}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-0.5">событий в месяце</div>
            </div>
            <div className="rounded-3xl bg-gradient-moss px-7 py-4 tilt-2 hover:rotate-0 transition-transform">
              <div className="font-display text-3xl font-semibold tabular-nums">40+</div>
              <div className="text-xs uppercase tracking-widest text-foreground/70 mt-0.5">настольных игр</div>
            </div>
            <div className="rounded-3xl bg-card border-2 border-border px-7 py-4 tilt-1 hover:rotate-0 transition-transform">
              <div className="font-display text-3xl font-semibold tabular-nums">7/7</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-0.5">дней открыты</div>
            </div>
          </div>
        </section>

        <ClubDaily />

        {/* CATEGORIES */}
        <section className="container mx-auto px-6 pb-20">
          <p className="font-hand text-accent text-2xl mb-5">что здесь бывает</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLUB_CATEGORIES.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                id={c.id}
                className={`scroll-mt-24 rounded-[2rem] border-2 p-6 transition-transform duration-300 hover:rotate-0 ${
                  i % 2 === 0
                    ? "bg-card border-primary/70 tilt-1"
                    : "bg-secondary/60 border-accent/40 tilt-2"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/20 text-primary flex items-center justify-center mb-4">
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
          <div className="flex flex-wrap gap-6 justify-between items-end mb-8">
            <div>
              <p className="font-hand text-accent text-2xl">приходите в гости</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight mt-1">
                Ближайшие встречи
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-full text-sm border-2 transition-colors ${
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

          {filtered.length === 0 && (
            <div className="rounded-[2rem] border-2 border-dashed border-accent/40 p-12 text-center text-muted-foreground">
              Пока в этой категории пусто. Загляни позже.
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e, i) => {
              const cat = CLUB_CATEGORIES.find((c) => c.id === e.category);
              const dark = i % 3 === 1;
              return (
                <article
                  key={e.id}
                  className={`rounded-[2rem] border-2 p-7 flex flex-col justify-between transition-transform duration-300 hover:rotate-0 ${
                    i % 2 === 0 ? "tilt-1" : "tilt-2"
                  } ${dark ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${
                          dark ? "bg-primary-foreground/15" : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {cat && <cat.icon className="w-3 h-3" strokeWidth={2} />}
                        {e.date} · {e.time}
                      </span>
                      {e.ageLabel && (
                        <span className={`font-hand text-lg ${dark ? "text-primary-foreground/80" : "text-accent"}`}>
                          {e.ageLabel}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl font-semibold leading-tight">{e.title}</h3>
                    <p className={`text-sm mt-2 ${dark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                      {e.desc}
                    </p>
                    <div
                      className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${
                        dark ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />осталось {e.seatsLeft}</span>
                      <span>ведёт {e.host}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <div className="font-display text-2xl font-semibold tabular-nums">{e.price} ₽</div>
                      <div className={`text-xs ${dark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        за человека
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelected(e)}
                      disabled={e.seatsLeft === 0}
                      variant={dark ? "secondary" : "default"}
                      className="rounded-2xl"
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
        <section id="rent" className="scroll-mt-24 py-20 md:py-28 bg-secondary/50 paper border-y-2 border-accent/30">
          <div className="container mx-auto px-6 grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-6">
              <p className="font-hand text-accent text-2xl">свой праздник в клубе?</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-balance mt-1">
                Проведи у нас <span className="italic font-normal text-accent">своё событие</span>
              </h2>
              <p className="mt-6 text-muted-foreground text-lg max-w-xl">
                Уютный зал на 25 гостей, проектор, звук, кухня и бариста. Подходит
                для бизнес-встреч, лекций, съёмок и мастер-классов.
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { v: "до 25", l: "гостей" },
                  { v: "от 2 ч", l: "минимум" },
                  { v: "2 500 ₽", l: "час буднего дня" },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className={`rounded-3xl bg-card border-2 border-border p-5 ${i % 2 === 0 ? "tilt-1" : "tilt-2"} hover:rotate-0 transition-transform`}
                  >
                    <div className="font-display text-2xl font-semibold">{s.v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                Дачное шоссе, 22/3 · Новосибирск
              </div>
            </div>

            <form
              onSubmit={submitRent}
              className="md:col-span-6 rounded-[2.5rem] bg-card border-2 border-primary/70 p-6 md:p-8 tilt-2 hover:rotate-0 transition-transform duration-300"
            >
              <div className="font-display text-2xl font-semibold">Оставить заявку</div>
              <p className="font-hand text-accent text-xl mb-6">позвоним и всё обсудим</p>
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
              <Button type="submit" className="mt-6 w-full rounded-2xl">
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
          <p className="font-hand text-accent text-2xl">а может, ты сам поведёшь?</p>
          <h3 className="font-display text-3xl md:text-4xl font-semibold text-balance max-w-2xl mx-auto mt-2">
            Хочешь провести <span className="italic font-normal text-accent">свой</span> мастер-класс?
          </h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Мы охотно принимаем гостевых ведущих. Расскажи об идее — обсудим формат и разделим организацию.
          </p>
          <a
            href="#rent"
            className="mt-8 inline-flex items-center gap-2 font-display font-medium border-b-2 border-accent hover:border-foreground pb-1"
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
