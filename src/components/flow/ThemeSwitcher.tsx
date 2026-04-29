import { useTheme, THEMES, ThemeId } from "@/state/ThemeProvider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const current = THEMES.find((t) => t.id === theme)!;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 h-9 px-3 rounded-full border border-border/60 bg-card/60 hover:bg-card transition-colors text-xs"
          aria-label="Сменить тему"
        >
          <Palette className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="hidden sm:inline font-medium">{current.label}</span>
          <div className="flex -space-x-1">
            {current.swatches.slice(1).map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-background"
                style={{ background: c }}
              />
            ))}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-2">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 py-1.5">
          / Палитра пространства
        </p>
        <div className="flex flex-col gap-1">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as ThemeId)}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left",
                theme === t.id && "bg-muted",
              )}
            >
              <div className="flex -space-x-1.5 shrink-0">
                {t.swatches.map((c, i) => (
                  <span
                    key={i}
                    className="w-5 h-5 rounded-full border-2 border-background shadow-sm"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">{t.label}</p>
                <p className="text-xs text-muted-foreground leading-tight">{t.description}</p>
              </div>
              {theme === t.id && <Check className="w-4 h-4 text-primary shrink-0" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;
