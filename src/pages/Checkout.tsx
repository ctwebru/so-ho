import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet, ShoppingBag, Utensils, Minus, Plus, Coffee, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MENU } from "@/data/mock";
import { useAppState, OrderDetails, OrderMode, PaymentMethod } from "@/state/AppState";

const CART_KEY = "soho_cart_v1";

const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  const d = digits.startsWith("7") ? digits.slice(1) : digits;
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 8);
  const p4 = d.slice(8, 10);
  let out = "+7";
  if (p1) out += ` (${p1}`;
  if (p1.length === 3) out += ")";
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, authPhone, addOrder, user } = useAppState();

  const [cart, setCart] = useState<Record<string, number>>(() => {
    try { return JSON.parse(sessionStorage.getItem(CART_KEY) || "{}"); } catch { return {}; }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/checkout", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const m = MENU.find((x) => x.id === id);
          return m ? { ...m, qty } : null;
        })
        .filter(Boolean) as Array<{ id: string; name: string; price: number; qty: number }>,
    [cart]
  );

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const inc = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id: string) =>
    setCart((c) => {
      const n = (c[id] || 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(authPhone ? formatPhone(authPhone) : "");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [mode, setMode] = useState<OrderMode>("takeaway");
  const [whenAsap, setWhenAsap] = useState(true);
  const [whenTime, setWhenTime] = useState("");
  const [comment, setComment] = useState("");
  const [cutlery, setCutlery] = useState(0);
  const [napkins, setNapkins] = useState(false);

  const nameOk = name.trim().length >= 2;
  const phoneOk = phone.replace(/\D/g, "").length === 11;
  const timeOk = whenAsap || /^\d{1,2}:\d{2}$/.test(whenTime);
  const hasItems = items.length > 0;
  const canSubmit = nameOk && phoneOk && timeOk && hasItems;

  const submit = () => {
    if (!canSubmit) return;
    const summary = items.map((i) => `${i.name} ×${i.qty}`).join(", ");
    const details: OrderDetails = {
      name: name.trim(),
      phone,
      payment,
      mode,
      whenAsap,
      whenTime: whenAsap ? undefined : whenTime,
      comment: comment.trim() || undefined,
      cutlery,
      napkins,
    };
    const id = addOrder(summary, total, details);
    setCart({});
    toast.success("Заказ принят", { description: `№ ${id} · ${total} ₽` });
    navigate(`/app/orders/${id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative border-b border-border bg-gradient-to-b from-secondary/40 to-background">
          <div className="container mx-auto px-6 py-14 md:py-20">
            <Link
              to="/app/cafe"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Вернуться в меню
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] uppercase tracking-[0.25em] mb-5">
              <Coffee className="w-3 h-3" /> Оформление заказа
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight max-w-3xl">
              Ещё пара деталей —<br />
              <span className="text-muted-foreground">и кофе уже варится.</span>
            </h1>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[1fr_420px] gap-10">
          {/* Form */}
          <div className="space-y-10">
            {/* Контакты */}
            <div>
              <h2 className="font-display text-2xl mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-accent" /> Контакты
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">ФИО</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Иванов Иван" className="h-12 rounded-2xl" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Телефон</label>
                  <Input
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="+7 (___) ___-__-__"
                    className="h-12 rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Оплата */}
            <div>
              <h2 className="font-display text-2xl mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-accent" /> Оплата на кассе
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPayment("card")}
                  className={`p-5 rounded-2xl border text-left transition ${
                    payment === "card"
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-card hover:border-accent/40"
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-3" />
                  <div className="font-display text-lg">Картой</div>
                  <div className={`text-xs ${payment === "card" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    Терминал на стойке
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPayment("cash")}
                  className={`p-5 rounded-2xl border text-left transition ${
                    payment === "cash"
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-card hover:border-accent/40"
                  }`}
                >
                  <Wallet className="w-5 h-5 mb-3" />
                  <div className="font-display text-lg">Наличными</div>
                  <div className={`text-xs ${payment === "cash" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    Сдача найдётся
                  </div>
                </button>
              </div>
            </div>

            {/* Время */}
            <div>
              <h2 className="font-display text-2xl mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-accent" /> Когда забрать
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setWhenAsap(true)}
                  className={`px-5 py-3 rounded-full text-sm transition ${
                    whenAsap ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent/30"
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2 -mt-0.5" />
                  Как можно скорее
                </button>
                <button
                  type="button"
                  onClick={() => setWhenAsap(false)}
                  className={`px-5 py-3 rounded-full text-sm transition ${
                    !whenAsap ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent/30"
                  }`}
                >
                  Ко времени
                </button>
                {!whenAsap && (
                  <Input
                    type="time"
                    value={whenTime}
                    onChange={(e) => setWhenTime(e.target.value)}
                    className="w-36 h-12 rounded-2xl"
                  />
                )}
              </div>
            </div>

            {/* Комментарий + приборы */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Комментарий
                </label>
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Без сахара, погорячее…"
                  className="h-12 rounded-2xl"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block flex items-center gap-2">
                  <Utensils className="w-3 h-3" /> Приборы
                </label>
                <div className="h-12 rounded-2xl bg-card border border-border flex items-center justify-between px-3">
                  <span className="text-sm text-muted-foreground">
                    {cutlery === 0 ? "не нужны" : `на ${cutlery} перс.`}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCutlery((n) => Math.max(0, n - 1))}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-medium tabular-nums">{cutlery}</span>
                    <button
                      type="button"
                      onClick={() => setCutlery((n) => Math.min(10, n + 1))}
                      className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={napkins}
                onChange={(e) => setNapkins(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              Добавить салфетки
            </label>

            {/* Упаковка — намеренно невзрачно */}
            <div className="pt-6 border-t border-border/60">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Упаковка:</span>
                <button
                  type="button"
                  onClick={() => setMode("takeaway")}
                  className={`px-2 py-0.5 rounded transition ${
                    mode === "takeaway" ? "text-foreground underline underline-offset-4" : "hover:text-foreground"
                  }`}
                >
                  с собой
                </button>
                <span className="opacity-40">·</span>
                <button
                  type="button"
                  onClick={() => setMode("dinein")}
                  className={`px-2 py-0.5 rounded transition ${
                    mode === "dinein" ? "text-foreground underline underline-offset-4" : "hover:text-foreground"
                  }`}
                >
                  в зале
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-3xl bg-card border border-border p-7 shadow-soft">
              <h3 className="font-display text-xl mb-5 flex items-center gap-2">
                <Coffee className="w-5 h-5" /> Ваш заказ
              </h3>

              {!hasItems ? (
                <div className="py-10 text-center">
                  <p className="text-sm text-muted-foreground mb-4">Корзина пуста</p>
                  <Button variant="outline" onClick={() => navigate("/app/cafe")}>
                    Перейти в меню
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {items.map((i) => (
                      <div key={i.id} className="flex items-center gap-3 text-sm">
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{i.name}</div>
                          <div className="text-xs text-muted-foreground tabular-nums">
                            {i.price} ₽ × {i.qty}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-secondary rounded-full px-1 py-1">
                          <button
                            onClick={() => dec(i.id)}
                            className="w-6 h-6 rounded-full bg-background flex items-center justify-center hover:bg-muted transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-medium tabular-nums">{i.qty}</span>
                          <button
                            onClick={() => inc(i.id)}
                            className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="w-16 text-right font-display tabular-nums">{i.price * i.qty} ₽</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-baseline pt-5 border-t border-border mb-5">
                    <span className="text-sm text-muted-foreground">Итого</span>
                    <span className="font-display text-3xl font-semibold tabular-nums">{total} ₽</span>
                  </div>

                  <Button className="w-full h-14 text-base" disabled={!canSubmit} onClick={submit}>
                    Подтвердить заказ
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
                    Оплата на кассе при получении. Мы предупредим, когда заказ будет готов.
                  </p>
                </>
              )}
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
