import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    desc: "Perfeito para começar e testar a plataforma.",
    cta: "Começar grátis",
    highlighted: false,
    features: [
      "10 gerações por mês",
      "Gerador de roteiros",
      "Gerador de carrosséis",
      "Histórico de gerações",
      "Suporte por e-mail",
    ],
  },
  {
    name: "Pro",
    price: "R$ 47",
    period: "/mês",
    desc: "Para criadores e profissionais que precisam de escala.",
    cta: "Assinar Pro",
    highlighted: true,
    features: [
      "Gerações ilimitadas",
      "Acesso prioritário a novos recursos",
      "Favoritos ilimitados",
      "Exportação avançada",
      "Suporte prioritário",
      "Histórico completo",
    ],
  },
];

export function Pricing() {
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
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl border p-8 shadow-card-elev ${
                p.highlighted
                  ? "border-primary/60 bg-card"
                  : "border-border bg-card"
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
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight">{p.price}</span>
                <span className="text-muted-foreground">{p.period}</span>
              </div>
              <Button
                asChild
                size="lg"
                className={`mt-6 w-full ${
                  p.highlighted ? "bg-gradient-brand hover:opacity-90 shadow-glow" : ""
                }`}
                variant={p.highlighted ? "default" : "outline"}
              >
                <Link to="/auth">{p.cta}</Link>
              </Button>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm">
                    <Check className="h-5 w-5 shrink-0 text-brand-pink" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
