import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { DRINKS } from "@/data/coffee";
import { MENU } from "@/data/mock";

const DISCOUNT = 0.1;

type CatalogItem = { id: string; name: string; price: number; group: string };

const CATALOG: CatalogItem[] = [
  ...DRINKS.filter((d) => !d.soldOut).map((d) => ({
    id: `d-${d.id}`,
    name: d.name,
    price: d.price,
    group: "Напитки",
  })),
  ...MENU.filter((m) => m.cat === "Десерты").map((m) => ({
    id: `m-${m.id}`,
    name: m.name,
    price: m.price,
    group: "К кофе",
  })),
];

const GROUPS = ["Напитки", "К кофе"];

const Police = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const sub = (id: string) =>
    setCart((c) => {
      const n = (c[id] || 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });

  const { full, total, count } = useMemo(() => {
    const full = Object.entries(cart).reduce((s, [id, q]) => {
      const it = CATALOG.find((c) => c.id === id);
      return s + (it ? it.price * q : 0);
    }, 0);
    const count = Object.values(cart).reduce((s, q) => s + q, 0);
    return { full, total: Math.round(full * (1 - DISCOUNT)), count };
  }, [cart]);

  const submit = () => {
    if (!count) return;
    if (!name.trim() || !phone.trim()) {
      toast("Укажите имя и телефон");
      return;
    }
    setCart({});
    toast("Заказ принят", {
      description: "Перезвоним в течение пары минут и привезём к посту.",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-10 md:py-14 max-w-5xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent mb-5">
            <ShieldCheck className="w-4 h-4" />
            только 11 августа
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-4">
            −10% на всё меню
            <br />
            для сотрудников полиции
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Сегодня в районе много работы. Кофе и еда с доставкой прямо к посту —
            скидка 10% применяется автоматически, показывать ничего не нужно.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent" /> Доставка в радиусе 1 км — бесплатно
            </span>
            <span>SO-HO!, Дачное шоссе 22/3 · 08:00–20:00</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-5xl grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {GROUPS.map((g) => (
            <section key={g}>
              <h2 className="font-display text-xl mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-accent" />
                {g}
              </h2>
              <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
                {CATALOG.filter((c) => c.group === g).map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4">
                    <span className="flex-1 font-display text-lg">{item.name}</span>
                    <span className="text-right leading-tight">
                      <span className="block text-xs text-muted-foreground line-through tabular-nums">
                        {item.price} ₽
                      </span>
                      <span className="block tabular-nums font-medium">
                        {Math.round(item.price * (1 - DISCOUNT))} ₽
                      </span>
                    </span>
                    {cart[item.id] ? (
                      <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
                        <button
                          onClick={() => sub(item.id)}
                          className="w-7 h-7 rounded-full bg-background flex items-center justify-center hover:bg-muted transition"
                          aria-label="Убрать"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center tabular-nums font-medium">{cart[item.id]}</span>
                        <button
                          onClick={() => add(item.id)}
                          className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition"
                          aria-label="Добавить"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => add(item.id)}>
                        <Plus className="w-4 h-4" /> Добавить
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-8 self-start rounded-3xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-display text-xl">Заказ с доставкой</h2>

          {count === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">Корзина пуста</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(cart).map(([id, qty]) => {
                const it = CATALOG.find((c) => c.id === id)!;
                return (
                  <div key={id} className="flex justify-between text-sm">
                    <span>
                      {it.name} × {qty}
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {Math.round(it.price * (1 - DISCOUNT)) * qty} ₽
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-4 border-t border-border space-y-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Без скидки</span>
              <span className="tabular-nums line-through">{full} ₽</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-accent">Со скидкой 10%</span>
              <span className="font-display text-2xl font-semibold tabular-nums">{total} ₽</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
            <Input
              placeholder="Телефон"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Куда привезти (пост, адрес)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Textarea
              placeholder="Комментарий"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <Button className="w-full" disabled={count === 0} onClick={submit}>
            Оформить заказ
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            Предложение действует только 11 августа
          </p>
        </aside>
      </div>
    </main>
  );
};

export default Police;
