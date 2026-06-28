import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";

type Plan = {
  name: string;
  monthly: number | null;
  desc: string;
  cta: string;
  highlighted?: boolean;
  free?: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    free: true,
    desc: "Para experimentar a plataforma, sem cartão de crédito.",
    cta: "Começar grátis",
    features: [
      "5 gerações por mês",
      "Gerador de roteiros",
      "Gerador de carrosséis",
      "Histórico básico",
      "Para sempre gratuito",
    ],
  },
  {
    name: "Starter",
    monthly: 27.9,
    desc: "Para quem está começando a criar conteúdo viral.",
    cta: "Assinar Starter",
    features: [
      "50 gerações por mês",
      "Gerador de roteiros",
      "Gerador de carrosséis",
      "Histórico de gerações",
      "Suporte por e-mail",
    ],
  },
  {
    name: "Pro",
    monthly: 37.9,
    highlighted: true,
    desc: "Para criadores que precisam de mais volume e recursos.",
    cta: "Assinar Pro",
    features: [
      "100 gerações por mês",
      "Gerador de roteiros e carrosséis",
      "Favoritos ilimitados",
      "Histórico completo",
      "Suporte prioritário",
    ],
  },
  {
    name: "Premium",
    monthly: 47.9,
    desc: "Para profissionais e agências em escala máxima.",
    cta: "Assinar Premium",
    features: [
      "Gerações ilimitadas",
      "Acesso antecipado a novos recursos",
      "Exportação avançada",
      "Suporte VIP dedicado",
      "Múltiplas marcas/perfis",
    ],
  },
];

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="precos" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Planos <span className="text-gradient-brand">simples e diretos</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Comece grátis. Faça upgrade quando precisar de mais.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2">
            <span
              className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}
            >
              Mensal
            </span>
            <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Alternar cobrança anual" />
            <span
              className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}
            >
              Anual
            </span>
            <span className="ml-1 rounded-full bg-gradient-brand px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
              2 MESES GRÁTIS
            </span>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {plans.map((p) => {
            const isFree = p.free;
            const effective = p.monthly ?? 0;
            const annualMonthly = annual ? (effective * 10) / 12 : effective;
            return (
              <div
                key={p.name}
                className={`relative rounded-3xl border p-8 shadow-card-elev ${
                  p.highlighted ? "border-primary/60 bg-card" : "border-border bg-card"
                }`}
              >
                {p.highlighted && (
                  <>
                    <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-brand opacity-60 blur-xl" />
                    <div className="absolute top-5 right-5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-primary-foreground">
                      Mais popular
                    </div>
                  </>
                )}
                <h3 className="text-2xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">{p.desc}</p>

                <div className="mt-6 min-h-[80px]">
                  {isFree ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black tracking-tight">R$ 0</span>
                      <span className="text-muted-foreground">/sempre</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black tracking-tight">
                          R$ {fmt(annualMonthly)}
                        </span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                      {annual && (
                        <div className="mt-1 flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground line-through">
                            R$ {fmt(effective)}/mês
                          </span>
                          <span className="text-brand-pink font-semibold">
                            2 meses grátis
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <Button
                  asChild
                  size="lg"
                  className={`mt-2 w-full ${
                    p.highlighted ? "bg-gradient-brand hover:opacity-90 shadow-glow" : ""
                  }`}
                  variant={p.highlighted ? "default" : "outline"}
                >
                  <Link to="/auth">{p.cta}</Link>
                </Button>

                {isFree && (
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Sem cartão de crédito
                  </p>
                )}

                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm">
                      <Check className="h-5 w-5 shrink-0 text-brand-pink" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
