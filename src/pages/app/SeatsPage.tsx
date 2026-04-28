import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppState } from "@/state/AppState";

const seats = Array.from({ length: 15 }, (_, i) => i + 1);
const skypeRooms = ["Skype 1", "Skype 2"];

const SeatsPage = () => {
  const { selectedSeat, setSeat } = useAppState();

  const confirm = () => {
    if (!selectedSeat) return;
    toast.success(`Место №${selectedSeat} выбрано`, {
      description: "Декларативный выбор. Подходи и работай.",
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card rounded-3xl p-8 shadow-soft border border-border">
        <div className="flex justify-between items-center mb-6 text-xs uppercase tracking-widest text-muted-foreground">
          <span>Окна / Сад</span>
          <span>Free zone →</span>
        </div>

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

        <div className="grid grid-cols-5 gap-3">
          {seats.map((n) => {
            const isSelected = selectedSeat === n;
            return (
              <button
                key={n}
                onClick={() => setSeat(n)}
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

      <div className="bg-gradient-forest rounded-3xl p-8 text-primary-foreground shadow-deep flex flex-col">
        <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-3">Выбранное место</p>
        <div className="font-display text-7xl font-bold mb-2">
          {selectedSeat ? `№${selectedSeat}` : "—"}
        </div>
        <p className="text-primary-foreground/70 text-sm mb-auto">
          {selectedSeat ? "Если место занято — выбери другое." : "Кликни по номеру на карте."}
        </p>
        <div className="space-y-2 mt-8">
          <Button variant="hero" size="lg" className="w-full" disabled={!selectedSeat} onClick={confirm}>
            Подтвердить
          </Button>
          {selectedSeat && (
            <Button variant="glass" className="w-full" onClick={() => setSeat(null)}>
              Сбросить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatsPage;
