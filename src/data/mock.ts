export const PLANS = [
  {
    code: "fast" as const,
    name: "Fast",
    price: 350,
    duration: "2 часа",
    desc: "Забежать на встречу или быстро поработать.",
    features: ["Любое свободное место", "Wi-Fi и кофе-точка", "Без бронирования"],
    featured: false,
  },
  {
    code: "day" as const,
    name: "Day",
    price: 900,
    duration: "1 день",
    desc: "Полный рабочий день в пространстве.",
    features: ["Любое место", "Skype-комнаты по слотам", "Скидка 10% на кофе"],
    featured: false,
  },
  {
    code: "flex" as const,
    name: "Flex",
    price: 12000,
    duration: "месяц",
    desc: "Любое свободное место, каждый день.",
    features: ["Безлимитный доступ", "Skype-комнаты", "Скидка 15% на кофе", "События клуба"],
    featured: true,
  },
  {
    code: "fix" as const,
    name: "Fix",
    price: 18000,
    duration: "месяц",
    desc: "Закреплённое место — твоё личное.",
    features: ["Своё место", "Хранение вещей", "Skype-комнаты", "Скидка 20%", "Приоритет на события"],
    featured: false,
  },
];

export const MENU = [
  { id: "esp", name: "Эспрессо", price: 150, cat: "Напитки" as const },
  { id: "cap", name: "Капучино", price: 250, cat: "Напитки" as const },
  { id: "lat", name: "Латте", price: 280, cat: "Напитки" as const },
  { id: "raf", name: "Раф ваниль", price: 320, cat: "Напитки" as const },
  { id: "matcha", name: "Матча латте", price: 350, cat: "Напитки" as const },
  { id: "tea", name: "Чай сезона", price: 200, cat: "Напитки" as const },
  { id: "croi", name: "Круассан", price: 220, cat: "Десерты" as const },
  { id: "cake", name: "Морковный торт", price: 290, cat: "Десерты" as const },
  { id: "cookie", name: "Мисо-куки", price: 180, cat: "Десерты" as const },
];

export const EVENTS = [
  { id: 1, date: "02 МАЯ", time: "19:00", title: "Соседский ужин", desc: "Длинный стол, домашняя еда и разговоры до полуночи." },
  { id: 2, date: "08 МАЯ", time: "20:00", title: "Кинопоказ: Wim Wenders", desc: "Смотрим «Идеальные дни» с обсуждением." },
  { id: 3, date: "15 МАЯ", time: "18:30", title: "Лекция: устойчивый дизайн", desc: "Архитектор Лена Орлова о городах будущего." },
  { id: 4, date: "22 МАЯ", time: "11:00", title: "Утро с медитацией", desc: "Тихое субботнее утро с матчей и дыханием." },
];
