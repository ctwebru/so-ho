import { useState } from "react";
import { Send, MapPin, Check, Users, Clock, Dices } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ClubSchedule from "@/components/flow/ClubSchedule";
import ClubDaily from "@/components/flow/ClubDaily";
import clubPhoto from "@/assets/real/club-front.png";

const FAMILY_ADDONS = [500, 400, 300];

const Club = () => {
  const [rentName, setRentName] = useState("");
  const [rentPhone, setRentPhone] = useState("");
  const [rentDate, setRentDate] = useState("");
  const [rentDetails, setRentDetails] = useState("");
  const [family, setFamily] = useState(0);

  const familyPrice =
    990 + Array.from({ length: family }, (_, i) => FAMILY_ADDONS[Math.min(i, FAMILY_ADDONS.length - 1)]).reduce((a, b) => a + b, 0);
  const people = family + 1;
  const singleCost = people * 150 * 8; // 8 визитов в месяц на человека

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

      <main>
        {/* HERO — на всю ширину, фото + затемнение */}
        <section className="relative min-h-[88vh] flex items-end overflow-hidden">
          <img
            src={clubPhoto}
            alt="Зал соседского клуба SO-HO! в Новосибирске"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />

          <div className="relative container mx-auto px-6 pt-32 pb-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 backdrop-blur px-4 py-1.5 text-sm border border-accent/40">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Сегодня открыто 08:00 — 20:00
            </span>

            <h1 className="mt-6 font-display text-6xl md:text-8xl font-semibold leading-[0.9] tracking-tight max-w-4xl">
              Соседский клуб
              <br />
              <span className="text-accent">на Дачном</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              Настолки, книги, рисование и живые люди рядом. Заходи без записи —
              членам клуба бесплатно, остальным 150 ₽ за день.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-2xl text-base">
                <a href="#daily">Что тут делать</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-2xl text-base bg-background/60 backdrop-blur">
                <a href="#membership">Членство · 990 ₽/мес</a>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              {[
                { icon: Dices, v: "40+", l: "настольных игр" },
                { icon: Clock, v: "7/7", l: "дней открыты" },
                { icon: Users, v: "до 25", l: "гостей в зале" },
                { icon: MapPin, v: "22/3", l: "Дачное шоссе" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl bg-card/80 backdrop-blur border-2 border-border px-4 py-3 flex items-center gap-3"
                >
                  <s.icon className="w-5 h-5 text-accent shrink-0" strokeWidth={1.75} />
                  <div>
                    <div className="font-display text-xl font-semibold tabular-nums leading-none">{s.v}</div>
                    <div className="text-[11px] text-muted-foreground leading-tight mt-1">{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <ClubDaily />


        <ClubSchedule />

        {/* RENT */}
        <section id="rent" className="scroll-mt-24 py-20 md:py-28 bg-secondary/50 paper border-y-2 border-accent/30">
          <div className="container mx-auto px-6 grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-6">
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-balance">
                Арендовать клуб целиком
              </h2>
              <p className="mt-6 text-muted-foreground text-lg max-w-xl">
                Уютный зал на 25 гостей, проектор, звук, кухня и бариста. Бизнес-встречи,
                лекции, съёмки и мастер-классы.
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { v: "до 25", l: "гостей" },
                  { v: "от 2 ч", l: "минимум" },
                  { v: "2 500 ₽", l: "час буднего дня" },
                ].map((s) => (
                  <div key={s.l} className="rounded-3xl bg-card border-2 border-border p-5">
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
              className="md:col-span-6 rounded-[2.5rem] bg-card border-2 border-primary/70 p-6 md:p-8"
            >
              <div className="font-display text-2xl font-semibold">Оставить заявку</div>
              <p className="text-sm text-muted-foreground mb-6">Позвоним и всё обсудим</p>
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

        {/* MEMBERSHIP — внизу страницы */}
        <section id="membership" className="scroll-mt-24 container mx-auto px-6 py-20">
          <div className="rounded-[2.5rem] bg-primary text-primary-foreground p-7 md:p-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
                Одно членство вместо
                <br />
                разовых оплат
              </h2>
              <div className="mt-6 flex items-end gap-3">
                <div className="font-display text-5xl md:text-6xl font-semibold tabular-nums">990 ₽</div>
                <div className="pb-2 opacity-80">в месяц</div>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm md:text-base">
                {[
                  "Вход в клуб каждый день — бесплатно (иначе 150 ₽)",
                  "Взрослые настолки и события — бесплатно (иначе 500 ₽)",
                  "PS5 за 300 ₽/ч вместо 450 ₽/ч",
                  "Кешбэк ×2 в кофейне и ранний доступ к событиям",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5 items-start">
                    <Check className="w-5 h-5 shrink-0 opacity-90" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] bg-primary-foreground text-foreground p-6 md:p-7">
              <div className="font-display text-xl font-semibold">Добавь семью — дешевле</div>
              <p className="text-sm text-muted-foreground mt-1">
                +500 ₽ за первого, +400 ₽ за второго, +300 ₽ за каждого следующего.
              </p>

              <div className="mt-5 flex items-center gap-2">
                {[0, 1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFamily(n)}
                    className={`flex-1 rounded-2xl border-2 py-3 font-display font-semibold transition-colors ${
                      family === n ? "border-accent bg-accent/15" : "border-border"
                    }`}
                  >
                    {n + 1}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">человек в семье</p>

              <div className="mt-5 rounded-2xl bg-secondary/60 p-5">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">6 визитов × 150 ₽</span>
                    <span className="tabular-nums">{(people * 900).toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2 настолки × 500 ₽</span>
                    <span className="tabular-nums">{(people * 1000).toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-1.5">
                    <span className="text-muted-foreground">Без карты</span>
                    <span className="tabular-nums font-semibold">{singleCost.toLocaleString("ru-RU")} ₽</span>
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-sm text-muted-foreground">С членством</span>
                  <span className="font-display text-4xl font-semibold tabular-nums">{familyPrice} ₽</span>
                </div>
                <div className="mt-2 text-sm text-accent">
                  Экономия {(singleCost - familyPrice).toLocaleString("ru-RU")} ₽ в месяц — и это без учёта кешбэка ×2 в кофейне
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Расчёт: 6 визитов и 2 события в месяц на человека
                </p>
              </div>

              <Button asChild size="lg" className="mt-5 w-full rounded-2xl">
                <a href="/app/club">Оформить членство</a>
              </Button>
            </div>
          </div>
        </section>
      </main>


      <Footer />
    </div>
  );
};

export default Club;
