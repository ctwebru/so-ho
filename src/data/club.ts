export type ClubCategory =
  | "kids"
  | "adults"
  | "games"
  | "rent"
  | "other";

export type ClubEvent = {
  id: number;
  category: ClubCategory;
  date: string; // "18 МАЯ"
  time: string; // "11:00"
  duration: string; // "1.5 часа"
  title: string;
  host: string;
  desc: string;
  price: number; // ₽ за человека
  seatsLeft: number;
  ageLabel?: string; // "6+", "18+"
  image?: string;
};

export const CLUB_CATEGORIES: {
  id: ClubCategory;
  title: string;
  desc: string;
  emoji: string;
}[] = [
  {
    id: "adults",
    title: "Мастер-классы для взрослых",
    desc: "Каллиграфия, керамика, кофейные каппинги, винные вечера.",
    emoji: "🎨",
  },
  {
    id: "kids",
    title: "Детские мастер-классы",
    desc: "Творческие субботы: рисование, лепка, наука-шоу.",
    emoji: "🧒",
  },
  {
    id: "games",
    title: "Игровые вечера",
    desc: "Настолки, мафия, интерактивные квизы по четвергам.",
    emoji: "🎲",
  },
  {
    id: "rent",
    title: "Аренда пространства",
    desc: "Проведи свой мастер-класс, лекцию или встречу у нас.",
    emoji: "🏠",
  },
];

export const CLUB_EVENTS: ClubEvent[] = [
  {
    id: 101,
    category: "adults",
    date: "18 МАЯ",
    time: "19:00",
    duration: "2 часа",
    title: "Каллиграфия широким пером",
    host: "Мария Северова",
    desc: "Знакомство с итальянским курсивом. Все материалы — наши, вино — тоже.",
    price: 1900,
    seatsLeft: 4,
    ageLabel: "16+",
  },
  {
    id: 102,
    category: "kids",
    date: "19 МАЯ",
    time: "11:00",
    duration: "1.5 часа",
    title: "Наука-шоу: облака в банке",
    host: "Лаборатория «Пузырь»",
    desc: "Взрывные опыты и объяснения, почему мир именно такой. Родители со скидкой на кофе.",
    price: 1200,
    seatsLeft: 8,
    ageLabel: "6+",
  },
  {
    id: 103,
    category: "games",
    date: "23 МАЯ",
    time: "20:00",
    duration: "3 часа",
    title: "Вечер настолок: новинки",
    host: "Клуб SO-HO!",
    desc: "Библиотека из 40+ игр, ведущий, чай без лимита. Приходи один или компанией.",
    price: 600,
    seatsLeft: 12,
    ageLabel: "12+",
  },
  {
    id: 104,
    category: "adults",
    date: "25 МАЯ",
    time: "18:30",
    duration: "2.5 часа",
    title: "Керамика: кружка своими руками",
    host: "Студия «Глина»",
    desc: "Слепи и распиши посуду. Обжиг за наш счёт, забрать можно через неделю.",
    price: 2400,
    seatsLeft: 2,
    ageLabel: "14+",
  },
  {
    id: 105,
    category: "games",
    date: "30 МАЯ",
    time: "19:30",
    duration: "2 часа",
    title: "Мафия по-соседски",
    host: "Ведущий Артём",
    desc: "Классика в тёплом свете и с кофе. Знакомства случаются.",
    price: 500,
    seatsLeft: 6,
    ageLabel: "16+",
  },
  {
    id: 106,
    category: "kids",
    date: "01 ИЮН",
    time: "12:00",
    duration: "2 часа",
    title: "День защиты детей: творческий двор",
    host: "SO-HO! + друзья",
    desc: "Пять станций: краски, оригами, песочная анимация, кулинария, музыка.",
    price: 800,
    seatsLeft: 20,
    ageLabel: "4+",
  },
];
