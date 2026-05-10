import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Plus, X, Check, ChevronDown, Coffee as CoffeeIcon, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CATEGORIES, CategoryId, DRINKS, Drink, FOR_YOU_IDS, Addon, PROMO_VIDEO } from "@/data/coffee";
import { useAppState } from "@/state/AppState";

// ---------- Reusable VideoBg ----------
function VideoBg({
  src,
  poster,
  className = "",
  overlay = "from-black/40 via-black/20 to-black/60",
  parallax = 0,
}: {
  src: string;
  poster?: string;
  className?: string;
  overlay?: string;
  parallax?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [src]);
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{ y: parallax }}
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
    </div>
  );
}

// ---------- MOBILE Hero (locked) ----------
function CoffeeHeroMobile({ scrollY }: { scrollY: number }) {
  const y = Math.min(scrollY * 0.35, 240);
  const opacity = Math.max(1 - scrollY / 400, 0);
  return (
    <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden rounded-3xl">
      <div className="absolute inset-0" style={{ transform: `translateY(${y}px) scale(1.1)` }}>
        <VideoBg src={PROMO_VIDEO} overlay="from-black/40 via-black/10 to-black/80" />
      </div>
      <div style={{ opacity }} className="relative h-full flex flex-col justify-end p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
            <CoffeeIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display text-base leading-none">SO-HO! Кофейня</div>
            <div className="text-xs opacity-70 mt-1">открыто с 7:00 до 23:00</div>
          </div>
        </div>
        <h1 className="font-display text-6xl leading-[0.9] tracking-tight">
          Проснись<br/><span className="italic font-light opacity-80">со мной</span>
        </h1>
        <p className="mt-4 text-sm opacity-80 max-w-md">Не товар — эмоция. Кофе как ритуал.</p>
      </div>
    </section>
  );
}

// ---------- DESKTOP Hero — full-bleed, multi-layer parallax ----------
function CoffeeHeroDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.35]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.85]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const wordMX = useTransform(sx, (v) => v * -40);
  const titleMX = useTransform(sx, (v) => v * 20);
  const titleMY = useTransform(sy, (v) => v * 14);
  const sideMX = useTransform(sx, (v) => v * -30);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-screen overflow-hidden -mt-4"
    >
      {/* video */}
      <motion.div style={{ y: videoY, scale: videoScale }} className="absolute inset-0">
        <VideoBg src={PROMO_VIDEO} overlay="from-black/30 via-black/10 to-black/80" />
      </motion.div>
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent pointer-events-none"
      />

      {/* outline wordmark */}
      <motion.div
        aria-hidden
        style={{ y: wordY, scale: wordScale, x: wordMX }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-display text-[22vw] leading-none tracking-tighter text-white/[0.06]">
          SO-HO!
        </span>
      </motion.div>

      {/* top bar */}
      <div className="relative z-20 flex items-start justify-between p-10 lg:p-14 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center">
            <CoffeeIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display text-base leading-none">SO-HO! Кофейня</div>
            <div className="text-xs opacity-70 mt-1 tracking-wider">открыто 7:00 — 23:00</div>
          </div>
        </div>
        <motion.div style={{ x: sideMX }} className="flex flex-col items-end gap-3">
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur text-[10px] uppercase tracking-[0.35em]">
            весенняя карта 2026
          </div>
          <div className="text-xs opacity-60 max-w-[220px] text-right leading-relaxed">
            Двигай курсором, листай вниз — каждый напиток живёт своим вайбом.
          </div>
        </motion.div>
      </div>

      {/* main title */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity, x: titleMX, translateY: titleMY }}
        className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white px-10 pointer-events-none"
      >
        <div className="text-xs uppercase tracking-[0.5em] opacity-70 mb-8">Coffee · Ritual · Mood</div>
        <h1 className="font-display text-[12vw] xl:text-[11rem] leading-[0.82] tracking-[-0.04em]">
          Проснись<br/><span className="italic font-light opacity-90">со мной</span>
        </h1>
        <p className="mt-10 text-base opacity-75 max-w-lg">
          Не товар — эмоция. Кофе как ритм города и состояние утра.
        </p>
      </motion.div>

      {/* bottom strip */}
      <motion.div
        style={{ y: subY }}
        className="absolute bottom-0 inset-x-0 z-20 px-10 lg:px-14 pb-10 text-white"
      >
        <div className="flex items-end justify-between gap-8">
          <div className="grid grid-cols-3 gap-10 text-xs uppercase tracking-[0.25em] opacity-80">
            <div>
              <div className="opacity-50 mb-1">01</div>
              <div>Зерно недели</div>
              <div className="font-display text-base normal-case tracking-normal mt-2 opacity-90">Руанда Мутетели</div>
            </div>
            <div>
              <div className="opacity-50 mb-1">02</div>
              <div>Бариста</div>
              <div className="font-display text-base normal-case tracking-normal mt-2 opacity-90">Артём · до 16:00</div>
            </div>
            <div>
              <div className="opacity-50 mb-1">03</div>
              <div>Сейчас в чашке</div>
              <div className="font-display text-base normal-case tracking-normal mt-2 opacity-90">бамбл с апельсином</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-70">
            <div className="text-[10px] uppercase tracking-[0.3em]">scroll</div>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CoffeeHero({ scrollY }: { scrollY: number }) {
  const isMobile = useIsMobile();
  if (isMobile) return <CoffeeHeroMobile scrollY={scrollY} />;
  return <CoffeeHeroDesktop />;
}

// ---------- Desktop full-bleed video interlude between sections ----------
function VideoInterlude({ title, sub }: { title: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.15, 1.05]);
  return (
    <div ref={ref} className="hidden md:block relative h-[70vh] my-16 overflow-hidden rounded-3xl">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <VideoBg src={PROMO_VIDEO} overlay="from-black/50 via-black/20 to-black/70" />
      </motion.div>
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-8">
        <div className="text-xs uppercase tracking-[0.4em] opacity-70 mb-4">SO-HO! Ритуал</div>
        <h3 className="font-display text-6xl lg:text-8xl tracking-tight italic font-light max-w-3xl">
          {title}
        </h3>
        <p className="mt-6 max-w-md opacity-80">{sub}</p>
      </div>
    </div>
  );
}

// ---------- Category Tabs ----------
function CategoryTabs({
  active,
  setActive,
}: {
  active: CategoryId;
  setActive: (c: CategoryId) => void;
}) {
  return (
    <div className="sticky top-0 z-30 -mx-4 px-4 py-3 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`shrink-0 font-display text-2xl md:text-3xl tracking-tight transition-all ${
              active === c.id
                ? "text-foreground scale-100"
                : "text-muted-foreground/50 scale-90 hover:text-muted-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- Drink Card (video tile) ----------
function DrinkCard({
  drink,
  onOpen,
  large = false,
}: {
  drink: Drink;
  onOpen: () => void;
  large?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.button
      ref={ref}
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`group relative overflow-hidden rounded-3xl text-left w-full ${
        large ? "h-[420px] md:h-[520px]" : "h-[300px] md:h-[360px]"
      }`}
      style={{ background: drink.accent }}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <VideoBg
          src={drink.video}
          overlay="from-transparent via-transparent to-black/80"
        />
      </motion.div>

      {drink.badge && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
          {drink.badge}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6 text-white">
        <h3 className={`font-display tracking-tight ${large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
          {drink.name}
        </h3>
        {drink.subtitle && (
          <p className="text-xs md:text-sm opacity-75 mt-1">{drink.subtitle}</p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-lg tabular-nums">{drink.price} ₽</span>
          <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition">
            <Plus className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ---------- Drink Detail (modal with video bg) ----------
function DrinkDetail({ drink, onClose }: { drink: Drink; onClose: () => void }) {
  const { addOrder } = useAppState();
  const [size, setSize] = useState(drink.defaultSize);
  const [milk, setMilk] = useState<string>(drink.milks[0]?.id ?? "");
  const [picked, setPicked] = useState<string[]>([]);
  const [openSheet, setOpenSheet] = useState<null | "milk" | "topping">(null);

  const sizeMul = size === "S" ? 0.85 : size === "L" ? 1.15 : 1;
  const milkPrice = drink.milks.find((m) => m.id === milk)?.price ?? 0;
  const toppingPrice = picked.reduce(
    (s, id) => s + (drink.toppings.find((t) => t.id === id)?.price ?? 0),
    0
  );
  const total = Math.round(drink.price * sizeMul + milkPrice + toppingPrice);

  const togglePick = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const order = () => {
    const milkName = drink.milks.find((m) => m.id === milk)?.name;
    const tops = picked.map((id) => drink.toppings.find((t) => t.id === id)?.name).filter(Boolean).join(", ");
    const desc = `${drink.name} (${size})${milkName && milkName !== "Без молока" ? `, ${milkName}` : ""}${tops ? `, ${tops}` : ""}`;
    addOrder(desc, total);
    toast.success("В корзине", { description: `${desc} · ${total} ₽` });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
    >
      <VideoBg src={drink.video} overlay="from-black/40 via-black/30 to-black/85" />

      <div className="relative h-full overflow-y-auto text-white">
        {/* Header */}
        <div className="flex items-start justify-between p-6 md:p-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-2xl md:text-3xl">{drink.name}</h2>
            {drink.subtitle && <p className="text-xs opacity-70 mt-1">{drink.subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center hover:bg-white/25"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-4 gap-2 md:gap-6 px-6 md:px-10 mb-6 text-center">
          {[
            { v: drink.macro.kcal, l: "ккал", suf: "" },
            { v: drink.macro.protein, l: "белки", suf: " г" },
            { v: drink.macro.fat, l: "жиры", suf: " г" },
            { v: drink.macro.carbs, l: "углеводы", suf: " г" },
          ].map((m) => (
            <div key={m.l}>
              <div className="font-display text-lg md:text-xl">
                {m.v}{m.suf}
              </div>
              <div className="text-[10px] md:text-xs opacity-60 mt-1">{m.l}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur text-sm">
            подробнее <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Big image area — video continues to play behind */}
        <div className="h-[28vh] md:h-[36vh]" />

        {/* Variants strip */}
        {drink.variants.length > 0 && (
          <div className="px-6 md:px-10 mb-4">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {drink.variants.map((v) => (
                <div
                  key={v.id}
                  className="shrink-0 w-28 h-28 rounded-2xl bg-white/10 backdrop-blur flex flex-col items-center justify-center text-center p-3"
                >
                  <Plus className="w-4 h-4 mb-1 opacity-60" />
                  <div className="text-xs leading-tight">{v.name}</div>
                  {v.price > 0 && <div className="text-[10px] opacity-60 mt-1">+{v.price} ₽</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customizers */}
        <div className="px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {drink.toppings.length > 0 && (
            <button
              onClick={() => setOpenSheet("topping")}
              className="aspect-square rounded-2xl bg-white/10 backdrop-blur flex flex-col items-center justify-center text-center p-3 hover:bg-white/15 transition"
            >
              <Plus className="w-5 h-5 mb-2 opacity-70" />
              <div className="text-xs">Посыпки</div>
              {picked.length > 0 && (
                <div className="text-[10px] opacity-70 mt-1">{picked.length} выбрано</div>
              )}
            </button>
          )}
          <button className="aspect-square rounded-2xl bg-white/10 backdrop-blur flex flex-col items-center justify-center text-center p-3 hover:bg-white/15">
            <Sparkles className="w-5 h-5 mb-2 opacity-70" />
            <div className="text-xs">Полезные<br/>добавки</div>
          </button>
          <button className="aspect-square rounded-2xl bg-white/10 backdrop-blur flex flex-col items-center justify-center text-center p-3 hover:bg-white/15">
            <Plus className="w-5 h-5 mb-2 opacity-70" />
            <div className="text-xs">Пенки<br/>и муссы</div>
          </button>
          {drink.milks.length > 1 && (
            <button
              onClick={() => setOpenSheet("milk")}
              className="aspect-square rounded-2xl bg-white/10 backdrop-blur flex flex-col items-center justify-center text-center p-3 hover:bg-white/15"
            >
              <div className="w-8 h-8 rounded-full bg-white/30 mb-2" />
              <div className="text-xs">{drink.milks.find((m) => m.id === milk)?.name.replace("Молоко ", "") ?? "Молоко"}</div>
            </button>
          )}
        </div>

        {/* Bottom safe space for sticky bar */}
        <div className="h-32" />

        {/* Sticky bottom CTA */}
        <div className="fixed bottom-4 inset-x-4 md:left-1/2 md:-translate-x-1/2 md:w-[640px] z-10">
          <div className="bg-black/60 backdrop-blur-2xl rounded-full p-2 flex items-center gap-2 shadow-2xl border border-white/10">
            {drink.sizes.length > 1 ? (
              <div className="flex items-center gap-1 px-2">
                {drink.sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    className={`relative w-12 h-12 rounded-full flex flex-col items-center justify-center transition ${
                      size === s.id ? "bg-white text-black" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span className="font-display text-sm leading-none">{s.id}</span>
                    {size === s.id && <span className="text-[8px] opacity-70 mt-0.5">{s.ml}мл</span>}
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 text-xs opacity-70">{drink.sizes[0].ml > 0 ? `${drink.sizes[0].ml} мл` : "набор"}</div>
            )}
            <button
              onClick={order}
              className="flex-1 h-12 rounded-full bg-[hsl(225_85%_60%)] hover:bg-[hsl(225_85%_55%)] text-white font-display flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="tabular-nums">{total} ₽</span>
            </button>
          </div>
        </div>

        {/* Bottom sheets */}
        <AnimatePresence>
          {openSheet === "milk" && (
            <BottomSheet onClose={() => setOpenSheet(null)} title="Молоко" macro={drink.macro}>
              <AddonGrid
                items={drink.milks}
                selected={[milk]}
                onPick={(id) => {
                  setMilk(id);
                  setOpenSheet(null);
                }}
                singleSelect
              />
            </BottomSheet>
          )}
          {openSheet === "topping" && (
            <BottomSheet onClose={() => setOpenSheet(null)} title="Посыпки" macro={drink.macro}>
              <AddonGrid items={drink.toppings} selected={picked} onPick={togglePick} />
            </BottomSheet>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function BottomSheet({
  children,
  onClose,
  title,
  macro,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  macro: Drink["macro"];
}) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 280 }}
      className="fixed inset-x-0 bottom-0 top-20 md:top-32 z-20 bg-black/70 backdrop-blur-2xl rounded-t-3xl border-t border-white/10 overflow-y-auto"
    >
      <div className="sticky top-0 bg-black/40 backdrop-blur p-4 flex items-center justify-between border-b border-white/10">
        <div>
          <div className="text-xs opacity-60">{title}</div>
          <div className="text-sm">
            {macro.kcal} ккал · {macro.protein} б · {macro.fat} ж · {macro.carbs} у
          </div>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

function AddonGrid({
  items,
  selected,
  onPick,
  singleSelect = false,
}: {
  items: Addon[];
  selected: string[];
  onPick: (id: string) => void;
  singleSelect?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((it) => {
        const isOn = selected.includes(it.id);
        return (
          <button
            key={it.id}
            onClick={() => onPick(it.id)}
            className={`relative aspect-[3/4] rounded-2xl p-4 flex flex-col items-center justify-end text-center transition ${
              isOn ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            <div className={`w-16 h-16 rounded-full mb-3 ${isOn ? "bg-black/10" : "bg-white/10"}`} />
            <div className="text-xs leading-tight font-medium">{it.name}</div>
            <div className="text-[10px] opacity-70 mt-1">
              {it.price > 0 ? `+${it.price} ₽` : "0 ₽"}
            </div>
            <div className="absolute bottom-3 right-3">
              {isOn ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4 opacity-50" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ---------- Page ----------
export default function CoffeeImmersive() {
  const [active, setActive] = useState<CategoryId>("you");
  const [open, setOpen] = useState<Drink | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = useMemo(() => {
    if (active === "you") return DRINKS.filter((d) => FOR_YOU_IDS.includes(d.id));
    return DRINKS.filter((d) => d.category === active);
  }, [active]);

  // group by sub-category
  const groups = useMemo(() => {
    const map = new Map<string, Drink[]>();
    visible.forEach((d) => {
      const arr = map.get(d.group) ?? [];
      arr.push(d);
      map.set(d.group, arr);
    });
    return Array.from(map.entries());
  }, [visible]);

  return (
    <div className="-m-4 md:-m-8 lg:-m-10">
      <div className="px-4 md:px-8 lg:px-10 pt-4">
        <CoffeeHero scrollY={scrollY} />
      </div>

      <div className="px-4 md:px-8 lg:px-10 mt-8">
        <CategoryTabs active={active} setActive={setActive} />

        {groups.map(([group, drinks], gi) => (
          <div key={group}>
            {gi > 0 && gi % 2 === 0 && (
              <VideoInterlude
                title={gi === 2 ? "Кофе — это пауза, которую ты заслужил" : "Каждая чашка — отдельный момент"}
                sub="Сваренный руками, поданный в ритме города."
              />
            )}
            <section className="mt-10">
              <h2 className="font-display text-3xl md:text-5xl mb-6 lowercase tracking-tight">{group}</h2>
              {/* Mobile: simple grid. Desktop: bento asymmetric layout. */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(280px,auto)]">
                {drinks.map((d, i) => {
                  // Bento pattern on desktop
                  const span = (() => {
                    if (gi === 0 && i === 0) return "md:col-span-4 md:row-span-2";
                    if (i % 5 === 0) return "md:col-span-3";
                    if (i % 5 === 1) return "md:col-span-3";
                    if (i % 5 === 2) return "md:col-span-2";
                    if (i % 5 === 3) return "md:col-span-2";
                    return "md:col-span-2";
                  })();
                  const isLarge = gi === 0 && i === 0;
                  return (
                    <div key={d.id} className={span}>
                      <DrinkCard drink={d} onOpen={() => setOpen(d)} large={isLarge} />
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        ))}

        <div className="h-20" />
      </div>

      <AnimatePresence>{open && <DrinkDetail drink={open} onClose={() => setOpen(null)} />}</AnimatePresence>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </div>
  );
}
