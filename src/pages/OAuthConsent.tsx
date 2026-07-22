import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/flow/Logo";
import { supabase } from "@/integrations/supabase/client";

// The @supabase/supabase-js `auth.oauth` namespace is in beta and not yet
// in the shipped typings. Locally type just the methods we call.
type AuthorizationDetails = {
  client?: { name?: string; client_id?: string };
  redirect_uri?: string;
  scope?: string;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthNs = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthNs }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("В ссылке нет authorization_id.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      setEmail(sess.session.user.email ?? null);

      if (!oauth) {
        setError("OAuth-функции не активны на этом бэкенде.");
        return;
      }

      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setError("Провайдер не вернул URL для редиректа.");
      setBusy(false);
      return;
    }
    window.location.href = target;
  };

  const clientName = details?.client?.name ?? "внешнее приложение";
  const scopes = details?.scopes ?? (details?.scope ? details.scope.split(/\s+/).filter(Boolean) : []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="container mx-auto px-6 pt-8">
        <Logo size="md" withSignal={false} />
      </header>

      <main className="flex-1 container mx-auto px-6 flex items-center justify-center py-16">
        <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft">
          <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-5">
            <ShieldCheck className="w-6 h-6" />
          </div>

          {error && (
            <>
              <h1 className="font-display text-2xl font-semibold mb-3">Не удалось загрузить запрос</h1>
              <p className="text-sm text-destructive mb-6">{error}</p>
            </>
          )}

          {!error && !details && (
            <div className="py-8 flex items-center gap-3 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Загружаем запрос авторизации...
            </div>
          )}

          {!error && details && (
            <>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Подключение
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-semibold leading-tight mb-3">
                Подключить {clientName} к SO-HO!
              </h1>
              <p className="text-sm text-muted-foreground mb-6">
                {clientName} сможет вызывать инструменты SO-HO! от твоего имени,
                пока ты вошёл(-ла) как <span className="text-foreground font-medium">{email}</span>.
              </p>

              <div className="rounded-2xl bg-secondary/60 p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Клиент</span>
                  <span className="font-medium truncate">{clientName}</span>
                </div>
                {details.redirect_uri && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Redirect URI</span>
                    <span className="font-mono text-xs truncate">{details.redirect_uri}</span>
                  </div>
                )}
                {scopes.length > 0 && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Разрешения</span>
                    <span className="text-right text-xs">{scopes.join(", ")}</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground mb-6">
                Это не даёт доступ в обход политик SO-HO! — только к разрешённым инструментам.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={busy}
                  onClick={() => decide(false)}
                >
                  <X className="w-4 h-4" />
                  Отклонить
                </Button>
                <Button className="flex-1" disabled={busy} onClick={() => decide(true)}>
                  {busy ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      ...
                    </>
                  ) : (
                    "Разрешить"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default OAuthConsent;
