import { useAppState } from "@/state/AppState";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, activePlan, planExpires, orders, registeredEvents, setPlan } = useAppState();

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <div className="rounded-3xl bg-gradient-forest p-8 text-primary-foreground shadow-deep">
          <div className="w-20 h-20 rounded-full bg-background/10 backdrop-blur border border-background/20 flex items-center justify-center font-display text-3xl mb-5">
            {user.name.charAt(0)}
          </div>
          <div className="font-display text-2xl font-semibold">{user.name}</div>
          <div className="text-sm text-primary-foreground/70 mb-6">{user.telegram}</div>

          <div className="pt-5 border-t border-background/20 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-primary-foreground/60">Тариф</span>
              <span className="font-medium">{activePlan ? activePlan.toUpperCase() : "—"}</span>
            </div>
            {planExpires && (
              <div className="flex justify-between">
                <span className="text-primary-foreground/60">До</span>
                <span className="font-medium">{planExpires}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-primary-foreground/60">Заказов</span>
              <span className="font-medium">{orders.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-foreground/60">Событий</span>
              <span className="font-medium">{registeredEvents.length}</span>
            </div>
          </div>
        </div>

        {activePlan && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setPlan(null);
              toast("Тариф деактивирован");
            }}
          >
            Деактивировать тариф
          </Button>
        )}
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl bg-card border border-border p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Контакты</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <Field label="Имя" value={user.name} />
            <Field label="Telegram" value={user.telegram} />
            <Field label="Email" value="anna@flow.space" />
            <Field label="Резидент с" value="марта 2026" />
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6">
          <h3 className="font-display text-lg font-semibold mb-4">История покупок</h3>
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-sm py-6 text-center">Пока пусто</p>
          ) : (
            <div className="divide-y divide-border">
              {orders.map((o) => (
                <div key={o.id} className="flex items-center gap-3 py-3 text-sm">
                  <span className="font-mono text-xs text-muted-foreground w-16">№{o.id}</span>
                  <span className="flex-1 truncate">{o.items}</span>
                  <span className="tabular-nums">{o.total} ₽</span>
                  <span className="text-xs text-muted-foreground">{o.at}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-secondary/40 p-3">
    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

export default ProfilePage;
