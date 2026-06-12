import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CATEGORIES, DRINKS, Drink } from "@/data/coffee";

function formatSizeLabel(id: "S" | "M" | "L") {
  return id === "S" ? "S" : id === "M" ? "M" : "L";
}

export default function QrMenu() {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [open, setOpen] = useState(false);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const openDrink = (drink: Drink) => {
    setSelectedDrink(drink);
    setOpen(true);
  };

  const closeDrink = () => {
    setOpen(false);
    setTimeout(() => setSelectedDrink(null), 200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal sticky header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/90 border-b border-border/40">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-display text-xl tracking-tight">SO-HO!</h1>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Меню · весна 2026
          </span>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-8">
        {CATEGORIES.map((cat) => {
          const drinks = DRINKS.filter(
            (d) => d.category === cat.id && !d.soldOut
          );
          if (drinks.length === 0) return null;

          return (
            <section key={cat.id}>
              <h2 className="font-display text-2xl tracking-tight mb-1">
                {cat.label}
              </h2>
              <div className="h-px bg-border mb-3" />
              <div className="divide-y divide-border/60">
                {drinks.map((drink) => (
                  <div
                    key={drink.id}
                    className="flex items-center justify-between py-2.5 gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm leading-snug">
                          {drink.name}
                        </span>
                        {drink.badge && (
                          <span className="shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {drink.badge}
                          </span>
                        )}
                      </div>
                      {drink.subtitle && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {drink.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-display text-base tabular-nums leading-none">
                        {drink.price} ₽
                      </span>
                      <button
                        onClick={() => openDrink(drink)}
                        aria-label="Подробнее"
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer note */}
      <footer className="max-w-xl mx-auto px-4 pb-8 pt-2 text-center">
        <p className="text-[10px] text-muted-foreground tracking-wide">
          Адрес: Дачное шоссе, 22/3 · Новосибирск · Ежедневно 7:00 — 23:00
        </p>
      </footer>

      {/* Detail dialog */}
      <Dialog open={open} onOpenChange={(v) => !v && closeDrink()}>
        <DialogContent className="max-w-sm p-0 overflow-hidden gap-0 border-0 sm:border">
          {selectedDrink && (
            <>
              {/* Media header */}
              <div
                className="relative h-44"
                style={{ background: selectedDrink.accent }}
              >
                <video
                  src={selectedDrink.video}
                  poster={selectedDrink.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <DialogHeader className="text-left space-y-1">
                    <DialogTitle className="text-white font-display text-2xl tracking-tight">
                      {selectedDrink.name}
                    </DialogTitle>
                    {selectedDrink.subtitle && (
                      <p className="text-xs text-white/80">
                        {selectedDrink.subtitle}
                      </p>
                    )}
                  </DialogHeader>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-5">
                {/* Macros */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { v: selectedDrink.macro.kcal, l: "ккал" },
                    { v: selectedDrink.macro.protein, l: "белки, г" },
                    { v: selectedDrink.macro.fat, l: "жиры, г" },
                    { v: selectedDrink.macro.carbs, l: "углеводы, г" },
                  ].map((m) => (
                    <div key={m.l}>
                      <div className="font-display text-base tabular-nums">
                        {m.v}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                        {m.l}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sizes */}
                {selectedDrink.sizes.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      Объём
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrink.sizes.map((s) => (
                        <span
                          key={s.id}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted text-xs font-medium"
                        >
                          {formatSizeLabel(s.id)} — {s.ml} мл
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flavors */}
                {selectedDrink.flavors && selectedDrink.flavors.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      Вкусы ({selectedDrink.flavors.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrink.flavors.map((f) => (
                        <span
                          key={f.id}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted text-xs"
                        >
                          {f.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variants */}
                {selectedDrink.variants.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      Варианты
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrink.variants.map((v) => (
                        <span
                          key={v.id}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted text-xs"
                        >
                          {v.name}
                          {v.price > 0 && (
                            <span className="ml-1 text-muted-foreground">
                              +{v.price} ₽
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milks */}
                {selectedDrink.milks.length > 0 &&
                  selectedDrink.milks[0].id !== "none" && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                        Молоко
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDrink.milks.map((m) => (
                          <span
                            key={m.id}
                            className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted text-xs"
                          >
                            {m.name}
                            {m.price > 0 && (
                              <span className="ml-1 text-muted-foreground">
                                +{m.price} ₽
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Toppings (only if any) */}
                {selectedDrink.toppings.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      Добавки
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrink.toppings.map((t) => (
                        <span
                          key={t.id}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted text-xs"
                        >
                          {t.name}
                          {t.price > 0 && (
                            <span className="ml-1 text-muted-foreground">
                              +{t.price} ₽
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
