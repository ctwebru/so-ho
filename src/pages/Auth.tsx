import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/flow/Logo";
import { supabase } from "@/integrations/supabase/client";

const safeNext = (raw: string | null) => {
  if (!raw) return "/app";
  try {
    // Same-origin relative paths only.
    if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  } catch {}
  return "/app";
};

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });
  }, [navigate, next]);

  const emailRedirectTo = `${window.location.origin}${next}`;

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo },
        });
        if (error) throw error;
        setInfo("Проверь почту для подтверждения — потом вернись сюда и войди.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(next, { replace: true });
      }
    } catch (err: any) {
      setError(err?.message ?? "Не удалось войти");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: emailRedirectTo },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err?.message ?? "Не удалось начать вход через Google");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="container mx-auto px-6 pt-8 flex items-center justify-between">
        <Logo size="md" withSignal={false} />
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-6 flex items-center justify-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft">
          <div className="text-[11px] uppercase tracking-[0.25em] text-accent mb-3">
            {mode === "signin" ? "Вход" : "Регистрация"}
          </div>
          <h1 className="font-display text-3xl font-semibold leading-tight mb-2">
            {mode === "signin" ? "С возвращением" : "Создать аккаунт"}
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Единый аккаунт для SO-HO! и подключаемых интеграций.
          </p>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 mb-5"
            onClick={handleGoogle}
            disabled={loading}
          >
            Войти через Google
          </Button>

          <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted-foreground mb-5">
            <span className="flex-1 h-px bg-border" />
            или e-mail
            <span className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 h-12"
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 h-12"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {info && <p className="text-sm text-accent">{info}</p>}

            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Подождите...
                </>
              ) : mode === "signin" ? (
                "Войти"
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setInfo(null);
            }}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-6"
          >
            {mode === "signin"
              ? "Нет аккаунта? Зарегистрироваться"
              : "Уже есть аккаунт? Войти"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Auth;
