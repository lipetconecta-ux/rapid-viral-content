import { Star, ExternalLink } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  text: string;
  resultUrl?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Marina Costa Silva",
    role: "Afiliada · Nicho Beleza",
    avatar: "https://i.pravatar.cc/120?img=47",
    text: "Antes eu travava na hora de criar roteiro. Hoje gero 5 vídeos por dia em 10 minutos. Meu engajamento triplicou.",
    resultUrl: "#",
  },
  {
    name: "Ricardo Almeida Souza",
    role: "Infoprodutor · Mentoria",
    avatar: "https://i.pravatar.cc/120?img=12",
    text: "Os carrosséis do Postviral tiveram em média 2x mais salvamentos que os meus. Virou ferramenta essencial.",
    resultUrl: "#",
  },
  {
    name: "Juliana Reis Martins",
    role: "Social Media · Agência",
    avatar: "https://i.pravatar.cc/120?img=45",
    text: "Atendo 8 clientes. Sem essa IA eu não daria conta. Os roteiros vêm com hook e CTA já amarrados, é só ajustar.",
    resultUrl: "#",
  },
  {
    name: "Pedro Henrique Lima",
    role: "Creator · Finanças",
    avatar: "https://i.pravatar.cc/120?img=33",
    text: "Estourei minha conta no Reels usando os roteiros. 480k visualizações em um único vídeo no primeiro mês.",
    resultUrl: "#",
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

              {/* TODO: substituir resultUrl pelo link real do print/post de cada criador */}
              <a
                href={t.resultUrl ?? "#"}
                className="mt-3 inline-flex items-center gap-1 text-xs text-brand-pink hover:underline"
              >
                ver resultado
                <ExternalLink className="h-3 w-3" />
              </a>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
                />
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
