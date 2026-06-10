import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Phone, PhoneCall, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/flow/Logo";
import heroImg from "@/assets/real/cowork-view.png";

type Step = "phone" | "call" | "success";

// Mocked number returned by the "API". Replace with real backend response later.
const CALL_TARGET = "+7 (499) 555-5555";
const CALL_TARGET_TEL = "+74995555555";
const WAIT_SECONDS = 5 * 60;

const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  const d = digits.startsWith("7") ? digits.slice(1) : digits;
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 8);
  const p4 = d.slice(8, 10);
  let out = "+7";
  if (p1) out += ` (${p1}`;
  if (p1.length === 3) out += ")";
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
};

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(WAIT_SECONDS);

  const digits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const isValid = digits.length === 11;

  // countdown
  useEffect(() => {
    if (step !== "call") return;
    if (remaining <= 0) {
      setStep("phone");
      return;
    }
    const t = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(t);
  }, [step, remaining]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  const handleSubmitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    // Имитация запроса к API — в реальности тут вернётся номер для звонка
    await new Promise((r) => setTimeout(r, 700));
    setRemaining(WAIT_SECONDS);
    setStep("call");
    setLoading(false);
  };

  // Имитация webhook: кнопка «я позвонил» подтверждает авторизацию
  const handleConfirmCall = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setStep("success");
    setLoading(false);
    setTimeout(() => navigate("/app"), 1200);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/90 to-primary/95" />
      </div>

      <header className="relative z-10 container mx-auto px-6 pt-8 flex items-center justify-between">
        <Logo size="md" withSignal={false} variant="inverted" />
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </header>

      <main className="relative z-10 container mx-auto px-6 min-h-[calc(100vh-6rem)] flex items-center justify-center py-16">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-background/95 backdrop-blur-xl border border-background/20 shadow-deep p-8 md:p-10">
            {step === "phone" && (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] uppercase tracking-[0.2em] mb-5">
                  <Phone className="w-3 h-3" />
                  Вход в кабинет
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-3">
                  Привет 👋
                </h1>
                <p className="text-muted-foreground text-sm mb-8">
                  Введи свой номер — мы скажем, по какому короткому номеру позвонить,
                  чтобы войти. Звонок бесплатный и сбросится сам.
                </p>

                <form onSubmit={handleSubmitPhone} className="space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      Номер телефона
                    </label>
                    <Input
                      type="tel"
                      inputMode="tel"
                      autoFocus
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="h-14 text-lg rounded-2xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base"
                    disabled={!isValid || loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Готовим звонок...
                      </>
                    ) : (
                      "Получить номер для звонка"
                    )}
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                    Нажимая кнопку, ты соглашаешься с обработкой персональных данных
                    в рамках использования SO-HO!
                  </p>
                </form>
              </>
            )}

            {step === "call" && (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/20 text-highlight-foreground text-[11px] uppercase tracking-[0.2em] mb-5">
                  <PhoneCall className="w-3 h-3" />
                  Позвоните для входа
                </div>

                <h1 className="font-display text-2xl md:text-3xl font-semibold leading-tight mb-3">
                  Позвони на этот номер
                </h1>
                <p className="text-muted-foreground text-sm mb-6">
                  С номера <span className="font-medium text-foreground">{phone}</span>.
                  Звонок бесплатный — мы сразу его сбросим и впустим тебя.
                </p>

                <a
                  href={`tel:${CALL_TARGET_TEL}`}
                  className="block rounded-2xl bg-gradient-forest text-primary-foreground p-6 text-center shadow-soft mb-5 transition-transform hover:scale-[1.01]"
                >
                  <div className="text-[11px] uppercase tracking-[0.25em] text-primary-foreground/70 mb-2">
                    Набери номер
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                    {CALL_TARGET}
                  </div>
                  <div className="text-xs text-primary-foreground/70 mt-2">
                    Нажми, чтобы позвонить с мобильного
                  </div>
                </a>

                <div className="flex items-center justify-between text-sm mb-6 px-2">
                  <span className="text-muted-foreground">Ожидаем звонок</span>
                  <span className="font-display text-lg tabular-nums">
                    {mm}:{ss}
                  </span>
                </div>

                <Button
                  onClick={handleConfirmCall}
                  size="lg"
                  className="w-full h-14 text-base"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Проверяем...
                    </>
                  ) : (
                    "Я позвонил — войти"
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-4 transition-colors"
                >
                  Указать другой номер
                </button>
              </>
            )}

            {step === "success" && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto mb-5">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h1 className="font-display text-2xl font-semibold mb-2">
                  Добро пожаловать!
                </h1>
                <p className="text-muted-foreground text-sm">
                  Открываем твой кабинет...
                </p>
              </div>
            )}
          </div>

          <p className="text-center text-primary-foreground/70 text-xs mt-6">
            Возникли сложности? Напиши нам{" "}
            <a href="mailto:hello@so-ho.ru" className="underline hover:text-primary-foreground">
              hello@so-ho.ru
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
