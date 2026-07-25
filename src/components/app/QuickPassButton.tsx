import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Crown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useAppState } from "@/state/AppState";
import { RELATION_LABEL } from "@/data/clubMembership";

export const QuickPassButton = () => {
  const { family, clubMembership } = useAppState();
  const [activeId, setActiveId] = useState(family[0]?.id);
  const active = family.find((m) => m.id === activeId) ?? family[0];
  const payload = active
    ? JSON.stringify({ club: "soho", id: active.id, name: active.name, phone: active.phone ?? null })
    : "";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="h-9 pl-2 pr-3 rounded-full bg-gradient-forest text-primary-foreground flex items-center gap-2 shadow-soft hover:opacity-90 transition"
          aria-label="Мой пропуск"
        >
          <span className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <QrCode className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-medium uppercase tracking-widest">Пропуск</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 overflow-y-auto">
        <div className="bg-gradient-forest text-primary-foreground p-6">
          <SheetHeader className="text-left">
            <SheetTitle className="text-primary-foreground font-display text-2xl">Пропуск в SO-HO!</SheetTitle>
            <SheetDescription className="text-primary-foreground/70">
              Покажите код хосту на входе
            </SheetDescription>
          </SheetHeader>

          {active ? (
            <div className="mt-6 bg-background rounded-3xl p-6 text-foreground flex flex-col items-center">
              <div className="p-3 bg-white rounded-2xl">
                <QRCodeSVG value={payload} size={220} level="M" fgColor="#0a0a0a" />
              </div>
              <div className="mt-4 text-center">
                <div className="font-display text-xl font-semibold">{active.name}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1 inline-flex items-center gap-1">
                  {active.relation === "owner" && <Crown className="w-3 h-3" />}
                  {RELATION_LABEL[active.relation]}
                </div>
                {clubMembership.active ? (
                  <div className="mt-3 inline-block text-xs px-3 py-1 rounded-full bg-accent/20 text-accent-foreground">
                    Клуб активен
                  </div>
                ) : (
                  <div className="mt-3 inline-block text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                    Клуб не активирован
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6 bg-background rounded-3xl p-6 text-center text-muted-foreground">
              Добавьте себя в семью на странице «Соседский клуб»
            </div>
          )}
        </div>

        {family.length > 1 && (
          <div className="p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Выбрать карту</div>
            <div className="grid grid-cols-2 gap-2">
              {family.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveId(m.id)}
                  className={`text-left rounded-xl p-3 border transition ${
                    m.id === active?.id
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="font-medium text-sm truncate">{m.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {RELATION_LABEL[m.relation]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
