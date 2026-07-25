import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  Plus, Trash2, Check, Crown, Phone, X, Sparkles, Apple, Wallet, QrCode, RotateCw,
  Ticket, Star, Coffee, CalendarClock, Trophy, UserPlus, Award, Lock,
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

const MEMBER_PRIVILEGES = [
  {
    icon: Ticket,
    label: "Бесплатный вход",
    desc: "Доступ ко всем регулярным клубным событиям — как у своих.",
  },
  {
    icon: Star,
    label: "Привилегированные мероприятия",
    desc: "Особые условия участия в спецсобытиях и мастер-классах.",
  },
  {
    icon: Coffee,
    label: "Клубное вознаграждение",
    desc: "Двойной кешбэк в кофейне So-Ho — чем больше в клубе, тем больше пользы.",
  },
  {
    icon: CalendarClock,
    label: "Ранний доступ",
    desc: "Первыми регистрируетесь на мероприятия с ограниченным количеством мест.",
  },
  {
    icon: Trophy,
    label: "Клубные турниры",
    desc: "Участие в турнирах на привилегированных условиях.",
  },
  {
    icon: UserPlus,
    label: "Гость при госте",
    desc: "Раз в месяц приглашаете одного гостя бесплатно.",
  },
  {
    icon: Award,
    label: "Статус участника",
    desc: "Клубный рейтинг, достижения и сезонные награды.",
  },
  {
    icon: Lock,
    label: "Закрытый клуб",
    desc: "Доступ к событиям и предложениям только для членов сообщества.",
  },
];

const ClubPage = () => {
  const {
    family, clubMembership, activateClub, cancelClub, addFamilyMember, removeFamilyMember, user,
  } = useAppState();

  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", relation: "spouse" as FamilyRelation, birthYear: "",
  });
  const [flipped, setFlipped] = useState<string | null>(null);

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
      {/* HERO — статус членства */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-forest text-primary-foreground p-8 md:p-10 shadow-deep">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-highlight/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-xs uppercase tracking-widest mb-4">
            <Crown className="w-3 h-3" /> Соседский клуб · членство семьи
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-3">
            {clubMembership.active ? "Ваш клуб активен" : "Статус члена сообщества"}
          </h1>
          <p className="text-primary-foreground/80">
            Один аккаунт, до {MAX_FAMILY_MEMBERS} персональных карт. Все регулярные события включены.
          </p>
        </div>
      </div>

      {/* Конструктор членства: добавление + оплата в одном месте */}
      <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="mb-5">
          <h2 className="font-display text-2xl font-semibold mb-1">Составьте членство семьи</h2>
          <p className="text-sm text-muted-foreground">Добавьте членов и оплатите сразу. Каждый следующий — дешевле.</p>
        </div>

        {/* Список членов */}
        <div className="space-y-2 mb-4">
          {family.map((m, i) => {
            const isOwner = m.relation === "owner";
            return (
              <div key={m.id} className="flex items-center justify-between rounded-2xl bg-secondary/40 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm flex items-center gap-1.5">
                      {m.name}
                      {isOwner && <Crown className="w-3 h-3 text-highlight" />}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {RELATION_LABEL[m.relation]}{m.phone && " · свой ЛК"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-display text-sm font-semibold">{m.monthlyPrice} ₽/мес</div>
                  {!isOwner && (
                    <button
                      onClick={() => {
                        removeFamilyMember(m.id);
                        toast(`${m.name} удалён из семьи`);
                      }}
                      className="text-muted-foreground hover:text-destructive p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                      aria-label="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {canAdd && (
            <button
              onClick={() => setAddOpen(true)}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="w-4 h-4" /> Добавить члена семьи · {nextPrice} ₽
            </button>
          )}
        </div>

        {/* Итог + CTA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl bg-primary/5 p-4 border border-primary/10">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Итого в месяц</div>
            <div className="text-3xl font-display font-bold text-primary">{total.toLocaleString("ru")} ₽</div>
            <div className="text-xs text-muted-foreground">{family.length} чел.</div>
          </div>

          {!clubMembership.active ? (
            <Button variant="hero" size="lg" onClick={activate}>
              <Sparkles className="w-4 h-4 mr-2" /> Оплатить {total.toLocaleString("ru")} ₽
            </Button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-highlight text-highlight-foreground text-xs font-medium">
                <Check className="w-3.5 h-3.5" /> Списание {new Date(clubMembership.nextBilling!).toLocaleDateString("ru", { day: "2-digit", month: "long" })}
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-muted-foreground hover:text-destructive hover:border-destructive/30">
                    Отменить
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
            </div>
          )}
        </div>
      </div>

      {/* Акцентные привилегии — компактно */}
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-4 h-4 text-accent" />
          <h2 className="font-display text-lg font-semibold">Привилегии члена</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {MEMBER_PRIVILEGES.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-start gap-3 rounded-xl bg-secondary/30 p-3 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <p.icon className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-medium leading-tight">{p.label}</div>
                <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{p.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Виртуальные карты семьи */}
      <div>
        <div className="mb-4">
          <h2 className="font-display text-2xl font-semibold">Виртуальные карты</h2>
          <p className="text-sm text-muted-foreground">Персональная карта для каждого — как аватар клуба</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 [perspective:1600px]">
          {family.map((m, i) => {
            const isOwner = m.relation === "owner";
            const isFlipped = flipped === m.id;
            const qrPayload = JSON.stringify({ club: "soho", id: m.id, name: m.name, phone: m.phone ?? null });
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-[1.6/1]"
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {/* Лицевая сторона */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-soft [backface-visibility:hidden]">
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
                        <button
                          onClick={() => setFlipped(m.id)}
                          className="flex flex-col items-center gap-1 p-2 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                          aria-label="Показать QR"
                        >
                          <QrCode className="w-5 h-5" />
                          <span className="text-[9px] uppercase tracking-widest">Вход</span>
                        </button>
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
                          <div className="flex items-center gap-1">
                            <span className="font-display text-sm font-semibold opacity-80">{m.monthlyPrice} ₽</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Обратная сторона — QR */}
                  <div
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-soft bg-primary-foreground text-primary flex items-center justify-between p-5 [backface-visibility:hidden]"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <div className="flex-1 pr-4">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Пропуск в клуб</div>
                      <div className="font-display text-lg font-semibold mt-1 leading-tight">{m.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {RELATION_LABEL[m.relation]}
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground max-w-[18ch]">
                        Покажите код на входе — хост считает его сканером
                      </div>
                      <button
                        onClick={() => setFlipped(null)}
                        className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-accent hover:underline"
                      >
                        <RotateCw className="w-3 h-3" /> Назад
                      </button>
                    </div>
                    <div className="p-2 bg-background rounded-xl shrink-0">
                      <QRCodeSVG
                        value={qrPayload}
                        size={112}
                        bgColor="transparent"
                        fgColor="hsl(var(--primary))"
                        level="M"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
