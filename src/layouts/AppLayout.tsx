import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { useAppState } from "@/state/AppState";
import { Bell } from "lucide-react";
import ThemeSwitcher from "@/components/flow/ThemeSwitcher";

const titles: Record<string, { title: string; sub: string }> = {
  "/app": { title: "Обзор", sub: "Что у тебя сейчас в SO-HO!" },
  "/app/plans": { title: "Тарифы", sub: "Выбери свой ритм" },
  "/app/access": { title: "Мой доступ", sub: "Покажи экран администратору" },
  "/app/seats": { title: "Карта мест", sub: "Выбери, где сегодня сядешь" },
  "/app/cafe": { title: "Кофейня", sub: "Закажи к месту или на вынос" },
  "/app/events": { title: "События", sub: "Соседский клуб ждёт" },
  "/app/profile": { title: "Профиль", sub: "Аккаунт и история" },
};

const AppLayout = () => {
  const { pathname } = useLocation();
  const meta = titles[pathname] ?? { title: "SO-HO!", sub: "" };
  const { user } = useAppState();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8">
            <SidebarTrigger />
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-lg font-semibold truncate">{meta.title}</h1>
              <p className="text-xs text-muted-foreground truncate">{meta.sub}</p>
            </div>
            <ThemeSwitcher />
            <button className="w-9 h-9 rounded-full bg-secondary hover:bg-accent/30 flex items-center justify-center transition" aria-label="Уведомления">
              <Bell className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-gradient-forest text-primary-foreground flex items-center justify-center font-display text-sm">
                {user.name.charAt(0)}
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-medium leading-tight">{user.name}</div>
                <div className="text-[10px] text-muted-foreground">{user.telegram}</div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
