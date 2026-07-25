import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Plus, Trash2, Check, Crown, Phone, X, Sparkles, Apple, Wallet, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useAppState } from "@/state/AppState";
import {
  FAMILY_TIER_PRICES, MAX_FAMILY_MEMBERS, RELATION_LABEL, FamilyRelation,
  priceForPosition, totalFamilyPrice,
} from "@/data/clubMembership";

const relationOptions: FamilyRelation[] = ["spouse", "child", "parent", "friend"];

const ClubPage = () => {
  const {
    family, clubMembership, activateClub, cancelClub, addFamilyMember, removeFamilyMember, user,
  } = useAppState();

  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", relation: "spouse" as FamilyRelation, birthYear: "",
  });

  const total = totalFamilyPrice(family);
  const canAdd = family.length < MAX_FAMILY_MEMBERS;
  const nextPrice = canAdd ? priceForPosition(family.length) : 0;

  const submit = () => {
    if (!form.name.trim()) return toast.error("Введите имя");
    addFamilyMember({
      name: form.name.trim(),
      phone: form.phone.trim() || undefined,
      relation: form.relation,
      birthYear: form.birthYear ? Number(form.birthYear) : undefined,
    });
    toast.success(`${form.name} добавлен в семью`, {
      description: `Ежемесячно +${nextPrice} ₽`,
    });
    setForm({ name: "", phone: "", relation: "spouse", birthYear: "" });
    setAddOpen(false);
  };

  const activate = () => {
    activateClub();
    toast.success("Соседский клуб активирован", { description: "Мок-оплата прошла успешно" });
  };

  return (
    <div className="space-y-8">
      {/* HERO — статус подписки */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-forest text-primary-foreground p-8 md:p-10 shadow-deep">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-highlight/20 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-xs uppercase tracking-widest mb-4">
              <Users className="w-3 h-3" /> Соседский клуб · семейная подписка
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-3">
              {clubMembership.active ? "Ваш клуб активен" : "Впустите в клуб всю семью"}
            </h1>
            <p className="text-primary-foreground/80 max-w-lg">
              Один аккаунт, до {MAX_FAMILY_MEMBERS} персональных карт. Первая — {FAMILY_TIER_PRICES[0]} ₽,
              каждая следующая дешевле. Бесплатный вход на все клубные события.
            </p>
          </div>
          <div className="shrink-0">
            <div className="text-5xl font-display font-bold">{total.toLocaleString("ru")} ₽</div>
            <div className="text-sm text-primary-foreground/70 text-right">в месяц · {family.length} чел.</div>
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap gap-3">
          {!clubMembership.active ? (
            <Button variant="hero" size="lg" onClick={activate}>
              <Sparkles className="w-4 h-4 mr-2" /> Оплатить {total.toLocaleString("ru")} ₽
            </Button>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight text-highlight-foreground text-sm font-medium">
                <Check className="w-4 h-4" /> Следующее списание {new Date(clubMembership.nextBilling!).toLocaleDateString("ru", { day: "2-digit", month: "long" })}
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Отменить подписку
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Отменить клубную подписку?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Карты семьи перестанут действовать после {new Date(clubMembership.nextBilling!).toLocaleDateString("ru")}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Оставить</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { cancelClub(); toast("Подписка отменена"); }}>
                      Отменить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      {/* Тарифная сетка */}
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <h2 className="font-display text-xl font-semibold">Как считается цена</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {FAMILY_TIER_PRICES.map((price, i) => {
            const isCurrent = i < family.length;
            const isNext = i === family.length;
            return (
              <div
                key={i}
                className={`rounded-2xl p-3 text-center transition-all ${
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : isNext
                    ? "bg-highlight/20 border-2 border-highlight"
                    : "bg-secondary/50 text-muted-foreground"
                }`}
              >
                <div className="text-[10px] uppercase tracking-widest opacity-70">{i + 1}-й член</div>
                <div className="font-display text-lg font-bold">{price} ₽</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Карты семьи */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-2xl font-semibold">Виртуальные карты</h2>
            <p className="text-sm text-muted-foreground">Персональная карта для каждого — как аватар клуба</p>
          </div>
          {canAdd && (
            <Button onClick={() => setAddOpen(true)} variant="default">
              <Plus className="w-4 h-4 mr-2" /> Добавить · {nextPrice} ₽
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {family.map((m, i) => {
            const isOwner = m.relation === "owner";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-[1.6/1] rounded-3xl overflow-hidden shadow-soft"
              >
                {/* Обложка карты */}
                <div className="absolute inset-0 bg-gradient-forest" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: "radial-gradient(circle at 20% 20%, hsl(var(--highlight) / .6), transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--accent) / .5), transparent 50%)",
                }} />

                <div className="relative h-full p-5 flex flex-col justify-between text-primary-foreground">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest opacity-70">SO-HO! Club</div>
                      <div className="font-display text-xl font-semibold mt-1">{m.name}</div>
                      <div className="text-xs opacity-80 mt-0.5 inline-flex items-center gap-1">
                        {isOwner && <Crown className="w-3 h-3" />}
                        {RELATION_LABEL[m.relation]}
                        {m.birthYear && ` · ${new Date().getFullYear() - m.birthYear} лет`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-widest opacity-70">Тариф</div>
                      <div className="font-display text-lg font-bold">{m.monthlyPrice} ₽</div>
                    </div>
                  </div>

                  <div>
                    {m.phone ? (
                      <div className="inline-flex items-center gap-2 text-xs bg-primary-foreground/10 backdrop-blur px-2.5 py-1 rounded-full">
                        <Phone className="w-3 h-3" /> {m.phone}
                        <span className="opacity-60">·</span>
                        <span className="opacity-80">свой ЛК</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 text-xs bg-primary-foreground/10 backdrop-blur px-2.5 py-1 rounded-full opacity-70">
                        Гостевая карта (без ЛК)
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2 opacity-70">
                        <button disabled className="text-[10px] uppercase tracking-widest inline-flex items-center gap-1 cursor-not-allowed">
                          <Apple className="w-3 h-3" /> Apple Wallet
                        </button>
                        <button disabled className="text-[10px] uppercase tracking-widest inline-flex items-center gap-1 cursor-not-allowed">
                          <Wallet className="w-3 h-3" /> Google
                        </button>
                      </div>
                      {!isOwner && (
                        <button
                          onClick={() => {
                            removeFamilyMember(m.id);
                            toast(`${m.name} удалён из семьи`);
                          }}
                          className="text-primary-foreground/70 hover:text-primary-foreground p-1 rounded-full hover:bg-primary-foreground/10"
                          aria-label="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {canAdd && (
            <button
              onClick={() => setAddOpen(true)}
              className="aspect-[1.6/1] rounded-3xl border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Plus className="w-6 h-6" />
              <div className="font-medium">Добавить члена семьи</div>
              <div className="text-xs">Следующий — {nextPrice} ₽ / мес</div>
            </button>
          )}
        </div>
      </div>

      {/* Модалка добавления */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить в семью</DialogTitle>
            <DialogDescription>
              Если укажете телефон — человек получит свой личный кабинет. Без телефона — гостевая карта на входе.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label>Имя</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иван" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Кто это</Label>
                <Select value={form.relation} onValueChange={(v: FamilyRelation) => setForm({ ...form, relation: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {relationOptions.map((r) => (
                      <SelectItem key={r} value={r}>{RELATION_LABEL[r]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Год рождения</Label>
                <Input type="number" value={form.birthYear} onChange={(e) => setForm({ ...form, birthYear: e.target.value })} placeholder="2015" />
              </div>
            </div>
            <div>
              <Label>Телефон <span className="text-muted-foreground font-normal">— необязательно</span></Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
              <p className="text-xs text-muted-foreground mt-1">
                {form.phone ? "Получит доступ в личный кабинет по своему номеру" : "Будет виртуальная карта под вашим аккаунтом"}
              </p>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ежемесячно добавится</span>
              <span className="font-display text-2xl font-bold">+{nextPrice} ₽</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}><X className="w-4 h-4 mr-1" /> Отмена</Button>
            <Button onClick={submit}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClubPage;
