import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAppState } from "@/state/AppState";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ArrowLeft,
  Check,
  Clock,
  Coffee,
  CreditCard,
  Wallet,
  ShoppingBag,
  Utensils,
  Bell,
  PartyPopper,
} from "lucide-react";

const steps = ["Принят", "Готовится", "Готов", "Выдан"] as const;

const OrderStatusPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, requestPickup } = useAppState();
  const order = orders.find((o) => o.id === id);
  const [pulse, setPulse] = useState(0);

  // re-render every second for nicer timing
  useEffect(() => {
    const t = setInterval(() => setPulse((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const stepIndex = useMemo(() => {
    if (!order) return 0;
    return Math.max(0, steps.indexOf(order.status));
  }, [order, pulse]);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <p className="text-muted-foreground mb-4">Заказ не найден</p>
        <Button asChild variant="outline">
          <Link to="/app/cafe">В кофейню</Link>
        </Button>
      </div>
    );
  }

  const isReady = order.status === "Готов" || order.status === "Выдан";
  const isTakeaway = order.details?.mode !== "dinein";

  const onPickup = () => {
    requestPickup(order.id);
    toast.success("Бариста уведомлён", { description: "Скоро вынесут ко входу" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <button
        onClick={() => navigate("/app/cafe")}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="w-4 h-4" />
        В кофейню
      </button>

      <div className="rounded-3xl bg-card border border-border p-8 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Заказ № {order.id}</span>
          <span className="text-xs text-muted-foreground">{order.at}</span>
        </div>
        <h1 className="font-display text-3xl font-semibold mb-1">
          {order.status === "Принят" && "Принят"}
          {order.status === "Готовится" && "Готовится"}
          {order.status === "Готов" && "Готов!"}
          {order.status === "Выдан" && "Выдан"}
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          {order.status === "Принят" && "Передали бариста"}
          {order.status === "Готовится" && "Уже шумит кофемашина"}
          {order.status === "Готов" && "Заходи на стойку — мы тебя ждём"}
          {order.status === "Выдан" && "Спасибо, что заглянул"}
        </p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => {
            const active = i <= stepIndex;
            const current = i === stepIndex;
            return (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                    active ? "bg-primary" : "bg-secondary"
                  } ${current ? "animate-pulse" : ""}`}
                />
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-4 gap-2 text-[11px] text-center -mt-6">
          {steps.map((s, i) => (
            <span key={s} className={i <= stepIndex ? "text-foreground font-medium" : "text-muted-foreground"}>
              {s}
            </span>
          ))}
        </div>

        {/* Pickup CTA */}
        {isReady && isTakeaway && order.status !== "Выдан" && (
          <div className="mt-8 p-5 rounded-2xl bg-highlight/20 border border-highlight/40">
            <div className="flex items-start gap-3 mb-3">
              <PartyPopper className="w-5 h-5 text-highlight-foreground mt-0.5" />
              <div>
                <div className="font-display text-lg leading-tight">Заказ готов</div>
                <p className="text-sm text-muted-foreground">
                  Можешь спуститься сам или попросить вынести ко входу.
                </p>
              </div>
            </div>
            {order.pickupRequested ? (
              <div className="flex items-center gap-2 text-sm text-foreground bg-background/70 rounded-xl px-4 py-3">
                <Check className="w-4 h-4 text-accent" />
                Бариста уже несёт твой заказ ко входу
              </div>
            ) : (
              <Button onClick={onPickup} className="w-full" size="lg">
                <Bell className="w-4 h-4" /> Вынести ко входу
              </Button>
            )}
          </div>
        )}
        {isReady && !isTakeaway && (
          <div className="mt-8 p-5 rounded-2xl bg-accent/10 border border-accent/30 text-sm">
            <Check className="w-4 h-4 text-accent inline mr-2" />
            Готово — забери у стойки или подойдёт бариста
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="rounded-3xl bg-card border border-border p-6 shadow-soft">
        <h3 className="font-display text-lg mb-4 flex items-center gap-2">
          <Coffee className="w-4 h-4" /> Состав
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{order.items}</p>
        <div className="flex justify-between items-baseline pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Итого</span>
          <span className="font-display text-2xl font-semibold tabular-nums">{order.total} ₽</span>
        </div>

        {order.details && (
          <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
            <div className="flex items-center gap-2">
              {order.details.payment === "card" ? <CreditCard className="w-4 h-4 text-muted-foreground" /> : <Wallet className="w-4 h-4 text-muted-foreground" />}
              <span>{order.details.payment === "card" ? "Картой на кассе" : "Наличными на кассе"}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
              <span>{order.details.mode === "takeaway" ? "С собой" : "В зале"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{order.details.whenAsap ? "Как можно скорее" : `Ко времени ${order.details.whenTime}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-muted-foreground" />
              <span>{order.details.cutlery > 0 ? `Приборы · ${order.details.cutlery} перс.` : "Без приборов"}</span>
            </div>
            {order.details.comment && (
              <div className="sm:col-span-2 text-muted-foreground">
                «{order.details.comment}»
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusPage;
