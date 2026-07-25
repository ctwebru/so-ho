import { useState } from "react";
import { Ticket, Plus, Check, Clock, Trash2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAppState } from "@/state/AppState";

// Быстрые пресеты цен разовых входов
const QUICK_PASSES = [
  { title: "Разовый вход в клуб", price: 200, category: "club" as const },
  { title: "Кинопоказ", price: 300, category: "event" as const },
  { title: "Лекция", price: 500, category: "event" as const },
  { title: "Соседский ужин", price: 800, category: "event" as const },
];

const CAT_LABEL: Record<string, string> = {
  club: "Клуб",
  event: "Событие",
  cafe: "Кофейня",
  other: "Другое",
};

const PassesPage = () => {
  const { passes, buyPass, usePass, clubMembership } = useAppState();
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState({ title: "", price: "", validFor: "" });

  const active = passes.filter((p) => !p.used);
  const history = passes.filter((p) => p.used);
  const totalActive = active.reduce((s, p) => s + p.price, 0);

  const quickBuy = (preset: typeof QUICK_PASSES[number]) => {
    buyPass({ title: preset.title, price: preset.price, category: preset.category });
    toast.success(`Оплачено ${preset.price} ₽`, { description: preset.title });
  };

  const customBuy = () => {
    const price = Number(custom.price);
    if (!custom.title.trim() || !price) return toast.error("Заполните название и сумму");
    buyPass({
      title: custom.title.trim(),
      price,
      validFor: custom.validFor || undefined,
      category: "other",
    });
    toast.success(`Оплачено ${price} ₽`);
    setCustom({ title: "", price: "", validFor: "" });
    setCustomOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-xs uppercase tracking-widest mb-3">
              <Wallet className="w-3 h-3" /> Кошелёк входов
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold">Разовые оплаты</h1>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Купите вход заранее — приходите без очереди. Все чеки и пропуска здесь.
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Активные пропуска</div>
            <div className="font-display text-4xl font-bold">{active.length}</div>
            {totalActive > 0 && <div className="text-sm text-muted-foreground">на сумму {totalActive} ₽</div>}
          </div>
        </div>

        {clubMembership.active && (
          <div className="mt-4 flex items-center gap-2 text-sm text-accent">
            <Check className="w-4 h-4" /> У вас активен клуб — большинство мероприятий бесплатно
          </div>
        )}
      </div>

      {/* Быстрая покупка */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">Быстрая покупка</h2>
          <Button variant="ghost" size="sm" onClick={() => setCustomOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> Другая сумма
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_PASSES.map((p) => (
            <button
              key={p.title}
              onClick={() => quickBuy(p)}
              className="group rounded-2xl border border-border bg-card p-4 text-left hover:border-accent hover:shadow-soft transition-all"
            >
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{CAT_LABEL[p.category]}</div>
              <div className="font-medium mt-1">{p.title}</div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-2xl font-bold">{p.price} ₽</span>
                <span className="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">Купить →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Активные пропуска */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-4">Мои пропуска</h2>
        {active.length === 0 && history.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-border p-10 text-center text-muted-foreground">
            <Ticket className="w-8 h-8 mx-auto mb-2 opacity-50" />
            Пока пусто. Купите первый вход выше.
          </div>
        )}

        <div className="space-y-2">
          {active.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-card border border-border p-4 flex items-center gap-4 shadow-soft"
            >
              <div className="w-12 h-12 rounded-xl bg-highlight/20 flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5 text-highlight-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{p.title}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                  {p.category && <span className="uppercase tracking-widest">{CAT_LABEL[p.category]}</span>}
                  {p.validFor && (<><span>·</span><span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {p.validFor}</span></>)}
                  <span>·</span>
                  <span>{new Date(p.purchasedAt).toLocaleDateString("ru", { day: "2-digit", month: "short" })}</span>
                </div>
              </div>
              <div className="font-display text-lg font-semibold shrink-0">{p.price} ₽</div>
              <Button size="sm" variant="outline" onClick={() => { usePass(p.id); toast("Пропуск использован"); }}>
                Использовать
              </Button>
            </div>
          ))}
        </div>

        {history.length > 0 && (
          <>
            <h3 className="mt-8 mb-3 text-sm uppercase tracking-widest text-muted-foreground">История</h3>
            <div className="space-y-2">
              {history.map((p) => (
                <div key={p.id} className="rounded-2xl bg-secondary/40 p-4 flex items-center gap-4 opacity-60">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate line-through">{p.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(p.purchasedAt).toLocaleDateString("ru", { day: "2-digit", month: "short" })}
                    </div>
                  </div>
                  <div className="text-sm">{p.price} ₽</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Dialog open={customOpen} onOpenChange={setCustomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Свой пропуск</DialogTitle>
            <DialogDescription>Оплатите любую сумму — например, гостевой вход или мастер-класс.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <Label>Название</Label>
              <Input value={custom.title} onChange={(e) => setCustom({ ...custom, title: e.target.value })} placeholder="Мастер-класс по керамике" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Сумма, ₽</Label>
                <Input type="number" value={custom.price} onChange={(e) => setCustom({ ...custom, price: e.target.value })} placeholder="500" />
              </div>
              <div>
                <Label>Когда</Label>
                <Input value={custom.validFor} onChange={(e) => setCustom({ ...custom, validFor: e.target.value })} placeholder="20 мая, 19:00" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCustomOpen(false)}>Отмена</Button>
            <Button onClick={customBuy}>Оплатить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PassesPage;
