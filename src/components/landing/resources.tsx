import { FileText, LayoutGrid, Check } from "lucide-react";

const items = [
  {
    icon: FileText,
    title: "Gerador de Roteiros Virais",
    desc: "Roteiros completos, divididos por cenas, com hook, B-roll, textos na tela, CTA, legenda e hashtags otimizadas.",
    bullets: [
      "Título viral + hook irresistível",
      "Roteiro cena a cena",
      "Sugestão de B-roll e textos na tela",
      "Legenda pronta + hashtags",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Gerador de Carrosséis",
    desc: "Carrosséis de alta conversão usando AIDA, PAS, Storytelling ou Lista. Slide por slide com sugestão visual.",
    bullets: [
      "Estruturas: AIDA, PAS, Lista, Storytelling",
      "De 3 a 10 slides personalizáveis",
      "Sugestão visual por slide",
      "CTA + legenda finais",
    ],
  },
];

export function Resources() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Dois geradores. <span className="text-gradient-brand">Resultados infinitos.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {items.map((it) => (
            <div
              key={it.title}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card-elev"
            >
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-brand-soft blur-3xl" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow">
                  <it.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{it.title}</h3>
                <p className="mt-3 text-muted-foreground">{it.desc}</p>
                <ul className="mt-6 space-y-3">
                  {it.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm">
                      <Check className="h-5 w-5 shrink-0 text-brand-pink" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
