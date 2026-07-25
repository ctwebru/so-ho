import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  Plus, Trash2, Check, Crown, X, Sparkles, QrCode,
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
  MAX_FAMILY_MEMBERS, RELATION_LABEL, FamilyRelation,
  priceForPosition, totalFamilyPrice,
} from "@/data/clubMembership";

const relationOptions: FamilyRelation[] = ["spouse", "child", "parent", "friend"];

const MEMBER_PRIVILEGES = [
  { icon: Ticket, label: "Бесплатный вход", desc: "Доступ ко всем регулярным клубным событиям — как у своих." },
  { icon: Star, label: "Привилегированные мероприятия", desc: "Особые условия участия в спецсобытиях и мастер-классах." },
  { icon: Coffee, label: "Клубное вознаграждение", desc: "Двойной кешбэк в кофейне So-Ho — чем больше в клубе, тем больше пользы." },
  { icon: CalendarClock, label: "Ранний доступ", desc: "Первыми регистрируетесь на мероприятия с ограниченным количеством мест." },
  { icon: Trophy, label: "Клубные турниры", desc: "Участие в турнирах на привилегированных условиях." },
  { icon: UserPlus, label: "Гость при госте", desc: "Раз в месяц приглашаете одного гостя бесплатно." },
  { icon: Award, label: "Статус участника", desc: "Клубный рейтинг, достижения и сезонные награды." },
  { icon: Lock, label: "Закрытый клуб", desc: "Доступ к событиям и предложениям только для членов сообщества." },
];

const ClubPage = () => {
  const {
    family, clubMembership, activateClub, cancelClub, addFamilyMember, removeFamilyMember,
  } = useAppState();

  const [addOpen, setAddOpen] = useState(false);
  const [qrMember, setQrMember] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", relation: "spouse" as FamilyRelation, birthYear: "",
  });

  const total = totalFamilyPrice(family);
  const canAdd = family.length < MAX_FAMILY_MEMBERS;
  const nextPrice = canAdd ? priceForPosition(family.length) : 0;
  const activeMember = family.find((m) => m.id === qrMember);

  const submit = () => {
    if (!form.name.trim()) return toast.error("Введите имя");
    addFamilyMember({
      name: form.name.trim(),
      phone: form.phone.trim() || undefined,
      relation: form.relation,
      birthYear: form.birthYear ? Number(form.birthYear) : undefined,
    });
    toast.success(`${form.name} добавлен в семью`, { description: `Ежемесячно +${nextPrice} ₽` });
    setForm({ name: "", phone: "", relation: "spouse", birthYear: "" });
    setAddOpen(false);
  };

  const activate = () => {
    activateClub();
    toast.success("Соседский клуб активирован", { description: "Мок-оплата прошла успешно" });
  };

  const owner = family[0];

  return (
    <div className="space-y-8">
      {/* HERO — статус клубной карты */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-forest text-primary-foreground p-8 md:p-10 shadow-deep">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-highlight/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-xs uppercase tracking-widest mb-4">
              <Crown className="w-3 h-3" /> Соседский клуб
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-3">
              {clubMembership.active ? "Ваш клуб активен" : "Клубная карта Соседи"}
            </h1>
            <p className="text-primary-foreground/80 mb-6">
              Один аккаунт, до {MAX_FAMILY_MEMBERS} персональных карт. Все регулярные события включены.
            </p>

            <div className="flex flex-wrap items-end gap-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-1">В семье</div>
                <div className="font-display text-3xl font-semibold">{family.length} чел.</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-1">Итого в месяц</div>
                <div className="font-display text-3xl font-semibold">{total.toLocaleString("ru")} ₽</div>
              </div>
              {clubMembership.active && clubMembership.nextBilling && (
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-1">След. списание</div>
                  <div className="font-display text-3xl font-semibold">
                    {new Date(clubMembership.nextBilling).toLocaleDateString("ru", { day: "2-digit", month: "long" })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            {clubMembership.active && owner && (
              <div className="bg-white rounded-2xl p-3 shadow-lg mb-1">
                <QRCodeSVG
                  value={JSON.stringify({ club: "soho", id: owner.id, name: owner.name, phone: owner.phone ?? null })}
                  size={140}
                  bgColor="transparent"
                  fgColor="#0a0a0a"
                  level="M"
                />
              </div>
            )}
            {!clubMembership.active ? (
              <Button variant="hero" size="lg" onClick={activate}>
                <Sparkles className="w-4 h-4 mr-2" /> Оплатить {total.toLocaleString("ru")} ₽
              </Button>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-highlight text-highlight-foreground text-xs font-medium">
                  <Check className="w-3.5 h-3.5" /> Подписка активна
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-transparent border-primary-foreground/30 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground">
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
      </div>

      {/* Моя семья */}
      <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="mb-5">
          <h2 className="font-display text-2xl font-semibold mb-1">Моя семья</h2>
          <p className="text-sm text-muted-foreground">Добавьте близких — каждый следующий дешевле. QR-код каждого члена — для входа в клуб.</p>
        </div>

        <div className="space-y-2">
          {family.map((m, i) => {
            const isOwner = m.relation === "owner";
            return (
              <div key={m.id} className="flex items-center justify-between rounded-2xl bg-secondary/40 p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm flex items-center gap-1.5">
                      <span className="truncate">{m.name}</span>
                      {isOwner && <Crown className="w-3 h-3 text-highlight shrink-0" />}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {RELATION_LABEL[m.relation]}{m.phone && " · свой ЛК"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setQrMember(m.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                    aria-label={`QR-код ${m.name}`}
                  >
                    <QrCode className="w-3.5 h-3.5" /> QR
                  </button>
                  <div className="font-display text-sm font-semibold px-2 tabular-nums">{m.monthlyPrice} ₽</div>
                  {!isOwner && (
                    <button
                      onClick={() => { removeFamilyMember(m.id); toast(`${m.name} удалён из семьи`); }}
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
              <Plus className="w-4 h-4" /> Добавить · {nextPrice} ₽
            </button>
          )}
        </div>
      </div>

      {/* Привилегии */}
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

      {/* QR-модалка */}
      <Dialog open={!!qrMember} onOpenChange={(o) => !o && setQrMember(null)}>
        <DialogContent className="max-w-sm">
          {activeMember && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {activeMember.name}
                  {activeMember.relation === "owner" && <Crown className="w-4 h-4 text-highlight" />}
                </DialogTitle>
                <DialogDescription>
                  {RELATION_LABEL[activeMember.relation]} · пропуск в клуб
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center py-4">
                <div className="p-4 bg-background rounded-2xl border border-border">
                  <QRCodeSVG
                    value={JSON.stringify({ club: "soho", id: activeMember.id, name: activeMember.name, phone: activeMember.phone ?? null })}
                    size={220}
                    bgColor="transparent"
                    fgColor="hsl(var(--primary))"
                    level="M"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4 max-w-[26ch]">
                  Покажите код на входе — хост считает его сканером
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
