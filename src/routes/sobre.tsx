import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Sparkles, Target, Heart } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Postviral.AI" },
      {
        name: "description",
        content:
          "Conheça a missão da Postviral.AI: democratizar a criação de conteúdo viral com IA para criadores brasileiros.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    Icon: Sparkles,
    title: "Velocidade com qualidade",
    text: "Roteiros e carrosséis prontos em segundos — sem perder profundidade nem estratégia.",
  },
  {
    Icon: Target,
    title: "Foco em resultado",
    text: "Tudo é desenhado para gerar visualização, engajamento e venda no orgânico.",
  },
  {
    Icon: Heart,
    title: "Feito para o Brasil",
    text: "Linguagem, exemplos e referências culturais pensados para o criador brasileiro.",
  },
];

function AboutPage() {
  return (
    <PageShell
      title="Sobre a Postviral.AI"
      subtitle="A plataforma de IA que ajuda criadores a vender mais no orgânico."
    >
      <section>
        <h2 className="text-2xl font-bold">Nossa missão</h2>
        <p className="mt-3">
          Acreditamos que toda pessoa com algo relevante a dizer merece ser ouvida. A
          Postviral.AI nasceu para tirar o atrito da criação de conteúdo: chega de página
          em branco, chega de gastar horas em um único roteiro, chega de adivinhar o que
          funciona em cada formato.
        </p>
        <p className="mt-3">
          Combinamos modelos de IA de ponta com a estratégia que move o algoritmo —
          ganchos, narrativa, prova social e CTA — em uma ferramenta simples, rápida e
          pensada para criadores, afiliados, infoprodutores e social medias brasileiros.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3 not-prose">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-card-elev"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
              <v.Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold">O que nos move</h2>
        <p className="mt-3">
          Trabalhamos para que qualquer criador, do iniciante ao avançado, consiga
          produzir conteúdo viral com consistência. Acreditamos em um produto enxuto,
          rápido, com design cuidadoso e cobrança justa — incluindo um plano gratuito
          para sempre.
        </p>
      </section>
    </PageShell>
  );
}
