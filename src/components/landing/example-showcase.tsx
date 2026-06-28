import { Sparkles, Film, Hash, MessageSquareQuote } from "lucide-react";

const scenes = [
  { t: "0–2s", desc: "Close no rosto, expressão de surpresa. Texto na tela: 'Ninguém te conta isso'." },
  { t: "2–6s", desc: "Corte para a tela do celular mostrando o erro mais comum dos criadores." },
  { t: "6–12s", desc: "Você apontando para o ponto-chave com legenda animada destacando o insight." },
  { t: "12–20s", desc: "Demonstração rápida da solução em 3 passos, com transições secas." },
  { t: "20–28s", desc: "Resultado real (print, número, depoimento) para gerar prova social." },
];

export function ExampleShowcase() {
  return (
    <section id="exemplo" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
            Gerado pela IA · sem edição
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Veja um <span className="text-gradient-brand">exemplo real</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Um roteiro completo que a Postviral.AI entrega em segundos — pronto pra gravar.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-4xl">
          <div className="relative rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-card-elev">
            <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-brand opacity-20 blur-2xl" />

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-background px-2 py-1 border border-border">Reels / TikTok</span>
              <span className="rounded-full bg-background px-2 py-1 border border-border">Nicho: Marketing Digital</span>
              <span className="rounded-full bg-background px-2 py-1 border border-border">Duração: 30s</span>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-pink">Hook</div>
              <p className="mt-2 text-xl sm:text-2xl font-bold leading-snug">
                "Pare de postar todo dia se você ainda comete esse erro nos primeiros 3 segundos."
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-pink">
                <Film className="h-3.5 w-3.5" />
                Cena a cena
              </div>
              <ul className="mt-4 space-y-3">
                {scenes.map((s) => (
                  <li
                    key={s.t}
                    className="flex gap-4 rounded-xl border border-border bg-background/40 p-4"
                  >
                    <span className="shrink-0 text-xs font-mono font-semibold text-brand-pink w-14">
                      {s.t}
                    </span>
                    <span className="text-sm text-foreground/90">{s.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-pink">
                  <MessageSquareQuote className="h-3.5 w-3.5" />
                  CTA
                </div>
                <p className="mt-2 text-sm text-foreground/90">
                  "Comenta 'ROTEIRO' que eu te mando o modelo pronto que usei pra estourar
                  esse vídeo."
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-pink">
                  <Hash className="h-3.5 w-3.5" />
                  Hashtags
                </div>
                <p className="mt-2 text-sm text-foreground/90 break-words">
                  #marketingdigital #reels #conteudoviral #criadordeconteudo
                  #socialmedia #empreendedorismo
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-dashed border-border bg-background/40 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-pink">
                Legenda do post
              </div>
              <p className="mt-2 text-sm text-foreground/90">
                Se você posta todo santo dia e não vê resultado, o problema quase nunca é a
                frequência — é o que acontece nos primeiros 3 segundos. Salve esse roteiro,
                aplica essa semana e me conta o resultado nos comentários. 🔥
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
