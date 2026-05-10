// Mixkit free CDN videos used as ambient backgrounds.
// Each drink has a video that conveys vibe, not just the product.

export type Macro = { kcal: number; protein: number; fat: number; carbs: number };
export type Size = { id: "S" | "M" | "L"; ml: number };
export type Addon = { id: string; name: string; price: number; img?: string };
export type Drink = {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  category: CategoryId;
  group: string; // sub-category label
  video: string;
  poster?: string;
  accent: string; // soft hex tint behind the video for cohesive theming
  badge?: string;
  macro: Macro;
  sizes: Size[];
  defaultSize: "S" | "M" | "L";
  milks: Addon[];
  toppings: Addon[];
  variants: Addon[]; // related variants (горячая версия, со льдом и пр.)
};

export type CategoryId = "you" | "spring" | "coffee" | "nocoffee" | "combo";
export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "you", label: "для тебя" },
  { id: "spring", label: "весна 🌸" },
  { id: "coffee", label: "кофе" },
  { id: "nocoffee", label: "не кофе" },
  { id: "combo", label: "комбо" },
];

// Ambient mixkit videos — short, looping, food/drink mood
const V = {
  pour: "https://assets.mixkit.co/videos/4742/4742-720.mp4",
  iced: "https://assets.mixkit.co/videos/preview/mixkit-coffee-with-milk-being-served-43250-large.mp4",
  steam: "https://assets.mixkit.co/videos/preview/mixkit-coffee-cup-on-a-table-with-steam-coming-out-of-it-44805-large.mp4",
  beans: "https://assets.mixkit.co/videos/preview/mixkit-coffee-beans-falling-from-a-grinder-43395-large.mp4",
  latteart: "https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-milk-into-a-coffee-43249-large.mp4",
  orange: "https://assets.mixkit.co/videos/preview/mixkit-pouring-orange-juice-into-a-glass-with-ice-43254-large.mp4",
  matcha: "https://assets.mixkit.co/videos/preview/mixkit-pouring-green-tea-into-a-cup-43398-large.mp4",
  cream: "https://assets.mixkit.co/videos/preview/mixkit-pink-paint-being-mixed-44308-large.mp4",
};

const sizesStd: Size[] = [
  { id: "S", ml: 250 },
  { id: "M", ml: 350 },
  { id: "L", ml: 450 },
];

const milks: Addon[] = [
  { id: "cow", name: "Молоко коровье", price: 0 },
  { id: "hazel", name: "Молоко фундучное", price: 85 },
  { id: "banana", name: "Молоко банановое", price: 85 },
  { id: "coco", name: "Молоко кокосовое", price: 85 },
  { id: "almond", name: "Молоко миндальное", price: 85 },
  { id: "oat", name: "Молоко овсяное", price: 65 },
];

const toppings: Addon[] = [
  { id: "cookie", name: "Крошка печенья", price: 10 },
  { id: "shimmer", name: "Мерцающие блёстки", price: 10 },
  { id: "gold", name: "Золотые блёстки", price: 10 },
  { id: "cinnamon", name: "Корица", price: 0 },
  { id: "cocoa", name: "Посыпка какао", price: 0 },
  { id: "raspberry", name: "Малина сублим.", price: 25 },
];

export const DRINKS: Drink[] = [
  {
    id: "cappuccino",
    name: "Капучино",
    price: 245,
    category: "coffee",
    group: "кофе с молоком",
    video: V.steam,
    accent: "#b88a5f",
    macro: { kcal: 158, protein: 7.7, fat: 8.4, carbs: 12.2 },
    sizes: sizesStd,
    defaultSize: "M",
    milks,
    toppings,
    variants: [
      { id: "hot", name: "Горячая версия", price: 0 },
      { id: "iced", name: "Со льдом", price: 0 },
      { id: "esp+", name: "Доп. эспрессо", price: 80 },
    ],
  },
  {
    id: "latte",
    name: "Латте",
    price: 245,
    category: "coffee",
    group: "кофе с молоком",
    video: V.latteart,
    accent: "#caa07a",
    macro: { kcal: 180, protein: 8.1, fat: 9.0, carbs: 14.0 },
    sizes: sizesStd,
    defaultSize: "M",
    milks,
    toppings,
    variants: [{ id: "iced", name: "Со льдом", price: 0 }],
  },
  {
    id: "raf",
    name: "Раф ванильный",
    price: 295,
    category: "coffee",
    group: "кофе с молоком",
    video: V.cream,
    accent: "#d4a87a",
    macro: { kcal: 210, protein: 5.5, fat: 12.4, carbs: 18.0 },
    sizes: sizesStd,
    defaultSize: "M",
    milks,
    toppings,
    variants: [],
  },
  {
    id: "iced-latte",
    name: "Латте со льдом",
    price: 295,
    category: "coffee",
    group: "кофе с молоком (холодный)",
    video: V.iced,
    accent: "#e0bfa0",
    badge: "хит весны",
    macro: { kcal: 165, protein: 7.0, fat: 8.0, carbs: 13.0 },
    sizes: sizesStd,
    defaultSize: "L",
    milks,
    toppings,
    variants: [],
  },
  {
    id: "bumble",
    name: "Бамбл кофе",
    subtitle: "апельсин + эспрессо",
    price: 415,
    category: "spring",
    group: "весна 🌸",
    video: V.orange,
    accent: "#e89a3a",
    badge: "новинка",
    macro: { kcal: 149, protein: 2.8, fat: 1.2, carbs: 30.8 },
    sizes: [{ id: "M", ml: 400 }],
    defaultSize: "M",
    milks: [{ id: "none", name: "Без молока", price: 0 }],
    toppings: [
      { id: "ice", name: "Со льдом", price: 0 },
      { id: "hot", name: "Горячая версия", price: 0 },
      { id: "double", name: "Холодный эспрессо", price: 80 },
    ],
    variants: [
      { id: "hot", name: "Горячая версия", price: 0 },
      { id: "ice", name: "Со льдом", price: 0 },
    ],
  },
  {
    id: "v60",
    name: "Воронка Руанда Мутетели",
    subtitle: "7 мин · фильтр",
    price: 285,
    category: "coffee",
    group: "воронка",
    video: V.pour,
    accent: "#3a2418",
    macro: { kcal: 5, protein: 0.2, fat: 0.0, carbs: 0.8 },
    sizes: [{ id: "M", ml: 300 }],
    defaultSize: "M",
    milks: [{ id: "none", name: "Без молока", price: 0 }],
    toppings: [],
    variants: [],
  },
  {
    id: "decaf-cap",
    name: "Капучино без кофеина",
    price: 195,
    category: "nocoffee",
    group: "не кофе",
    video: V.steam,
    accent: "#a87a52",
    badge: "без кофеина",
    macro: { kcal: 140, protein: 7.0, fat: 7.5, carbs: 11.0 },
    sizes: sizesStd,
    defaultSize: "M",
    milks,
    toppings,
    variants: [],
  },
  {
    id: "matcha",
    name: "Матча латте",
    price: 350,
    category: "nocoffee",
    group: "не кофе",
    video: V.matcha,
    accent: "#7ea872",
    macro: { kcal: 130, protein: 4.0, fat: 5.0, carbs: 16.0 },
    sizes: sizesStd,
    defaultSize: "M",
    milks,
    toppings,
    variants: [],
  },
  {
    id: "kofepass-10",
    name: "10 кофе с молоком",
    subtitle: "кофепасс на месяц",
    price: 1990,
    category: "combo",
    group: "кофепасс",
    video: V.beans,
    accent: "#1a2f3a",
    badge: "−21%",
    macro: { kcal: 0, protein: 0, fat: 0, carbs: 0 },
    sizes: [{ id: "M", ml: 0 }],
    defaultSize: "M",
    milks: [{ id: "any", name: "Любое молоко", price: 0 }],
    toppings: [],
    variants: [],
  },
  {
    id: "kofepass-black",
    name: "10 чёрный кофе",
    subtitle: "кофепасс на месяц",
    price: 1590,
    category: "combo",
    group: "кофепасс",
    video: V.pour,
    accent: "#2a1a14",
    badge: "−25%",
    macro: { kcal: 0, protein: 0, fat: 0, carbs: 0 },
    sizes: [{ id: "M", ml: 0 }],
    defaultSize: "M",
    milks: [{ id: "any", name: "Эспрессо/американо", price: 0 }],
    toppings: [],
    variants: [],
  },
];

export const FOR_YOU_IDS = ["bumble", "iced-latte", "matcha", "kofepass-10", "v60"];
