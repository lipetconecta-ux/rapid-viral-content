import { Zap, Target, Layers, BarChart3, Wand2, Clock } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Velocidade absurda",
    desc: "Gere conteúdo viral em menos de 30 segundos, sem bloqueio criativo.",
  },
  {
    icon: Target,
    title: "Feito para converter",
    desc: "Roteiros e carrosséis com estruturas comprovadas de copywriting.",
  },
  {
    icon: Layers,
    title: "Múltiplas plataformas",
    desc: "Otimizado para Instagram, TikTok, Facebook e YouTube Shorts.",
  },
  {
    icon: Wand2,
    title: "Personalização real",
    desc: "Defina nicho, tom de voz, objetivo e estrutura. A IA se adapta a você.",
  },
  {
    icon: BarChart3,
    title: "Crescimento orgânico",
    desc: "Posts pensados para maximizar alcance, salvamentos e compartilhamentos.",
  },
  {
    icon: Clock,
    title: "Economia de tempo",
    desc: "Pare de gastar horas criando conteúdo. Foque em filmar e vender.",
  },
];

export function Benefits() {
  return (
    <section id="recursos" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Tudo o que você precisa para{" "}
            <span className="text-gradient-brand">crescer no orgânico</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Uma plataforma completa, pensada para criadores, afiliados e infoprodutores
            que querem escala.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-card-elev transition-all hover:border-primary/40"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft ring-1 ring-border">
                <b.icon className="h-5 w-5 text-gradient-brand" />
              </div>
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
