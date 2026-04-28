import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { PLANS } from "@/data/mock";
import { useAppState } from "@/state/AppState";
import { useNavigate } from "react-router-dom";

const PlansPage = () => {
  const { setPlan, activePlan } = useAppState();
  const navigate = useNavigate();

  const buy = (code: typeof PLANS[number]["code"], name: string) => {
    setPlan(code);
    toast.success(`Тариф ${name} активирован`, {
      description: "Демо-режим. Открываем «Мой доступ».",
    });
    setTimeout(() => navigate("/app/access"), 600);
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {PLANS.map((plan) => {
        const isCurrent = activePlan === plan.code;
        return (
          <div
            key={plan.code}
            className={`relative rounded-3xl p-7 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
              plan.featured
                ? "bg-gradient-forest text-primary-foreground shadow-deep"
                : "bg-card border border-border shadow-soft"
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-highlight text-highlight-foreground text-xs font-medium uppercase tracking-wider">
                Популярный
              </div>
            )}
            {isCurrent && (
              <div className="absolute -top-3 right-7 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium uppercase tracking-wider">
                Текущий
              </div>
            )}

            <div className="flex-1">
              <h3 className="font-display text-3xl font-semibold mb-1">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.desc}
              </p>

              <div className="flex items-baseline gap-2 mb-7">
                <span className="font-display text-5xl font-bold">{plan.price.toLocaleString("ru")}</span>
                <span className={`text-sm ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  ₽ / {plan.duration}
                </span>
              </div>

              <ul className="space-y-3 mb-7">
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
              onClick={() => buy(plan.code, plan.name)}
              disabled={isCurrent}
            >
              {isCurrent ? "Активен" : "Оплатить"}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansPage;
