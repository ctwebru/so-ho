import { useState } from "react";
import { Check } from "lucide-react";
import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import { Button } from "@/components/ui/button";
import ClubSchedule from "@/components/flow/ClubSchedule";
import ClubDaily from "@/components/flow/ClubDaily";
import clubPhoto from "@/assets/real/club-front.png";

const FAMILY_ADDONS = [500, 400, 300];

const Club = () => {
  const [family, setFamily] = useState(0);

  const familyPrice =
    990 + Array.from({ length: family }, (_, i) => FAMILY_ADDONS[Math.min(i, FAMILY_ADDONS.length - 1)]).reduce((a, b) => a + b, 0);
  const people = family + 1;
  const singleCost = people * (4 * 150 + 4 * 200 + 1 * 500); // дни + вечера + событие


  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* HERO — на всю высоту экрана */}
        <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
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
              <span className="text-accent">в Flora&amp;Fauna</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              Настолки, книги, рисование и живые люди рядом. Заходи без записи —
              членам клуба бесплатно, остальным 150 ₽ за день.
            </p>

            <a
              href="#daily"
              className="mt-12 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
            >
              подробнее
              <span className="w-px h-8 bg-current animate-pulse" />
            </a>
          </div>
        </section>



        <ClubDaily />


        <ClubSchedule />

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
                  "Вход в клуб и всё расписание каждый день — бесплатно (иначе 150 ₽)",
                  "Спецсобытия и мастер-классы — бесплатно (иначе 500 ₽)",
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

              <div className="mt-5 rounded-2xl bg-secondary/60 p-5 text-center">
                <div className="flex items-end justify-center gap-4">
                  <span className="font-display text-3xl font-semibold tabular-nums text-muted-foreground line-through decoration-2">
                    {singleCost.toLocaleString("ru-RU")} ₽
                  </span>
                  <span className="font-display text-5xl font-semibold tabular-nums text-accent leading-none">
                    {familyPrice.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <div className="mt-3 text-sm">
                  Экономия {(singleCost - familyPrice).toLocaleString("ru-RU")} ₽ в месяц — и это без
                  учёта кешбэка ×2 в кофейне
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
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
