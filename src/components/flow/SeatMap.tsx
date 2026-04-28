import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const seats = Array.from({ length: 15 }, (_, i) => i + 1);
const skypeRooms = ["Skype 1", "Skype 2"];

const SeatMap = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const confirm = () => {
    if (!selected) return;
    toast.success(`Место №${selected} выбрано`, {
      description: "Декларативный выбор. Подходи и работай.",
    });
  };

  return (
    <section id="seatmap" className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Карта</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Где ты <span className="italic font-normal text-accent">сегодня?</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              Просто выбери номер места — без бронирования. Контроль на стороне администратора.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Map */}
          <div className="md:col-span-2 bg-card rounded-3xl p-8 shadow-soft">
            <div className="flex justify-between items-center mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              <span>Окна / Сад</span>
              <span>Free zone →</span>
            </div>

            {/* Skype rooms */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {skypeRooms.map((r) => (
                <div
                  key={r}
                  className="aspect-[3/1] bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center text-sm font-display text-accent"
                >
                  {r}
                </div>
              ))}
            </div>

            {/* Seats */}
            <div className="grid grid-cols-5 gap-3">
              {seats.map((n) => {
                const isSelected = selected === n;
                return (
                  <button
                    key={n}
                    onClick={() => setSelected(n)}
                    className={`aspect-square rounded-xl font-display font-semibold text-lg transition-all duration-300 ${
                      isSelected
                        ? "bg-primary text-primary-foreground scale-110 shadow-deep"
                        : "bg-secondary hover:bg-accent/30 text-foreground"
                    }`}
                    aria-label={`Место ${n}`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground text-center">
              Входная зона / Бар
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-gradient-forest rounded-3xl p-8 text-primary-foreground shadow-deep flex flex-col">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-3">Выбранное место</p>
            <div className="font-display text-7xl font-bold mb-2">
              {selected ? `№${selected}` : "—"}
            </div>
            <p className="text-primary-foreground/70 text-sm mb-auto">
              {selected ? "Подойди и работай. Если место занято — выбери другое." : "Кликни по номеру на карте."}
            </p>
            <Button
              variant="hero"
              size="lg"
              className="mt-8 w-full"
              disabled={!selected}
              onClick={confirm}
            >
              Подтвердить выбор
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeatMap;
