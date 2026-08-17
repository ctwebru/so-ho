import { useState } from "react";
import Navigation from "@/components/flow/Navigation";
import Footer from "@/components/flow/Footer";
import Plans from "@/components/flow/Plans";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import heroImg from "@/assets/real/cowork-view.png";
import workspaceImg from "@/assets/workspace.jpg";
import communityImg from "@/assets/community.jpg";

const features = [
  {
    icon: Armchair,
    title: "10 рабочих мест",
    text: "Стол и удобное кресло у каждого. Никаких барных табуретов — только полноценное рабочее место.",
  },
  {
    icon: Video,
    title: "Skype-рум без ограничения",
    text: "Для созвонов и интервью — можно бронировать любое количество слотов в день, без доплаты.",
  },
  {
    icon: Monitor,
    title: "Монитор по запросу",
    text: "Нужен второй экран? Арендуй монитор отдельно и подключай свой ноутбук.",
  },
  {
    icon: Sofa,
    title: "Зона отдыха",
    text: "Мягкий диван, журнальный столик и место, чтобы передохнуть между созвонами.",
  },
  {
    icon: Printer,
    title: "ЧБ-печать",
    text: "Печатай документы прямо в пространстве — включено в тарифы День, Флекс и Фикс.",
  },
  {
    icon: Wifi,
    title: "Быстрый интернет",
    text: "Стабильный Wi-Fi и розетки у каждого места. Работай без перебоев.",
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
    setSubmitted(true);
    toast("Заявка отправлена", {
      description: "Администратор свяжется с вами и назначит пробный день.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero — полная высота */}
        <section className="relative min-h-screen flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt="Коворкинг в Flora&Fauna"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-primary/90" />
          </div>

          <div className="relative container mx-auto px-6 pb-20 pt-32">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 mb-6">
                / Коворкинг в Flora&Fauna
              </p>
              <h1 className="font-display text-primary-foreground text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] text-balance">
                Работа <span className="italic font-normal text-highlight">в шаге</span> от дома
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
                10 мест, skype-рум без ограничения и соседская атмосфера. Для тех, кто работает
                удалённо — и хочет работать в человечном месте.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <a href="#trial">Первый день бесплатно</a>
                </Button>
                <Button variant="glass" size="xl" asChild>
                  <a href="#plans">Тарифы</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-widest text-accent font-medium italic">/ почему у нас</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
                Всё, чтобы работать без трения
              </h2>
              <p className="mt-5 text-muted-foreground text-lg max-w-2xl">
                Без офисной стерильности и переполненных кофеен. Тихо, удобно и по-соседски.
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

        {/* Галерея */}
        <section className="py-12 md:py-20 bg-secondary/40">
          <div className="container mx-auto px-6">
            <p className="text-xs uppercase tracking-widest text-accent font-medium italic mb-8">/ пространство</p>
            <div className="grid md:grid-cols-3 gap-5">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
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

        {/* Пробный день */}
        <section id="trial" className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-medium italic mb-4">/ стань резидентом</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
                Первый день — <span className="italic text-accent">бесплатно</span>
              </h2>
              <p className="mt-5 text-muted-foreground text-lg">
                Приходите, попробуйте место, проверьте Wi-Fi и скайп-рум. Если понравится —
                выберете тариф и останетесь.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Полный доступ на один день",
                  "Skype-рум без ограничения",
                  "Чай и кофе из кофейни рядом",
                  "Администратор поможет с выбором тарифа",
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
                  <p className="text-muted-foreground">Администратор свяжется с вами в ближайшее время.</p>
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
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      placeholder="Удобные день и время для пробного дня"
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
        </section>

        {/* Важно: территория и контакты */}
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
                    жителям ЖК и их гостям. Для остальных вопросов — пишите администратору.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Администратор в Telegram</h3>
                  <p className="text-primary-foreground/80 leading-relaxed mb-4">
                    По всем вопросам — бронирование, тарифы, доступ на территорию — пишите в Telegram.
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

      <Footer />
    </div>
  );
};

export default Cowork;
