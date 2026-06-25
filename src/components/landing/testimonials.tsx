import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marina Costa",
    role: "Afiliada · Nicho Beleza",
    avatar: "MC",
    text: "Antes eu travava na hora de criar roteiro. Hoje gero 5 vídeos por dia em 10 minutos. Meu engajamento triplicou.",
  },
  {
    name: "Ricardo Almeida",
    role: "Infoprodutor · Mentoria",
    avatar: "RA",
    text: "Os carrosséis do Postviral tiveram em média 2x mais salvamentos que os meus. Virou ferramenta essencial.",
  },
  {
    name: "Juliana Reis",
    role: "Social Media · Agência",
    avatar: "JR",
    text: "Atendo 8 clientes. Sem essa IA eu não daria conta. Os roteiros vêm com hook e CTA já amarrados, é só ajustar.",
  },
  {
    name: "Pedro Henrique",
    role: "Creator · Finanças",
    avatar: "PH",
    text: "Estourei minha conta no Reels usando os roteiros. 480k visualizações em um único vídeo no primeiro mês.",
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 sm:py-32 bg-card/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Quem usa, <span className="text-gradient-brand">recomenda</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mais de 12.000 criadores transformaram sua produção de conteúdo.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card-elev"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-pink text-brand-pink" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm text-foreground/90">{t.text}</p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
