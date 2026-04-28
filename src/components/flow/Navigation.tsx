import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const links = [
  { label: "Концепция", href: "#concept" },
  { label: "Тарифы", href: "#plans" },
  { label: "Контакты", href: "#contact" },
];

const Navigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-forest flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow">
            <span className="text-primary-foreground font-display font-bold text-sm">F</span>
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Flow</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <Button variant="default" size="sm" asChild>
          <Link to="/app">Войти в кабинет</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navigation;
