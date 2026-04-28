import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import communityImg from "@/assets/community.jpg";

const events = [
  { id: 1, date: "02 МАЯ", time: "19:00", title: "Соседский ужин", desc: "Длинный стол, домашняя еда и разговоры до полуночи." },
  { id: 2, date: "08 МАЯ", time: "20:00", title: "Кинопоказ: Wim Wenders", desc: "Смотрим «Идеальные дни» с обсуждением." },
  { id: 3, date: "15 МАЯ", time: "18:30", title: "Лекция: устойчивый дизайн", desc: "Архитектор Лена Орлова о городах будущего." },
  { id: 4, date: "22 МАЯ", time: "11:00", title: "Утро с медитацией", desc: "Тихое субботнее утро с матчей и дыханием." },
];

const Events = () => {
  const [registered, setRegistered] = useState<number[]>([]);

  const toggle = (id: number, title: string) => {
    if (registered.includes(id)) {
      setRegistered((r) => r.filter((x) => x !== id));
      toast("Запись отменена");
    } else {
      setRegistered((r) => [...r, id]);
      toast.success("Ты в списке", { description: title });
    }
  };

  return (
    <section id="events" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={communityImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-widest text-highlight font-medium mb-4">/ Соседский клуб</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
              События, которые<br />
              <span className="italic font-normal text-highlight">собирают своих.</span>
            </h2>
          </div>
        </div>

        <div className="space-y-1">
          {events.map((e) => {
            const isReg = registered.includes(e.id);
            return (
              <article
                key={e.id}
                className="group grid md:grid-cols-12 gap-6 items-center py-8 border-t border-primary-foreground/15 last:border-b hover:bg-primary-foreground/5 transition-colors px-2"
              >
                <div className="md:col-span-2">
                  <div className="font-display text-3xl font-bold">{e.date}</div>
                  <div className="text-primary-foreground/60 text-sm">{e.time}</div>
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl md:text-3xl mb-1">{e.title}</h3>
                  <p className="text-primary-foreground/70">{e.desc}</p>
                </div>
                <div className="md:col-span-3 flex md:justify-end">
                  <Button
                    variant={isReg ? "glass" : "hero"}
                    onClick={() => toggle(e.id, e.title)}
                  >
                    {isReg ? "Записан ✓" : "Записаться"}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;
