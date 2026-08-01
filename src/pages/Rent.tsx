import {
  Users,
  Armchair,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Clock,
  Send,
  MessageCircle,
  Monitor,
  Presentation,
  Wifi,
  Coffee,
  Gamepad2,
  Music4,
  Baby,
  DoorClosed,
  Check,
} from "lucide-react";
import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import { Button } from "@/components/ui/button";
import clubPhoto from "@/assets/real/club-front.png";
import clubReverse from "@/assets/real/club-reverse.png";
import coworkView from "@/assets/real/cowork-view.png";

const TG_URL = "https://t.me/sohoclub";
const MAX_URL = "https://max.ru/sohoclub";

const SCENARIOS = [
  {
    n: "01",
    title: "Коуч-сессия и встреча с клиентом",
    text: "Тихий закрытый зал в своём ЖК: пришёл пешком, провёл сессию, вернулся домой. Без коворкинг-суеты и чужих ушей.",
  },
  {
    n: "02",
    title: "Групповая практика и мастер-класс",
    text: "Круг, театр или периметр — рассадка собирается под формат за пять минут. Подходит для разборов, лекций и обучающих встреч.",
  },
  {
    n: "03",
    title: "Нетворкинг и встреча соседей",
    text: "Небольшая тёплая группа, где все друг друга видят. Кофе из соседнего зала, никакой конференц-стерильности.",
  },
  {
    n: "04",
    title: "Мягкий фитнес и телесные практики",
    text: "До 6 человек с ковриками, свободный центр зала, спокойный свет. Йога, стретчинг, дыхательные практики.",
  },
  {
    n: "05",
    title: "День рождения и семейный праздник",
    text: "Небольшой праздник для своих: настолки, PS5, игры для детей. Без банкетного пафоса и лишних гостей.",
  },
  {
    n: "06",
    title: "Просто клуб на пару часов",
    text: "Собрать друзей, устроить турнир по настолкам или киновечер — иногда повод не нужен вовсе.",
  },
];

const LAYOUTS = [
  { icon: Presentation, title: "Театр", cap: "до 12 человек", note: "лекция, презентация, разбор" },
  { icon: Armchair, title: "По периметру", cap: "до 10 человек", note: "работа за столами, мастер-класс" },
  { icon: RotateCcw, title: "В круг", cap: "до 12 человек", note: "коуч-группа, нетворкинг, разговор" },
  { icon: Sparkles, title: "Мягкий фитнес", cap: "до 6 человек", note: "коврики, свободный центр зала" },
];

const OPTIONS = [
  { icon: Monitor, title: "Экран и трансляция", note: "большой экран для слайдов и видео" },
  { icon: Presentation, title: "Флипчарт и маркеры", note: "для разборов и схем" },
  { icon: Coffee, title: "Кофе из кофейни рядом", note: "предзаказ на группу к началу встречи" },
  { icon: Music4, title: "Звук и колонка", note: "фоновая музыка или трек для практики" },
  { icon: Gamepad2, title: "PlayStation 5", note: "два геймпада — для праздников и тимбилдинга" },
  { icon: Wifi, title: "Wi-Fi и розетки", note: "у каждого места, для онлайн-подключений" },
  { icon: Baby, title: "Детский уголок", note: "игры и творческий стол, если гости с детьми" },
  { icon: DoorClosed, title: "Закрытый зал", note: "клуб только ваш на всё время брони" },
];

const SAFETY = [
  "Закрытая территория ЖК и своя охрана — гости приходят пешком, без парковок и подворотен.",
  "На время брони зал только ваш: никаких случайных людей и проходящих мимо.",
  "Без алкоголя — трезвая среда, в которой спокойно и взрослым, и детям.",
  "Администратор на связи всё время встречи: поможет с техникой и рассадкой.",
];

const Rent = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* HERO */}
        <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
          <img
            src={clubPhoto}
            alt="Зал клуба SO-HO! для аренды под мероприятия в Новосибирске"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />

          <div className="relative container mx-auto px-6 pt-32 pb-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 backdrop-blur px-4 py-1.5 text-sm border border-accent/40">
              <ShieldCheck className="w-4 h-4 text-accent" /> Внутри ЖК, идти пешком
            </span>

            <h1 className="mt-6 font-display text-5xl md:text-8xl font-semibold leading-[0.9] tracking-tight max-w-4xl">
              Клуб целиком
              <br />
              <span className="text-accent">под вашу встречу</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              Трансформируемый зал до 12 человек в Flora&amp;Fauna. Коуч-сессии, мастер-классы,
              нетворкинги, мягкий фитнес и небольшие праздники — без поездок через весь город.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-2xl">
                <a href={TG_URL} target="_blank" rel="noreferrer">
                  <Send className="w-4 h-4" /> Написать администратору
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-2xl">
                <a href="#scenarios">Что можно провести</a>
              </Button>
            </div>
          </div>
        </section>

        {/* СЦЕНАРИИ */}
        <section id="scenarios" className="scroll-mt-24 container mx-auto px-6 py-20">
          <p className="font-display italic text-muted-foreground">что здесь проводят</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold leading-tight max-w-2xl">
            Зал, который подстраивается под формат
          </h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {SCENARIOS.map((s) => (
              <div key={s.n} className="border-b border-border md:border-r py-7 pr-6">
                <div className="font-display text-sm text-accent tabular-nums">{s.n}</div>
                <div className="mt-2 font-display text-xl font-semibold leading-tight">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* РАССАДКИ */}
        <section className="container mx-auto px-6 pb-20">
          <div className="rounded-[2.5rem] border-2 border-accent/30 bg-secondary/50 paper p-7 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="font-display italic text-muted-foreground">рассадки</p>
                <h2 className="mt-1 font-display text-2xl md:text-3xl font-semibold">
                  Четыре варианта, меняем за пять минут
                </h2>
              </div>
              <span className="shrink-0 self-start md:self-auto rounded-full bg-primary text-primary-foreground px-6 py-2 font-display font-semibold text-sm">
                помещение полностью трансформируемо
              </span>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {LAYOUTS.map((l) => (
                <div key={l.title} className="rounded-3xl bg-card border-2 border-border p-6">
                  <div className="w-11 h-11 rounded-2xl bg-accent/20 text-primary flex items-center justify-center">
                    <l.icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="mt-4 font-display text-lg font-semibold">{l.title}</div>
                  <div className="font-display text-2xl font-semibold tabular-nums text-accent">{l.cap}</div>
                  <p className="text-sm text-muted-foreground mt-1">{l.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* БЕЗОПАСНАЯ СРЕДА */}
        <section className="container mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-3">
            <img
              src={clubReverse}
              alt="Клубный зал SO-HO! с другой стороны"
              className="rounded-3xl object-cover w-full h-56 md:h-72"
              loading="lazy"
            />
            <img
              src={coworkView}
              alt="Пространство SO-HO! внутри жилого комплекса"
              className="rounded-3xl object-cover w-full h-56 md:h-72 mt-8"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-display italic text-muted-foreground">безопасная среда</p>
            <h2 className="mt-1 font-display text-3xl md:text-4xl font-semibold leading-tight">
              Место, куда спокойно позвать клиента, группу или ребёнка
            </h2>
            <ul className="mt-6 space-y-3">
              {SAFETY.map((t) => (
                <li key={t} className="flex gap-3 items-start text-sm md:text-base">
                  <Check className="w-5 h-5 shrink-0 text-accent mt-0.5" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ДОП ОПЦИИ */}
        <section className="container mx-auto px-6 pb-20">
          <p className="font-display italic text-muted-foreground">что есть в зале</p>
          <h2 className="mt-1 font-display text-3xl md:text-4xl font-semibold leading-tight">
            Оборудование и дополнительные опции
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7">
            {OPTIONS.map((o) => (
              <div key={o.title} className="flex gap-4 items-start">
                <div className="w-11 h-11 shrink-0 rounded-2xl bg-accent/20 text-primary flex items-center justify-center">
                  <o.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold leading-tight">{o.title}</div>
                  <p className="text-sm text-muted-foreground mt-0.5">{o.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Часть опций уточняем при бронировании — напишите администратору, подберём под ваш формат.
          </p>
        </section>

        {/* УСЛОВИЯ + ЛИД */}
        <section id="booking" className="scroll-mt-24 container mx-auto px-6 pb-24">
          <div className="rounded-[2.5rem] bg-primary text-primary-foreground p-7 md:p-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
                Условия аренды
              </h2>
              <div className="mt-6 flex items-end gap-3">
                <div className="font-display text-5xl md:text-6xl font-semibold tabular-nums">1 250 ₽</div>
                <div className="pb-2 opacity-80">в час</div>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm md:text-base">
                {[
                  "Минимальная бронь — 2 часа",
                  "До 12 гостей, зал закрыт только для вас",
                  "Рассадка и подготовка зала — на нас",
                  "Ежедневно с 08:00 до 20:00",
                  "Без алкоголя",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5 items-start">
                    <Check className="w-5 h-5 shrink-0 opacity-90" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] bg-primary-foreground text-foreground p-6 md:p-7">
              <div className="font-display text-xl md:text-2xl font-semibold">
                Бронирование — через администратора
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Онлайн-календаря нет специально: напишите пару слов о формате и дате — администратор
                подскажет свободное время, поможет выбрать рассадку и опции.
              </p>

              <div className="mt-5 grid gap-3">
                <Button asChild size="lg" className="rounded-2xl w-full">
                  <a href={TG_URL} target="_blank" rel="noreferrer">
                    <Send className="w-4 h-4" /> Написать в Telegram
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-2xl w-full">
                  <a href={MAX_URL} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-4 h-4" /> Написать в MAX
                  </a>
                </Button>
              </div>

              <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                <p className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-accent shrink-0" />
                  Отвечаем в рабочие часы клуба, обычно в течение получаса.
                </p>
                <p className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-accent shrink-0" />
                  Новосибирск, Дачное шоссе, 22/3 — Flora&amp;Fauna.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Rent;
