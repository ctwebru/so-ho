import { useState } from "react";
import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import Plans from "@/components/flow/Plans";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import {
  Wifi,
  Printer,
  Monitor,
  Sofa,
  Armchair,
  Video,
  MapPin,
  Clock,
  ShieldCheck,
  MessageSquare,
  Send,
  Check,
  X,
  Quote,
  Footprints,
} from "lucide-react";
import heroImg from "@/assets/real/cowork-view.png";
import workspaceImg from "@/assets/workspace.jpg";
import communityImg from "@/assets/community.jpg";

const pains = [
  "Дома работать невозможно: холодильник, кот, стиралка и «ты же дома, сходи».",
  "В кофейне шумно, розетка одна, и через час уже неловко занимать стол.",
  "Офис в центре — это час дороги туда и час обратно. Каждый день.",
  "Созвон в комнате, где кто-то ходит на фоне, — так себе переговорка.",
];

const daySteps = [
  {
    time: "08:40",
    title: "Вышел из подъезда",
    text: "Три минуты пешком по территории ЖК. Без пробок, метро и куртки на весь день.",
  },
  {
    time: "09:00",
    title: "Своё место и кофе",
    text: "Полноценный стол, удобное кресло, розетка. Кофе из кофейни в этом же пространстве.",
  },
  {
    time: "12:30",
    title: "Созвон в skype-руме",
    text: "Отдельная комната под звонки — сколько угодно раз за день, без доплаты.",
  },
  {
    time: "15:00",
    title: "Пауза в зоне отдыха",
    text: "Диван, чай, пять минут тишины — и обратно к задачам. Не выходя из пространства.",
  },
  {
    time: "18:30",
    title: "Закрыл ноутбук — и ты дома",
    text: "Работа осталась в коворкинге. Вечер остался вам.",
  },
];

const features = [
  {
    icon: Armchair,
    title: "10 рабочих мест",
    text: "Стол и удобное кресло у каждого. Никаких барных табуретов — только полноценное рабочее место.",
  },
  {
    icon: Video,
    title: "Skype-рум без ограничения",
    text: "Для созвонов и интервью — любое количество слотов в день, без доплаты. Сейчас по акции во всех тарифах.",
  },
  {
    icon: Monitor,
    title: "Монитор по запросу",
    text: "Нужен второй экран? Арендуйте монитор отдельно и подключайте свой ноутбук.",
  },
  {
    icon: Sofa,
    title: "Зона отдыха",
    text: "Мягкий диван и место, чтобы переключиться между задачами.",
  },
  {
    icon: Printer,
    title: "ЧБ-печать",
    text: "Договор, билеты, документы — печатаете прямо здесь.",
  },
  {
    icon: Wifi,
    title: "Быстрый интернет",
    text: "Стабильный Wi-Fi и розетка у каждого места. Созвоны не рассыпаются.",
  },
];

const comparison = [
  { label: "Дорога до работы", home: "0 мин, но нет границы", cafe: "15–30 мин", soho: "3 минуты пешком" },
  { label: "Своё место", home: "кухонный стол", cafe: "как повезёт", soho: "стол + кресло" },
  { label: "Созвоны", home: "кто-то на фоне", cafe: "неудобно", soho: "skype-рум без лимита" },
  { label: "Переключение", home: "не происходит", cafe: "шумно", soho: "зона отдыха" },
  { label: "Соседи", home: "нет", cafe: "случайные", soho: "свои, из ЖК" },
];

const faq = [
  {
    q: "Я не житель ЖК — могу приходить?",
    a: "Коворкинг находится на закрытой территории ЖК Flora&Fauna: вход только для жителей и их гостей. Если вы не житель — напишите администратору, обсудим доступ индивидуально.",
  },
  {
    q: "Чем Фикс отличается от Флекса?",
    a: "Фикс — закреплённое за вами место, оно всегда свободно. Флекс — любое свободное место в зале, дешевле.",
  },
  {
    q: "Skype-рум действительно без ограничения?",
    a: "Да, по текущей акции — неограниченное количество слотов в день во всех тарифах, без доплаты.",
  },
  {
    q: "Что входит в тариф, а что отдельно?",
    a: "Место, Wi-Fi, skype-рум, зона отдыха и ЧБ-печать входят. Отдельно оплачивается только аренда монитора и напитки в кофейне.",
  },
  {
    q: "Что если не подойдёт?",
    a: "Поэтому первый день бесплатный: приходите, поработайте полный день, проверьте интернет и звук в skype-руме. Решение — после.",
  },
];

const gallery = [
  { src: heroImg, alt: "Общий вид коворкинга SO-HO!" },
  { src: workspaceImg, alt: "Рабочее место в коворкинге" },
  { src: communityImg, alt: "Соседская атмосфера в пространстве" },
];

const ADMIN_TELEGRAM = "https://t.me/soho_admin_flora";

const Cowork = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleTrial = () => {
    if (!name.trim() || !phone.trim()) {
      toast("Укажите имя и телефон");
      return;
    }
    if (name.trim().length > 100 || phone.trim().length > 30 || message.length > 500) {
      toast("Слишком длинное значение в поле");
      return;
    }
    setSubmitted(true);
    toast("Заявка отправлена", {
      description: "Администратор свяжется с вами и назначит пробный день.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt="Коворкинг SO-HO! в ЖК Flora&Fauna"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-primary/90" />
          </div>

          <div className="relative container mx-auto px-6 pb-20 pt-32">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 mb-6">
                / Коворкинг в ЖК Flora&Fauna
              </p>
              <h1 className="font-display text-primary-foreground text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] text-balance">
                Работа <span className="italic font-normal text-highlight">в трёх минутах</span> от дома
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
                Всего 10 мест для тех, кто работает удалённо и устал от кухонного стола и шумных
                кофеен. Первый рабочий день — бесплатно, чтобы просто попробовать.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <a href="#trial">Забронировать бесплатный день</a>
                </Button>
                <Button variant="glass" size="xl" asChild>
                  <a href="#plans">Смотреть тарифы</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-2">
                  <Footprints className="w-4 h-4" /> 3 минуты пешком
                </span>
                <span className="flex items-center gap-2">
                  <Armchair className="w-4 h-4" /> всего 10 мест
                </span>
                <span className="flex items-center gap-2">
                  <Video className="w-4 h-4" /> skype-рум без лимита
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Боли */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-accent font-medium italic mb-4">
              / знакомо?
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
              Удалёнка — это свобода. Пока не начинается рабочий день
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {pains.map((p) => (
              <div
                key={p}
                className="flex gap-4 rounded-2xl border border-border bg-card/50 p-6"
              >
                <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-muted-foreground leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-display text-2xl md:text-3xl max-w-2xl leading-snug">
            Нужен не офис. Нужно{" "}
            <span className="italic text-accent">место, куда уходишь работать</span> — и откуда
            возвращаешься домой за три минуты.
          </p>
        </section>

        {/* День в коворкинге */}
        <section className="py-20 md:py-28 bg-secondary/40">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-10 mb-14">
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-widest text-accent font-medium italic">
                  / как проходит день
                </p>
              </div>
              <div className="md:col-span-8">
                <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
                  Один день резидента SO-HO!
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-7 space-y-2">
                {daySteps.map((s) => (
                  <div
                    key={s.time}
                    className="grid grid-cols-[64px_1fr] gap-5 border-t border-border py-6"
                  >
                    <span className="font-display text-lg text-accent">{s.time}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:col-span-5">
                <div className="sticky top-28 rounded-3xl overflow-hidden aspect-[3/4]">
                  <img
                    src={workspaceImg}
                    alt="Рабочее место резидента коворкинга"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Что внутри */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-widest text-accent font-medium italic">
                / что внутри
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
                Всё, чтобы работать без трения
              </h2>
              <p className="mt-5 text-muted-foreground text-lg max-w-2xl">
                Без офисной стерильности и без очереди за розеткой. Тихо, удобно и по-соседски.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-3xl border border-border bg-card p-8">
                <div className="w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Сравнение */}
        <section className="py-20 md:py-28 bg-secondary/40">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-xs uppercase tracking-widest text-accent font-medium italic mb-4">
              / честное сравнение
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance mb-12">
              Дома, в кофейне или здесь
            </h2>

            <div className="rounded-3xl border border-border bg-card overflow-hidden">
              <div className="hidden md:grid grid-cols-4 px-6 py-4 text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                <span />
                <span>Дома</span>
                <span>В кофейне</span>
                <span className="text-accent">В SO-HO!</span>
              </div>
              {comparison.map((row) => (
                <div
                  key={row.label}
                  className="grid md:grid-cols-4 gap-2 md:gap-0 px-6 py-5 border-b border-border last:border-0"
                >
                  <span className="font-medium">{row.label}</span>
                  <span className="text-muted-foreground text-sm md:text-base">
                    <span className="md:hidden text-xs uppercase tracking-widest mr-2">дома:</span>
                    {row.home}
                  </span>
                  <span className="text-muted-foreground text-sm md:text-base">
                    <span className="md:hidden text-xs uppercase tracking-widest mr-2">кофейня:</span>
                    {row.cafe}
                  </span>
                  <span className="text-accent font-medium text-sm md:text-base">
                    <span className="md:hidden text-xs uppercase tracking-widest mr-2">so-ho:</span>
                    {row.soho}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Цитата */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="w-8 h-8 text-accent mx-auto mb-6" strokeWidth={1.5} />
            <p className="font-display text-2xl md:text-4xl leading-snug text-balance">
              «Раньше я всё утро настраивался на работу. Теперь просто выхожу из подъезда — и рабочий
              день начинается сам».
            </p>
            <p className="mt-6 text-sm text-muted-foreground italic">
              так это описывают наши резиденты
            </p>
          </div>
        </section>

        {/* Галерея */}
        <section className="pb-20 md:pb-28">
          <div className="container mx-auto px-6">
            <p className="text-xs uppercase tracking-widest text-accent font-medium italic mb-8">
              / пространство
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {gallery.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Тарифы */}
        <Plans />

        {/* Возражения */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent font-medium italic mb-4">
              / вопросы, которые вы уже задали себе
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance mb-10">
              Отвечаем честно
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-display text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Пробный день */}
        <section id="trial" className="py-20 md:py-28 bg-secondary/40">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent font-medium italic mb-4">
                  / стань резидентом
                </p>
                <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
                  Первый рабочий день — <span className="italic text-accent">бесплатно</span>
                </h2>
                <p className="mt-5 text-muted-foreground text-lg">
                  Ничего не нужно решать заранее. Приходите, отработайте полный день, проверьте
                  интернет и skype-рум. Понравится — выберете тариф.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Полный доступ на один рабочий день",
                    "Skype-рум без ограничения",
                    "Кофе из кофейни в этом же пространстве",
                    "Администратор встретит и покажет всё",
                    "Мест всего 10 — бронируем по очереди",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-2">Заявка отправлена</h3>
                    <p className="text-muted-foreground">
                      Администратор свяжется с вами в ближайшее время.
                    </p>
                    <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                      Отправить ещё одну
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        maxLength={100}
                        placeholder="Как к вам обращаться"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        maxLength={30}
                        placeholder="+7 (999) 000-00-00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Когда удобно прийти</Label>
                      <Textarea
                        id="message"
                        maxLength={500}
                        placeholder="Например: в четверг с утра"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" size="lg" onClick={handleTrial}>
                      Хочу бесплатный день
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь на обработку контактных данных.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Территория и контакты */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Закрытая территория</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    Коворкинг находится на закрытой территории ЖК Flora&Fauna. Вход доступен только
                    жителям ЖК и их гостям. По остальным вопросам — пишите администратору.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Администратор в Telegram
                  </h3>
                  <p className="text-primary-foreground/80 leading-relaxed mb-4">
                    Бронирование, тарифы, доступ на территорию — ответим быстро.
                  </p>
                  <Button variant="secondary" size="sm" asChild>
                    <a href={ADMIN_TELEGRAM} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="w-4 h-4" /> Написать администратору
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-primary-foreground/10 grid md:grid-cols-3 gap-6 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Новосибирск, Дачное шоссе, 22/3</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                <span>08:00 — 20:00, ежедневно</span>
              </div>
              <div className="flex items-center gap-3">
                <Wifi className="w-4 h-4" />
                <span>Быстрый Wi-Fi и розетки</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Липкая CTA-панель */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-3">
        <Button className="w-full" size="lg" asChild>
          <a href="#trial">Первый день бесплатно</a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Cowork;
