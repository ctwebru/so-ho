import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { PLANS } from "@/data/mock";

const Plans = () => {
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
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Купить тариф можно в личном кабинете — за минуту.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan) => (
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

              <Button variant={plan.featured ? "hero" : "default"} className="w-full" asChild>
                <Link to="/app/plans">Купить</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
