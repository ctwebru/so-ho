import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EVENTS } from "@/data/mock";
import { useAppState } from "@/state/AppState";

const EventsPage = () => {
  const { registeredEvents, toggleEvent } = useAppState();

  const onToggle = (id: number, title: string) => {
    const wasReg = registeredEvents.includes(id);
    toggleEvent(id);
    if (wasReg) toast("Запись отменена");
    else toast.success("Ты в списке", { description: title });
  };

  return (
    <div className="space-y-1 bg-card rounded-3xl border border-border overflow-hidden p-2">
      {EVENTS.map((e) => {
        const isReg = registeredEvents.includes(e.id);
        return (
          <article
            key={e.id}
            className="grid md:grid-cols-12 gap-6 items-center py-6 px-6 rounded-2xl hover:bg-secondary/40 transition-colors"
          >
            <div className="md:col-span-2">
              <div className="font-display text-2xl font-bold">{e.date}</div>
              <div className="text-muted-foreground text-sm">{e.time}</div>
            </div>
            <div className="md:col-span-7">
              <h3 className="font-display text-xl md:text-2xl mb-1">{e.title}</h3>
              <p className="text-muted-foreground text-sm">{e.desc}</p>
            </div>
            <div className="md:col-span-3 flex md:justify-end">
              <Button
                variant={isReg ? "outline" : "default"}
                onClick={() => onToggle(e.id, e.title)}
              >
                {isReg ? "Записан ✓" : "Записаться"}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default EventsPage;
