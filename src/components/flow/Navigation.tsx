import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";

const links = [
  { label: "Концепция", href: "/#concept" },
  { label: "Кофе", href: "/coffee" },
  { label: "Тарифы", href: "/#plans" },
  { label: "Афиша", href: "/#events-teaser" },
  { label: "Контакты", href: "/#contact" },
];

const Navigation = () => {
  const { pathname } = useLocation();
  const overlay = pathname.startsWith("/coffee");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const transparent = overlay && !scrolled;
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        transparent
          ? "bg-transparent border-b border-transparent text-white"
          : "backdrop-blur-xl bg-background/70 border-b border-border/40"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="#top" className="group">
          <Logo size="md" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                transparent
                  ? "text-white/70 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Button variant="default" size="sm" asChild>
            <Link to="/app">Войти в кабинет</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
