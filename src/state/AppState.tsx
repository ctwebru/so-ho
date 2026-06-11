import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type PlanCode = "fast" | "day" | "flex" | "fix" | null;

export type OrderStatus = "Принят" | "Готовится" | "Готов" | "Выдан";
export type OrderMode = "takeaway" | "dinein";
export type PaymentMethod = "card" | "cash";

export type OrderDetails = {
  name: string;
  phone: string;
  payment: PaymentMethod;
  mode: OrderMode;
  whenAsap: boolean;
  whenTime?: string;
  comment?: string;
  cutlery: number;
  napkins: boolean;
};

export type Order = {
  id: string;
  items: string;
  total: number;
  status: OrderStatus;
  at: string;
  details?: OrderDetails;
  pickupRequested?: boolean;
};

type AppState = {
  user: { name: string; telegram: string };
  isAuthenticated: boolean;
  authPhone: string | null;
  activePlan: PlanCode;
  planExpires: string | null;
  selectedSeat: number | null;
  registeredEvents: number[];
  orders: Order[];
  login: (phone: string) => void;
  logout: () => void;
  setPlan: (plan: PlanCode) => void;
  setSeat: (seat: number | null) => void;
  toggleEvent: (id: number) => void;
  addOrder: (items: string, total: number, details?: OrderDetails) => string;
  requestPickup: (id: string) => void;
};

const Ctx = createContext<AppState | null>(null);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [activePlan, setActivePlan] = useState<PlanCode>(null);
  const [planExpires, setPlanExpires] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [authPhone, setAuthPhone] = useState<string | null>(() => {
    try { return sessionStorage.getItem("soho_phone"); } catch { return null; }
  });

  useEffect(() => {
    try {
      if (authPhone) sessionStorage.setItem("soho_phone", authPhone);
      else sessionStorage.removeItem("soho_phone");
    } catch {}
  }, [authPhone]);

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

  const addOrder = (items: string, total: number, details?: OrderDetails) => {
    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    const at = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
    const initialStatus: OrderStatus = "Принят";
    setOrders((o) => [{ id, items, total, status: initialStatus, at, details }, ...o]);
    // Принят → Готовится → Готов
    setTimeout(() => {
      setOrders((o) => o.map((x) => (x.id === id && x.status === "Принят" ? { ...x, status: "Готовится" } : x)));
    }, 2500);
    setTimeout(() => {
      setOrders((o) => o.map((x) => (x.id === id && x.status !== "Выдан" ? { ...x, status: "Готов" } : x)));
    }, 12000);
    return id;
  };

  const requestPickup = (id: string) => {
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, pickupRequested: true } : x)));
  };

  const login = (phone: string) => setAuthPhone(phone);
  const logout = () => setAuthPhone(null);

  return (
    <Ctx.Provider
      value={{
        user: { name: "Анна Морозова", telegram: "@anna_m" },
        isAuthenticated: !!authPhone,
        authPhone,
        activePlan,
        planExpires,
        selectedSeat,
        registeredEvents,
        orders,
        login,
        logout,
        setPlan,
        setSeat: setSelectedSeat,
        toggleEvent,
        addOrder,
        requestPickup,
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
