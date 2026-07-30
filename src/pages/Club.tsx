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
      </main>

      <Footer />
    </div>
  );
};

export default Club;
