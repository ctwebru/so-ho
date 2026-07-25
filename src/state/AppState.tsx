import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  FamilyMember,
  FamilyRelation,
  INITIAL_FAMILY,
  MAX_FAMILY_MEMBERS,
  priceForPosition,
} from "@/data/clubMembership";

export type ClubMembership = {
  active: boolean;
  since: string | null; // ISO
  nextBilling: string | null; // ISO
};

export type Pass = {
  id: string;
  title: string; // "Тихий клуб", "Кинопоказ Wenders", "Разовый вход в клуб"
  price: number;
  purchasedAt: string; // ISO
  validFor?: string; // "18 мая, 19:00" или "до 30.05"
  category?: "club" | "event" | "cafe" | "other";
  used?: boolean;
};

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
  // Соседский клуб — семья + подписка + разовые входы
  family: FamilyMember[];
  clubMembership: ClubMembership;
  passes: Pass[];
  login: (phone: string) => void;
  logout: () => void;
  setPlan: (plan: PlanCode) => void;
  setSeat: (seat: number | null) => void;
  toggleEvent: (id: number) => void;
  addOrder: (items: string, total: number, details?: OrderDetails) => string;
  requestPickup: (id: string) => void;
  activateClub: () => void;
  cancelClub: () => void;
  addFamilyMember: (data: { name: string; phone?: string; relation: FamilyRelation; birthYear?: number }) => void;
  removeFamilyMember: (id: string) => void;
  buyPass: (pass: Omit<Pass, "id" | "purchasedAt" | "used">) => string;
  usePass: (id: string) => void;
};

const Ctx = createContext<AppState | null>(null);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [activePlan, setActivePlan] = useState<PlanCode>(null);
  const [planExpires, setPlanExpires] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [family, setFamily] = useState<FamilyMember[]>(INITIAL_FAMILY);
  const [clubMembership, setClubMembership] = useState<ClubMembership>({
    active: false,
    since: null,
    nextBilling: null,
  });
  const [passes, setPasses] = useState<Pass[]>([]);
  const [authPhone, setAuthPhone] = useState<string | null>(() => {
    try { return sessionStorage.getItem("soho_phone"); } catch { return null; }
  });

  useEffect(() => {
    try {
      if (authPhone) sessionStorage.setItem("soho_phone", authPhone);
      else sessionStorage.removeItem("soho_phone");
    } catch {}
  }, [authPhone]);

  const activateClub = () => {
    const since = new Date().toISOString();
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    setClubMembership({ active: true, since, nextBilling: next.toISOString() });
  };
  const cancelClub = () => setClubMembership({ active: false, since: null, nextBilling: null });

  const addFamilyMember: AppState["addFamilyMember"] = (data) => {
    setFamily((f) => {
      if (f.length >= MAX_FAMILY_MEMBERS) return f;
      const next: FamilyMember = {
        id: `m-${Math.random().toString(36).slice(2, 8)}`,
        name: data.name,
        phone: data.phone,
        relation: data.relation,
        birthYear: data.birthYear,
        addedAt: new Date().toISOString(),
        monthlyPrice: priceForPosition(f.length),
      };
      return [...f, next];
    });
  };
  const removeFamilyMember = (id: string) => {
    setFamily((f) => {
      const filtered = f.filter((m) => m.id !== id);
      // пересчёт цен по позиции
      return filtered.map((m, i) => ({ ...m, monthlyPrice: priceForPosition(i) }));
    });
  };

  const buyPass: AppState["buyPass"] = (pass) => {
    const id = `p-${Math.random().toString(36).slice(2, 8)}`;
    setPasses((p) => [{ ...pass, id, purchasedAt: new Date().toISOString(), used: false }, ...p]);
    return id;
  };
  const usePass = (id: string) =>
    setPasses((p) => p.map((x) => (x.id === id ? { ...x, used: true } : x)));


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
        family,
        clubMembership,
        passes,
        login,
        logout,
        setPlan,
        setSeat: setSelectedSeat,
        toggleEvent,
        addOrder,
        requestPickup,
        activateClub,
        cancelClub,
        addFamilyMember,
        removeFamilyMember,
        buyPass,
        usePass,
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
