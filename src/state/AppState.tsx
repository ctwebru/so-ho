import { createContext, useContext, useState, ReactNode } from "react";

export type PlanCode = "fast" | "day" | "flex" | "fix" | null;

type AppState = {
  user: { name: string; telegram: string };
  activePlan: PlanCode;
  planExpires: string | null;
  selectedSeat: number | null;
  registeredEvents: number[];
  orders: { id: string; items: string; total: number; status: "Принят" | "Готов"; at: string }[];
  setPlan: (plan: PlanCode) => void;
  setSeat: (seat: number | null) => void;
  toggleEvent: (id: number) => void;
  addOrder: (items: string, total: number) => void;
};

const Ctx = createContext<AppState | null>(null);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [activePlan, setActivePlan] = useState<PlanCode>(null);
  const [planExpires, setPlanExpires] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [orders, setOrders] = useState<AppState["orders"]>([]);

  const setPlan = (plan: PlanCode) => {
    setActivePlan(plan);
    if (plan) {
      const d = new Date();
      const days = plan === "fast" ? 0 : plan === "day" ? 1 : 30;
      d.setDate(d.getDate() + days);
      setPlanExpires(d.toLocaleDateString("ru", { day: "2-digit", month: "long", year: "numeric" }));
    } else {
      setPlanExpires(null);
    }
  };

  const toggleEvent = (id: number) =>
    setRegisteredEvents((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));

  const addOrder = (items: string, total: number) => {
    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    const at = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
    setOrders((o) => [{ id, items, total, status: "Принят", at }, ...o]);
    setTimeout(() => {
      setOrders((o) => o.map((x) => (x.id === id ? { ...x, status: "Готов" } : x)));
    }, 8000);
  };

  return (
    <Ctx.Provider
      value={{
        user: { name: "Анна Морозова", telegram: "@anna_m" },
        activePlan,
        planExpires,
        selectedSeat,
        registeredEvents,
        orders,
        setPlan,
        setSeat: setSelectedSeat,
        toggleEvent,
        addOrder,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAppState = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
};
