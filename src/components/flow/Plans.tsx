import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    code: "fast",
    name: "Fast",
    price: 350,
    duration: "2 часа",
    desc: "Забежать на встречу или быстро поработать.",
    features: ["Любое свободное место", "Wi-Fi и кофе-точка", "Без бронирования"],
    featured: false,
  },
  {
    code: "day",
    name: "Day",
    price: 900,
    duration: "1 день",
    desc: "Полный рабочий день в пространстве.",
    features: ["Любое место", "Skype-комнаты по слотам", "Скидка 10% на кофе"],
    featured: false,
  },
  {
    code: "flex",
    name: "Flex",
    price: 12000,
    duration: "месяц",
    desc: "Любое свободное место, каждый день.",
    features: ["Безлимитный доступ", "Skype-комнаты", "Скидка 15% на кофе", "Доступ к событиям клуба"],
    featured: true,
  },
  {
    code: "fix",
    name: "Fix",
    price: 18000,
    duration: "месяц",
    desc: "Закреплённое место — твоё личное.",
    features: ["Своё рабочее место", "Хранение вещей", "Skype-комнаты", "Скидка 20% на кофе", "Приоритет на события"],
    featured: false,
  },
];

const Plans = ({ onPurchase }: { onPurchase: () => void }) => {
  const handleBuy = (name: string) => {
    onPurchase();
    toast.success(`Тариф ${name} активирован`, {
      description: "Демо-режим. Доступ открыт — загляни в раздел «Мой доступ».",
    });
  };

  return (
    <section id="plans" className="py-24 md:py-40 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">/ Тарифы</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-6xl font-semibold text-balance leading-tight">
              Выбери свой <span className="italic font-normal text-accent">ритм.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.code}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                plan.featured
                  ? "bg-gradient-forest text-primary-foreground shadow-deep"
                  : "bg-card border border-border shadow-soft"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-highlight text-highlight-foreground text-xs font-medium uppercase tracking-wider">
                  Популярный
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-display text-3xl font-semibold mb-1">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.desc}
                </p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-display text-5xl font-bold">{plan.price.toLocaleString("ru")}</span>
                  <span className={`text-sm ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    ₽ / {plan.duration}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.featured ? "text-highlight" : "text-accent"}`} />
                      <span className={plan.featured ? "text-primary-foreground/90" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.featured ? "hero" : "default"}
                className="w-full"
                onClick={() => handleBuy(plan.name)}
              >
                Оплатить
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
