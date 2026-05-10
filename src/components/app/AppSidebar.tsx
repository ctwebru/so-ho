import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, CreditCard, QrCode, MapPin, Coffee, CalendarDays, User, ArrowLeft, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppState } from "@/state/AppState";

const items = [
  { title: "Обзор", url: "/app", icon: LayoutDashboard, end: true },
  { title: "Тарифы", url: "/app/plans", icon: CreditCard },
  { title: "Мой доступ", url: "/app/access", icon: QrCode },
  { title: "Карта мест", url: "/app/seats", icon: MapPin },
  { title: "Кофейня", url: "/app/cafe", icon: Coffee },
  { title: "Кофе · вайб", url: "/app/coffee", icon: Sparkles },
  { title: "События", url: "/app/events", icon: CalendarDays },
  { title: "Профиль", url: "/app/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { user, activePlan } = useAppState();

  const isActive = (url: string, end?: boolean) =>
    end ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <NavLink to="/" className="flex items-center gap-2 group">
          {collapsed ? (
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft shrink-0 font-display font-bold text-xs">
              S!
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="font-display font-bold leading-none text-lg tracking-tight">SO-HO!</div>
              <div className="text-[10px] uppercase tracking-widest text-accent mt-1">Coffee · Work · Meet</div>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Личный кабинет</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.end)} tooltip={item.title}>
                    <NavLink to={item.url} end={item.end} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="На главную">
                  <NavLink to="/" className="flex items-center gap-3 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>На сайт</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed ? (
          <div className="rounded-2xl bg-secondary/60 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center font-display text-sm">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-medium truncate">{user.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">{user.telegram}</div>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {activePlan ? `Тариф: ${activePlan}` : "Тариф не активен"}
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-full bg-accent/30 flex items-center justify-center font-display text-sm">
            {user.name.charAt(0)}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
