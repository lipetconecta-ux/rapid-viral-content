const steps = [
  {
    n: "01",
    title: "Escolha o tipo de conteúdo",
    desc: "Roteiro viral para vídeo ou carrossel de alta conversão. Você decide.",
  },
  {
    n: "02",
    title: "Conte seu nicho e objetivo",
    desc: "Em poucos campos, a IA entende exatamente o que você precisa criar.",
  },
  {
    n: "03",
    title: "Gere, copie e publique",
    desc: "Receba o conteúdo pronto: hook, roteiro, CTA, legenda e hashtags.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 bg-card/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-gradient-brand uppercase tracking-wider">
            Como funciona
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Do bloqueio criativo ao post pronto em 3 passos
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="text-7xl font-black text-gradient-brand opacity-90">{s.n}</div>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 right-0 h-px w-16 bg-gradient-to-r from-border to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
