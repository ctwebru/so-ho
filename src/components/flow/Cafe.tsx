import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Coffee } from "lucide-react";
import { toast } from "sonner";
import coffeeImg from "@/assets/coffee.jpg";

type Item = { id: string; name: string; price: number; cat: "Напитки" | "Десерты" };

const menu: Item[] = [
  { id: "esp", name: "Эспрессо", price: 150, cat: "Напитки" },
  { id: "cap", name: "Капучино", price: 250, cat: "Напитки" },
  { id: "lat", name: "Латте", price: 280, cat: "Напитки" },
  { id: "raf", name: "Раф ваниль", price: 320, cat: "Напитки" },
  { id: "matcha", name: "Матча латте", price: 350, cat: "Напитки" },
  { id: "tea", name: "Чай сезона", price: 200, cat: "Напитки" },
  { id: "croi", name: "Круассан", price: 220, cat: "Десерты" },
  { id: "cake", name: "Морковный торт", price: 290, cat: "Десерты" },
  { id: "cookie", name: "Мисо-куки", price: 180, cat: "Десерты" },
];

const Cafe = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [delivery, setDelivery] = useState<"pickup" | "table">("pickup");
  const [tableNo, setTableNo] = useState<string>("");

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const sub = (id: string) =>
    setCart((c) => {
      const n = (c[id] || 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menu.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const order = () => {
    if (total === 0) return;
    if (delivery === "table" && !tableNo) {
      toast.error("Укажи номер места");
      return;
    }
    toast.success("Заказ принят", {
      description: `${delivery === "pickup" ? "Самовывоз" : `К месту №${tableNo}`} · ${total} ₽`,
    });
    setCart({});
  };

  const cats = ["Напитки", "Десерты"] as const;

  return (
    <section id="cafe" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 mb-12 items-end">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Кофейня</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Кофе как<br />
              <span className="italic font-normal text-accent">часть пространства.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-soft">
              <img src={coffeeImg} alt="Кофе" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {cats.map((cat) => (
              <div key={cat}>
                <h3 className="font-display text-xl mb-5 flex items-center gap-3">
                  <span className="w-8 h-px bg-accent" />
                  {cat}
                </h3>
                <div className="divide-y divide-border">
                  {menu.filter((m) => m.cat === cat).map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-4">
                      <span className="font-display text-lg flex-1">{item.name}</span>
                      <span className="text-muted-foreground tabular-nums">{item.price} ₽</span>
                      {cart[item.id] ? (
                        <div className="flex items-center gap-2 bg-secondary rounded-full px-1 py-1">
                          <button onClick={() => sub(item.id)} className="w-7 h-7 rounded-full bg-background flex items-center justify-center hover:bg-muted transition">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-medium tabular-nums">{cart[item.id]}</span>
                          <button onClick={() => add(item.id)} className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition">
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
              </div>
            ))}
          </div>

          {/* Cart */}
          <aside className="lg:sticky lg:top-24 self-start bg-card rounded-3xl p-7 shadow-soft border border-border">
            <h4 className="font-display text-xl mb-5 flex items-center gap-2">
              <Coffee className="w-5 h-5" /> Заказ
            </h4>

            {Object.keys(cart).length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">Корзина пуста</p>
            ) : (
              <div className="space-y-2 mb-5">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = menu.find((m) => m.id === id)!;
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span>{item.name} × {qty}</span>
                      <span className="tabular-nums text-muted-foreground">{item.price * qty} ₽</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="space-y-2 mb-5 pt-5 border-t border-border">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Доставка</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDelivery("pickup")}
                  className={`p-3 rounded-xl text-sm transition ${delivery === "pickup" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent/30"}`}
                >
                  Самовывоз
                </button>
                <button
                  onClick={() => setDelivery("table")}
                  className={`p-3 rounded-xl text-sm transition ${delivery === "table" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent/30"}`}
                >
                  К месту
                </button>
              </div>
              {delivery === "table" && (
                <input
                  type="number"
                  min={1}
                  max={15}
                  placeholder="№ места"
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  className="mt-2 w-full px-3 py-2 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              )}
            </div>

            <div className="flex justify-between items-baseline mb-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Итого</span>
              <span className="font-display text-2xl font-semibold tabular-nums">{total} ₽</span>
            </div>
            <Button className="w-full" disabled={total === 0} onClick={order}>
              Оплатить
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cafe;
