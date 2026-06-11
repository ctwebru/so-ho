import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, ShoppingBag, Utensils, Minus, Plus } from "lucide-react";
import { useAppState, OrderDetails, OrderMode, PaymentMethod } from "@/state/AppState";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  cartSummary: string;
  total: number;
  onConfirm: (orderId: string) => void;
};

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

const CheckoutDialog = ({ open, onOpenChange, cartSummary, total, onConfirm }: Props) => {
  const { authPhone, addOrder } = useAppState();
  const [name, setName] = useState("");
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
  const canSubmit = nameOk && phoneOk && timeOk;

  const submit = () => {
    if (!canSubmit) return;
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
    const id = addOrder(cartSummary, total, details);
    onConfirm(id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Оформление заказа</DialogTitle>
          <DialogDescription>
            {cartSummary} · <span className="font-medium text-foreground">{total} ₽</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">ФИО</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Иванов Иван" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Телефон</label>
              <Input
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Оплата на кассе</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPayment("card")}
                className={`p-3 rounded-xl text-sm flex items-center justify-center gap-2 transition ${
                  payment === "card" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent/30"
                }`}
              >
                <CreditCard className="w-4 h-4" /> Картой
              </button>
              <button
                type="button"
                onClick={() => setPayment("cash")}
                className={`p-3 rounded-xl text-sm flex items-center justify-center gap-2 transition ${
                  payment === "cash" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent/30"
                }`}
              >
                <Wallet className="w-4 h-4" /> Наличными
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Время</label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setWhenAsap(true)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  whenAsap ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent/30"
                }`}
              >
                Как можно скорее
              </button>
              <button
                type="button"
                onClick={() => setWhenAsap(false)}
                className={`px-4 py-2 rounded-full text-sm transition ${
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
                  className="w-32"
                />
              )}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Комментарий</label>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Без сахара, погорячее…"
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-secondary/50">
            <div className="flex items-center gap-2 text-sm">
              <Utensils className="w-4 h-4 text-muted-foreground" />
              <span>Приборы</span>
              <span className="text-xs text-muted-foreground">{cutlery === 0 ? "не нужны" : `на ${cutlery} перс.`}</span>
            </div>
            <div className="flex items-center gap-2 bg-background rounded-full px-1 py-1">
              <button
                type="button"
                onClick={() => setCutlery((n) => Math.max(0, n - 1))}
                className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center font-medium tabular-nums">{cutlery}</span>
              <button
                type="button"
                onClick={() => setCutlery((n) => Math.min(10, n + 1))}
                className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition"
              >
                <Plus className="w-3 h-3" />
              </button>
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

          {/* Упаковка — намеренно невзрачно, по умолчанию "с собой" */}
          <div className="pt-3 border-t border-border/50">
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

        <Button className="w-full mt-2" size="lg" disabled={!canSubmit} onClick={submit}>
          Подтвердить заказ · {total} ₽
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
