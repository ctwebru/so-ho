import { ArrowRight } from "lucide-react";
import clubFront from "@/assets/real/club-front.png";
import clubReverse from "@/assets/real/club-reverse.png";
import coworkView from "@/assets/real/cowork-view.png";
import coffeeSide from "@/assets/real/coffee-side.png";
import promoVideo from "@/assets/coffee-promo.mp4";

const SCENARIOS = [
  {
    num: "01",
    title: "Один",
    text: "Скучно вечером и дома сидеть не хочется. За общим столом всегда есть игра, в которую берут четвёртым, и пазл, который собирают всем клубом.",
  },
  {
    num: "02",
    title: "Компанией",
    text: "Не знаете, куда пойти вдвоём или впятером. Столы, 40+ настолок, PS5 и кофе рядом — вечер складывается сам, без бронирования ресторана и лишних поводов.",
  },
  {
    num: "03",
    title: "С детьми",
    text: "Ребёнку — настолки, рисование и другие дети. Взрослому — своя игра, книга или просто тишина за соседним столом. Никого не нужно развлекать по очереди.",
  },
];

const STEPS = [
  { n: "01", t: "Просто зайди", d: "Без записи и без звонка — днём, когда в клубе нет занятий." },
  { n: "02", t: "Попробуй вечер", d: "Возьми одно занятие из расписания: настолки, турнир или мастер-класс." },
  { n: "03", t: "Останься", d: "Понравилось — членство окупается уже со второго визита." },
];

const ClubStory = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Зачем сюда приходить */}
      <div className="container mx-auto px-6 pt-20 pb-4">
        <p className="font-hand text-2xl text-accent">зачем сюда приходить</p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold leading-tight max-w-3xl">
          Место, куда можно прийти
          <br className="hidden md:block" /> без повода и без компании
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
          Клуб для тех, кто живёт рядом: от студентов до родителей с детьми. Не коворкинг и не бар —
          гостиная района, где вечер занимает сам себя.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-px bg-border/60 rounded-3xl overflow-hidden border border-border/60">
          {SCENARIOS.map((s) => (
            <div key={s.title} className="bg-background p-7 md:p-8">
              <span className="font-display text-sm tracking-[0.2em] text-accent/70 tabular-nums">
                {s.num}
              </span>
              <div className="mt-5 font-display text-2xl font-semibold">{s.title}</div>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Как это выглядит */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="font-hand italic text-2xl text-accent">как это выглядит</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold">
              Один зал, много вечеров
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Уютно, по-соседски и без пафоса: сюда легко зайти одному. Мы в Flora&amp;Fauna на
            Дачном шоссе, 22/3 — вход через кофейню.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[520px]">
          <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative">
            <video
              src={promoVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover min-h-[260px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-5 left-5 font-hand text-3xl text-foreground">
              вечер в клубе
            </div>
          </div>
          {[
            { src: clubFront, alt: "Зал соседского клуба SO-HO!" },
            { src: coworkView, alt: "Столы и мягкая зона клуба" },
            { src: clubReverse, alt: "Полки с настолками и книгами" },
            { src: coffeeSide, alt: "Кофейня рядом с клубом" },
          ].map((img) => (
            <div key={img.alt} className="rounded-3xl overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover min-h-[160px] hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Первый визит */}
      <div className="container mx-auto px-6 pb-16">
        <div className="rounded-[2.5rem] border border-border/60 paper p-7 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-hand italic text-2xl text-accent">с чего начать</p>
              <h2 className="mt-1 font-display text-3xl md:text-4xl font-semibold">
                Сначала приходят, потом остаются
              </h2>
            </div>
            <a
              href="#membership"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
            >
              посмотреть членство <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="border-t-2 border-accent/40 pt-4">
                <div className="font-display text-4xl font-semibold text-accent/60 tabular-nums">{s.n}</div>
                <div className="mt-2 font-display text-xl font-semibold">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground max-w-2xl">
            Мы только открылись: пока нет ни историй завсегдатаев, ни фотографий полного зала.
            Зато есть шанс стать теми, с кого клуб начался — и повлиять на то, какие вечера здесь появятся.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClubStory;
